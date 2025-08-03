import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuthEmailRequest {
  email: string;
  token?: string;
  token_hash?: string;
  redirect_to?: string;
  email_action_type?: string;
  site_url?: string;
  user_id?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      email, 
      token, 
      token_hash, 
      redirect_to, 
      email_action_type,
      site_url 
    }: AuthEmailRequest = await req.json();

    console.log("Sending auth email to:", email, "Type:", email_action_type);

    // Determine email content based on action type
    let subject = "Welcome to MSHA Training Platform";
    let htmlContent = "";

    if (email_action_type === "signup" || email_action_type === "invite") {
      subject = "Confirm your MSHA Training Platform account";
      const confirmUrl = `${site_url || 'https://yqpqfjmyghoehxzuevrz.supabase.co'}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to || site_url}`;
      
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Confirm Your Account</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; margin-bottom: 32px; }
            .logo { width: 48px; height: 48px; background-color: #3b82f6; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; }
            .title { color: #1e293b; font-size: 24px; font-weight: bold; margin: 0; }
            .subtitle { color: #64748b; margin-top: 8px; }
            .content { margin-bottom: 32px; line-height: 1.6; color: #374151; }
            .button { display: inline-block; background-color: #3b82f6; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; margin: 16px 0; }
            .footer { text-align: center; color: #9ca3af; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🏗️</div>
              <h1 class="title">MSHA Training Platform</h1>
              <p class="subtitle">Professional mining safety training and certification</p>
            </div>
            
            <div class="content">
              <p>Welcome to the MSHA Training Platform! You're one step away from accessing your mining safety training.</p>
              
              <p>Click the button below to confirm your email address and activate your account:</p>
              
              <div style="text-align: center;">
                <a href="${confirmUrl}" class="button">Confirm Your Account</a>
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #f1f5f9; padding: 12px; border-radius: 4px; font-family: monospace; font-size: 14px;">${confirmUrl}</p>
              
              <p><strong>Important:</strong> This link will expire in 24 hours for security reasons.</p>
              
              <p>If you didn't create an account with us, you can safely ignore this email.</p>
            </div>
            
            <div class="footer">
              <p>MSHA Training Platform - Professional Mining Safety Training</p>
              <p>This email was sent because you signed up for an account.</p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else if (email_action_type === "recovery") {
      subject = "Reset your MSHA Training Platform password";
      const resetUrl = `${site_url || 'https://yqpqfjmyghoehxzuevrz.supabase.co'}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to || site_url}`;
      
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Reset Your Password</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; padding: 32px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; margin-bottom: 32px; }
            .logo { width: 48px; height: 48px; background-color: #3b82f6; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 20px; }
            .title { color: #1e293b; font-size: 24px; font-weight: bold; margin: 0; }
            .content { margin-bottom: 32px; line-height: 1.6; color: #374151; }
            .button { display: inline-block; background-color: #dc2626; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 500; margin: 16px 0; }
            .footer { text-align: center; color: #9ca3af; font-size: 14px; border-top: 1px solid #e5e7eb; padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🏗️</div>
              <h1 class="title">Password Reset Request</h1>
            </div>
            
            <div class="content">
              <p>We received a request to reset your password for your MSHA Training Platform account.</p>
              
              <p>Click the button below to reset your password:</p>
              
              <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
              </div>
              
              <p>Or copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background: #f1f5f9; padding: 12px; border-radius: 4px; font-family: monospace; font-size: 14px;">${resetUrl}</p>
              
              <p><strong>Security note:</strong> This link will expire in 1 hour for your protection.</p>
              
              <p>If you didn't request a password reset, you can safely ignore this email.</p>
            </div>
            
            <div class="footer">
              <p>MSHA Training Platform - Professional Mining Safety Training</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "MSHA Training Platform <onboarding@resend.dev>",
      to: [email],
      subject: subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-auth-email function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);