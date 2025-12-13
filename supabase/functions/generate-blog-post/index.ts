import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { decode as base64Decode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Mining industry keywords organized by cluster
const KEYWORD_CLUSTERS = {
  compliance: [
    "MSHA Part 46 training requirements",
    "Part 48 surface mining regulations",
    "New miner training checklist",
    "Task training documentation",
    "Competent person designation",
    "MSHA 5000-23 form guide",
    "Annual refresher training requirements",
    "Independent contractor MSHA compliance",
    "Training plan template Part 46",
    "Site-specific hazard training",
  ],
  hazard: [
    "Highwall safety procedures",
    "Haul road maintenance standards",
    "Lockout tagout mining equipment",
    "Silica dust exposure limits",
    "Ground control mining safety",
    "Mobile equipment blind spots",
    "Electrical safety underground mines",
    "Respirable dust monitoring",
    "Slope stability assessment",
    "Blasting safety distance requirements",
  ],
  news: [
    "Latest MSHA enforcement actions",
    "Mining industry safety statistics",
    "New MSHA regulations 2024",
    "Fatal mining accident analysis",
    "MSHA inspection trends",
    "Mining technology safety innovations",
    "PPE standards updates mining",
    "Mine rescue team requirements",
    "MSHA penalty assessment changes",
    "Autonomous mining equipment regulations",
  ],
};

// Personas for content variety
const PERSONAS = [
  {
    name: "Jack Morrison",
    bio: "25 years in surface mining operations. Former MSHA inspector turned safety director.",
    systemPrompt: `You are Jack Morrison, a veteran Mine Safety Director with 25 years of experience in surface mining operations. You previously worked as an MSHA inspector.

TONE RULES:
1. Direct & Authoritative: Use the imperative mood. (e.g., 'Check the hydraulic hoses' instead of 'It is suggested that you check...')
2. No Fluff: Never use introductory filler. Start immediately with the hazard or regulation.
3. Jargon: Use terms like 'highwall', 'spoil pile', 'muck', 'tramming', 'Lockout/Tagout', 'MSHA inspector'.
4. Structure: Use short, punchy sentences mixed with longer technical explanations.
5. Prohibited Phrases: NEVER use 'In the dynamic world of mining', 'delve into', 'unlocked', 'game-changer', 'In conclusion', 'It is important to note'.

Write from the perspective of someone who knows that safety regulations are written in blood but are also a paperwork headache for the operator. Be empathetic to the operational burden while being uncompromising on safety.`,
  },
  {
    name: "Sarah Chen",
    bio: "Mining engineer specializing in regulatory compliance. 15 years helping operations stay MSHA-ready.",
    systemPrompt: `You are Sarah Chen, a Mining Engineer specializing in MSHA regulatory compliance with 15 years of experience helping mining operations stay compliant.

TONE RULES:
1. Technically precise but accessible: Explain complex regulations in practical terms.
2. Solution-oriented: Always provide actionable steps operators can take.
3. Use proper regulatory citations: Reference specific 30 CFR sections when relevant.
4. Structure content with clear headers and bullet points for easy scanning.
5. Prohibited Phrases: NEVER use 'In the dynamic world of mining', 'delve into', 'unlocked', 'game-changer', 'In conclusion', 'It is important to note'.

Your goal is to help operators understand what MSHA expects and how to document compliance properly. Focus on practical implementation over theory.`,
  },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim()
    .substring(0, 60);
}

function selectRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
}

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
    // Extract base64 data from data URL
    const matches = base64DataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) {
      console.error("Invalid base64 data URL format");
      return null;
    }

    const imageType = matches[1];
    const base64Data = matches[2];
    const imageBytes = base64Decode(base64Data);
    
    const fileName = `blog-images/${slug}.${imageType}`;

    // Check if bucket exists, create if not
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((b: any) => b.name === 'blog-images');
    
    if (!bucketExists) {
      console.log("Creating blog-images bucket...");
      const { error: bucketError } = await supabase.storage.createBucket('blog-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
      });
      if (bucketError) {
        console.error("Error creating bucket:", bucketError);
        return null;
      }
    }

    // Upload the image
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, imageBytes, {
        contentType: `image/${imageType}`,
        upsert: true,
      });

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return null;
    }

    // Get public URL
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

    // Select random cluster and keyword
    const clusters = Object.keys(KEYWORD_CLUSTERS) as Array<keyof typeof KEYWORD_CLUSTERS>;
    const selectedCluster = selectRandomItem(clusters);
    const selectedKeyword = selectRandomItem(KEYWORD_CLUSTERS[selectedCluster]);
    const selectedPersona = selectRandomItem(PERSONAS);

    console.log(`Generating post for keyword: "${selectedKeyword}" in cluster: ${selectedCluster}`);

    // AGENT A: The Strategist - Generate outline
    const outlineResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a content strategist for mining safety content. Create detailed article outlines targeting mine operators and safety managers.

Generate a unique angle for the topic that hasn't been overdone. Focus on:
- Specific regulatory requirements (30 CFR citations)
- Real operational challenges
- Practical implementation steps

Output a JSON object with:
- title: SEO-optimized title (50-60 chars)
- angle: The unique perspective (1-2 sentences)
- outline: Array of H2 sections, each with H3 subsections
- seo_keywords: Array of 5-8 related keywords`,
          },
          {
            role: "user",
            content: `Create an article outline for the topic: "${selectedKeyword}"

Make it practical and actionable for mine operators. The target audience is safety managers at small to medium surface mining operations.`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!outlineResponse.ok) {
      const errorText = await outlineResponse.text();
      console.error("Outline generation failed:", errorText);
      throw new Error(`Outline generation failed: ${outlineResponse.status}`);
    }

    const outlineData = await outlineResponse.json();
    const outlineContent = JSON.parse(outlineData.choices[0].message.content);
    
    console.log("Generated outline:", outlineContent.title);

    // AGENT B: The Writer - Generate content
    const writerResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: selectedPersona.systemPrompt,
          },
          {
            role: "user",
            content: `Write a comprehensive blog article based on this outline:

Title: ${outlineContent.title}
Angle: ${outlineContent.angle}
Outline: ${JSON.stringify(outlineContent.outline)}

Requirements:
- Write 1200-1500 words
- Use semantic HTML (h2, h3, p, ul, li, strong, blockquote)
- Include specific 30 CFR regulatory citations where relevant
- Add one "safety-alert" div for critical warnings: <div class="safety-alert">Warning content</div>
- Add one "tip-box" div for practical tips: <div class="tip-box">Tip content</div>
- NO introduction paragraphs - start directly with useful content
- Include 2-3 real-world examples of equipment failures or safety incidents
- End with actionable next steps, not a generic conclusion

Output only the HTML content, no markdown code blocks.`,
          },
        ],
      }),
    });

    if (!writerResponse.ok) {
      const errorText = await writerResponse.text();
      console.error("Writer generation failed:", errorText);
      throw new Error(`Writer generation failed: ${writerResponse.status}`);
    }

    const writerData = await writerResponse.json();
    let rawContent = writerData.choices[0].message.content;
    
    // Clean up any markdown artifacts
    rawContent = rawContent.replace(/```html\n?/g, '').replace(/```\n?/g, '');

    console.log("Generated content length:", rawContent.length);

    // AGENT C: The Editor - Humanize and polish
    const editorResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an editor who humanizes AI-generated content for mining industry professionals.

Your task:
1. Increase sentence variety (mix short punchy sentences with longer explanations)
2. Remove any AI-sounding phrases: "In conclusion", "It is important to note", "In the dynamic world", "delve into", "unlocked", "game-changer", "crucial", "landscape"
3. Add more specific operational details and numbers where appropriate
4. Ensure the tone is direct, authoritative, and slightly gritty
5. Keep all HTML structure intact
6. Fix any formatting issues

Output only the polished HTML content.`,
          },
          {
            role: "user",
            content: `Edit and humanize this mining safety article:\n\n${rawContent}`,
          },
        ],
      }),
    });

    if (!editorResponse.ok) {
      const errorText = await editorResponse.text();
      console.error("Editor generation failed:", errorText);
      throw new Error(`Editor generation failed: ${editorResponse.status}`);
    }

    const editorData = await editorResponse.json();
    let finalContent = editorData.choices[0].message.content;
    
    // Clean up any markdown artifacts
    finalContent = finalContent.replace(/```html\n?/g, '').replace(/```\n?/g, '');

    // Generate excerpt
    const plainText = finalContent.replace(/<[^>]*>/g, '');
    const excerpt = plainText.substring(0, 155).trim() + '...';

    // Create slug
    const slug = slugify(outlineContent.title) + '-' + Date.now().toString(36);

    // Calculate reading time
    const readingTime = estimateReadingTime(finalContent);

    // Map category
    const categoryMap: Record<string, string> = {
      compliance: 'Part 46',
      hazard: 'Safety Alerts',
      news: 'News',
    };

    const category = categoryMap[selectedCluster] || 'Part 46';

    // AGENT D: Generate featured image
    console.log("Starting featured image generation...");
    let featuredImageUrl: string | null = null;
    
    const base64Image = await generateFeaturedImage(outlineContent.title, category, LOVABLE_API_KEY);
    
    if (base64Image) {
      featuredImageUrl = await uploadImageToStorage(supabase, base64Image, slug);
    }
    
    if (featuredImageUrl) {
      console.log("Featured image uploaded:", featuredImageUrl);
    } else {
      console.log("Using default featured image");
      featuredImageUrl = "https://minesafetraining.com/og-default.jpg";
    }

    // Insert into database
    const { data: post, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: outlineContent.title,
        slug,
        content_html: finalContent,
        excerpt,
        seo_keywords: outlineContent.seo_keywords || [],
        category,
        status: 'draft',
        reading_time_minutes: readingTime,
        featured_image_url: featuredImageUrl,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw new Error(`Failed to save post: ${insertError.message}`);
    }

    console.log("Post created successfully:", post.id);

    return new Response(
      JSON.stringify({
        success: true,
        post: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          featured_image_url: post.featured_image_url,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating blog post:", error);
    
    // Handle rate limits
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
      JSON.stringify({ error: error.message || "Failed to generate blog post" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
