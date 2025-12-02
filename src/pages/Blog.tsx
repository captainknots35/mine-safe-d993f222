import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Loader2 } from 'lucide-react';
import { useBlogPosts } from '@/hooks/useBlog';
import { BlogCard } from '@/components/Blog/BlogCard';
import { BlogSidebar } from '@/components/Blog/BlogSidebar';
import { Button } from '@/components/ui/button';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: posts, isLoading, error } = useBlogPosts(selectedCategory);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (!searchQuery.trim()) return posts;
    
    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.seo_keywords?.some((kw) => kw.toLowerCase().includes(query))
    );
  }, [posts, searchQuery]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <>
      <Helmet>
        <title>Mining Safety Blog | MineSafe - MSHA Compliance & Training Insights</title>
        <meta 
          name="description" 
          content="Expert mining safety insights, MSHA Part 46 & Part 48 compliance guides, and industry best practices from seasoned safety professionals." 
        />
        <meta name="keywords" content="MSHA training, mining safety, Part 46, Part 48, mine safety compliance, safety blog" />
        <link rel="canonical" href="https://minesafe.com/blog" />
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
                  <Link to="/courses">Courses</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-muted/30 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Mining Safety <span className="text-primary">Insights</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Expert guidance on MSHA compliance, hazard recognition, and industry best practices 
                from seasoned mining safety professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Posts Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-destructive">Failed to load posts. Please try again.</p>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No posts found. Check back soon!</p>
                </div>
              ) : (
                <>
                  {/* Featured Post */}
                  {featuredPost && (
                    <div className="mb-8">
                      <BlogCard post={featuredPost} featured />
                    </div>
                  )}

                  {/* Grid of remaining posts */}
                  {remainingPosts.length > 0 && (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {remainingPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-80">
              <BlogSidebar
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/30 py-8">
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
