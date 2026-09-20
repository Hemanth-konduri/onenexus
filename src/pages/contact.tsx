import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Send,
  ShieldCheck,
  Clock,
  DollarSign,
  Calendar,
  CheckCircle2,
  FileText,
  Sliders,
  User,
  Target,
  Sparkles,
} from "lucide-react";
import CustomCursor from "@/components/CustomCursor";

// Dynamically import R3F 3D GLTF Scene to prevent SSR hydration issues
const Contact3DScene = dynamic(() => import("@/components/Contact3DScene"), {
  ssr: false,
});

export default function ContactPage() {
  // Active Step State (1 to 5)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 5;

  // Form Data State
  const [formData, setFormData] = useState({
    // Step 1: Contact Profile
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",

    // Step 2: Scope & Services
    services: [] as string[],

    // Step 3: Goals & Audience
    primaryGoal: "🚀 Launch a New Venture",
    targetAudience: "",

    // Step 4: Budget & Timeline
    budget: "$40k – $80k",
    timeline: "1–2 Months",

    // Step 5: Brief & Details
    projectOverview: "",
    referenceLinks: "",
    referralSource: "Awwwards / Design Showcase",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [copied, setCopied] = useState(false);
  const [stepError, setStepError] = useState("");

  // Real-time Studio Clocks
  const [times, setTimes] = useState({
    london: "",
    ny: "",
    tokyo: "",
  });

  const stepContainerRef = useRef<HTMLDivElement>(null);

  // Scroll direction state for header bar hide/show
  const [navVisible, setNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 40) {
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 4) {
        setNavVisible(false);
      } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 4) {
        setNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        london: now.toLocaleTimeString("en-GB", { timeZone: "Europe/London", hour: "2-digit", minute: "2-digit" }),
        ny: now.toLocaleTimeString("en-US", { timeZone: "America/New_York", hour: "2-digit", minute: "2-digit" }),
        tokyo: now.toLocaleTimeString("en-JP", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" }),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Step Animation Trigger
  useEffect(() => {
    if (stepContainerRef.current) {
      gsap.fromTo(
        stepContainerRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentStep]);

  const toggleService = (service: string) => {
    if (formData.services.includes(service)) {
      setFormData({
        ...formData,
        services: formData.services.filter((s) => s !== service),
      });
    } else {
      setFormData({
        ...formData,
        services: [...formData.services, service],
      });
    }
  };

  const handleNext = () => {
    setStepError("");
    if (currentStep === 1) {
      if (!formData.name.trim() || !formData.email.trim()) {
        setStepError("Please provide your name and work email to continue.");
        return;
      }
    }
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setStepError("");
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@onenexus.studio");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStepError("");

    if (!formData.projectOverview.trim()) {
      setStepError("Please provide a brief overview of your project vision.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setStepError(result.error || result.message || "Failed to transmit discovery brief.");
        setIsSubmitting(false);
        return;
      }

      setReferenceId(result.referenceId || `NEX-${Date.now().toString(36).toUpperCase()}`);
      setSubmitted(true);
      window.scrollTo({ top: 200, behavior: "smooth" });
    } catch (err: any) {
      setStepError("Network connection issue. Please check your internet or email hello@onenexus.studio directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepTitles = [
    "Client Profile & Contact Details",
    "Required Disciplines & Scope",
    "Primary Business Goals & Audience",
    "Budget Tier & Target Timeline",
    "Project Brief & Narrative Vision",
  ];

  return (
    <>
      <Head>
        <title>Initiate Project — oneNexus Studio</title>
        <meta
          name="description"
          content="Start a conversation with oneNexus. Complete our step-by-step strategic project discovery questionnaire to partner directly with studio founders."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/onenexus-logo-bckgrpng" />
        <link rel="apple-touch-icon" href="/onenexus-logo-bckgr.png" />
      </Head>

      <CustomCursor />

      <div className="min-h-screen bg-[#EFECE6] text-[#111827] selection:bg-[#2554E8] selection:text-white font-sans relative overflow-x-hidden">
        
        {/* Interactive 3D GLTF Scene Background Layer (/models/3d_scene_for_onenexus.gltf) */}
        <Contact3DScene />

        {/* Soft Cream Readability Overlay */}
        <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#EFECE6]/20 via-[#EFECE6]/35 to-[#EFECE6]/50 pointer-events-none" />

        {/* Architectural Background Grid Lines */}
        <div className="fixed inset-0 pointer-events-none z-0 flex justify-between max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="h-full border-r border-black/[0.05] first:border-l first:border-black/[0.05]"
            />
          ))}
        </div>

        {/* Header Bar */}
        <header className={`sticky top-0 z-50 w-full bg-[#EFECE6]/85 backdrop-blur-md border-b border-black/[0.08] px-4 sm:px-8 lg:px-12 py-5 transition-transform duration-300 ${navVisible ? "translate-y-0" : "-translate-y-full"}`}>
          <div className="max-w-[1700px] mx-auto flex items-center justify-between">
            {/* Return to Studio */}
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-mono text-xs font-bold tracking-widest text-[#111827] hover:text-[#2554E8] transition-colors group uppercase"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>RETURN TO STUDIO</span>
            </Link>

            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <img
                src="/onenexus-logo-bckgr.png"
                alt="oneNexus Studio"
                className="h-8 sm:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <span className="font-sans font-bold tracking-tight text-xl text-[#111827]">
                one<span className="text-[#2554E8]">Nexus</span>
              </span>
            </Link>

            {/* Live Indicator */}
            <div className="hidden md:flex items-center gap-2.5 px-3 py-1 bg-black/[0.04] border border-black/10 rounded-full font-mono text-[11px] font-bold text-[#111827] uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#2554E8] animate-ping" />
              <span>Q4 CAPABILITY AVAILABLE</span>
            </div>
          </div>
        </header>

        {/* Main Section */}
        <main className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16 pb-28">
          
          {/* Section Header */}
          <div className="flex items-center justify-between pb-6 border-b border-black/[0.08] mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#2554E8] rounded-[1px]" />
              <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold text-[#111827]">
                PROJECT DISCOVERY QUESTIONNAIRE
              </span>
            </div>
            <span className="font-mono text-xs sm:text-sm text-neutral-500 tracking-widest uppercase">
              [ ONBOARDING FLOW ]
            </span>
          </div>

          {/* Section Big Title */}
          <div className="mb-10">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-[#111827] uppercase select-none">
              INITIATE <span className="text-[#2554E8]">PROJECT DISCOVERY.</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg text-[#475569] font-normal max-w-2xl">
              Answer the step-by-step questions below to help us understand your vision, scope, and objectives.
            </p>
          </div>

          {!submitted && (
            /* Multi-step Progress Tracker Strip */
            <div className="mb-10 bg-[#F4F0EA]/90 backdrop-blur-md border border-black/10 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-4 font-mono text-xs font-bold text-[#111827] uppercase tracking-widest">
                <span className="text-[#2554E8]">
                  STEP 0{currentStep} OF 0{totalSteps} — {stepTitles[currentStep - 1]}
                </span>
                <span>{Math.round((currentStep / totalSteps) * 100)}% COMPLETED</span>
              </div>

              {/* Progress Bar Line */}
              <div className="w-full h-2 bg-black/10 overflow-hidden rounded-none mb-6">
                <div
                  className="h-full bg-[#2554E8] transition-all duration-500 ease-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>

              {/* Step Navigation Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {stepTitles.map((title, idx) => {
                  const stepNum = idx + 1;
                  const isCompleted = currentStep > stepNum;
                  const isCurrent = currentStep === stepNum;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (isCompleted) setCurrentStep(stepNum);
                      }}
                      disabled={!isCompleted && !isCurrent}
                      className={`p-3 font-mono text-[11px] font-bold text-left border transition-all duration-300 flex items-center justify-between ${
                        isCurrent
                          ? "bg-[#111827] text-white border-[#111827]"
                          : isCompleted
                          ? "bg-white text-[#2554E8] border-[#2554E8] cursor-pointer"
                          : "bg-black/[0.03] text-neutral-400 border-black/10 cursor-not-allowed"
                      }`}
                    >
                      <span className="truncate">0{stepNum} / {title.split(" ")[0]}</span>
                      {isCompleted && <Check size={14} className="shrink-0 text-[#2554E8]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Form Container */}
          {submitted ? (
            /* Interactive Receipt Screen */
            <div className="bg-[#F4F0EA]/95 backdrop-blur-md border border-black/10 p-8 sm:p-14 lg:p-16 text-center max-w-3xl mx-auto shadow-xl">
              <div className="w-16 h-16 rounded-full bg-[#2554E8] text-white flex items-center justify-center mx-auto mb-6 shadow-xl">
                <CheckCircle2 size={36} />
              </div>

              <span className="font-mono text-xs font-extrabold text-[#2554E8] uppercase tracking-widest block mb-2">
                DISCOVERY DISPATCHED
              </span>

              <h2 className="font-sans font-black text-3xl sm:text-5xl text-[#111827] tracking-tight uppercase mb-4">
                PROPOSAL INITIATED.
              </h2>

              <p className="font-sans text-base sm:text-lg text-[#475569] max-w-xl mx-auto mb-8 leading-relaxed">
                Thank you, <strong className="text-[#111827]">{formData.name}</strong>. Your inquiry reference code is <span className="font-mono font-bold text-[#2554E8]">{referenceId || "NEX-DISCOVERY"}</span>. Our founders will review your responses and reach out within 24 hours.
              </p>

              {/* Summary Table */}
              <div className="p-6 bg-white/80 border border-black/10 text-left font-mono text-xs space-y-3 mb-8 max-w-md mx-auto">
                <div className="flex justify-between border-b border-black/10 pb-2">
                  <span className="text-neutral-500">CLIENT EMAIL</span>
                  <span className="font-bold text-[#111827]">{formData.email}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-2">
                  <span className="text-neutral-500">PRIMARY GOAL</span>
                  <span className="font-bold text-[#111827]">{formData.primaryGoal}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 pb-2">
                  <span className="text-neutral-500">INVESTMENT TIER</span>
                  <span className="font-bold text-[#2554E8]">{formData.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">TARGET TIMELINE</span>
                  <span className="font-bold text-[#111827]">{formData.timeline}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                }}
                className="px-8 py-4 bg-[#111827] hover:bg-[#2554E8] text-white font-mono text-xs uppercase tracking-widest font-bold transition-all duration-300"
              >
                START A NEW DISCOVERY BRIEF
              </button>
            </div>
          ) : (
            /* STEP-BY-STEP QUESTION CONTAINERS */
            <div ref={stepContainerRef} className="bg-[#F4F0EA]/95 backdrop-blur-md border border-black/10 p-8 sm:p-12 lg:p-14 shadow-sm">
              
              {/* Validation Error Message */}
              {stepError && (
                <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 text-rose-700 font-mono text-xs font-bold uppercase tracking-wider">
                  ⚠️ {stepError}
                </div>
              )}

              {/* QUESTION CONTAINER 01: Client Profile */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between pb-6 border-b border-black/10">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#2554E8] uppercase tracking-widest block mb-1">
                        QUESTION 01 OF 05
                      </span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#111827] uppercase tracking-tight">
                        CLIENT PROFILE & CONTACT DETAILS
                      </h3>
                    </div>
                    <User size={28} className="text-[#2554E8] hidden sm:block" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                        FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Hemanth Kumar"
                        className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                        WORK EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="hemanth@company.com"
                        className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                        DIRECT PHONE / WHATSAPP (OPTIONAL)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                        ORGANIZATION / BRAND NAME
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company Name Ltd."
                        className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                        CURRENT WEBSITE / APP URL (IF APPLICABLE)
                      </label>
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        placeholder="https://yourcompany.com"
                        className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* QUESTION CONTAINER 02: Required Disciplines */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between pb-6 border-b border-black/10">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#2554E8] uppercase tracking-widest block mb-1">
                        QUESTION 02 OF 05
                      </span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#111827] uppercase tracking-tight">
                        REQUIRED DISCIPLINES & SCOPE
                      </h3>
                    </div>
                    <Sliders size={28} className="text-[#2554E8] hidden sm:block" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      "Brand Positioning & Strategy",
                      "Logo & Visual Identity System",
                      "Web & Mobile UI/UX Design",
                      "Frontend Motion & Next.js Architecture",
                      "Full-Stack Web App Development",
                      "Growth Funnel Strategy",
                      "Social Media & Campaign Creatives",
                      "AI Automation & System Integration",
                      "Performance & SEO Infrastructure",
                    ].map((service) => {
                      const isSelected = formData.services.includes(service);

                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => toggleService(service)}
                          className={`p-5 font-sans font-bold text-sm text-left border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-[#2554E8] text-white border-[#2554E8] shadow-md"
                              : "bg-white text-[#111827] border-black/10 hover:border-black/30"
                          }`}
                        >
                          <span>{service}</span>
                          <div
                            className={`w-5 h-5 border flex items-center justify-center ${
                              isSelected ? "bg-white border-white text-[#2554E8]" : "border-neutral-400"
                            }`}
                          >
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUESTION CONTAINER 03: Primary Business Goals */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between pb-6 border-b border-black/10">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#2554E8] uppercase tracking-widest block mb-1">
                        QUESTION 03 OF 05
                      </span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#111827] uppercase tracking-tight">
                        PRIMARY BUSINESS GOALS & AUDIENCE
                      </h3>
                    </div>
                    <Target size={28} className="text-[#2554E8] hidden sm:block" />
                  </div>

                  <div className="space-y-8">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-4">
                        WHAT IS THE PRIMARY GOAL FOR THIS ENGAGEMENT?
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          "🚀 Launch a New Venture",
                          "⚡ Re-architect Existing Product",
                          "📈 Scale Conversion & Revenue",
                          "🎨 Elevate Brand Craft & Perception",
                        ].map((goal) => {
                          const isSelected = formData.primaryGoal === goal;

                          return (
                            <button
                              type="button"
                              key={goal}
                              onClick={() => setFormData({ ...formData, primaryGoal: goal })}
                              className={`p-5 font-sans font-bold text-sm text-center border transition-all duration-300 cursor-pointer ${
                                isSelected
                                  ? "bg-[#111827] text-white border-[#111827]"
                                  : "bg-white text-[#111827] border-black/10 hover:border-black/30"
                              }`}
                            >
                              {goal}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                        DESCRIBE YOUR TARGET AUDIENCE / USERS
                      </label>
                      <input
                        type="text"
                        value={formData.targetAudience}
                        onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                        placeholder="e.g. Enterprise SaaS buyers, Tech Founders, Gen-Z D2C shoppers..."
                        className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* QUESTION CONTAINER 04: Budget & Timeline */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between pb-6 border-b border-black/10">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#2554E8] uppercase tracking-widest block mb-1">
                        QUESTION 04 OF 05
                      </span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#111827] uppercase tracking-tight">
                        BUDGET TIER & TARGET TIMELINE
                      </h3>
                    </div>
                    <DollarSign size={28} className="text-[#2554E8] hidden sm:block" />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Budget Selector */}
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-4">
                        ESTIMATED INVESTMENT BUDGET
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {["< $20k", "$20k – $40k", "$40k – $80k", "$80k – $150k+"].map((b) => {
                          const isSelected = formData.budget === b;

                          return (
                            <button
                              type="button"
                              key={b}
                              onClick={() => setFormData({ ...formData, budget: b })}
                              className={`p-4 font-mono text-xs font-extrabold text-center border transition-all duration-300 cursor-pointer ${
                                isSelected
                                  ? "bg-[#2554E8] text-white border-[#2554E8]"
                                  : "bg-white text-[#111827] border-black/10 hover:border-black/30"
                              }`}
                            >
                              {b}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline Selector */}
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-4">
                        DESIRED LAUNCH TIMELINE
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {[
                          "ASAP (Within 4 Weeks)",
                          "1–2 Months",
                          "Q4 2026 / Q1 2027",
                          "Flexible / Exploratory",
                        ].map((t) => {
                          const isSelected = formData.timeline === t;

                          return (
                            <button
                              type="button"
                              key={t}
                              onClick={() => setFormData({ ...formData, timeline: t })}
                              className={`p-4 font-mono text-xs font-extrabold text-center border transition-all duration-300 cursor-pointer ${
                                isSelected
                                  ? "bg-[#111827] text-white border-[#111827]"
                                  : "bg-white text-[#111827] border-black/10 hover:border-black/30"
                              }`}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* QUESTION CONTAINER 05: Brief & Vision */}
              {currentStep === 5 && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between pb-6 border-b border-black/10">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#2554E8] uppercase tracking-widest block mb-1">
                        QUESTION 05 OF 05
                      </span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#111827] uppercase tracking-tight">
                        PROJECT BRIEF & INSPIRATION
                      </h3>
                    </div>
                    <FileText size={28} className="text-[#2554E8] hidden sm:block" />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                        PROJECT BRIEF & VISION NARRATIVE *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.projectOverview}
                        onChange={(e) => setFormData({ ...formData, projectOverview: e.target.value })}
                        placeholder="Please describe what you are building, key features required, bottlenecks, and your vision for success..."
                        className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                        REFERENCE WEBSITES / BRANDS YOU ADMIRE (OPTIONAL)
                      </label>
                      <input
                        type="text"
                        value={formData.referenceLinks}
                        onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                        placeholder="e.g. apple.com, stripe.com, Linear, Vercel..."
                        className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] placeholder:text-neutral-400 focus:outline-none focus:border-[#2554E8] text-sm font-medium"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-2">
                        HOW DID YOU HEAR ABOUT ONE NEXUS?
                      </label>
                      <select
                        value={formData.referralSource}
                        onChange={(e) => setFormData({ ...formData, referralSource: e.target.value })}
                        className="w-full px-5 py-4 bg-white border border-black/15 text-[#111827] focus:outline-none focus:border-[#2554E8] text-sm font-bold"
                      >
                        <option value="Awwwards / Design Showcase">Awwwards / Design Showcase</option>
                        <option value="Direct Founder Referral">Direct Founder Referral</option>
                        <option value="LinkedIn / X (Twitter)">LinkedIn / X (Twitter)</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Other / Industry Reputation">Other / Industry Reputation</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Action Buttons Footer */}
              <div className="pt-8 border-t border-black/10 mt-10 flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-4 bg-white hover:bg-black/5 text-[#111827] font-mono text-xs font-bold uppercase tracking-widest border border-black/15 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    <span>PREVIOUS STEP</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-4 bg-[#111827] hover:bg-[#2554E8] text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <span>CONTINUE TO QUESTION 0{currentStep + 1}</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-[#2554E8] hover:bg-[#1d42c0] disabled:bg-[#2554E8]/60 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all duration-300 shadow-xl cursor-pointer disabled:cursor-wait"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        <span>TRANSMITTING DISCOVERY BRIEF...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>TRANSMIT DISCOVERY BRIEF TO FOUNDERS</span>
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>
          )}

          {/* Bottom Direct Channels & Hub Info */}
          <div className="mt-20 pt-14 border-t border-black/10 grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs">
            {/* Direct Email */}
            <div className="p-8 bg-[#F4F0EA]/90 border border-black/10 flex flex-col justify-between">
              <div>
                <span className="text-[#2554E8] font-bold block mb-2">DIRECT EMAIL</span>
                <a href="mailto:hello@onenexus.studio" className="font-sans font-black text-xl text-[#111827] hover:text-[#2554E8] transition-colors">
                  hello@onenexus.studio
                </a>
              </div>
              <button
                onClick={handleCopyEmail}
                className="mt-6 py-3 px-4 bg-white hover:bg-neutral-50 text-[#111827] font-bold border border-black/10 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                <span>{copied ? "COPIED" : "COPY EMAIL ADDRESS"}</span>
              </button>
            </div>

            {/* Global Studio Clocks */}
            <div className="p-8 bg-[#F4F0EA]/90 border border-black/10 space-y-4">
              <span className="text-[#2554E8] font-bold block mb-4">GLOBAL STUDIO CLOCKS</span>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="font-bold text-[#111827]">LONDON</span>
                <span>{times.london} GMT</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span className="font-bold text-[#111827]">NEW YORK</span>
                <span>{times.ny} EST</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-[#111827]">TOKYO</span>
                <span>{times.tokyo} JST</span>
              </div>
            </div>

            {/* Studio Guarantee */}
            <div className="p-8 bg-[#F4F0EA]/90 border border-black/10 flex flex-col justify-between">
              <div>
                <span className="text-[#2554E8] font-bold block mb-2">STUDIO GUARANTEE</span>
                <p className="font-sans text-xs text-[#475569] leading-relaxed">
                  100% Senior partner attention on every project. Strict NDA compliance and full intellectual property transfer guaranteed.
                </p>
              </div>
              <div className="mt-4 text-[10px] text-neutral-500 font-bold uppercase">
                ONE NEXUS STUDIO • MAYFAIR LONDON
              </div>
            </div>
          </div>

        </main>

        {/* Footer */}
        <footer className="w-full bg-[#EFECE6] border-t border-black/10 py-8 px-4 sm:px-8 lg:px-12 font-mono text-xs text-neutral-500">
          <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© 2026 oneNexus Studio. All rights reserved.</div>
            <Link href="/" className="hover:text-[#111827] transition-colors font-bold">
              RETURN TO HOMEPAGE ↗
            </Link>
          </div>
        </footer>
      </div>
    </>
  );
}
