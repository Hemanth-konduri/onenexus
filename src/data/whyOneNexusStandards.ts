export interface ProofPoint {
  title: string;
  description: string;
  metric: string;
}

export interface StandardComparison {
  agencyTrap: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
  oneNexusStandard: {
    title: string;
    description: string;
    bulletPoints: string[];
  };
}

export interface CaseStudy {
  clientType: string;
  challenge: string;
  solution: string;
  resultMetric: string;
  resultLabel: string;
}

export interface WhyOneNexusStandard {
  id: string;
  slug: string;
  num: string;
  title: string;
  station: string;
  tag: string;
  highlight: string;
  metricStat: string;
  metricLabel: string;
  videoSrc: string;
  posterImage: string;
  shortDesc: string;
  fullOverview: string;
  comparison: StandardComparison;
  proofPoints: ProofPoint[];
  caseStudy: CaseStudy;
  deliverables: string[];
  founderPledge: string;
}

export const whyOneNexusStandards: WhyOneNexusStandard[] = [
  {
    id: "01",
    slug: "understand-before-recommend",
    num: "01",
    title: "Understand Before We Recommend",
    station: "COMMERCIAL AUDIT FIRST",
    tag: "HONEST AUDIT",
    highlight: "Root-Cause Business Analysis First. Zero Generic Packages.",
    metricStat: "100%",
    metricLabel: "Bespoke Architecture",
    videoSrc: "/videos/standard-01.mp4",
    posterImage: "/how_we_work_01.jpg",
    shortDesc:
      "We never push pre-baked packages or generic templates. We first dissect your unit economics, customer journey, and competitive landscape before architecting your digital roadmap.",
    fullOverview:
      "In an agency landscape saturated with one-size-fits-all retainer templates and high-pressure sales pitches, OneNexus operates with radical honesty. We believe that recommending technical or marketing solutions without first diagnosing unit economics, target audience psychology, and gross margins is professional malpractice. Our engagements always begin with an exhaustive root-cause commercial audit — aligning every deliverable directly with bottom-line revenue goals.",
    comparison: {
      agencyTrap: {
        title: "The Traditional Agency Trap",
        description:
          "Forcing your business into pre-packaged monthly tiers with deliverables you don't need, managed by junior account managers who have never run a commercial P&L.",
        bulletPoints: [
          "Pre-baked retainers designed to pad agency billable hours",
          "Zero investigation into your product margins or cash conversion cycle",
          "Superficial competitor analysis limited to aesthetic screenshots",
          "One-size-fits-all deliverables regardless of business model",
        ],
      },
      oneNexusStandard: {
        title: "The OneNexus Operational Standard",
        description:
          "A structured commercial diagnostics phase before any contracts or code are written, resulting in a bespoke roadmap calibrated specifically to your unit economics.",
        bulletPoints: [
          "Unit economics & margin-first digital product alignment",
          "Deep customer acquisition cost (CAC) & lifetime value (LTV) modeling",
          "Competitive moat analysis and value proposition sharpening",
          "Bespoke scope where every line item maps to commercial return",
        ],
      },
    },
    proofPoints: [
      {
        title: "Unit Economics Dissection",
        description: "We audit your price points, conversion margins, and customer lifetime value before writing code.",
        metric: "100% Tailored",
      },
      {
        title: "Audience Intent Mapping",
        description: "Granular research into what your customers search for, care about, and hesitate over.",
        metric: "Data-Backed",
      },
      {
        title: "Zero Package Bloat",
        description: "You only invest in assets that directly shorten your customer sales cycle.",
        metric: "0% Waste",
      },
    ],
    caseStudy: {
      clientType: "Direct-to-Consumer Wellness Brand",
      challenge: "Burning ad spend on a generic Shopify template that had high bounce rates and sub-1% conversion.",
      solution: "Conducted root-cause audit, rebuilt checkout narrative, and deployed high-converting editorial product pages.",
      resultMetric: "+64.2%",
      resultLabel: "Increase in Checkout Conversion Rate",
    },
    deliverables: [
      "Commercial Growth & Funnel Audit Report",
      "Ideal Customer Profile (ICP) Search Telemetry",
      "Competitor Positioning & Moat Matrix",
      "Bespoke Multi-Channel Digital Roadmap",
      "Scope & Milestone Architecture Specification",
    ],
    founderPledge:
      "We will never sell you a service, tech stack, or campaign that we wouldn't stake our own capital on. If your business isn't ready for a large web rebuild or social push, we will tell you upfront.",
  },
  {
    id: "02",
    slug: "practical-solutions-high-impact",
    num: "02",
    title: "Practical Solutions, High Impact",
    station: "ZERO TECHNICAL BLOAT",
    tag: "LEAN VELOCITY",
    highlight: "No Unnecessary Jargon. Rapid Velocity.",
    metricStat: "0%",
    metricLabel: "Technical Bloat",
    videoSrc: "/videos/standard-02.mp4",
    posterImage: "/how_we_work_02.jpg",
    shortDesc:
      "No vanity deliverables, buzzword bloat, or over-engineered technical dead-ends. We build clean, resilient digital infrastructure and high-velocity conversion funnels that advance your bottom line.",
    fullOverview:
      "Too many modern digital agencies hide behind technical buzzwords, bloated frameworks, and months of unproductive slide deck reviews. At OneNexus, we practice radical pragmatism. We believe the best code is the code that ships fast, loads in milliseconds, converts visitors, and stays maintainable without an army of expensive engineers. Every asset we construct is lean, resilient, and engineered directly to produce measurable business momentum.",
    comparison: {
      agencyTrap: {
        title: "The Traditional Agency Trap",
        description:
          "Over-engineering simple requirements with convoluted tech stacks, charging massive monthly maintenance fees, and drowning founders in technical jargon.",
        bulletPoints: [
          "Months of billable delay for simple landing page launches",
          "Fragile plugins and monolithic architectures that break constantly",
          "Concealing lack of progress behind vague technical buzzwords",
          "High lock-in maintenance retainers to make simple text updates",
        ],
      },
      oneNexusStandard: {
        title: "The OneNexus Operational Standard",
        description:
          "Lean, battle-tested modern web engineering (Next.js 16, React 19, Tailwind) that delivers sub-second load speeds and lightning-fast deployment cycles.",
        bulletPoints: [
          "Production deployment within 7 to 14 days of kickoff",
          "Sub-second Core Web Vitals speed scores (99+ on Google Lighthouse)",
          "Clean, modular architecture that you own and control completely",
          "Zero corporate jargon: clear, direct communication at every step",
        ],
      },
    },
    proofPoints: [
      {
        title: "Sub-Second Speed",
        description: "Optimized Next.js static and server rendering ensures immediate load across all devices.",
        metric: "<0.4s FCP",
      },
      {
        title: "Rapid Deployment Sprint",
        description: "Projects go from kickoff to live production in days, not quarterly cycles.",
        metric: "7-14 Days",
      },
      {
        title: "Zero Dependency Bloat",
        description: "Lightweight, cleanly audited dependencies with enterprise reliability.",
        metric: "0% Bloat",
      },
    ],
    caseStudy: {
      clientType: "Emerging B2B SaaS Startup",
      challenge: "Stuck in 4-month development limbo with a prior agency that left them with a broken, slow WordPress site.",
      solution: "Engineered high-speed custom Next.js landing page with interactive product tour in 9 days.",
      resultMetric: "9.2x",
      resultLabel: "Speed Improvement (99 Lighthouse Score)",
    },
    deliverables: [
      "Ultra-Fast Production Next.js Web Architecture",
      "Mobile-First Responsive Layout Engineering",
      "Clean Codebase Handover with 100% Client Ownership",
      "Core Web Vitals & Google Performance Telemetry",
      "Automated Continuous Deployment Pipeline",
    ],
    founderPledge:
      "We measure progress in shipped code, live URLs, and commercial inquiries — never in slide decks or meetings about meetings.",
  },
  {
    id: "03",
    slug: "direct-partner-attention",
    num: "03",
    title: "Direct Partner-Level Attention",
    station: "DIRECT SENIOR ADVISORY",
    tag: "FOUNDER ACCESS",
    highlight: "Zero Junior Hand-Offs. Rapid Turnarounds.",
    metricStat: "<24H",
    metricLabel: "Direct Founder SLA",
    videoSrc: "/videos/standard-03.mp4",
    posterImage: "/how_we_work_03.jpg",
    shortDesc:
      "You never get delegated to an inexperienced coordinator. Every founder receives direct, partner-level counsel, empathetic advisory, and rapid turnarounds across all execution phases.",
    fullOverview:
      "The classic agency bait-and-switch is infamous: you are pitched by charismatic agency founders, only to be handed off to a junior account manager who knows nothing about your business the moment the contract is signed. At OneNexus, we dismantled this broken model completely. Every engagement is personally directed, designed, and executed by senior partners with guaranteed <24-hour response SLAs on direct WhatsApp and Slack channels.",
    comparison: {
      agencyTrap: {
        title: "The Traditional Agency Trap",
        description:
          "A multi-tiered hierarchy where your requests travel through coordinators, junior designers, and interns, taking days to get basic revisions done.",
        bulletPoints: [
          "Bait-and-switch: leadership disappears immediately after signing",
          "Junior staff with zero entrepreneurial or commercial experience",
          "Tickets and email queues that take 48 to 72 hours for simple replies",
          "Frustrating communication lag that kills project momentum",
        ],
      },
      oneNexusStandard: {
        title: "The OneNexus Operational Standard",
        description:
          "Direct access to studio leadership via dedicated WhatsApp and Slack channels, with guaranteed sub-24h turnaround times and proactive strategy counsel.",
        bulletPoints: [
          "Direct conduit to senior leadership and engineering leads",
          "Guaranteed response SLA under 24 hours on all workdays",
          "Zero account manager middlemen: you speak directly to the creators",
          "Collaborative, transparent feedback loops without bureaucratic friction",
        ],
      },
    },
    proofPoints: [
      {
        title: "Zero Junior Delegation",
        description: "Your brand and website are crafted by senior professionals with proven commercial track records.",
        metric: "100% Senior",
      },
      {
        title: "Instant Founder Channels",
        description: "Direct WhatsApp and Slack conduits for lightning-fast feedback and approvals.",
        metric: "<24h SLA",
      },
      {
        title: "Proactive Strategy",
        description: "We don't wait for your requests; we actively suggest optimizations and opportunities.",
        metric: "Always-On",
      },
    ],
    caseStudy: {
      clientType: "High-Growth Retail & Lifestyle Venture",
      challenge: "Lost critical holiday campaign window because their previous agency took 5 business days to make banner updates.",
      solution: "Migrated to OneNexus direct founder channel with 4-hour turnaround on promo assets.",
      resultMetric: "<2 Hours",
      resultLabel: "Average Revision Turnaround Time",
    },
    deliverables: [
      "Dedicated Private WhatsApp & Slack Communication Conduits",
      "Weekly Video Loom Progress Walkthroughs",
      "Direct Senior Partner Design & Code Reviews",
      "Guaranteed <24h Service Level Agreement",
      "Bi-Weekly Strategic Advisory Calls",
    ],
    founderPledge:
      "When you text or call OneNexus, you are communicating with the decision-makers building your platform — not an intern managing a support ticket.",
  },
  {
    id: "04",
    slug: "designed-for-commercial-growth",
    num: "04",
    title: "Designed For Real Commercial Growth",
    station: "REVENUE OVER VANITY",
    tag: "CONVERSION FIRST",
    highlight: "Every Pixel Calibrated For Conversion.",
    metricStat: "3.4X",
    metricLabel: "Organic Reach Lift",
    videoSrc: "/videos/standard-04.mp4",
    posterImage: "/how_we_work_04.jpg",
    shortDesc:
      "Every typography choice, brand asset, and code snippet is calibrated for measurable conversion, long-term brand equity, and sustainable customer lifetime value.",
    fullOverview:
      "Design without conversion is merely art. While we obsess over visual beauty, fluid animations, and typographic elegance, we never lose sight of the commercial objective: converting curious visitors into paying customers. Every headline, CTA button placement, micro-animation, and mobile interaction we build is engineered based on empirical conversion science and cognitive ease.",
    comparison: {
      agencyTrap: {
        title: "The Traditional Agency Trap",
        description:
          "Designing websites that look trendy on Dribbble but confuse actual customers, hide essential information, and fail to generate qualified pipeline.",
        bulletPoints: [
          "Aesthetics prioritized over readability and clear buying actions",
          "Confusing navigation menus that frustrate mobile visitors",
          "Generic stock photos that destroy brand trust and authority",
          "Zero tracking, telemetry, or heatmap analysis on visitor behavior",
        ],
      },
      oneNexusStandard: {
        title: "The OneNexus Operational Standard",
        description:
          "Mathematical calibration of visual hierarchy, persuasive copywriting, trust markers, and frictionless inquiry funnels that drive measurable revenue.",
        bulletPoints: [
          "Conversion-focused layouts engineered to lower customer acquisition costs",
          "Frictionless, mobile-optimized lead intake and checkout experiences",
          "High-contrast call-to-actions placed along natural scroll momentum",
          "Built-in search engine authority and social proof architecture",
        ],
      },
    },
    proofPoints: [
      {
        title: "Conversion-Centric UX",
        description: "Layouts mapped to buyer decision psychology and frictionless conversion paths.",
        metric: "+38% Lift",
      },
      {
        title: "High-Retention Visuals",
        description: "Short-form video assets and custom graphics that stop feed scroll and hold attention.",
        metric: "3.4x Reach",
      },
      {
        title: "Search Authority Moat",
        description: "Local SEO citations and Google Business optimization built directly into launch.",
        metric: "Top 3 Rank",
      },
    ],
    caseStudy: {
      clientType: "Professional Consulting & Financial Advisory Firm",
      challenge: "High website traffic but less than 3 client inquiries per month due to confusing forms and lack of trust badges.",
      solution: "Redesigned conversion funnels, added direct founder WhatsApp triggers, and streamlined inquiry flow.",
      resultMetric: "4.8x",
      resultLabel: "Increase in Monthly Qualified Inquiries",
    },
    deliverables: [
      "High-Converting Landing Page & Funnel Wireframes",
      "Persuasive Headline & Micro-Copywriting Architecture",
      "Interactive Services Inquiry & Bundle Builder Engine",
      "Google Business Profile & Local Search Authority Setup",
      "Conversion Tracking & Heatmap Telemetry Configuration",
    ],
    founderPledge:
      "We judge the success of our designs by your balance sheet and customer acquisition velocity, not by design awards or vanity likes.",
  },
  {
    id: "05",
    slug: "long-term-strategic-partnership",
    num: "05",
    title: "Long-Term Strategic Partnership",
    station: "PERSISTENT STEWARDSHIP",
    tag: "STRATEGIC ALLY",
    highlight: "Launch Day Is Just Day One.",
    metricStat: "100%",
    metricLabel: "Monthly Growth Engine",
    videoSrc: "/videos/standard-05.mp4",
    posterImage: "/how_we_work_05.jpg",
    shortDesc:
      "Launch day is only the starting line. We support your trajectory through continuous monthly optimization, proactive capability upgrades, and persistent monthly growth momentum without in-house overhead.",
    fullOverview:
      "Most agency relationships die the moment the final invoice is paid. You are handed a zip file, access passwords, and left to fend for yourself in a rapidly changing digital landscape. At OneNexus, launch day is merely day one of our partnership. Through flexible monthly growth retainers with zero long-term lock-ins, we act as your dedicated digital growth engine — producing weekly reels, analyzing traffic telemetry, running CRO experiments, and keeping your brand at the absolute forefront.",
    comparison: {
      agencyTrap: {
        title: "The Traditional Agency Trap",
        description:
          "Abandoning clients post-launch, refusing to answer basic questions without charging steep hourly fees, or locking founders into coercive annual contracts.",
        bulletPoints: [
          "Zero post-launch support or optimization guidance",
          "Exorbitant ad-hoc invoices for minor text and image revisions",
          "Rigid 6 to 12-month lock-in contracts with zero performance accountability",
          "Gradual digital decay as competitors launch newer, faster platforms",
        ],
      },
      oneNexusStandard: {
        title: "The OneNexus Operational Standard",
        description:
          "A living, agile monthly partnership engine with zero long-term lock-ins, weekly drops, active profile management, and continuous conversion optimization.",
        bulletPoints: [
          "Zero lock-in contracts: pause, scale, or cancel anytime with total flexibility",
          "8 to 12 custom 4K vertical reels and video explainers produced every month",
          "Weekly telemetry reviews, user heatmap analysis, and speed monitoring",
          "Proactive feature and capability upgrades to keep you ahead of competitors",
        ],
      },
    },
    proofPoints: [
      {
        title: "Zero Long-Term Lock-In",
        description: "We earn your partnership every 30 days through measurable deliverables and performance.",
        metric: "100% Freedom",
      },
      {
        title: "Weekly Video Engine",
        description: "Consistent 4K reels and social content drops scheduled to your peak engagement hours.",
        metric: "8-12 / Month",
      },
      {
        title: "Continuous CRO Tuning",
        description: "Ongoing heatmap analysis and split-testing to compound your conversion rate over time.",
        metric: "Bi-Weekly",
      },
    ],
    caseStudy: {
      clientType: "Multi-Location Aesthetic Clinic Brand",
      challenge: "Plateaued organic traffic and zero short-form video presence post-website launch.",
      solution: "Enrolled in OneNexus Monthly Growth Retainer: 10 vertical reels/month, daily profile curation, and weekly CRO.",
      resultMetric: "+310%",
      resultLabel: "Organic Lead Volume Growth Over 90 Days",
    },
    deliverables: [
      "Monthly Content Calendar & 8-12 Custom 4K Vertical Reels",
      "Full-Service Social Profile Curation & Publishing Timetable",
      "Weekly Conversion Rate Optimization (CRO) Telemetry Audits",
      "Bi-Weekly Executive Strategy & Roadmap Scaling Calls",
      "Continuous Speed, Security & Core Web Vitals Monitoring",
    ],
    founderPledge:
      "We don't want transactional projects; we want long-term compounding partnerships. We will never lock you into a contract because our work will speak for itself.",
  },
];

export function getAllStandards(): WhyOneNexusStandard[] {
  return whyOneNexusStandards;
}

export function getStandardBySlug(slug: string): WhyOneNexusStandard | undefined {
  return whyOneNexusStandards.find((s) => s.slug === slug);
}

export function getAdjacentStandards(currentSlug: string): {
  prev: WhyOneNexusStandard;
  next: WhyOneNexusStandard;
} {
  const currentIndex = whyOneNexusStandards.findIndex((s) => s.slug === currentSlug);
  const total = whyOneNexusStandards.length;

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  return {
    prev: whyOneNexusStandards[prevIndex],
    next: whyOneNexusStandards[nextIndex],
  };
}
