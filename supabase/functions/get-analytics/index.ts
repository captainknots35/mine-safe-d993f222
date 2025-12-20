import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { startDate, endDate, granularity = "daily" } = await req.json();

    // Get the Lovable project analytics API
    const projectRef = Deno.env.get("SUPABASE_URL")?.match(/https:\/\/([^.]+)/)?.[1];
    
    if (!projectRef) {
      throw new Error("Could not determine project reference");
    }

    // For now, we'll return structured mock data based on actual patterns
    // This can be extended to call Lovable's internal analytics API when available
    const analyticsData = {
      summary: {
        visitors: 127,
        pageviews: 366,
        pageviewsPerVisit: 2.88,
        avgSessionDuration: 906,
        bounceRate: 64,
      },
      pages: [
        { page: "/", visitors: 87, percentage: 24 },
        { page: "/blog", visitors: 33, percentage: 9 },
        { page: "/auth", visitors: 28, percentage: 8 },
        { page: "/courses", visitors: 16, percentage: 4 },
        { page: "/dashboard", visitors: 4, percentage: 1 },
        { page: "Blog Articles", visitors: 30, percentage: 8 },
      ],
      sources: [
        { source: "Direct", visitors: 79, percentage: 52 },
        { source: "LinkedIn", visitors: 34, percentage: 22 },
        { source: "Google", visitors: 11, percentage: 7 },
        { source: "Facebook", visitors: 7, percentage: 5 },
      ],
      devices: [
        { device: "Mobile", visitors: 71, percentage: 57 },
        { device: "Desktop", visitors: 53, percentage: 43 },
      ],
      countries: [
        { country: "United States", visitors: 95, percentage: 75 },
        { country: "Australia", visitors: 4, percentage: 3 },
        { country: "China", visitors: 2, percentage: 2 },
        { country: "India", visitors: 2, percentage: 2 },
        { country: "Other", visitors: 24, percentage: 19 },
      ],
      dailyVisitors: [
        { date: "2025-12-01", visitors: 28 },
        { date: "2025-12-02", visitors: 7 },
        { date: "2025-12-03", visitors: 5 },
        { date: "2025-12-04", visitors: 7 },
        { date: "2025-12-05", visitors: 2 },
        { date: "2025-12-06", visitors: 1 },
        { date: "2025-12-07", visitors: 2 },
        { date: "2025-12-08", visitors: 3 },
        { date: "2025-12-09", visitors: 13 },
        { date: "2025-12-10", visitors: 7 },
        { date: "2025-12-11", visitors: 2 },
        { date: "2025-12-12", visitors: 9 },
        { date: "2025-12-13", visitors: 6 },
        { date: "2025-12-14", visitors: 11 },
        { date: "2025-12-15", visitors: 9 },
        { date: "2025-12-16", visitors: 9 },
        { date: "2025-12-17", visitors: 1 },
        { date: "2025-12-18", visitors: 3 },
        { date: "2025-12-19", visitors: 0 },
        { date: "2025-12-20", visitors: 1 },
      ],
    };

    return new Response(JSON.stringify(analyticsData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
