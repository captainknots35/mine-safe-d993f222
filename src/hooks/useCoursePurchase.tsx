import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useCoursePurchase = (courseId: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['course-purchase', courseId, user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('course_purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .eq('status', 'completed')
        .maybeSingle();

      if (error) {
        console.error('Error fetching purchase:', error);
        return null;
      }

      return data;
    },
    enabled: !!user && !!courseId,
  });
};

export const useCreateCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ courseId, successUrl, cancelUrl }: { 
      courseId: string; 
      successUrl?: string;
      cancelUrl?: string;
    }) => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('You must be logged in to purchase a course');
      }

      const response = await supabase.functions.invoke('create-checkout', {
        body: { courseId, successUrl, cancelUrl },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to create checkout');
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-purchase'] });
    },
  });
};

export const useHasPurchasedCourse = (courseId: string) => {
  const { data: purchase, isLoading } = useCoursePurchase(courseId);
  
  return {
    hasPurchased: !!purchase,
    isLoading,
    purchase,
  };
};
