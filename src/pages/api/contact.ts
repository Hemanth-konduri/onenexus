import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

type ContactRequestBody = {
  fullName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  businessName?: string;
  businessType: "Planning to Start" | "Existing Business";
  serviceRequired: string;
  selectedServices?: string[];
  details: string;
  preferredTime: string;
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
    if (!data.fullName || !data.fullName.trim()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: "Full name is required.",
      });
    }

    if (!data.mobileNumber || !data.mobileNumber.trim()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: "Mobile number is required.",
      });
    }

    if (!data.email || !data.email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: "A valid email address is required.",
      });
    }

    if (!data.details || !data.details.trim()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        error: "Please enter your business or idea details.",
      });
    }

    // Generate unique inquiry ticket ID
    const referenceId = `NEX-${Date.now().toString(36).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "onenexus789@gmail.com";

    const servicesList =
      data.selectedServices && data.selectedServices.length > 0
        ? data.selectedServices
        : [data.serviceRequired];

    const servicesHtml = servicesList
      .map(
        (s) =>
          `<span style="display:inline-block; background:#2554E8; color:#FFFFFF; padding:4px 10px; margin:2px; font-size:12px; font-family:sans-serif; font-weight:bold; border-radius:2px;">${s}</span>`
      )
      .join("");

    // --------------------------------------------------------------------------
    // ADMIN NOTIFICATION TEMPLATE
    // --------------------------------------------------------------------------
    const adminHtmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>New Business Enquiry — OneNexus</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #EFECE6; margin: 0; padding: 32px 16px; color: #111827; }
          .wrapper { max-width: 680px; margin: 0 auto; background: #FFFFFF; border: 1px solid rgba(0,0,0,0.1); }
          .header { background: #111827; padding: 32px; text-align: left; border-bottom: 4px solid #2554E8; }
          .brand { font-size: 24px; font-weight: 900; color: #2554E8; text-transform: uppercase; }
          .badge { display: inline-block; background: #2554E8; color: #FFFFFF; font-family: monospace; font-size: 11px; font-weight: 800; padding: 4px 10px; margin-top: 10px; }
          .content { padding: 32px; }
          .data-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .data-table td { padding: 10px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; }
          .data-table td.label { font-family: monospace; font-weight: 700; color: #64748B; width: 35%; text-transform: uppercase; font-size: 12px; }
          .data-table td.value { font-weight: 600; color: #111827; }
          .brief-container { background: #F8FAFC; border: 1px solid #E2E8F0; border-left: 4px solid #2554E8; padding: 20px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; }
          .footer { background: #F1F5F9; padding: 20px; text-align: center; font-family: monospace; font-size: 11px; color: #94A3B8; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <div class="brand">OneNexus</div>
            <div class="badge">NEW ENQUIRY • #${referenceId}</div>
          </div>
          <div class="content">
            <table class="data-table">
              <tr>
                <td class="label">Full Name</td>
                <td class="value">${data.fullName}</td>
              </tr>
              <tr>
                <td class="label">Mobile Number</td>
                <td class="value">${data.mobileNumber}</td>
              </tr>
              <tr>
                <td class="label">WhatsApp Number</td>
                <td class="value">${data.whatsappNumber || data.mobileNumber}</td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${data.email}" style="color: #2554E8; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td class="label">Business Name</td>
                <td class="value">${data.businessName || "Not provided"}</td>
              </tr>
              <tr>
                <td class="label">Business Type</td>
                <td class="value">${data.businessType}</td>
              </tr>
              <tr>
                <td class="label">Selected Services (${servicesList.length})</td>
                <td class="value">${servicesHtml}</td>
              </tr>
              <tr>
                <td class="label">Preferred Contact Time</td>
                <td class="value">${data.preferredTime}</td>
              </tr>
            </table>

            <div style="font-family: monospace; font-size: 11px; font-weight: 700; color: #64748B; uppercase; margin-bottom: 8px;">BUSINESS OR IDEA DETAILS:</div>
            <div class="brief-container">${data.details}</div>
          </div>
          <div class="footer">
            ONENEXUS • YOUR DIGITAL GROWTH PARTNER • ONENEXUSDIGI.COM
          </div>
        </div>
      </body>
    </html>
    `;

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);

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

      await transporter.sendMail({
        from: `"OneNexus Enquiry" <${smtpUser}>`,
        to: [recipientEmail],
        replyTo: data.email,
        subject: `[New Enquiry #${referenceId}] ${data.fullName} — ${servicesList.join(", ")}`,
        html: adminHtmlTemplate,
      });
    } else {
      console.log(`\n======================================================`);
      console.log(`[ONENEXUS ENQUIRY SUBMISSION - TICKET #${referenceId}]`);
      console.log(`Name: ${data.fullName} | Email: ${data.email} | Mobile: ${data.mobileNumber}`);
      console.log(`Selected Services: ${servicesList.join(", ")} | Type: ${data.businessType}`);
      console.log(`Details: ${data.details}`);
      console.log(`======================================================\n`);
    }

    return res.status(200).json({
      success: true,
      message: "Enquiry submitted successfully. Our team will review your requirements and contact you shortly.",
      referenceId,
    });
  } catch (err: any) {
    console.error("API /api/contact error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error submitting enquiry.",
      error: err?.message || "Failed to submit enquiry. Please email onenexus789@gmail.com directly.",
    });
  }
}
