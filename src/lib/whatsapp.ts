/**
 * Centralized WhatsApp helper for OneNexus Studio.
 * Uses NEXT_PUBLIC_WHATSAPP_NUMBER from environment variables.
 */

export const DEFAULT_WHATSAPP_NUMBER = "919876543210"; // Placeholder default until user sets NEXT_PUBLIC_WHATSAPP_NUMBER

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi OneNexus! I'm interested in growing my brand and would love to discuss your services.";

export function getWhatsAppNumber(): string {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_WHATSAPP_NUMBER) {
    // Strip any spaces, dashes, or special characters except digits
    return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, "");
  }
  return DEFAULT_WHATSAPP_NUMBER;
}

export function getWhatsAppUrl(customMessage?: string): string {
  const phone = getWhatsAppNumber();
  const text = encodeURIComponent(customMessage || DEFAULT_WHATSAPP_MESSAGE);
  return `https://wa.me/${phone}?text=${text}`;
}
