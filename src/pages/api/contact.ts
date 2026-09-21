import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ContactRequestBody = {
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
        error: "A valid work email address is required.",
      });
    }

    if (!data.projectOverview || !data.projectOverview.trim()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: "Please enter your message or project overview.",
      });
    }

    // Generate unique inquiry ticket ID
    const referenceId = `NEX-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const clientName = data.name && data.name.trim() ? data.name.trim() : "Prospective Partner";
    const sourceLabel =
      data.source === "footer"
        ? "Landing Page Express Form"
        : "Project Discovery Questionnaire";

    // Format services array
    const servicesFormatted =
      data.services && data.services.length > 0
        ? data.services.join(", ")
        : "Full Strategic Digital Transformation";

    // --------------------------------------------------------------------------
    // 1. ADMIN NOTIFICATION TEMPLATE (For Studio Founders)
    // --------------------------------------------------------------------------
    const adminHtmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>New Project Discovery — oneNexus Studio</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #EFECE6; margin: 0; padding: 32px 16px; color: #111827; -webkit-font-smoothing: antialiased; }
          .wrapper { max-width: 680px; margin: 0 auto; background: #FFFFFF; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
          .header { background: #111827; padding: 40px; text-align: left; position: relative; border-bottom: 4px solid #2554E8; }
          .brand { font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #FFFFFF; text-transform: uppercase; }
          .brand span { color: #2554E8; }
          .badge { display: inline-block; background: #2554E8; color: #FFFFFF; font-family: monospace; font-size: 11px; font-weight: 800; padding: 4px 10px; margin-top: 14px; letter-spacing: 1px; }
          .content { padding: 40px; }
          .section-tag { font-family: monospace; font-size: 11px; font-weight: 800; color: #2554E8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; display: block; border-bottom: 1px solid #F1F5F9; padding-bottom: 6px; }
          .data-table { width: 100%; border-collapse: collapse; margin-bottom: 32px; }
          .data-table td { padding: 10px 0; border-bottom: 1px solid #F1F5F9; vertical-align: top; font-size: 14px; }
          .data-table td.label { font-family: monospace; font-weight: 700; color: #64748B; width: 32%; text-transform: uppercase; font-size: 12px; }
          .data-table td.value { font-weight: 600; color: #111827; }
          .highlight-value { color: #2554E8 !important; font-weight: 800 !important; }
          .brief-container { background: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #2554E8; padding: 24px; font-size: 14px; line-height: 1.7; color: #334155; margin-bottom: 32px; white-space: pre-wrap; font-weight: 400; }
          .btn-reply { display: inline-block; background: #2554E8; color: #FFFFFF !important; font-family: monospace; font-size: 12px; font-weight: 800; padding: 14px 28px; text-decoration: none; text-transform: uppercase; letter-spacing: 1px; border-radius: 2px; }
          .footer { background: #F1F5F9; padding: 24px 40px; text-align: center; font-family: monospace; font-size: 11px; color: #94A3B8; border-top: 1px solid #E2E8F0; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <div class="brand">one<span>Nexus</span> Studio</div>
            <div class="badge">INQUIRY DISPATCH • #${referenceId}</div>
          </div>
          <div class="content">
            
            <!-- SECTION 01: CLIENT DETAILS -->
            <span class="section-tag">[ 01 / CLIENT & ENTITY PROFILE ]</span>
            <table class="data-table">
              <tr>
                <td class="label">Client Name</td>
                <td class="value">${clientName}</td>
              </tr>
              <tr>
                <td class="label">Work Email</td>
                <td class="value"><a href="mailto:${data.email}" style="color: #2554E8; text-decoration: none; font-weight: 700;">${data.email}</a></td>
              </tr>
              ${data.phone ? `<tr><td class="label">Phone</td><td class="value">${data.phone}</td></tr>` : ""}
              ${data.company ? `<tr><td class="label">Company / Entity</td><td class="value">${data.company}</td></tr>` : ""}
              ${data.website ? `<tr><td class="label">Current Website</td><td class="value"><a href="${data.website}" style="color: #2554E8;">${data.website}</a></td></tr>` : ""}
              ${data.referralSource ? `<tr><td class="label">Referral Source</td><td class="value">${data.referralSource}</td></tr>` : ""}
              <tr>
                <td class="label">Submission Origin</td>
                <td class="value">${sourceLabel}</td>
              </tr>
            </table>

            <!-- SECTION 02: SCOPE & TIMELINE -->
            <span class="section-tag">[ 02 / SCOPE, INVESTMENT & TIMELINE ]</span>
            <table class="data-table">
              ${data.budget ? `<tr><td class="label">Investment Tier</td><td class="value highlight-value">${data.budget}</td></tr>` : ""}
              ${data.timeline ? `<tr><td class="label">Target Timeline</td><td class="value">${data.timeline}</td></tr>` : ""}
              <tr>
                <td class="label">Services Requested</td>
                <td class="value">${servicesFormatted}</td>
              </tr>
              ${data.primaryGoal ? `<tr><td class="label">Primary Goal</td><td class="value">${data.primaryGoal}</td></tr>` : ""}
              ${data.targetAudience ? `<tr><td class="label">Target Audience</td><td class="value">${data.targetAudience}</td></tr>` : ""}
            </table>

            <!-- SECTION 03: BRIEF & OVERVIEW -->
            <span class="section-tag">[ 03 / PROJECT NARRATIVE & BRIEF ]</span>
            <div class="brief-container">${data.projectOverview}</div>

            <div style="text-align: center; margin-top: 36px;">
              <a href="mailto:${data.email}?subject=Re:%20oneNexus%20Project%20Discovery%20%5B%23${referenceId}%5D" class="btn-reply">
                REPLY DIRECTLY TO ${clientName.toUpperCase()} ↗
              </a>
            </div>

          </div>
          <div class="footer">
            ONE NEXUS STUDIO • MAYFAIR LONDON • AUTOMATED DISCOVERY PIPELINE
          </div>
        </div>
      </body>
    </html>
    `;

    // --------------------------------------------------------------------------
    // 2. CLIENT CONFIRMATION / REFERENCE RECEIPT TEMPLATE (For Applicant)
    // --------------------------------------------------------------------------
    const clientReceiptHtmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Discovery Application Received — oneNexus Studio</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #EFECE6; margin: 0; padding: 32px 16px; color: #111827; -webkit-font-smoothing: antialiased; }
          .wrapper { max-width: 680px; margin: 0 auto; background: #FFFFFF; border: 1px solid rgba(0,0,0,0.1); box-shadow: 0 20px 40px rgba(0,0,0,0.06); }
          .header { background: #111827; padding: 40px; text-align: left; border-bottom: 4px solid #2554E8; }
          .brand { font-size: 24px; font-weight: 900; letter-spacing: -0.5px; color: #FFFFFF; text-transform: uppercase; }
          .brand span { color: #2554E8; }
          .badge { display: inline-block; background: rgba(37, 84, 232, 0.15); color: #2554E8; font-family: monospace; font-size: 11px; font-weight: 800; padding: 6px 12px; margin-top: 14px; border: 1px solid rgba(37, 84, 232, 0.3); }
          .content { padding: 40px; }
          .title { font-size: 26px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.5px; margin-top: 0; margin-bottom: 12px; color: #111827; }
          .intro { font-size: 15px; line-height: 1.7; color: #475569; margin-bottom: 28px; }
          .section-tag { font-family: monospace; font-size: 11px; font-weight: 800; color: #2554E8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 12px; display: block; border-bottom: 1px solid #F1F5F9; padding-bottom: 6px; }
          .summary-card { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 24px; margin-bottom: 28px; }
          .data-table { width: 100%; border-collapse: collapse; }
          .data-table td { padding: 8px 0; border-bottom: 1px solid #E2E8F0; font-size: 13px; }
          .data-table td.label { font-family: monospace; font-weight: 700; color: #64748B; width: 35%; text-transform: uppercase; }
          .data-table td.value { font-weight: 600; color: #111827; }
          .next-steps { background: #111827; color: #FFFFFF; padding: 24px; border-left: 4px solid #2554E8; margin-bottom: 28px; }
          .next-steps h4 { margin: 0 0 8px 0; font-family: monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #2554E8; }
          .next-steps p { margin: 0; font-size: 13px; line-height: 1.6; color: #CBD5E1; }
          .footer { background: #F1F5F9; padding: 24px 40px; text-align: center; font-family: monospace; font-size: 11px; color: #94A3B8; border-top: 1px solid #E2E8F0; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <div class="brand">one<span>Nexus</span> Studio</div>
            <div class="badge">APPLICATION RECEIPT • #${referenceId}</div>
          </div>
          <div class="content">
            <h1 class="title">APPLICATION RECEIVED.</h1>
            <p class="intro">
              Thank you for initiating a discovery application with <strong>oneNexus Studio</strong>, <strong>${clientName}</strong>.
              Your reference code for this strategic inquiry is <span style="font-family: monospace; font-weight: 800; color: #2554E8;">#${referenceId}</span>.
            </p>

            <div class="next-steps">
              <h4>[ WHAT HAPPENS NEXT ]</h4>
              <p>
                Our senior studio partners personally evaluate every project brief to assess technical feasibility, creative scope, and strategic alignment. You will receive a direct response or calendar invitation within <strong>24 business hours</strong>.
              </p>
            </div>

            <!-- RECORD OF APPLICATION -->
            <span class="section-tag">[ YOUR SUBMITTED DISCOVERY SUMMARY ]</span>
            <div class="summary-card">
              <table class="data-table">
                <tr>
                  <td class="label">Reference ID</td>
                  <td class="value" style="font-family: monospace; color: #2554E8;">#${referenceId}</td>
                </tr>
                <tr>
                  <td class="label">Applicant Email</td>
                  <td class="value">${data.email}</td>
                </tr>
                ${data.company ? `<tr><td class="label">Company / Entity</td><td class="value">${data.company}</td></tr>` : ""}
                ${data.budget ? `<tr><td class="label">Investment Tier</td><td class="value" style="color: #2554E8; font-weight: 800;">${data.budget}</td></tr>` : ""}
                ${data.timeline ? `<tr><td class="label">Target Timeline</td><td class="value">${data.timeline}</td></tr>` : ""}
                <tr>
                  <td class="label">Disciplines Requested</td>
                  <td class="value">${servicesFormatted}</td>
                </tr>
              </table>
              
              <div style="font-family: monospace; font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; margin-top: 16px; margin-bottom: 6px;">
                PROJECT OVERVIEW RECORD:
              </div>
              <div style="font-size: 13px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${data.projectOverview}</div>
            </div>

            <p style="font-size: 13px; color: #64748B; line-height: 1.6;">
              Need to append additional documentation or assets? Simply reply directly to this email or write to <a href="mailto:hello@onenexus.studio" style="color: #2554E8; font-weight: 700; text-decoration: none;">hello@onenexus.studio</a> quoting reference <span style="font-family: monospace; font-weight: 700;">#${referenceId}</span>.
            </p>

          </div>
          <div class="footer">
            ONE NEXUS STUDIO • MAYFAIR LONDON • FOUNDER-LED STRATEGIC DISCOVERY
          </div>
        </div>
      </body>
    </html>
    `;

    // --------------------------------------------------------------------------
    // SMTP EXECUTOR (Parallel Dispatch to Studio Founders & Applicant)
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
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Send Email 1: Notification to Studio Founders
      const sendAdminMail = transporter.sendMail({
        from: `"oneNexus Studio Discovery" <${smtpUser}>`,
        to: recipientEmail !== smtpUser ? [recipientEmail, smtpUser] : [smtpUser],
        replyTo: data.email,
        subject: `[New Project Inquiry #${referenceId}] ${data.company || clientName} — ${data.budget || "New Contact"}`,
        html: adminHtmlTemplate,
      });

      // Send Email 2: Reference Receipt to the Applicant
      const sendClientReceiptMail = transporter.sendMail({
        from: `"oneNexus Studio" <${smtpUser}>`,
        to: [data.email],
        replyTo: recipientEmail,
        subject: `[Application Received] your project inquiry to oneNexus Studio (#${referenceId})`,
        html: clientReceiptHtmlTemplate,
      });

      // Execute both emails concurrently
      await Promise.all([sendAdminMail, sendClientReceiptMail]);

      console.log(`[Nodemailer SUCCESS] Dual emails dispatched for ticket #${referenceId} (Admin & Client: ${data.email})`);
    } else if (process.env.RESEND_API_KEY) {
      // Fallback Resend execution if configured
      await Promise.all([
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "oneNexus Discovery <onboarding@onenexus.studio>",
            to: [recipientEmail],
            subject: `[Project Inquiry #${referenceId}] ${data.company || clientName}`,
            html: adminHtmlTemplate,
          }),
        }),
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "oneNexus Studio <onboarding@onenexus.studio>",
            to: [data.email],
            subject: `[Application Received] oneNexus Studio (#${referenceId})`,
            html: clientReceiptHtmlTemplate,
          }),
        }),
      ]);
    } else {
      // Local development log fallback
      console.log(`\n======================================================`);
      console.log(`[ONE NEXUS DISCOVERY SUBMISSION - TICKET #${referenceId}]`);
      console.log(`Client: ${clientName} (${data.email})`);
      console.log(`Admin Email & Client Confirmation Email generated.`);
      console.log(`======================================================\n`);
    }

    return res.status(200).json({
      success: true,
      message: "Discovery questionnaire and confirmation receipt dispatched.",
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
