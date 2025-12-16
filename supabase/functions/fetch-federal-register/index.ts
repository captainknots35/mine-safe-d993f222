import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Federal Register API endpoint for MSHA documents
const FEDERAL_REGISTER_API = "https://www.federalregister.gov/api/v1/documents.json";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase credentials");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Build query parameters for MSHA documents
    const params = new URLSearchParams({
      "conditions[agencies][]": "mine-safety-and-health-administration",
      "per_page": "20",
      "order": "newest",
    });

    // Only fetch documents from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    params.append("conditions[publication_date][gte]", thirtyDaysAgo.toISOString().split('T')[0]);

    console.log("Fetching Federal Register documents for MSHA...");
    
    const response = await fetch(`${FEDERAL_REGISTER_API}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`Federal Register API error: ${response.status}`);
    }

    const data = await response.json();
    const documents = data.results || [];

    console.log(`Found ${documents.length} MSHA documents`);

    let newDocsCount = 0;
    let triggeredBlogs = 0;

    for (const doc of documents) {
      // Check if we've already processed this document
      const { data: existing } = await supabase
        .from('federal_register_docs')
        .select('id')
        .eq('document_number', doc.document_number)
        .single();

      if (existing) {
        console.log(`Document ${doc.document_number} already processed, skipping`);
        continue;
      }

      // Insert the new document
      const { error: insertError } = await supabase
        .from('federal_register_docs')
        .insert({
          document_number: doc.document_number,
          title: doc.title,
          abstract: doc.abstract || null,
          publication_date: doc.publication_date,
          effective_date: doc.effective_on || null,
          document_type: doc.type,
          citation: doc.citation || null,
          html_url: doc.html_url,
          pdf_url: doc.pdf_url,
          is_processed: false,
        });

      if (insertError) {
        console.error(`Error inserting document ${doc.document_number}:`, insertError);
        continue;
      }

      newDocsCount++;
      console.log(`Inserted new document: ${doc.document_number} - ${doc.title}`);

      // Also store in research_materials for RAG
      const { error: researchError } = await supabase
        .from('research_materials')
        .insert({
          source_type: 'federal_register',
          source_id: doc.document_number,
          raw_content: `Title: ${doc.title}\n\nAbstract: ${doc.abstract || 'N/A'}\n\nType: ${doc.type}\n\nCitation: ${doc.citation || 'N/A'}\n\nEffective Date: ${doc.effective_on || 'N/A'}`,
          summary: doc.abstract,
          metadata: {
            document_number: doc.document_number,
            publication_date: doc.publication_date,
            type: doc.type,
            html_url: doc.html_url,
            pdf_url: doc.pdf_url,
          },
          is_processed: false,
        });

      if (researchError) {
        console.error(`Error inserting research material:`, researchError);
      }

      // If it's a Final Rule or Proposed Rule, it's blog-worthy
      if (doc.type === 'Rule' || doc.type === 'Proposed Rule') {
        triggeredBlogs++;
        console.log(`Document ${doc.document_number} is a ${doc.type} - marked for blog generation`);
      }
    }

    console.log(`Fetch complete. New docs: ${newDocsCount}, Potential blogs: ${triggeredBlogs}`);

    return new Response(
      JSON.stringify({
        success: true,
        total_fetched: documents.length,
        new_documents: newDocsCount,
        potential_blogs: triggeredBlogs,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching Federal Register:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch Federal Register" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
