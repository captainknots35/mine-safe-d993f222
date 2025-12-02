import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BlogPost, AIPersona, KeywordBank } from '@/types/blog';

// Fetch all published blog posts
export function useBlogPosts(category?: string) {
  return useQuery({
    queryKey: ['blog-posts', category],
    queryFn: async () => {
      let query = supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (category && category !== 'All') {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

// Fetch single blog post by slug
export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      
      // Increment view count
      await supabase
        .from('blog_posts')
        .update({ view_count: (data.view_count || 0) + 1 })
        .eq('id', data.id);

      return data as BlogPost;
    },
    enabled: !!slug,
  });
}

// Fetch AI persona
export function useAIPersona(personaId: string | null) {
  return useQuery({
    queryKey: ['ai-persona', personaId],
    queryFn: async () => {
      if (!personaId) return null;
      const { data, error } = await supabase
        .from('ai_personas')
        .select('*')
        .eq('id', personaId)
        .single();

      if (error) throw error;
      return data as AIPersona;
    },
    enabled: !!personaId,
  });
}

// Admin: Fetch all posts (any status)
export function useAdminBlogPosts() {
  return useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

// Admin: Fetch all personas
export function useAdminPersonas() {
  return useQuery({
    queryKey: ['admin-personas'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_personas')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as AIPersona[];
    },
  });
}

// Admin: Fetch keyword bank
export function useKeywordBank() {
  return useQuery({
    queryKey: ['keyword-bank'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('keyword_bank')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as KeywordBank[];
    },
  });
}

// Admin: Update post status
export function useUpdatePostStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, status }: { postId: string; status: string }) => {
      const updates: any = { status };
      if (status === 'published') {
        updates.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .update(updates)
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

// Admin: Delete post
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: string) => {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
    },
  });
}

// Trigger AI content generation
export function useGenerateBlogPost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('generate-blog-post');
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
    },
  });
}
