import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const authHeader = req.headers.get("Authorization")!;
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      console.error("Auth error:", userError);
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 401,
      });
    }

    const { courseId, successUrl, cancelUrl } = await req.json();
    console.log("Creating checkout for course:", courseId, "user:", user.id);

    if (!courseId) {
      return new Response(JSON.stringify({ error: "Course ID is required" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Get course details
    const { data: course, error: courseError } = await supabaseClient
      .from("courses")
      .select("id, title, description")
      .eq("id", courseId)
      .single();

    if (courseError || !course) {
      console.error("Course fetch error:", courseError);
      return new Response(JSON.stringify({ error: "Course not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    }

    // Check if already purchased
    const { data: existingPurchase } = await supabaseClient
      .from("course_purchases")
      .select("id, status")
      .eq("user_id", user.id)
      .eq("course_id", courseId)
      .eq("status", "completed")
      .maybeSingle();

    if (existingPurchase) {
      return new Response(JSON.stringify({ error: "Course already purchased" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY") || "";
    
    // Check if customer exists
    const customersRes = await fetch(
      `https://api.stripe.com/v1/customers?email=${encodeURIComponent(user.email!)}&limit=1`,
      {
        headers: { Authorization: `Bearer ${stripeKey}` },
      }
    );
    const customersData = await customersRes.json();
    
    let customerId: string;

    if (customersData.data && customersData.data.length > 0) {
      customerId = customersData.data[0].id;
    } else {
      // Create customer
      const createRes = await fetch("https://api.stripe.com/v1/customers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          email: user.email!,
          "metadata[supabase_user_id]": user.id,
        }),
      });
      const customerData = await createRes.json();
      customerId = customerData.id;
    }

    console.log("Creating Stripe checkout session for customer:", customerId);

    // Create checkout session - $108 = 10800 cents
    const origin = req.headers.get("origin") || "https://yqpqfjmyghoehxzuevrz.lovableproject.com";
    
    const sessionRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        customer: customerId,
        "line_items[0][price_data][currency]": "usd",
        "line_items[0][price_data][product_data][name]": course.title,
        "line_items[0][price_data][product_data][description]": course.description || "MSHA Part 46 New Miner Training",
        "line_items[0][price_data][unit_amount]": "10800",
        "line_items[0][quantity]": "1",
        mode: "payment",
        success_url: successUrl || `${origin}/dashboard?payment=success`,
        cancel_url: cancelUrl || `${origin}/courses?payment=cancelled`,
        "metadata[user_id]": user.id,
        "metadata[course_id]": courseId,
      }),
    });
    
    const session = await sessionRes.json();
    
    if (session.error) {
      console.error("Stripe error:", session.error);
      return new Response(JSON.stringify({ error: session.error.message }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    console.log("Checkout session created:", session.id);

    // Create pending purchase record
    const { error: purchaseError } = await supabaseClient
      .from("course_purchases")
      .upsert({
        user_id: user.id,
        course_id: courseId,
        stripe_session_id: session.id,
        amount_cents: 10800,
        currency: "usd",
        status: "pending",
      }, { onConflict: "user_id,course_id" });

    if (purchaseError) {
      console.error("Purchase record error:", purchaseError);
    }

    return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
