-- Create ai_personas table for virtual writers
CREATE TABLE public.ai_personas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  avatar_url text,
  bio text NOT NULL,
  system_prompt text NOT NULL,
  specialty text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create keyword_bank table for topic tracking
CREATE TABLE public.keyword_bank (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL,
  cluster text NOT NULL, -- 'compliance', 'hazard', 'news'
  search_volume integer DEFAULT 0,
  difficulty_score integer DEFAULT 0,
  is_used boolean DEFAULT false,
  last_used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content_html text NOT NULL,
  excerpt text NOT NULL,
  featured_image_url text,
  author_persona_id uuid REFERENCES public.ai_personas(id),
  seo_keywords text[] DEFAULT '{}',
  category text NOT NULL, -- 'Part 46', 'Part 48', 'Safety Alerts', 'Equipment', 'News'
  status text NOT NULL DEFAULT 'draft', -- 'draft', 'review', 'scheduled', 'published'
  published_at timestamptz,
  view_count integer DEFAULT 0,
  reading_time_minutes integer DEFAULT 5,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX idx_keyword_bank_cluster ON public.keyword_bank(cluster);
CREATE INDEX idx_keyword_bank_is_used ON public.keyword_bank(is_used);

-- Enable RLS
ALTER TABLE public.ai_personas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.keyword_bank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- ai_personas policies - public read, admin/instructor write
CREATE POLICY "Anyone can view active personas"
  ON public.ai_personas FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage personas"
  ON public.ai_personas FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- keyword_bank policies - admin only
CREATE POLICY "Admins can view keywords"
  ON public.keyword_bank FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage keywords"
  ON public.keyword_bank FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- blog_posts policies - public read published, admin write
CREATE POLICY "Anyone can view published posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admins can view all posts"
  ON public.blog_posts FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage posts"
  ON public.blog_posts FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_ai_personas_updated_at
  BEFORE UPDATE ON public.ai_personas
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();