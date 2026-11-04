import type { NextApiRequest, NextApiResponse } from "next";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequestBody {
  message: string;
  history?: ChatMessage[];
}

interface ChatApiResponse {
  success: boolean;
  reply: string;
  suggestedActions?: string[];
  provider?: "openai" | "gemini" | "knowledge-base";
  error?: string;
}

const ONENEXUS_SYSTEM_PROMPT = `You are Nexus AI, the official intelligent digital growth assistant and strategic advisor for OneNexus Studio (onenexus.studio).

You possess exhaustive, deeply detailed knowledge of the entire OneNexus platform, its philosophy, methodology, service architecture, deliverables, target audiences, and technical stack.

==================================================
1. CORE AGENCY PROFILE & ETHOS
==================================================
• Agency: OneNexus Studio — "Your Digital Growth Partner".
• Purpose: Level the playing field for ambitious business owners by engineering world-class digital presences that drive measurable commercial revenue.
• Operational Reach: Clients served across all 28 states & union territories in India (Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Ahmedabad, Kolkata, Jaipur, Kochi, Chandigarh, Lucknow, Indore, etc.) and global founders via high-touch remote collaboration.
• Official Email: onenexus789@gmail.com / hello@onenexus.studio
• Direct Founder Escalation: Immediate WhatsApp channel available via the bottom-right floating dock and /contact.

OPERATIONAL ETHOS:
1. "Understand Before We Recommend": We never sell generic off-the-shelf templates. Every engagement begins with a root-cause business audit into unit economics and market gaps.
2. "Lean Solutions, High Impact": 0% technical bloat, no corporate jargon or agency runaround.
3. "Direct Senior Partner Attention": Guaranteed <24h SLA. Zero junior hand-offs or account coordinator middlemen. Direct conduit to studio leadership via WhatsApp and Slack.
4. "Conversion First": Every pixel, headline, and animation is mathematically calibrated for customer acquisition, authority perception, and commercial ROI.

==================================================
2. WHO WE HELP (AUDIENCE PILLARS)
==================================================
1. Small Businesses: Established & growing local entities transitioning online, automating customer inquiry capture, and dominating Google Maps / local search.
2. Aspiring Entrepreneurs: Visionaries & idea-stage founders turning raw concepts into launch-ready MVPs, distinct brand identities, and rapid go-to-market execution.
3. Women Entrepreneurs: Dedicated digital growth partnership, strategic branding, social expansion, and hands-on guidance to help women-led ventures thrive nationwide.

==================================================
3. CORE CAPABILITIES & SERVICE SUITE
==================================================
01. AI Services & Automation:
    - Smart AI integration & custom business workflows to eliminate manual busywork.
    - Custom business AI assistants, automated inquiry routing, trend telemetry, and smart copywriting engines.
    - Tech: OpenAI API, Python, LangChain, Zapier Automation, Custom LLM Workflows.
    - Impact: 10x Operational Speed.

02. Branding & Visual Craft:
    - Distinct logo design & vector marks, comprehensive brand guidelines, typography architecture, harmonious color systems.
    - Strategic brand positioning, messaging frameworks, pitch decks, and social media asset kits.
    - Tech: Figma Design Systems, Adobe Creative Suite, Vector Guidelines.
    - Impact: Instant market credibility & elevated perceived pricing power.

03. Social Media Marketing & Content Engine:
    - High-retention vertical reels (4K cuts), YouTube Shorts, and viral hook copywriting.
    - Educational multi-slide carousels, peak engagement timetable publishing, trend audio synchronization, and full profile bio curation.
    - Tech: Premiere Pro, After Effects, Meta Business Suite.
    - Impact: Average 3.4x organic reach multiplier within 60 days.

04. Website Engineering & UX Craft:
    - High-converting responsive websites engineered for speed, sub-second loads, and high checkout/lead capture conversion.
    - Mobile-first responsive UI/UX architecture, search authority SEO setup, and smooth micro-animations.
    - Tech: Next.js 16, React 19, Tailwind CSS, GSAP & Lenis Smooth Motion.
    - Impact: 99+ Lighthouse performance scores, typical 7–14 day launch turnaround.

05. Digital Business Setup:
    - Complete digital infrastructure: Google Business Profile creation & verification, Google Maps presence, local SEO citation indexing.
    - Professional domain registration & Google Workspace business emails (name@brand.com).
    - Tech: Google Business API, Google Workspace, Local SEO Engine.
    - Impact: Immediate local search discovery and customer trust.

==================================================
4. HOW WE WORK (5-STAGE METHODOLOGY)
==================================================
• Step 01 - Idea / Discovery (Share Your Ambition): Deep-dive audit into business goals, unit economics, audience, and bottlenecks.
• Step 02 - Understand / Research (Analyze & Map Strategy): Competitor landscape evaluation, gap analysis, and tailored growth roadmap.
• Step 03 - Build / Creation (Craft Brand & Website): Visual identity, high-converting Next.js website, and design assets.
• Step 04 - Launch / Deployment (Go Live Across Channels): Deployment, Core Web Vitals speed verification, Google Business profile live, multi-channel rollout.
• Step 05 - Grow / Expansion (Continuous Monthly Growth): Weekly video releases, CRO sprints, performance telemetry, and community retention.

==================================================
5. ONGOING PARTNERSHIP ENGINE (MONTHLY RETAINERS)
==================================================
• Zero long-term contracts or lock-ins: Scale up, pause, or adjust anytime.
• 5 Modular Modules:
  1. Video Overviews & Reels Engine: 8-12 bespoke short-form videos/reels monthly with motion typography and sound design.
  2. Full-Service Profile Management: Daily posting, peak engagement timetable, grid harmony, DM & comment routing.
  3. Real-Time Telemetry & CRO Audits: Heatmaps, user journey tracking, form friction elimination, A/B split-tests (+38.4% average conversion lift).
  4. Campaign Scaling & Offer Architecture: High-ticket launch blueprints, rapid landing page scaling, bi-weekly senior advisory calls (4.2x target ROAS).
  5. Omnichannel Retention & Automated Nurture: Email onboarding sequences, automated 5-star review collection engines, customer LTV maximization.

==================================================
6. WHY ONENEXUS VS ALTERNATIVES
==================================================
• Vs Traditional Agencies: No bloated account manager chains, no junior delegation, no 6-12 month lock-in contracts, 3x faster turnaround.
• Vs Freelancers: Full-stack cohesive capability (design + code + AI + marketing), enterprise-grade reliability, guaranteed SLAs, end-to-end accountability.

==================================================
7. APPLICATION FEATURES & INTERACTIVE TOOLS
==================================================
• Interactive Services Bundle Builder: Visitors can click the "+" button on any service card across the website to add services into their floating inquiry tray (FloatingInquiryBar) and carry them directly into /contact with one click!
• Floating Action Hub: Unified dock in the bottom-right corner featuring instant WhatsApp founder chat and the Nexus AI chatbot.
• Contact Form (/contact): Structured multi-step project scope intake with budget tiers and timeline selection.

==================================================
8. RESPONSE GUIDELINES
==================================================
• Persona: Nexus AI — sharp, articulate, energetic, authoritative, and helpful.
• Formatting: Use clean markdown with bold highlights and concise bullet points. Keep answers punchy (2-4 brief paragraphs or lists).
• Pricing Inquiries: Emphasize that our pricing is transparent and requirement-based with upfront itemized quotes. Encourage chatting directly with senior leadership on WhatsApp or submitting the inquiry form at /contact for an instant audit.
• Always suggest 2-4 natural next steps for the user.`;

// Intelligent Rule-Based Fallback Engine (Covers 100% of Application Knowledge)
function getKnowledgeBaseResponse(userQuery: string): { reply: string; suggestedActions: string[] } {
  const q = userQuery.toLowerCase().trim();

  // 1. Greeting
  if (/^(hi|hello|hey|hola|greetings|good morning|good evening|sup)/i.test(q)) {
    return {
      reply:
        "Hello! Welcome to OneNexus Studio. I am **Nexus AI** — your digital growth advisor.\n\nWhether you need high-converting website design, distinct branding, monthly reels, custom AI automation, or a complete digital business setup across India, I am here to help. What ambition are you looking to launch or scale?",
      suggestedActions: [
        "What services do you offer?",
        "Who do you help?",
        "How do monthly retainers work?",
        "Chat with leadership on WhatsApp",
      ],
    };
  }

  // 2. Who We Help / Target Audience
  if (
    q.includes("who do you help") ||
    q.includes("target audience") ||
    q.includes("client") ||
    q.includes("women entrepreneur") ||
    q.includes("small business") ||
    q.includes("aspiring founder") ||
    q.includes("entrepreneur")
  ) {
    return {
      reply:
        "OneNexus specifically empowers three core audience pillars across India and globally:\n\n" +
        "1. **Small Businesses**: Established & local enterprises looking to transition online, dominate Google Maps/local search, and automate customer inquiry capture.\n" +
        "2. **Aspiring Entrepreneurs**: Idea-stage founders transforming raw concepts into launch-ready digital products, distinct brand identities, and rapid market validation.\n" +
        "3. **Women Entrepreneurs**: Founders and creators receiving a dedicated digital co-pilot for high-impact branding, social media expansion, and strategic advisory.\n\n" +
        "Every client engagement is directed by senior partners with guaranteed <24h SLAs and zero junior hand-offs.",
      suggestedActions: [
        "Explore Website Design",
        "See How We Work",
        "Build a custom bundle",
        "Chat on WhatsApp",
      ],
    };
  }

  // 3. How We Work / Process / Steps
  if (
    q.includes("how do you work") ||
    q.includes("process") ||
    q.includes("methodology") ||
    q.includes("step") ||
    q.includes("timeline") ||
    q.includes("turnaround") ||
    q.includes("how long")
  ) {
    return {
      reply:
        "We operate on a transparent **5-Stage Linear Methodology**:\n\n" +
        "• **Step 01: Share Your Ambition (Discovery)** — Deep-dive audit into your business goals, target audience, and bottlenecks.\n" +
        "• **Step 02: Analyze & Map Strategy (Research)** — Competitive landscape evaluation, market positioning, and a tailored growth roadmap.\n" +
        "• **Step 03: Craft Brand & Website (Build)** — Distinct visual identity and high-converting Next.js web architecture.\n" +
        "• **Step 04: Go Live Across Channels (Launch)** — Full deployment with sub-second speeds, verified SEO, and Google Business setup.\n" +
        "• **Step 05: Continuous Monthly Growth (Scale)** — Ongoing weekly video drops, CRO audits, and retention workflows.\n\n" +
        "Typical websites launch in **7–14 days** with continuous partner-level communication.",
      suggestedActions: [
        "Discuss your project on WhatsApp",
        "Explore Monthly retainers",
        "Open Contact Form",
      ],
    };
  }

  // 4. Why OneNexus / Differentiators
  if (
    q.includes("why onenexus") ||
    q.includes("why choose") ||
    q.includes("difference") ||
    q.includes("competitor") ||
    q.includes("vs agency") ||
    q.includes("vs freelancer")
  ) {
    return {
      reply:
        "Here is why ambitious founders partner with **OneNexus** instead of bloated agencies or fragmented freelancers:\n\n" +
        "• **Understand Before We Recommend**: Zero generic templates. Everything is customized to your exact commercial model.\n" +
        "• **Direct Partner Access**: Direct WhatsApp & Slack access to senior leadership with guaranteed <24h response SLAs — zero junior delegation.\n" +
        "• **Lean Solutions, High Impact**: Zero technical bloat or corporate runaround. We ship production-grade digital assets 3x faster.\n" +
        "• **Conversion First**: Every pixel and copy hook is mathematically calibrated for customer acquisition and lower CAC.\n" +
        "• **Zero Lock-In Retainers**: Flexible monthly growth support that scales up or down as your business expands.",
      suggestedActions: [
        "Chat with leadership on WhatsApp",
        "View Services Overview",
        "Schedule a discovery call",
      ],
    };
  }

  // 5. Pricing / Cost / Rates
  if (
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("quote") ||
    q.includes("pricing") ||
    q.includes("how much") ||
    q.includes("rate") ||
    q.includes("fee") ||
    q.includes("budget")
  ) {
    return {
      reply:
        "At OneNexus, we adhere strictly to: **Understand Before We Recommend**.\n\n" +
        "We never push rigid, pre-packaged retainers with hidden fees. Our pricing is **modular and requirement-based** — whether you need a one-time high-converting website launch, complete visual branding, Google Business setup, or an ongoing monthly growth retainer.\n\n" +
        "We provide transparent, itemized quotes upfront. Would you like a complimentary growth audit and bespoke project estimate? Connect directly with leadership on WhatsApp for an immediate assessment.",
      suggestedActions: [
        "Get instant quote on WhatsApp",
        "Explore Monthly Growth retainers",
        "Fill out the inquiry form",
      ],
    };
  }

  // 6. Monthly Growth Support / Ongoing Retainers
  if (
    q.includes("retainer") ||
    q.includes("monthly") ||
    q.includes("partnership") ||
    q.includes("growth engine") ||
    q.includes("ongoing") ||
    q.includes("support")
  ) {
    return {
      reply:
        "Our **Ongoing Partnership Engine** delivers sustained brand momentum without in-house hiring overhead:\n\n" +
        "• **Video Overviews & Reels Engine**: 8-12 custom 4K vertical reels/shorts per month with dynamic subtitles, motion cuts, and trend audio.\n" +
        "• **Full-Service Profile Management**: Daily posting timetables, strategic hashtag clusters, and community DM lead routing.\n" +
        "• **Real-Time Telemetry & CRO Audits**: Heatmaps, checkout funnel tuning, and A/B split-tests (+38.4% average conversion lift).\n" +
        "• **Campaign Scaling & Offer Architecture**: High-ticket launch blueprints and bi-weekly senior advisory calls (4.2x target ROAS).\n" +
        "• **Omnichannel Retention**: Automated email onboarding sequences and automated 5-star review collection engines.\n\n" +
        "All monthly plans feature **zero long-term lock-ins** — cancel, pause, or scale anytime.",
      suggestedActions: [
        "Build a monthly plan on WhatsApp",
        "What services do you offer?",
        "Open Contact Form",
      ],
    };
  }

  // 7. Website Design / Development
  if (
    q.includes("web") ||
    q.includes("site") ||
    q.includes("landing page") ||
    q.includes("frontend") ||
    q.includes("ui") ||
    q.includes("ux") ||
    q.includes("next.js") ||
    q.includes("developer")
  ) {
    return {
      reply:
        "OneNexus designs and engineers **high-converting, responsive websites** calibrated for speed, aesthetics, and measurable commercial conversion:\n\n" +
        "• **Bespoke Responsive UI/UX**: Distinct layout architecture tailored to your brand identity.\n" +
        "• **Sub-Second Core Web Vitals**: Engineered on Next.js 16, React 19, and Tailwind CSS with 99+ Lighthouse performance scores.\n" +
        "• **Conversion Funnels & E-Commerce**: Frictionless lead intake forms and checkout workflows.\n" +
        "• **Built-In Search Authority**: Comprehensive on-page SEO, Open Graph tags, and mobile-first responsiveness.\n\n" +
        "Typical delivery timeframe: **7–14 days**.",
      suggestedActions: [
        "Get a website quote on WhatsApp",
        "Explore Branding services",
        "Open Contact Form",
      ],
    };
  }

  // 8. Branding / Logo / Visual Identity
  if (
    q.includes("brand") ||
    q.includes("logo") ||
    q.includes("identity") ||
    q.includes("guideline") ||
    q.includes("typography") ||
    q.includes("palette")
  ) {
    return {
      reply:
        "Our **Branding & Visual Identity** service transforms your ambition into an authoritative, distinct market presence:\n\n" +
        "• Custom logo marks & vector assets for all screen and print applications.\n" +
        "• Comprehensive brand guidelines & typography systems.\n" +
        "• Harmonious color palettes & aesthetic design systems.\n" +
        "• Marketing collateral, pitch decks & social asset kits.\n\n" +
        "We craft identities that build instant credibility and command premium pricing power.",
      suggestedActions: [
        "Inquire about Branding package",
        "Chat with team on WhatsApp",
        "View Website Design",
      ],
    };
  }

  // 9. Social Media / Reels / Video Creation
  if (
    q.includes("social") ||
    q.includes("reel") ||
    q.includes("instagram") ||
    q.includes("video") ||
    q.includes("post") ||
    q.includes("content") ||
    q.includes("tiktok") ||
    q.includes("shorts")
  ) {
    return {
      reply:
        "Our **Social Media & Content Engine** captures feed attention and compounds your organic reach:\n\n" +
        "• Custom 4K vertical reels & YouTube shorts with dynamic subtitles & kinetic motion.\n" +
        "• Multi-slide educational and product carousels designed for high bookmark and share rates.\n" +
        "• Data-backed viral hook scripting and trend audio synchronization.\n" +
        "• Peak engagement timetable publishing & full profile curation.\n\n" +
        "Clients experience an average **3.4x organic reach multiplier** within 60 days.",
      suggestedActions: [
        "Start social engine on WhatsApp",
        "Explore Monthly retainers",
        "Contact the team",
      ],
    };
  }

  // 10. AI Services & Automation
  if (
    q.includes("ai") ||
    q.includes("automation") ||
    q.includes("workflow") ||
    q.includes("bot") ||
    q.includes("assistant") ||
    q.includes("llm")
  ) {
    return {
      reply:
        "We build practical **AI Solutions & Workflows** engineered for tangible commercial ROI:\n\n" +
        "• **Custom Business Workflows**: Lead intake qualification, routing, and CRM sync automation.\n" +
        "• **AI Customer Assistants**: 24/7 intelligent brand advisors (just like Nexus AI!).\n" +
        "• **AI Copywriting & Repurposing Toolkits**: Automated content generation calibrated to your brand voice.\n" +
        "• **Trend Telemetry Pipelines**: Automated competitor intelligence and keyword surveillance.\n\n" +
        "Zero technical bloat — only clean automations that save 15+ hours of manual overhead weekly.",
      suggestedActions: [
        "Discuss AI solutions on WhatsApp",
        "Explore all services",
        "Schedule consultation",
      ],
    };
  }

  // 11. Digital Business Setup (Google Business, Email, Domain)
  if (
    q.includes("digital setup") ||
    q.includes("google business") ||
    q.includes("gmb") ||
    q.includes("map") ||
    q.includes("local seo") ||
    q.includes("domain") ||
    q.includes("workspace")
  ) {
    return {
      reply:
        "Our **Digital Business Setup** establishes your complete digital infrastructure from day one:\n\n" +
        "• **Google Business Profile**: Creation, verification, and local search ranking optimization.\n" +
        "• **Google Maps Presence**: Local directory citations to capture nearby customer searches.\n" +
        "• **Domain & Email Setup**: Professional Google Workspace email infrastructure (e.g. hello@yourbrand.com).\n" +
        "• **Digital Onboarding**: Full handover and guidance so you own and control 100% of your digital assets.",
      suggestedActions: [
        "Setup Google Business on WhatsApp",
        "Explore Website Design",
        "Open Contact Form",
      ],
    };
  }

  // 12. Location / Geographic Coverage (India & Global)
  if (
    q.includes("where are you") ||
    q.includes("location") ||
    q.includes("city") ||
    q.includes("india") ||
    q.includes("bengaluru") ||
    q.includes("mumbai") ||
    q.includes("delhi") ||
    q.includes("hyderabad") ||
    q.includes("chennai") ||
    q.includes("remote")
  ) {
    return {
      reply:
        "OneNexus serves clients across **all 28 states and union territories in India** (including Bengaluru, Mumbai, Delhi NCR, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, Jaipur, Kochi, Chandigarh, and beyond) as well as global businesses.\n\n" +
        "We operate through a high-touch remote model with real-time Slack/WhatsApp conduits and video strategy calls, ensuring faster execution than traditional local agencies.",
      suggestedActions: [
        "Chat with leadership on WhatsApp",
        "View Services Overview",
        "Open Contact Form",
      ],
    };
  }

  // 13. Contact Details / How to Reach Leadership
  if (
    q.includes("contact") ||
    q.includes("whatsapp") ||
    q.includes("email") ||
    q.includes("phone") ||
    q.includes("call") ||
    q.includes("talk") ||
    q.includes("founder") ||
    q.includes("reach") ||
    q.includes("hire")
  ) {
    return {
      reply:
        "You can connect directly with the OneNexus leadership team through any of the following channels:\n\n" +
        "• **WhatsApp Direct**: Tap the floating emerald WhatsApp button in the bottom-right corner for instant messaging.\n" +
        "• **Official Email**: onenexus789@gmail.com / hello@onenexus.studio (Response guaranteed in <24 hours).\n" +
        "• **Contact Page**: Fill out our structured project inquiry form at [/contact](/contact).\n" +
        "• **Free Discovery Audit**: We review your business model and deliver a custom roadmap before any commitment.",
      suggestedActions: [
        "Chat directly on WhatsApp",
        "Open Contact Page",
        "What services do you offer?",
      ],
    };
  }

  // 14. Interactive Bundle Builder Feature
  if (q.includes("bundle") || q.includes("inquiry bar") || q.includes("tray") || q.includes("select service")) {
    return {
      reply:
        "You can build your own custom project package directly on the site!\n\n" +
        "1. Browse any service card on our Services section.\n" +
        "2. Click the **'+' button** to add that service to your floating inquiry tray at the bottom.\n" +
        "3. Review your selected bundle and tap **'Complete Inquiry'** to pre-fill your inquiry form on /contact.\n\n" +
        "All services are 100% modular, so you only pay for what your business actually needs.",
      suggestedActions: [
        "Explore Services",
        "Chat on WhatsApp",
        "Open Contact Form",
      ],
    };
  }

  // Default Fallback
  return {
    reply:
      "Thank you for reaching out! OneNexus is your dedicated digital growth partner specializing in **AI Workflows, High-Converting Web Design, Branding, Social Media Content Engines, and Monthly Growth Retainers**.\n\n" +
      "Every engagement is directed by senior partners with guaranteed <24h SLAs and zero junior hand-offs.\n\n" +
      "Could you tell me a little more about your business or the specific service you are exploring?",
    suggestedActions: [
      "What services do you offer?",
      "Who do you help?",
      "How do monthly retainers work?",
      "Chat with leadership on WhatsApp",
    ],
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatApiResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      reply: "Method not allowed. Use POST.",
    });
  }

  const { message, history = [] }: ChatRequestBody = req.body || {};

  if (!message || !message.trim()) {
    return res.status(400).json({
      success: false,
      reply: "Message cannot be empty.",
    });
  }

  // 1. Try Google Gemini API first if GEMINI_API_KEY is available (active & funded)
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim()) {
    const candidateModels = ["gemini-3.5-flash", "gemini-3.5-flash-lite"];
    const contents = [
      {
        role: "user",
        parts: [{ text: `${ONENEXUS_SYSTEM_PROMPT}\n\nUser Question: ${message}` }],
      },
    ];

    for (const model of candidateModels) {
      try {
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY.trim()}`;
        const geminiRes = await fetch(geminiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

          if (reply) {
            return res.status(200).json({
              success: true,
              reply,
              suggestedActions: [
                "Chat with leadership on WhatsApp",
                "Explore all capabilities",
                "Schedule a discovery call",
              ],
              provider: "gemini",
            });
          }
        }
      } catch (err) {
        // Fall through to next model if network interruption occurs
      }
    }
  }

  // 2. Try OpenAI API if OPENAI_API_KEY is available
  if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.trim()) {
    try {
      const messages = [
        { role: "system", content: ONENEXUS_SYSTEM_PROMPT },
        ...history.slice(-6).map((msg) => ({
          role: msg.role === "assistant" ? "assistant" : "user",
          content: msg.content,
        })),
        { role: "user", content: message },
      ];

      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY.trim()}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          temperature: 0.7,
          max_tokens: 450,
        }),
      });

      if (openaiRes.ok) {
        const data = await openaiRes.json();
        const reply = data.choices?.[0]?.message?.content?.trim();

        if (reply) {
          return res.status(200).json({
            success: true,
            reply,
            suggestedActions: [
              "Chat with leadership on WhatsApp",
              "Explore all capabilities",
              "Schedule a discovery call",
            ],
            provider: "openai",
          });
        }
      } else {
        const errText = await openaiRes.text();
        if (errText.includes("insufficient_quota") || errText.includes("credit_balance_exhausted")) {
          console.warn("[Chat API] OpenAI credit balance exhausted. Falling back to built-in Knowledge Base.");
        } else {
          console.warn("[Chat API] OpenAI returned status", openaiRes.status);
        }
      }
    } catch (err) {
      console.warn("[Chat API] OpenAI call failed, falling back to Knowledge Engine:", err);
    }
  }

  // 3. Fallback: Built-in Knowledge Base Engine (Guarantees 100% reliable response instantly)
  const kb = getKnowledgeBaseResponse(message);
  return res.status(200).json({
    success: true,
    reply: kb.reply,
    suggestedActions: kb.suggestedActions,
    provider: "knowledge-base",

  });
}
