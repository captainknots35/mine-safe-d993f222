import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { useCourses } from '@/hooks/useCourses';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { DollarSign, Save, Loader2, Check } from 'lucide-react';

interface CoursePriceEdit {
  courseId: string;
  newPrice: string;
  isSaving: boolean;
  isSaved: boolean;
}

export const CoursePricingManager = () => {
  const { data: courses, isLoading } = useCourses();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [priceEdits, setPriceEdits] = useState<Record<string, CoursePriceEdit>>({});

  const formatPrice = (cents: number) => {
    return (cents / 100).toFixed(2);
  };

  const parsePriceToCents = (priceString: string): number => {
    const cleaned = priceString.replace(/[^0-9.]/g, '');
    const dollars = parseFloat(cleaned);
    if (isNaN(dollars)) return 0;
    return Math.round(dollars * 100);
  };

  const handlePriceChange = (courseId: string, value: string) => {
    setPriceEdits(prev => ({
      ...prev,
      [courseId]: {
        courseId,
        newPrice: value,
        isSaving: false,
        isSaved: false,
      }
    }));
  };

  const handleSavePrice = async (courseId: string, currentPriceCents: number) => {
    const edit = priceEdits[courseId];
    if (!edit) return;

    const newPriceCents = parsePriceToCents(edit.newPrice);
    
    if (newPriceCents === currentPriceCents) {
      toast({
        title: "No changes",
        description: "The price is the same as before.",
      });
      return;
    }

    if (newPriceCents < 0) {
      toast({
        title: "Invalid price",
        description: "Price cannot be negative.",
        variant: "destructive",
      });
      return;
    }

    setPriceEdits(prev => ({
      ...prev,
      [courseId]: { ...prev[courseId], isSaving: true }
    }));

    try {
      const { error } = await supabase
        .from('courses')
        .update({ price_cents: newPriceCents })
        .eq('id', courseId);

      if (error) throw error;

      // Refresh courses data
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });

      setPriceEdits(prev => ({
        ...prev,
        [courseId]: { ...prev[courseId], isSaving: false, isSaved: true }
      }));

      // Clear saved status after 2 seconds
      setTimeout(() => {
        setPriceEdits(prev => {
          const updated = { ...prev };
          delete updated[courseId];
          return updated;
        });
      }, 2000);

      toast({
        title: "Price updated",
        description: `Course price updated to $${formatPrice(newPriceCents)}`,
      });
    } catch (error: any) {
      console.error('Price update error:', error);
      setPriceEdits(prev => ({
        ...prev,
        [courseId]: { ...prev[courseId], isSaving: false }
      }));
      toast({
        title: "Update failed",
        description: error.message || "Failed to update price",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Course Pricing
          </CardTitle>
          <CardDescription>Manage course prices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-primary" />
          Course Pricing
        </CardTitle>
        <CardDescription>
          Update course prices. Changes take effect immediately for new purchases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses?.map((course) => {
            const edit = priceEdits[course.id];
            const currentPrice = formatPrice(course.price_cents || 0);
            const displayPrice = edit?.newPrice ?? currentPrice;
            const hasChanges = edit && parsePriceToCents(edit.newPrice) !== course.price_cents;

            return (
              <div
                key={course.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border bg-card"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge 
                      variant="secondary" 
                      className={course.type === 'Part 46' ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'}
                    >
                      {course.type}
                    </Badge>
                  </div>
                  <h4 className="font-medium truncate">{course.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {course.duration_hours} hours • Current: ${currentPrice}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </span>
                    <Input
                      type="text"
                      value={displayPrice}
                      onChange={(e) => handlePriceChange(course.id, e.target.value)}
                      className="w-28 pl-7 text-right"
                      placeholder="0.00"
                    />
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleSavePrice(course.id, course.price_cents || 0)}
                    disabled={!hasChanges || edit?.isSaving}
                    variant={edit?.isSaved ? "success" : "default"}
                  >
                    {edit?.isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : edit?.isSaved ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {(!courses || courses.length === 0) && (
          <div className="text-center py-8 text-muted-foreground">
            No courses found
          </div>
        )}
      </CardContent>
    </Card>
  );
};
