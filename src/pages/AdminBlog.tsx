import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { 
  ShieldCheck, Loader2, Plus, Trash2, Eye, Edit, 
  RefreshCw, FileText, Clock, CheckCircle, XCircle, ImagePlus,
  HardHat, Scale, TrendingUp, Newspaper, Cpu, AlertTriangle, Skull, DollarSign
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { 
  useAdminBlogPosts, 
  useUpdatePostStatus, 
  useDeletePost,
  useGenerateBlogPost 
} from '@/hooks/useBlog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-muted text-muted-foreground',
  review: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
  scheduled: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  published: 'bg-green-500/20 text-green-700 dark:text-green-400',
};

const PERSONA_COLORS: Record<string, string> = {
  toolbox_talk: 'bg-orange-500/20 text-orange-700',
  compliance: 'bg-blue-500/20 text-blue-700',
  market_analysis: 'bg-purple-500/20 text-purple-700',
  technology: 'bg-cyan-500/20 text-cyan-700',
  emergency: 'bg-red-500/20 text-red-700',
};

export default function AdminBlog() {
  const { user, userRole, loading: authLoading } = useAuth();
  const { data: posts, isLoading, refetch } = useAdminBlogPosts();
  const updateStatus = useUpdatePostStatus();
  const deletePost = useDeletePost();
  const generatePost = useGenerateBlogPost();
  const { toast } = useToast();
  const [generating, setGenerating] = useState(false);
  const [backfilling, setBackfilling] = useState(false);
  const [fetchingFedReg, setFetchingFedReg] = useState(false);

  // Auth check
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <ShieldCheck className="h-6 w-6" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You don't have permission to access the blog admin panel. This area is restricted to administrators only.
            </p>
            <div className="flex gap-2">
              <Button asChild>
                <Link to="/my-courses">Go to My Courses</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/blog">View Blog</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleStatusChange = async (postId: string, status: string) => {
    try {
      await updateStatus.mutateAsync({ postId, status });
      toast({ title: 'Status updated', description: `Post status changed to ${status}` });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      await deletePost.mutateAsync(postId);
      toast({ title: 'Post deleted', description: 'The post has been removed' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete post', variant: 'destructive' });
    }
  };

  const handleGeneratePost = async (cluster?: string) => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-post', {
        body: cluster ? { cluster } : {}
      });
      if (error) throw error;
      toast({ 
        title: 'Post generated!', 
        description: `Created: ${data.post?.title || 'New post'} (${data.post?.persona || 'auto'})` 
      });
      refetch();
    } catch (error: any) {
      toast({ 
        title: 'Generation failed', 
        description: error.message || 'Failed to generate post', 
        variant: 'destructive' 
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleFetchFederalRegister = async () => {
    setFetchingFedReg(true);
    try {
      const { data, error } = await supabase.functions.invoke('fetch-federal-register');
      if (error) throw error;
      toast({ 
        title: 'Federal Register fetched!', 
        description: `Found ${data.new_documents} new docs, triggered ${data.potential_blogs || 0} blogs` 
      });
      refetch();
    } catch (error: any) {
      toast({ 
        title: 'Fetch failed', 
        description: error.message || 'Failed to fetch Federal Register', 
        variant: 'destructive' 
      });
    } finally {
      setFetchingFedReg(false);
    }
  };

  const handleFetchFatalities = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-msha-fatalities');
      if (error) throw error;
      toast({ 
        title: 'MSHA Fatalities fetched!', 
        description: `${data.new_records || 0} new records from ${data.source}` 
      });
      refetch();
    } catch (error: any) {
      toast({ 
        title: 'Fetch failed', 
        description: error.message || 'Failed to fetch MSHA fatalities', 
        variant: 'destructive' 
      });
    }
  };

  const handleFetchMarketData = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-market-data');
      if (error) throw error;
      toast({ 
        title: 'Market data fetched!', 
        description: `${data.commodities} commodities, ${data.signals?.length || 0} signals${data.triggered_content ? ' (triggered content)' : ''}` 
      });
      refetch();
    } catch (error: any) {
      toast({ 
        title: 'Fetch failed', 
        description: error.message || 'Failed to fetch market data', 
        variant: 'destructive' 
      });
    }
  };

  const handleBackfillImages = async () => {
    setBackfilling(true);
    try {
      const { data, error } = await supabase.functions.invoke('backfill-blog-images', {
        body: { limit: 5 }
      });
      
      if (error) throw error;
      
      toast({ 
        title: 'Backfill complete!', 
        description: `${data.successful}/${data.processed} posts updated with images` 
      });
      refetch();
    } catch (error: any) {
      toast({ 
        title: 'Backfill failed', 
        description: error.message || 'Failed to backfill images', 
        variant: 'destructive' 
      });
    } finally {
      setBackfilling(false);
    }
  };

  const postsWithoutImages = posts?.filter(p => !p.featured_image_url).length || 0;

  const stats = {
    total: posts?.length || 0,
    published: posts?.filter(p => p.status === 'published').length || 0,
    draft: posts?.filter(p => p.status === 'draft').length || 0,
    views: posts?.reduce((sum, p) => sum + (p.view_count || 0), 0) || 0,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-primary">MineSafe</span>
                <span className="text-xs text-muted-foreground">Blog Admin</span>
              </div>
            </Link>
            <nav className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/blog">View Blog</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-muted-foreground">Manage AI-generated content and publications</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={fetchingFedReg}>
                  {fetchingFedReg ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Newspaper className="h-4 w-4 mr-2" />}
                  Data Pipelines
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Fetch External Data</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleFetchFederalRegister}>
                  <Scale className="h-4 w-4 mr-2" />
                  Federal Register (Regulations)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleFetchFatalities}>
                  <Skull className="h-4 w-4 mr-2" />
                  MSHA Fatalities
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleFetchMarketData}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Market Data (Commodities)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {postsWithoutImages > 0 && (
              <Button variant="outline" onClick={handleBackfillImages} disabled={backfilling}>
                {backfilling ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <ImagePlus className="h-4 w-4 mr-2" />}
                Add Images ({postsWithoutImages})
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={generating}>
                  {generating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                  Generate Post
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Select Persona</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleGeneratePost()}>
                  <Clock className="h-4 w-4 mr-2" />
                  Auto (Time-Based)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleGeneratePost('hazard')}>
                  <HardHat className="h-4 w-4 mr-2" />
                  Big Mike (Toolbox Talk)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleGeneratePost('compliance')}>
                  <Scale className="h-4 w-4 mr-2" />
                  Dr. Chen (Compliance)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleGeneratePost('market')}>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Marcus Webb (Market)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleGeneratePost('technology')}>
                  <Cpu className="h-4 w-4 mr-2" />
                  Jake Rodriguez (Technology)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleGeneratePost('emergency')}>
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Capt. Mitchell (Emergency)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{stats.total}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Published
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-2xl font-bold">{stats.published}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Drafts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span className="text-2xl font-bold">{stats.draft}</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-500" />
                <span className="text-2xl font-bold">{stats.views.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : posts?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No posts yet. Click "Generate Post" to create your first article.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Persona</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Accuracy</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts?.map((post: any) => (
                    <TableRow key={post.id} className={post.requires_review ? 'bg-yellow-500/5' : ''}>
                      <TableCell className="font-medium max-w-xs">
                        <div className="flex items-center gap-2">
                          {post.requires_review && (
                            <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                          )}
                          <span className="truncate">{post.title}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {post.persona_used ? (
                          <Badge className={PERSONA_COLORS[post.content_type] || 'bg-muted'}>
                            {post.persona_used?.split(' ')[0] || '-'}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground text-xs">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Select
                          value={post.status}
                          onValueChange={(value) => handleStatusChange(post.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue>
                              <Badge className={STATUS_COLORS[post.status]}>
                                {post.status}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="review">Review</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1 text-xs">
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground w-8">All:</span>
                            <Badge variant={post.confidence_score >= 85 ? 'default' : post.confidence_score >= 70 ? 'secondary' : 'destructive'} className="text-xs">
                              {post.confidence_score ?? '-'}%
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground w-8">Reg:</span>
                            <span className={post.regulatory_accuracy >= 85 ? 'text-green-600' : post.regulatory_accuracy >= 70 ? 'text-yellow-600' : 'text-red-600'}>
                              {post.regulatory_accuracy ?? '-'}%
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground w-8">Safe:</span>
                            <span className={post.safety_accuracy >= 85 ? 'text-green-600' : post.safety_accuracy >= 70 ? 'text-yellow-600' : 'text-red-600'}>
                              {post.safety_accuracy ?? '-'}%
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{post.view_count}</TableCell>
                      <TableCell>
                        {format(new Date(post.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" asChild>
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the blog post.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(post.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
