-- Enable pgvector extension for semantic similarity search
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

-- Create research_materials table for RAG data pipeline
CREATE TABLE public.research_materials (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    source_type TEXT NOT NULL, -- 'federal_register', 'msha_fatality', 'news_api', 'weather'
    source_id TEXT, -- External ID from source (e.g., Federal Register document number)
    raw_content TEXT NOT NULL,
    summary TEXT,
    embedding vector(1536), -- OpenAI text-embedding-3-small dimension
    metadata JSONB DEFAULT '{}'::jsonb,
    ingested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    is_processed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for vector similarity search
CREATE INDEX ON public.research_materials USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Create index for source lookups
CREATE INDEX idx_research_materials_source ON public.research_materials(source_type, source_id);

-- Add embedding column to blog_posts for redundancy checking
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS embedding vector(1536),
ADD COLUMN IF NOT EXISTS confidence_score INTEGER DEFAULT 100,
ADD COLUMN IF NOT EXISTS persona_used TEXT,
ADD COLUMN IF NOT EXISTS content_type TEXT DEFAULT 'general'; -- 'toolbox_talk', 'compliance', 'market_analysis', 'general'

-- Create index for blog post similarity search
CREATE INDEX ON public.blog_posts USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Create federal_register_docs table to track processed documents
CREATE TABLE public.federal_register_docs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    document_number TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    abstract TEXT,
    publication_date DATE NOT NULL,
    effective_date DATE,
    document_type TEXT, -- 'RULE', 'PROPOSED_RULE', 'NOTICE'
    citation TEXT, -- e.g., '30 CFR 56.5002'
    html_url TEXT,
    pdf_url TEXT,
    is_processed BOOLEAN DEFAULT false,
    triggered_blog_id UUID REFERENCES public.blog_posts(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for document lookups
CREATE INDEX idx_federal_register_docs_number ON public.federal_register_docs(document_number);
CREATE INDEX idx_federal_register_docs_date ON public.federal_register_docs(publication_date DESC);

-- Enable RLS on new tables
ALTER TABLE public.research_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.federal_register_docs ENABLE ROW LEVEL SECURITY;

-- RLS policies for research_materials (admin only)
CREATE POLICY "Admins can manage research materials"
ON public.research_materials FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for federal_register_docs (admin only)
CREATE POLICY "Admins can manage federal register docs"
ON public.federal_register_docs FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view federal register docs"
ON public.federal_register_docs FOR SELECT
USING (true);

-- Function to check blog post redundancy (returns similarity score 0-1)
CREATE OR REPLACE FUNCTION public.check_blog_redundancy(
    topic_embedding vector(1536),
    days_back INTEGER DEFAULT 30
)
RETURNS TABLE(post_id UUID, title TEXT, similarity FLOAT) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        bp.id,
        bp.title,
        1 - (bp.embedding <=> topic_embedding) AS similarity
    FROM public.blog_posts bp
    WHERE bp.embedding IS NOT NULL
      AND bp.created_at > NOW() - (days_back || ' days')::INTERVAL
      AND 1 - (bp.embedding <=> topic_embedding) > 0.85
    ORDER BY similarity DESC
    LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;