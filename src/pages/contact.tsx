import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  CheckCircle2,
  Send,
  Mail,
  MessageSquare,
  Globe,
  Clock,
  User,
  Phone,
  Building2,
  Sliders,
  FileText,
  Copy,
  Check,
  X,
  Plus,
  Layers,
} from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import { getWhatsAppUrl } from "@/lib/whatsapp";

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Dynamically import 3D GLTF Scene to prevent SSR issues
const Contact3DScene = dynamic(() => import("@/components/Contact3DScene"), {
  ssr: false,
});

const QUICK_SERVICE_OPTIONS = [
  "AI Services",
  "Branding & Visual Identity",
  "Social Media Marketing",
  "Website Design & Craft",
  "Digital Business Setup",
  "Monthly Growth Support",
  "Small Businesses Presence",
  "Aspiring Entrepreneurs Launch",
  "Women Entrepreneurs Growth",
];

export default function ContactPage() {
  const router = useRouter();
  const { selectedServices, addService, removeService, clearServices, toggleService } = useInquiry();

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
    businessName: "",
    businessType: "Planning to Start" as "Planning to Start" | "Existing Business",
    serviceRequired: "AI Services",
    details: "",
    preferredTime: "Morning (9 AM - 12 PM)",
  });

  const [customInput, setCustomInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [formError, setFormError] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Auto-add URL query parameter service if passed
  useEffect(() => {
    if (router.isReady && router.query.service) {
      const qService = Array.isArray(router.query.service)
        ? router.query.service[0]
        : router.query.service;
      if (qService) {
        addService(qService);
        setFormData((prev) => ({ ...prev, serviceRequired: qService }));
      }
    }
  }, [router.isReady, router.query.service]);

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim()) {
      addService(customInput.trim());
      setCustomInput("");
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("onenexus789@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!formData.mobileNumber.trim()) {
      setFormError("Please enter your mobile number.");
      return;
    }
    if (!formData.whatsappNumber.trim()) {
      setFormError("Please enter your WhatsApp number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!formData.details.trim()) {
      setFormError("Please describe your business or idea details.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      selectedServices:
        selectedServices.length > 0
          ? selectedServices
          : [formData.serviceRequired],
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setFormError(result.error || result.message || "Failed to submit enquiry.");
        setIsSubmitting(false);
        return;
      }

      setReferenceId(result.referenceId || `NEX-${Date.now().toString(36).toUpperCase()}`);
      setSubmitted(true);
      window.scrollTo({ top: 180, behavior: "smooth" });
    } catch (err: any) {
      setFormError("Network issue. Please email onenexus789@gmail.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us — OneNexus | Enquiry & Digital Growth Partner</title>
        <meta
          name="description"
          content="Get in touch with OneNexus. Submit your business enquiry for AI Services, Branding, Social Media Marketing, Website Design, or Digital Business Setup."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/onenexus-logo-bckgr.png" />
      </Head>

      <CustomCursor />

      <div className="min-h-screen bg-[#EFECE6] text-[#111827] selection:bg-[#2554E8] selection:text-white font-sans relative overflow-x-hidden pt-20">
        <Navbar />

        {/* 3D Scene Layer */}
        <Contact3DScene />

        {/* Readability Overlay */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#EFECE6]/30 via-[#EFECE6]/50 to-[#EFECE6]/70 pointer-events-none" />

        {/* Architectural Grid Lines */}
        <div className="fixed inset-0 pointer-events-none z-0 flex justify-between max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="h-full border-r border-black/[0.05] first:border-l first:border-black/[0.05]"
            />
          ))}
        </div>

        {/* Main Contact Section */}
        <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-28">
          {/* Top Header Strip */}
          <div className="flex items-center justify-between pb-6 border-b border-black/[0.08] mb-10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-[1px]" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#111827]">
                ENQUIRY FORM
              </span>
            </div>
            <span className="font-mono text-xs sm:text-sm text-[#2554E8] tracking-widest uppercase font-bold">
              [ ONENEXUS GROWTH PARTNER ]
            </span>
          </div>

          {/* Headline & Title */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-[#111827] uppercase select-none">
              START YOUR <span className="text-[#2554E8]">GROWTH JOURNEY.</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#475569] font-normal max-w-2xl">
              Fill out the enquiry form below. Our team will review your business requirements and contact you shortly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form / Success State (8 cols) */}
            <div className="lg:col-span-8">
              {submitted ? (
                /* Success Message Container */
                <div className="bg-[#F4F0EA]/95 backdrop-blur-md border border-black/10 p-8 sm:p-14 text-center shadow-xl">
                  <div className="w-16 h-16 rounded-full bg-[#2554E8] text-white flex items-center justify-center mx-auto mb-6 shadow-xl">
                    <CheckCircle2 size={36} />
                  </div>

                  <span className="font-mono text-xs font-extrabold text-[#2554E8] uppercase tracking-widest block mb-2">
                    ENQUIRY RECEIVED
                  </span>

                  <h2 className="font-sans font-black text-3xl sm:text-4xl text-[#111827] tracking-tight uppercase mb-4">
                    THANK YOU FOR REACHING OUT!
                  </h2>

                  <p className="font-sans text-base sm:text-lg text-[#475569] max-w-xl mx-auto mb-8 leading-relaxed">
                    Our team will review your requirements and contact you shortly at <strong className="text-[#111827]">{formData.email}</strong> or <strong className="text-[#111827]">{formData.mobileNumber}</strong>.
                  </p>

                  <div className="p-6 bg-white/80 border border-black/10 text-left font-mono text-xs space-y-3 mb-8 max-w-md mx-auto">
                    <div className="flex justify-between border-b border-black/10 pb-2">
                      <span className="text-neutral-500">REFERENCE ID</span>
                      <span className="font-bold text-[#2554E8]">{referenceId}</span>
                    </div>
                    <div className="flex justify-between border-b border-black/10 pb-2">
                      <span className="text-neutral-500">FULL NAME</span>
                      <span className="font-bold text-[#111827]">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-black/10 pb-2">
                      <span className="text-neutral-500">SERVICE REQUIRED</span>
                      <span className="font-bold text-[#2554E8]">{formData.serviceRequired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">BUSINESS TYPE</span>
                      <span className="font-bold text-[#111827]">{formData.businessType}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: "",
                        mobileNumber: "",
                        whatsappNumber: "",
                        email: "",
                        businessName: "",
                        businessType: "Planning to Start",
                        serviceRequired: "AI Services",
                        details: "",
                        preferredTime: "Morning (9 AM - 12 PM)",
                      });
                    }}
                    className="px-8 py-4 bg-[#111827] hover:bg-[#2554E8] text-white font-mono text-xs uppercase tracking-widest font-bold transition-colors"
                  >
                    SUBMIT ANOTHER ENQUIRY
                  </button>
                </div>
              ) : (
                /* Primary Enquiry Form */
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#F4F0EA]/95 backdrop-blur-md border border-black/10 p-8 sm:p-12 shadow-sm space-y-8"
                >
                  {formError && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-700 font-mono text-xs font-bold uppercase tracking-wider">
                      ⚠️ {formError}
                    </div>
                  )}

                  {/* Interactive Selected Inquiry Blueprint Summary Box */}
                  <div className="p-6 bg-white border border-black/15 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-black/10 pb-3">
                      <div className="flex items-center gap-2">
                        <Layers size={16} className="text-[#2554E8]" />
                        <span className="font-mono text-xs font-black uppercase tracking-widest text-[#111827]">
                          YOUR SELECTED INQUIRY BLUEPRINT ({selectedServices.length})
                        </span>
                      </div>
                      {selectedServices.length > 0 && (
                        <button
                          type="button"
                          onClick={clearServices}
                          className="font-mono text-[10px] uppercase font-bold text-neutral-500 hover:text-rose-600 transition-colors"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {selectedServices.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedServices.map((service, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2554E8]/10 text-[#2554E8] border border-[#2554E8]/25 text-xs font-sans font-bold rounded-[2px]"
                          >
                            <CheckCircle2 size={14} className="text-[#2554E8]" />
                            <span>{service}</span>
                            <button
                              type="button"
                              onClick={() => removeService(service)}
                              className="text-neutral-400 hover:text-rose-600 transition-colors"
                            >
                              <X size={13} />
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="font-sans text-xs text-neutral-500 italic">
                        No specific items pre-selected yet. Click any options below or fill out the details.
                      </p>
                    )}

                    {/* Quick Add Toggle Pills */}
                    <div className="pt-2 border-t border-black/5">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                        + CLICK TO TOGGLE / ADD SERVICES & FOCUS AREAS:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {QUICK_SERVICE_OPTIONS.map((opt, idx) => {
                          const isSel = selectedServices.includes(opt);
                          return (
                            <button
                              type="button"
                              key={idx}
                              onClick={() => toggleService(opt)}
                              className={`px-2.5 py-1 font-mono text-[10px] uppercase font-bold border transition-all ${
                                isSel
                                  ? "bg-[#2554E8] text-white border-[#2554E8]"
                                  : "bg-neutral-100 hover:bg-white text-[#111827] border-black/10 hover:border-[#2554E8]"
                              }`}
                            >
                              {isSel ? `✓ ${opt}` : `+ ${opt}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Section 1: Contact Details */}
                  <div>
                    <h3 className="font-mono text-xs font-extrabold text-[#2554E8] uppercase tracking-widest mb-6 flex items-center gap-2">
                      <User size={16} />
                      <span>1. YOUR CONTACT DETAILS</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                          FULL NAME *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Hemanth Kumar"
                          className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                          EMAIL ADDRESS *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. name@example.com"
                          className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                          MOBILE NUMBER *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.mobileNumber}
                          onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                          WHATSAPP NUMBER *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.whatsappNumber}
                          onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Business & Service Details */}
                  <div className="pt-6 border-t border-black/10">
                    <h3 className="font-mono text-xs font-extrabold text-[#2554E8] uppercase tracking-widest mb-6 flex items-center gap-2">
                      <Building2 size={16} />
                      <span>2. BUSINESS & SERVICE REQUIREMENTS</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                          BUSINESS NAME (OPTIONAL)
                        </label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          placeholder="e.g. Nexus Enterprises"
                          className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                          BUSINESS TYPE *
                        </label>
                        <select
                          value={formData.businessType}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              businessType: e.target.value as any,
                            })
                          }
                          className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] focus:outline-none focus:border-[#2554E8] text-sm font-bold"
                        >
                          <option value="Planning to Start">Planning to Start</option>
                          <option value="Existing Business">Existing Business</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                          SERVICE REQUIRED *
                        </label>
                        <select
                          value={formData.serviceRequired}
                          onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                          className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] focus:outline-none focus:border-[#2554E8] text-sm font-bold"
                        >
                          <option value="AI Services">AI Services</option>
                          <option value="Branding">Branding & Visual Identity</option>
                          <option value="Social Media Marketing">Social Media Marketing</option>
                          <option value="Website Design">Website Design & Craft</option>
                          <option value="Digital Business Setup">
                            Digital Business Setup (incl. Google Business Profile)
                          </option>
                          <option value="Monthly Growth Support">Monthly Growth Support</option>
                          <option value="Complete Growth Package">Complete Digital Growth Package</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                          PREFERRED CONTACT TIME *
                        </label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] focus:outline-none focus:border-[#2554E8] text-sm font-bold"
                        >
                          <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                          <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                          <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                          <option value="Anytime">Anytime</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                          BUSINESS OR IDEA DETAILS *
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={formData.details}
                          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                          placeholder="Please share details about your business concept, target market, or what you hope to achieve..."
                          className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-black/10">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-[#2554E8] hover:bg-[#1d42c0] disabled:bg-[#2554E8]/60 text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-xl transition-all duration-300 hover:scale-[1.01] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>SUBMITTING ENQUIRY...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>SUBMIT ENQUIRY</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Contact Information Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-8 bg-[#111827] text-white border border-black/10 shadow-xl space-y-8">
                <div>
                  <span className="font-mono text-xs text-[#2554E8] uppercase tracking-widest font-extrabold block mb-2">
                    DIRECT CONTACT
                  </span>
                  <h3 className="font-sans font-black text-2xl uppercase tracking-tight mb-4">
                    REACH ONENEXUS
                  </h3>
                  <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                    Have questions before submitting your enquiry? Connect with our team directly.
                  </p>
                </div>

                {/* Email Info */}
                <div className="pt-6 border-t border-white/10 space-y-2">
                  <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest block font-bold">
                    OFFICIAL EMAIL
                  </span>
                  <a
                    href="mailto:onenexus789@gmail.com"
                    className="font-sans font-bold text-lg text-white hover:text-[#2554E8] transition-colors flex items-center gap-2"
                  >
                    <Mail size={18} className="text-[#2554E8]" />
                    <span>onenexus789@gmail.com</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="mt-2 text-xs font-mono font-bold text-[#2554E8] hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    <span>{copiedEmail ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
                  </button>
                </div>

                {/* Secondary Option: WhatsApp */}
                <div className="pt-6 border-t border-white/10 space-y-2">
                  <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest block font-bold">
                    WHATSAPP (SECONDARY OPTION)
                  </span>
                  <a
                    href={getWhatsAppUrl("Hi OneNexus! I am on your contact page and would like to speak directly with senior leadership.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300"
                  >
                    <MessageSquare size={16} />
                    <span>CHAT ON WHATSAPP ↗</span>
                  </a>
                </div>

                {/* Instagram & Social */}
                <div className="pt-6 border-t border-white/10 space-y-2">
                  <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest block font-bold">
                    INSTAGRAM & SOCIAL
                  </span>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm text-neutral-300 hover:text-[#2554E8] flex items-center gap-2 transition-colors font-bold"
                  >
                    <InstagramIcon size={18} className="text-pink-500" />
                    <span>Follow on Instagram ↗</span>
                  </a>
                </div>

                {/* Official Website */}
                <div className="pt-6 border-t border-white/10 space-y-1">
                  <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest block font-bold">
                    OFFICIAL DOMAIN
                  </span>
                  <a
                    href="https://onenexusdigi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans font-black text-xl text-[#2554E8] hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Globe size={18} />
                    <span>onenexusdigi.com</span>
                  </a>
                </div>
              </div>

              {/* Serving India Badge */}
              <div className="p-6 bg-[#F4F0EA] border border-black/10 font-mono text-xs text-[#111827] space-y-2">
                <span className="font-bold text-[#2554E8] block uppercase">
                  🇮🇳 SERVING BUSINESSES ACROSS INDIA
                </span>
                <p className="text-[#475569]">
                  Empowering small businesses, aspiring entrepreneurs, and women founders in all states and union territories.
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
