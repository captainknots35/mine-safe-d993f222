import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Admin email to receive notifications
const ADMIN_EMAIL = "jccstull23@gmail.com";

interface NewUserPayload {
  type: "INSERT";
  table: "profiles";
  record: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log("notify-new-signup function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload: NewUserPayload = await req.json();
    console.log("Received payload:", JSON.stringify(payload));

    const { record } = payload;
    const fullName = `${record.first_name} ${record.last_name}`.trim() || "New User";
    const signupDate = new Date(record.created_at).toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    });

    console.log(`Sending notification for new user: ${fullName} (${record.email})`);

    const emailResponse = await resend.emails.send({
      from: "MSHA Training <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      subject: `🎉 New User Signup: ${fullName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎉 New User Signup!</h1>
          </div>
          
          <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="color: #334155; font-size: 16px; margin: 0 0 20px;">A new user has registered on MSHA Training Platform:</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px; width: 100px;">Name:</td>
                  <td style="padding: 10px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Email:</td>
                  <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">
                    <a href="mailto:${record.email}" style="color: #2563eb; text-decoration: none;">${record.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #64748b; font-size: 14px;">Signed Up:</td>
                  <td style="padding: 10px 0; color: #1e293b; font-size: 14px;">${signupDate}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #64748b; font-size: 14px; margin: 20px 0 0;">
              View all users in the <a href="https://supabase.com/dashboard/project/yqpqfjmyghoehxzuevrz/auth/users" style="color: #2563eb;">Supabase Dashboard</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in notify-new-signup function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
