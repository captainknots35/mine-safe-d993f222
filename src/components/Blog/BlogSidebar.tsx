import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { BLOG_CATEGORIES } from '@/types/blog';

interface BlogSidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function BlogSidebar({ 
  selectedCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange 
}: BlogSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Search */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button
            variant={selectedCategory === 'All' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => onCategoryChange('All')}
          >
            All Posts
          </Button>
          {BLOG_CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => onCategoryChange(category)}
            >
              {category}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* CTA Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2">Need MSHA Training?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get certified with our comprehensive Part 46 training program.
          </p>
          <Button className="w-full" asChild>
            <a href="/courses">View Courses</a>
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
