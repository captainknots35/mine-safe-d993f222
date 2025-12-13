import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { decode as base64Decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

async function generateFeaturedImage(title: string, category: string, apiKey: string): Promise<string | null> {
  try {
    console.log("Generating featured image for:", title);
    
    const imagePrompt = `Professional mining safety training blog header image. Topic: ${title}. Style: Modern industrial photography, surface mining operation, safety equipment, workers with PPE. Color scheme: dark blue, orange safety accents, industrial tones. Wide 16:9 aspect ratio, professional quality, no text overlays. Category: ${category}.`;

    const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: imagePrompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!imageResponse.ok) {
      const errorText = await imageResponse.text();
      console.error("Image generation failed:", errorText);
      return null;
    }

    const imageData = await imageResponse.json();
    const imageUrl = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageUrl) {
      console.error("No image URL in response");
      return null;
    }

    console.log("Image generated successfully");
    return imageUrl;
  } catch (error) {
    console.error("Error generating image:", error);
    return null;
  }
}

async function uploadImageToStorage(
  supabase: any,
  base64DataUrl: string,
  slug: string
): Promise<string | null> {
  try {
    const matches = base64DataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) {
      console.error("Invalid base64 data URL format");
      return null;
    }

    const imageType = matches[1];
    const base64Data = matches[2];
    const imageBytes = base64Decode(base64Data);
    
    const fileName = `blog-images/${slug}.${imageType}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, imageBytes, {
        contentType: `image/${imageType}`,
        upsert: true,
      });

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return null;
    }

    const { data: publicUrlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    console.log("Image uploaded successfully:", publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error("Error uploading image to storage:", error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Get request body for optional limit
    let limit = 5; // Default to 5 posts per run to avoid timeouts
    try {
      const body = await req.json();
      if (body.limit && typeof body.limit === 'number') {
        limit = Math.min(body.limit, 10); // Cap at 10 to prevent timeout
      }
    } catch {
      // No body or invalid JSON, use default limit
    }

    // Find posts without featured images
    const { data: posts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('id, title, slug, category')
      .or('featured_image_url.is.null,featured_image_url.eq.')
      .limit(limit);

    if (fetchError) {
      console.error("Error fetching posts:", fetchError);
      throw new Error(`Failed to fetch posts: ${fetchError.message}`);
    }

    if (!posts || posts.length === 0) {
      console.log("No posts found without featured images");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "All posts already have featured images",
          processed: 0 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Found ${posts.length} posts without featured images`);

    const results: Array<{ id: string; title: string; success: boolean; imageUrl?: string; error?: string }> = [];

    for (const post of posts) {
      console.log(`Processing post: ${post.title}`);
      
      try {
        // Generate image
        const base64Image = await generateFeaturedImage(post.title, post.category, LOVABLE_API_KEY);
        
        if (!base64Image) {
          results.push({ id: post.id, title: post.title, success: false, error: "Image generation failed" });
          continue;
        }

        // Upload to storage
        const imageUrl = await uploadImageToStorage(supabase, base64Image, post.slug);
        
        if (!imageUrl) {
          results.push({ id: post.id, title: post.title, success: false, error: "Image upload failed" });
          continue;
        }

        // Update post with image URL
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({ featured_image_url: imageUrl })
          .eq('id', post.id);

        if (updateError) {
          console.error(`Error updating post ${post.id}:`, updateError);
          results.push({ id: post.id, title: post.title, success: false, error: updateError.message });
          continue;
        }

        results.push({ id: post.id, title: post.title, success: true, imageUrl });
        console.log(`Successfully added image to post: ${post.title}`);
        
        // Small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error processing post ${post.id}:`, error);
        results.push({ id: post.id, title: post.title, success: false, error: String(error) });
      }
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`Backfill complete: ${successCount}/${posts.length} posts updated`);

    return new Response(
      JSON.stringify({
        success: true,
        processed: posts.length,
        successful: successCount,
        failed: posts.length - successCount,
        results,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in backfill:", error);
    
    if (error.message?.includes('429')) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    if (error.message?.includes('402')) {
      return new Response(
        JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: error.message || "Failed to backfill images" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
