export const contact = {
  email: "restagiuliano@hotmail.com",
  linkedin: "https://www.linkedin.com/in/resta-giuliano-6776a6214/",
  whatsapp: "5562981909769",
};

export const profile = {
  name: "Resta Giuliano",
  role: "Product Designer",
  positioning: "B2B SaaS · Data · AI",
  headline: "I listen to users and turn their needs into screens that work.",
  summary:
    "I turn user needs, friction and ideas into clear B2B SaaS experiences that move people forward.",
  facts: [
    "5+ years in Product Design",
    "B2B SaaS & PropTech",
    "Italian citizen",
    "EU Work Authorization",
    "Based in Brazil · Moving to Europe",
  ],
};

export const capabilities = {
  skills: ["Product Design", "UX/UI", "Interaction Design", "Information Architecture", "Design Systems", "Product Discovery", "UX Research", "Behavioral Analytics", "Journey Mapping"],
  tools: ["Figma", "FigJam", "Miro", "Jira", "Mixpanel", "Microsoft Clarity"],
  languages: ["Portuguese — Native", "Italian — Intermediate", "English — Intermediate"],
};

export const workHistory = [
  { title: "App Facilita", items: ["Product Designer", "PropTech · B2B SaaS"] },
  { title: "CV CRM", items: ["Product Designer", "CRM · B2B SaaS"] },
];

export type ProjectImage = { src?: string; alt: string; caption?: string; fit?: "cover" | "contain"; aspectRatio?: number };
export type ProjectSection = { lead: string; points: string[] };
export const projectFilters = [
  { id: "business-impact", label: "Business impact" },
  { id: "product-creation", label: "0→1 product" },
  { id: "ai-innovation", label: "AI & innovation" },
  { id: "complex-systems", label: "Complex systems" },
  { id: "design-systems", label: "Design systems" },
] as const;
export type ProjectCategory = (typeof projectFilters)[number]["id"];
export type Project = {
  id: string;
  shortTitle: string;
  company: string;
  brand: "app-facilita" | "cv-crm" | "independent";
  title: string;
  intro: string;
  tags: string[];
  categories: ProjectCategory[];
  metrics: { value: string; label: string }[];
  problem: ProjectSection;
  discovery: ProjectSection;
  solution: ProjectSection;
  results: ProjectSection;
  takeaway?: string;
  coverImage?: ProjectImage;
  images: ProjectImage[];
};

export const projects: Project[] = [
  {
    id: "angular-flutter", shortTitle: "Sales journey", company: "App Facilita", brand: "app-facilita",
    title: "Redesigning the sales journey during an Angular-to-Flutter migration",
    intro: "We did not just migrate screens from Angular to Flutter. We redesigned how people move a property sale forward.",
    tags: ["Product Design", "Mobile", "PropTech", "UX Research", "Information Architecture"],
    categories: ["business-impact", "complex-systems"],
    metrics: [],
    problem: { lead: "Essential sales actions were scattered across the product and required long journeys, even though they belonged to the same business intent.", points: ["Creating a lead, reservation, proposal and contract required moving through different parts of the application.", "The issue was information architecture, flow efficiency and cognitive load — not simply visual design."] },
    discovery: { lead: "Before redesigning, I investigated what truly moved a real-estate negotiation forward.", points: ["I combined behavioral analysis, user research, Clarity data and internal discovery with teams close to customers.", "I mapped task frequency, importance, effort and friction to identify the actions with the greatest impact on a sale."] },
    solution: { lead: "The Sales Engine grouped critical actions around the user’s actual intent: moving a negotiation forward.", points: ["The Lead → Reservation → Proposal → Contract sequence informed the primary shortcuts and the app Home.", "The Home shifted from a gateway to modules into an operational, task-oriented starting point.", "The migration followed Behavior → Research → Journey Mapping → Prioritization → Flow Redesign → Flutter, rather than rebuilding screens one by one."] },
    results: { lead: "+65% increase in completion for selected high-drop-off tasks during the MVP’s first months.", points: ["The simplified flows were monitored to validate behavior and task completion.", "The largest gain was not the new technology itself, but using the migration to reduce experience complexity."] },
    coverImage: { src: "/projects/angular-flutter/covercard-01.png", alt: "App Facilita Sales Engine overview", fit: "contain", aspectRatio: 1394 / 1750 },
    images: [
      { src: "/projects/angular-flutter/imgcard1-1.png", alt: "App Facilita Sales Engine shortcuts", caption: "Sales actions reorganized around the negotiation flow.", fit: "cover", aspectRatio: 2227 / 1750 },
      { src: "/projects/angular-flutter/imgcard1-2.png", alt: "App Facilita Sales Engine task flow", caption: "A clearer path from lead to contract.", fit: "cover", aspectRatio: 2227 / 1750 },
    ],
  },
  {
    id: "revenue-expansion", shortTitle: "Revenue expansion", company: "App Facilita", brand: "app-facilita",
    title: "Turning product gaps into recurring revenue opportunity",
    intro: "Not every design problem starts in an interface. Some start in the business model.",
    tags: ["Product Strategy", "Monetization", "UX", "B2B SaaS", "Data"],
    categories: ["business-impact"],
    metrics: [],
    problem: { lead: "Contracted plan limits were not consistently reflected in the product, creating a gap between what customers paid for and what they could use.", points: ["Customers could exceed contracted capacity without clear product feedback or technical enforcement.", "The mismatch between contracted plan, payment and actual usage created revenue leakage."] },
    discovery: { lead: "I initiated an investigation with Data to compare commercial entitlements against real platform consumption.", points: ["The analysis identified customers using resources above their contracts and sized the eligible opportunity.", "An immediate block would have corrected the rule but punished customers who had already incorporated that capacity into their workflow."] },
    solution: { lead: "Progressive enforcement gave customers visibility, time and a decision before restrictions applied.", points: ["Contracted limit → limit reached → additional usage → grace period → customer decision.", "Contextual alerts made consumption, courtesy capacity and regularization options clear inside the product.", "Customers could upgrade to keep their capacity or adjust usage back to their contracted plan."] },
    results: { lead: "~40% potential additional revenue across the analyzed base if eligible gaps were captured.", points: ["The figure represents an identified opportunity, not revenue already recovered.", "The strategy restored control over the relationship between contracted plans and real usage without turning monetization into a punitive experience."] },
    coverImage: { src: "/projects/revenue-expansion/covercard-02.png", alt: "App Facilita revenue expansion overview", fit: "contain", aspectRatio: 1394 / 1750 },
    images: [
      { src: "/projects/revenue-expansion/imgcard2-1.png", alt: "App Facilita contracted plan limit alert", caption: "Usage feedback makes the plan limit visible in context.", fit: "cover", aspectRatio: 2227 / 1509 },
      { src: "/projects/revenue-expansion/imgcard2-2.png", alt: "App Facilita progressive enforcement journey", caption: "A gradual path from additional usage to a customer decision.", fit: "cover", aspectRatio: 2227 / 1509 },
    ],
  },
  {
    id: "crm-complexity", shortTitle: "CRM complexity", company: "CV CRM", brand: "cv-crm",
    title: "Simplifying the complexity of a market-leading CRM",
    intro: "A complex product does not need to offer a complex experience.",
    tags: ["Product Design", "UX Strategy", "B2B SaaS", "PropTech"],
    categories: ["business-impact", "complex-systems"],
    metrics: [],
    problem: { lead: "Years of decentralized growth had created a powerful but fragmented platform, where users often had to understand the software’s internal structure to complete a task.", points: ["Different customer profiles used different parts of the product, governed by different rules and contexts.", "The challenge was reducing perceived complexity without reducing functional capability."] },
    discovery: { lead: "I studied users and journeys rather than isolated screens to find where the product added unnecessary complexity.", points: ["The work mapped roles, tools, task frequency, context switching, friction and opportunities to connect related flows.", "Lead → Service → Reservation → Proposal → Sale became a shared model for a more connected commercial journey."] },
    solution: { lead: "The highest-impact journeys were progressively reorganized around user intent, not the software’s internal architecture.", points: ["The work followed Product Discovery → User Profiles → Journey Mapping → Information Architecture → Flow Redesign → Interaction Design.", "The Sales Engine concept scaled from a smaller product into a larger ecosystem of tools, rules and dependencies.", "The goal was to improve hierarchy, context, connection and predictability — not remove complexity the operation truly needed."] },
    results: { lead: "~30% of the customer journey was restructured in under a year.", points: ["Complaint tickets declined by approximately 53% year over year as clearer, more predictable flows reduced the need for support.", "The changes demonstrated that a large product can preserve depth without exposing all of its complexity to the user."] },
    coverImage: { src: "/projects/crm-complexity/covercard-03.png", alt: "CV CRM connected sales journey overview", fit: "contain", aspectRatio: 1394 / 1750 },
    images: [
      { src: "/projects/crm-complexity/imgcard3-1.png", alt: "CV CRM sales journey interface", caption: "A clearer interface for moving a sale forward.", fit: "cover", aspectRatio: 2227 / 1509 },
      { src: "/projects/crm-complexity/imgcard3-2.png", alt: "CV CRM connected workflow", caption: "Related steps connected around the user’s task.", fit: "cover", aspectRatio: 2227 / 1509 },
      { src: "/projects/crm-complexity/imgcard3-3.png", alt: "CV CRM information hierarchy", caption: "Complex information organized into a more predictable flow.", fit: "cover", aspectRatio: 2227 / 1509 },
    ],
  },
  {
    id: "ai-discovery", shortTitle: "AI discovery", company: "CV CRM", brand: "cv-crm",
    title: "Connecting context, behavior and AI to Product Discovery",
    intro: "AI creates more value when it helps teams make decisions with better context.",
    tags: ["AI", "Product Analytics", "Product Discovery", "MCP"],
    categories: ["ai-innovation", "complex-systems"],
    metrics: [],
    problem: { lead: "Demand context was fragmented across Jira, Miro, Mixpanel and Figma, forcing teams to rebuild it manually before design work could begin.", points: ["The quality of discovery depended on the time available to collect and interpret scattered information.", "Behavioral data often entered only after a hypothesis had already formed."] },
    discovery: { lead: "I explored how AI and MCP could bring qualitative and quantitative context to the beginning of each demand.", points: ["The system interpreted Jira and linked Miro material into knowns, assumptions, open questions and potential impact.", "It then connected Mixpanel data to reveal affected users, relevant pages, events and current navigation patterns."] },
    solution: { lead: "The context layer prepared a structured Discovery Brief instead of making decisions for the team.", points: ["Business context, assumptions, questions, behavioral evidence and affected users became one starting point for Designers and PMs.", "Analytics also helped identify relevant research participants, not only measure usage after release.", "The loop continued through Discover → Design → Release → Measure → Learn → Iterate."] },
    results: { lead: "The experiment became part of the daily workflow for Designers and Product Managers.", points: ["Four fragmented sources were synthesized into one evidence-based starting context.", "Teams could decide what to investigate, who to research and what to measure before committing to an interface."] },
    coverImage: { src: "/projects/ai-discovery/covercard-04.png", alt: "AI-assisted Product Discovery system", fit: "contain", aspectRatio: 1394 / 1750 },
    images: [],
  },
  {
    id: "design-system", shortTitle: "Design system", company: "CV CRM", brand: "cv-crm",
    title: "Building a shared design language for Design and Engineering",
    intro: "A Design System is product infrastructure, not just a component library.",
    tags: ["Design System", "DesignOps", "UI Architecture", "Design Engineering"],
    categories: ["design-systems", "complex-systems"],
    metrics: [],
    problem: { lead: "Similar interfaces had diverged in appearance, behavior, spacing and states, creating repeated decisions and inconsistency at scale.", points: ["Designers often solved comparable problems differently, while Figma components and front-end implementation drifted apart.", "The absence of a shared language affected product consistency, Design productivity and Design–Engineering communication."] },
    discovery: { lead: "I helped identify recurring patterns and inconsistencies, then define which decisions should become reusable system foundations.", points: ["The work organized the system as Foundations → Design Tokens → Components → Patterns → Product Interfaces.", "Tokens made visual decisions more traceable and created a bridge between Figma and production."] },
    solution: { lead: "Color, typography, spacing, states and behaviors became shared product decisions instead of one-off choices in each project.", points: ["The delivery path moved from screen interpretation toward Token → Component → Pattern → Interface → Implementation.", "A common vocabulary reduced ambiguity in handoff and made Design and Front-end collaboration more predictable.", "Reusable variants, states and interaction patterns gave designers more time to focus on the problem itself."] },
    results: { lead: "Design and Engineering gained a shared language for building and evolving product interfaces.", points: ["Consistency, reusability, traceability and Design–Engineering alignment improved across the workflow.", "The system reduced cognitive load for users by helping similar problems behave consistently across the platform."] },
    coverImage: { src: "/projects/design-system/covercard-05.png", alt: "CV CRM design system overview", fit: "contain", aspectRatio: 1394 / 1750 },
    images: [
      { src: "/projects/design-system/imgcard5-1.png", alt: "CV CRM design system foundations", caption: "Shared foundations turn recurring decisions into product infrastructure.", fit: "cover", aspectRatio: 2227 / 1509 },
      { src: "/projects/design-system/imgcard5-2.png", alt: "CV CRM design system components", caption: "Reusable components create a clearer handoff between Design and Engineering.", fit: "cover", aspectRatio: 2227 / 1509 },
    ],
  },
  {
    id: "wiselead", shortTitle: "WiseLead", company: "Independent product", brand: "independent",
    title: "Creating a product from an underserved real-estate opportunity",
    intro: "Not every opportunity lives inside an existing product. Some justify creating one.",
    tags: ["Product Creation", "0→1", "Product Discovery", "PropTech", "SaaS"],
    categories: ["product-creation", "business-impact"],
    metrics: [],
    problem: { lead: "Real-estate companies rely on large broker networks to distribute listings, but that distribution is often decentralized and difficult to trace.", points: ["Brokers can present the same development through different materials, links and information.", "CRMs handle the opportunity after it enters the operation, while the attribution gap happens before the lead reaches the CRM."] },
    discovery: { lead: "Years working with real-estate CRMs exposed an unserved space between the developer, the broker and the potential buyer.", points: ["The opportunity was to turn the broker network into a distributed digital acquisition channel without losing control of the portfolio or lead origin.", "The product proposition emerged around three elements: centralized portfolio, decentralized distribution and attributable leads."] },
    solution: { lead: "WiseLead sits between the company portfolio, broker network and CRM.", points: ["The company maintains one source of truth for listings, while each broker receives a personalized site with the official portfolio.", "When interest is generated, the opportunity returns to the CRM with customer, channel, development and responsible broker context.", "The product reduces broker upkeep without removing company control over the information being distributed."] },
    results: { lead: "WiseLead is a 0→1 product, so no market, conversion or revenue metrics are claimed yet.", points: ["The outcome so far is a validated product hypothesis: a real-estate distribution layer that complements, rather than replaces, the CRM.", "Future measurement will focus on broker-network adoption, minisite usage, qualified opportunity generation and CRM lead conversion."] },
    coverImage: { src: "/projects/wiselead/covercard-06.png", alt: "WiseLead real-estate distribution platform overview", fit: "contain", aspectRatio: 1394 / 1750 },
    images: [
      { src: "/projects/wiselead/imgcard6-1.png", alt: "WiseLead centralized property portfolio", caption: "One source of truth for the company portfolio.", fit: "cover", aspectRatio: 2227 / 1509 },
      { src: "/projects/wiselead/imgcard6-2.png", alt: "WiseLead broker minisite", caption: "A broker-facing experience connected to the official portfolio.", fit: "cover", aspectRatio: 2227 / 1509 },
      { src: "/projects/wiselead/imgcard6-3.png", alt: "WiseLead lead attribution flow", caption: "Opportunity context returns to the CRM with its source and responsible broker.", fit: "cover", aspectRatio: 2227 / 1509 },
    ],
  },
];
