import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Eye } from 'lucide-react';
import { BlogPost } from '@/types/blog';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

function LazyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`bg-gradient-to-br from-primary/10 to-muted flex items-center justify-center ${className}`}>
        <span className="text-4xl opacity-30">⛏️</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <img 
        src={src} 
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = post.published_at 
    ? format(new Date(post.published_at), 'MMM d, yyyy')
    : 'Draft';

  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="block group">
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-background to-muted hover:shadow-xl transition-all duration-300">
          <div className="relative h-64 md:h-80 overflow-hidden">
            {post.featured_image_url ? (
              <LazyImage 
                src={post.featured_image_url} 
                alt={post.title}
                className="w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <span className="text-6xl opacity-20">⛏️</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <Badge variant="secondary" className="mb-3">{post.category}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
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
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="block group h-full">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-primary/50">
        <div className="relative h-48 overflow-hidden">
          {post.featured_image_url ? (
            <LazyImage 
              src={post.featured_image_url} 
              alt={post.title}
              className="w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-muted flex items-center justify-center">
              <span className="text-4xl opacity-30">⛏️</span>
            </div>
          )}
          <Badge className="absolute top-3 left-3 z-10" variant="secondary">
            {post.category}
          </Badge>
        </div>
        <CardHeader className="pb-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.reading_time_minutes} min
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
