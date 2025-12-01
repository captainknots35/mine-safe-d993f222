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

  // Use service role for webhook to bypass RLS
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const body = await req.text();

    console.log("Received webhook event");

    // Parse the event
    const event = JSON.parse(body);

    console.log("Event type:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("Checkout completed:", session.id);

      const userId = session.metadata?.user_id;
      const courseId = session.metadata?.course_id;

      if (!userId || !courseId) {
        console.error("Missing metadata in session:", session.metadata);
        return new Response(JSON.stringify({ error: "Missing metadata" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      // Update purchase record to completed
      const { error: updateError } = await supabaseAdmin
        .from("course_purchases")
        .update({
          status: "completed",
          stripe_payment_intent_id: session.payment_intent,
          purchased_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_session_id", session.id);

      if (updateError) {
        console.error("Error updating purchase:", updateError);
        
        // Try to create the record if it doesn't exist
        const { error: insertError } = await supabaseAdmin
          .from("course_purchases")
          .insert({
            user_id: userId,
            course_id: courseId,
            stripe_session_id: session.id,
            stripe_payment_intent_id: session.payment_intent,
            amount_cents: session.amount_total,
            currency: session.currency,
            status: "completed",
            purchased_at: new Date().toISOString(),
          });

        if (insertError) {
          console.error("Error creating purchase:", insertError);
        }
      }

      // Also create an enrollment for the user
      const { error: enrollError } = await supabaseAdmin
        .from("enrollments")
        .upsert({
          user_id: userId,
          course_id: courseId,
          status: "not_started",
        }, { onConflict: "user_id,course_id", ignoreDuplicates: true });

      if (enrollError) {
        console.error("Error creating enrollment:", enrollError);
      }

      console.log("Purchase completed for user:", userId, "course:", courseId);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
