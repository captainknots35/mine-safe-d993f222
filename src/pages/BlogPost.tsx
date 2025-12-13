import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Calendar, Clock, Eye, ArrowLeft, Loader2 } from 'lucide-react';
import { useBlogPost, useAIPersona } from '@/hooks/useBlog';
import { AuthorBio } from '@/components/Blog/AuthorBio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPost(slug || '');
  const { data: author } = useAIPersona(post?.author_persona_id || null);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return <Navigate to="/blog" replace />;
  }

  const formattedDate = post.published_at 
    ? format(new Date(post.published_at), 'MMMM d, yyyy')
    : 'Draft';

  return (
    <>
      <Helmet>
        <title>{post.title} | MineSafe Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.seo_keywords?.join(', ')} />
        <link rel="canonical" href={`https://minesafetraining.com/blog/${post.slug}`} />
        
        {/* Open Graph - Required for LinkedIn */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://minesafetraining.com/blog/${post.slug}`} />
        <meta property="og:site_name" content="MineSafe Training" />
        <meta property="og:image" content={post.featured_image_url || 'https://minesafetraining.com/og-default.jpg'} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta property="og:image:alt" content={post.title} />
        
        {/* Twitter Card - Also used by LinkedIn */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.featured_image_url || 'https://minesafetraining.com/og-default.jpg'} />
        
        {/* Article specific */}
        <meta property="article:published_time" content={post.published_at || ''} />
        <meta property="article:section" content={post.category} />
        <meta property="article:author" content={author?.name || 'MineSafe Team'} />
        
        {/* JSON-LD Structured Data for Blog Post */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.featured_image_url || 'https://minesafetraining.com/og-default.jpg',
            "datePublished": post.published_at,
            "dateModified": post.updated_at || post.published_at,
            "author": {
              "@type": "Person",
              "name": author?.name || 'MineSafe Team'
            },
            "publisher": {
              "@type": "Organization",
              "name": "MineSafe",
              "logo": {
                "@type": "ImageObject",
                "url": "https://minesafetraining.com/og-default.jpg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://minesafetraining.com/blog/${post.slug}`
            },
            "articleSection": post.category,
            "keywords": post.seo_keywords?.join(', ') || '',
            "wordCount": post.content_html?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <div className="flex flex-col">
                  <span className="font-bold text-lg text-primary">MineSafe</span>
                  <span className="text-xs text-muted-foreground">Safety Blog</span>
                </div>
              </Link>
              <nav className="flex items-center gap-4">
                <Button variant="ghost" asChild>
                  <Link to="/">Home</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/blog">Blog</Link>
                </Button>
                <Button asChild>
                  <Link to="/courses">View Courses</Link>
                </Button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {post.featured_image_url && (
          <div className="relative h-64 md:h-96 overflow-hidden">
            <img 
              src={post.featured_image_url} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        {/* Article */}
        <article className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Link */}
          <Button variant="ghost" asChild className="mb-6 -ml-2">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.reading_time_minutes} min read
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {post.view_count} views
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-foreground/90 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-foreground/90
              prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r
              prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:rounded
              prose-pre:bg-muted prose-pre:border
              [&_.safety-alert]:bg-destructive/10 [&_.safety-alert]:border-l-4 [&_.safety-alert]:border-destructive [&_.safety-alert]:p-4 [&_.safety-alert]:rounded-r [&_.safety-alert]:my-4
              [&_.tip-box]:bg-primary/10 [&_.tip-box]:border-l-4 [&_.tip-box]:border-primary [&_.tip-box]:p-4 [&_.tip-box]:rounded-r [&_.tip-box]:my-4
            "
            dangerouslySetInnerHTML={{ __html: post.content_html }}
          />

          {/* Disclaimer */}
          <div className="mt-12 p-4 bg-muted/50 border rounded-lg text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This article is for informational purposes and does not 
            constitute legal advice. Always refer to the official 30 CFR regulations found at{' '}
            <a 
              href="https://www.msha.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              msha.gov
            </a>.
          </div>

          {/* Author Bio */}
          <AuthorBio author={author || null} />

          {/* CTA */}
          <div className="mt-12 p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 text-center">
            <h3 className="text-xl font-semibold mb-2">Ready to Get Certified?</h3>
            <p className="text-muted-foreground mb-4">
              Take our comprehensive MSHA Part 46 training course and ensure your team is compliant.
            </p>
            <Button size="lg" asChild>
              <Link to="/courses">View Training Courses</Link>
            </Button>
          </div>
        </article>

        {/* Footer */}
        <footer className="border-t bg-muted/30 py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <Link to="/" className="flex items-center gap-2 mb-4 md:mb-0">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <span className="font-semibold">MineSafe</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} MineSafe. MSHA compliant training platform.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
