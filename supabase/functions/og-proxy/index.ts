import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Missing slug parameter' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch blog post by slug
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('title, excerpt, featured_image_url, published_at, category, slug')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error || !post) {
      console.error('Post not found:', slug, error);
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch author persona if needed
    const { data: postWithAuthor } = await supabase
      .from('blog_posts')
      .select('author_persona_id')
      .eq('slug', slug)
      .single();

    let authorName = 'MineSafe Team';
    if (postWithAuthor?.author_persona_id) {
      const { data: author } = await supabase
        .from('ai_personas')
        .select('name')
        .eq('id', postWithAuthor.author_persona_id)
        .single();
      if (author) authorName = author.name;
    }

    const baseUrl = 'https://minesafetraining.com';
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const imageUrl = post.featured_image_url || `${baseUrl}/og-default.jpg`;

    // Generate HTML with proper OG tags for social media crawlers
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(post.title)} | MineSafe Blog</title>
  <meta name="description" content="${escapeHtml(post.excerpt)}">
  
  <!-- Open Graph - Required for LinkedIn -->
  <meta property="og:title" content="${escapeHtml(post.title)}">
  <meta property="og:description" content="${escapeHtml(post.excerpt)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${postUrl}">
  <meta property="og:site_name" content="MineSafe Training">
  <meta property="og:image" content="${imageUrl}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="627">
  <meta property="og:image:alt" content="${escapeHtml(post.title)}">
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(post.title)}">
  <meta name="twitter:description" content="${escapeHtml(post.excerpt)}">
  <meta name="twitter:image" content="${imageUrl}">
  
  <!-- Article specific -->
  <meta property="article:published_time" content="${post.published_at || ''}">
  <meta property="article:section" content="${escapeHtml(post.category)}">
  <meta property="article:author" content="${escapeHtml(authorName)}">
  
  <!-- Redirect to actual page for browsers -->
  <meta http-equiv="refresh" content="0;url=${postUrl}">
  <link rel="canonical" href="${postUrl}">
</head>
<body>
  <p>Redirecting to <a href="${postUrl}">${escapeHtml(post.title)}</a>...</p>
</body>
</html>`;

    return new Response(html, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('OG proxy error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
