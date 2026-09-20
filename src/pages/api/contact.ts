import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ContactRequestBody = {
  // Can come from full questionnaire or quick footer form
  name?: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  services?: string[];
  primaryGoal?: string;
  targetAudience?: string;
  budget?: string;
  timeline?: string;
  projectOverview: string;
  referenceLinks?: string;
  referralSource?: string;
  source?: "questionnaire" | "footer";
};

type ApiResponse = {
  success: boolean;
  message: string;
  referenceId?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed. Use POST." });
  }

  try {
    const data: ContactRequestBody = req.body;

    // Server-side Validation
    if (!data.email || !data.email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: "A valid email address is required.",
      });
    }

    if (!data.projectOverview || !data.projectOverview.trim()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: "Please enter your message or project brief.",
      });
    }

    // Generate unique inquiry ticket ID
    const referenceId = `NEX-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const clientName = data.name || "Anonymous Client";
    const sourceLabel = data.source === "footer" ? "Landing Page Footer Quick Form" : "Discovery Questionnaire Page";

    // --------------------------------------------------------------------------
    // High-End Luxury HTML Email Template
    // --------------------------------------------------------------------------
    const htmlEmailContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #F4F0EA; margin: 0; padding: 24px; color: #111827; }
          .container { max-width: 650px; margin: 0 auto; background: #FFFFFF; border: 1px solid rgba(0,0,0,0.1); border-top: 4px solid #2554E8; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
          .header { background: #111827; padding: 32px; color: #FFFFFF; }
          .logo { font-size: 22px; font-weight: 900; letter-spacing: -0.5px; text-transform: uppercase; }
          .logo span { color: #2554E8; }
          .badge { display: inline-block; background: rgba(37, 84, 232, 0.15); color: #2554E8; font-family: monospace; font-size: 11px; font-weight: 700; padding: 4px 8px; border: 1px solid rgba(37, 84, 232, 0.3); margin-top: 12px; }
          .content { padding: 32px; }
          .title { font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; margin-top: 0; margin-bottom: 8px; color: #111827; }
          .subtitle { color: #64748B; font-size: 14px; margin-bottom: 24px; }
          .grid { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 13px; }
          .grid td { padding: 12px; border-bottom: 1px solid #E2E8F0; }
          .grid td.label { font-family: monospace; font-weight: 700; color: #64748B; width: 35%; text-transform: uppercase; }
          .grid td.value { font-weight: 600; color: #111827; }
          .brief-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #2554E8; padding: 20px; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 16px; white-space: pre-wrap; }
          .footer { background: #F1F5F9; padding: 20px 32px; text-align: center; font-family: monospace; font-size: 11px; color: #94A3B8; border-top: 1px solid #E2E8F0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">one<span>Nexus</span> Studio</div>
            <div class="badge">TICKET #${referenceId}</div>
          </div>
          <div class="content">
            <h1 class="title">NEW PROJECT DISCOVERY</h1>
            <p class="subtitle">Received from <strong>${sourceLabel}</strong></p>
            
            <table class="grid">
              <tr>
                <td class="label">Client Name</td>
                <td class="value">${clientName}</td>
              </tr>
              <tr>
                <td class="label">Client Email</td>
                <td class="value"><a href="mailto:${data.email}" style="color: #2554E8; text-decoration: none; font-weight: 700;">${data.email}</a></td>
              </tr>
              ${data.phone ? `<tr><td class="label">Phone</td><td class="value">${data.phone}</td></tr>` : ""}
              ${data.company ? `<tr><td class="label">Company / Entity</td><td class="value">${data.company}</td></tr>` : ""}
              ${data.website ? `<tr><td class="label">Website</td><td class="value"><a href="${data.website}" style="color: #2554E8;">${data.website}</a></td></tr>` : ""}
              ${data.budget ? `<tr><td class="label">Budget Tier</td><td class="value" style="color: #2554E8; font-weight: 800;">${data.budget}</td></tr>` : ""}
              ${data.timeline ? `<tr><td class="label">Target Timeline</td><td class="value">${data.timeline}</td></tr>` : ""}
              ${data.services && data.services.length > 0 ? `<tr><td class="label">Services Requested</td><td class="value">${data.services.join(", ")}</td></tr>` : ""}
              ${data.primaryGoal ? `<tr><td class="label">Primary Goal</td><td class="value">${data.primaryGoal}</td></tr>` : ""}
            </table>

            <div style="font-family: monospace; font-size: 12px; font-weight: 700; color: #2554E8; text-transform: uppercase;">
              [ PROJECT BRIEF & OVERVIEW ]
            </div>
            <div class="brief-box">${data.projectOverview}</div>
          </div>
          <div class="footer">
            ONE NEXUS STUDIO • MAYFAIR LONDON • DISCOVERY DISPATCH AUTOMATION
          </div>
        </div>
      </body>
    </html>
    `;

    // --------------------------------------------------------------------------
    // Nodemailer SMTP Transport Execution
    // --------------------------------------------------------------------------
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "hello@onenexus.studio";

    const hasValidSmtpCredentials =
      smtpUser &&
      smtpPass &&
      smtpUser !== "your-email@gmail.com" &&
      smtpPass !== "your-app-password-here";

    if (hasValidSmtpCredentials) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465, // true for 465, false for 587
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"oneNexus Studio Discovery" <${smtpUser}>`,
        to: [recipientEmail, smtpUser], // Deliver to studio & sender account
        replyTo: data.email,
        subject: `[Project Inquiry #${referenceId}] ${data.company || clientName} — ${data.budget || "New Contact"}`,
        html: htmlEmailContent,
      });

      console.log(`[Nodemailer SUCCESS] Email dispatched for ticket #${referenceId}`);
    } else if (process.env.RESEND_API_KEY) {
      // Fallback Resend execution if configured
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "oneNexus Discovery <onboarding@onenexus.studio>",
          to: [recipientEmail],
          subject: `[Project Inquiry #${referenceId}] ${data.company || clientName}`,
          html: htmlEmailContent,
        }),
      });
    } else {
      // Local development log fallback
      console.log(`\n======================================================`);
      console.log(`[ONE NEXUS DISCOVERY SUBMISSION - TICKET #${referenceId}]`);
      console.log(`Client: ${clientName} (${data.email})`);
      console.log(`Overview: ${data.projectOverview}`);
      console.log(`Note: Fill SMTP_USER and SMTP_PASS in .env.local to trigger real emails.`);
      console.log(`======================================================\n`);
    }

    return res.status(200).json({
      success: true,
      message: "Discovery inquiry dispatched successfully.",
      referenceId,
    });
  } catch (err: any) {
    console.error("API /api/contact error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error dispatching message.",
      error: err?.message || "Failed to send email. Please try again or email hello@onenexus.studio directly.",
    });
  }
}
