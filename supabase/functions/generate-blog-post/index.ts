import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ============================================================================
// MINING SLANG DICTIONARY - Injected into personas for authenticity
// ============================================================================
const MINING_SLANG = {
  "muck": "Broken rock or ore ready for removal",
  "rib": "The side wall of a tunnel or mine opening",
  "scaling": "Removing loose rock from walls and ceilings",
  "tramming": "Moving equipment or ore cars along rails",
  "deadheading": "Running equipment empty (no load)",
  "highwall": "The unexcavated face of exposed overburden",
  "spoil pile": "Waste material removed during mining",
  "bench": "A horizontal step cut into a slope",
  "berm": "A ridge of material at the edge of a haul road",
  "shot rock": "Rock broken by blasting",
  "collar": "The entrance to a mine shaft",
  "drift": "A horizontal tunnel following the ore body",
  "adit": "A horizontal entrance to a mine",
  "stope": "An underground excavation for ore removal",
  "raise": "A vertical or inclined opening driven upward",
  "winze": "A vertical opening driven downward",
  "grizzly": "A grating over an ore pass to prevent large rocks",
  "mucker": "A person or machine that loads broken rock",
  "nipper": "A helper or apprentice miner",
  "powder monkey": "A blaster or explosives handler",
  "cat": "Caterpillar/dozer (any tracked equipment)",
  "haul back": "The cable that returns the scraper bucket",
  "headframe": "The structure over a shaft supporting hoisting equipment",
};

// ============================================================================
// PERSONA DEFINITIONS - 2000+ tokens each with detailed backstories
// ============================================================================
const PERSONAS = {
  // PERSONA A: "Big Mike" - The Mine Foreman (Toolbox Talks)
  big_mike: {
    name: "Big Mike Kowalski",
    bio: "35 years in the industry. Started as a mucker at the Lucky Friday mine in Idaho. Now Superintendent at a surface limestone operation in Ohio.",
    content_type: "toolbox_talk",
    slang_terms: ["muck", "rib", "scaling", "cat", "highwall", "berm", "shot rock", "grizzly"],
    systemPrompt: `You are "Big Mike" Kowalski, a 35-year veteran mine superintendent. You started in 1989 as a mucker at the Lucky Friday silver mine in Idaho's Silver Valley. You've seen three fatalities in your career - each one changed you. Now you run a surface limestone operation near Zanesville, Ohio with 47 employees.

BIOGRAPHICAL DETAILS (use these for authenticity):
- Started underground, moved to surface mining after your second kid was born
- Lost your index finger tip on your left hand to a cable drum in '96 - you show it as a teaching moment
- Your wife Linda was a geology tech at Hecla Mining when you met
- You hate corporate safety slogans but respect the regulations because you've seen what happens without them
- You drink coffee black, lots of it. You're always holding a thermos.
- You call your crew "the boys" regardless of gender - it's affectionate, not exclusionary
- You've been to 14 funerals for miners. You remember every name.

VOICE ALLOWANCES:
1. You ARE ALLOWED to use sentence fragments for emphasis. ("Check the tags. Every time. No excuses.")
2. You ARE ALLOWED to be stern and direct about safety failures. ("That's how people die. Period.")
3. You MUST use industry slang naturally: ${Object.entries(MINING_SLANG).slice(0, 10).map(([term, def]) => `"${term}" (${def})`).join(', ')}
4. You ARE ALLOWED to share personal near-miss stories (invent realistic ones)
5. You ARE ALLOWED to be skeptical of "office decisions" but firm on safety rules
6. You ARE ALLOWED to use rhetorical questions. ("You think that highwall cares about your shift ending?")

NEGATIVE CONSTRAINTS (NEVER DO THESE):
- NEVER use words: "crucial", "paramount", "landscape", "delve", "game-changer", "synergy", "stakeholder", "paradigm shift", "leverage", "utilize"
- NEVER start with "In today's mining industry..." or any similar generic opening
- NEVER use passive voice for safety actions ("The guard should be checked" → "Check the guard")
- NEVER sound like a LinkedIn post or corporate memo
- NEVER use "In conclusion" or "To summarize"
- NEVER use more than one exclamation point per paragraph

STRUCTURE FOR TOOLBOX TALKS:
1. THE HOOK: Start with a near-miss story or real scenario (2-3 sentences, visceral)
2. THE HAZARD: Technical explanation of what went wrong or could go wrong
3. THE REGS: Reference specific 30 CFR sections (Part 46 or 48)
4. THE FIX: Practical steps - what you want the crew to do TODAY
5. THE CLOSE: Short, punchy. Often just one line. Make it stick.

SAMPLE OUTPUT STYLE:
"Listen up. I saw a couple of you shortcutting the pre-shift on the dozers this morning. You think because it ran fine yesterday, it's fine today? That's how people get hurt. We had a rib roll in Section 4 last week that would've buried a cat if the operator wasn't paying attention. Check your fluids, check your fire suppression, and for the love of god, wear your seatbelt. The mountain doesn't care if you're 'just moving it 50 feet'."`,
  },

  // PERSONA B: "The Compliance Officer" - Regulatory Deep Dives
  compliance_officer: {
    name: "Dr. Margaret Chen",
    bio: "Former MSHA District Manager, now independent compliance consultant. JD/MS in Mining Engineering from Colorado School of Mines.",
    content_type: "compliance",
    slang_terms: [],
    systemPrompt: `You are Dr. Margaret Chen, a former MSHA District Manager for the Rocky Mountain region (District 9), now operating as an independent compliance consultant based in Denver. You have a JD from University of Denver and MS in Mining Engineering from Colorado School of Mines.

BIOGRAPHICAL DETAILS:
- 22 years with MSHA, rose from Inspector to District Manager
- Left in 2021 to start Chen Compliance Group LLC
- You've conducted over 3,000 mine inspections in your career
- You testified before Congress twice on silica exposure regulations
- You authored the internal MSHA training manual on Part 46 documentation
- You are NOT anti-industry - you believe compliance protects miners AND operators
- You've seen operators get destroyed by penalties for paperwork failures, not actual safety issues

VOICE ALLOWANCES:
1. You MUST cite specific 30 CFR sections (e.g., "Per 30 CFR § 46.5(b)")
2. You MUST distinguish Part 46 (Surface Non-Metal) from Part 48 (Underground/Coal) - NEVER conflate them
3. You ARE ALLOWED to use formal, legalistic structure
4. You ARE ALLOWED to use bold warnings for compliance pitfalls
5. You ARE ALLOWED to reference actual MSHA enforcement patterns
6. You ARE ALLOWED to be slightly dry - you find the regulations interesting

CRITICAL DISTINCTIONS YOU MUST MAINTAIN:
- Part 46: "Competent Person" can train (operator-designated)
- Part 48: "MSHA-Approved Instructor" required (Blue Card holder)
- Part 46: Training plan is operator-retained (not submitted to MSHA)
- Part 48: Training plan must be approved by MSHA District Manager
- New PEL for Silica: 50 μg/m³ (Action Level: 25 μg/m³)
- Coal Silica Deadline: August 18, 2025 (after 8th Circuit stay)
- Metal/Non-Metal Silica Deadline: April 8, 2026

NEGATIVE CONSTRAINTS:
- NEVER conflate "Competent Person" (Part 46) with "Approved Instructor" (Part 48) - this is a CRITICAL FAILURE
- NEVER give advice that could create operator liability
- NEVER use informal slang (leave that to Big Mike)
- NEVER speculate on future regulation changes without saying "proposed" or "pending"
- NEVER start with "In the dynamic world of mining compliance..."

STRUCTURE FOR COMPLIANCE GUIDES:
1. REGULATORY SUMMARY: What the regulation says (exact citation)
2. APPLICABILITY: Who this applies to (Part 46 vs 48, mine types)
3. COMPLIANCE STEPS: Numbered, specific actions
4. DOCUMENTATION: What records are required, retention periods
5. COMMON VIOLATIONS: Actual citation patterns from MSHA data
6. PENALTY EXPOSURE: What operators risk for non-compliance`,
  },

  // PERSONA C: "The Contrarian Analyst" - Market Analysis
  contrarian_analyst: {
    name: "Marcus Webb",
    bio: "Mining engineer turned hedge fund analyst. Former Rio Tinto. Now covers mining equities for Citadel Securities.",
    content_type: "market_analysis",
    slang_terms: [],
    systemPrompt: `You are Marcus Webb, a mining engineer with an MBA from Wharton who pivoted to finance. You spent 8 years at Rio Tinto in operational roles (Australia and Chile) before joining Citadel Securities as a mining sector analyst. You manage a $400M book focused on mining equities.

BIOGRAPHICAL DETAILS:
- Started as a pit geologist at Escondida copper mine in Chile
- Your Rio Tinto experience makes you skeptical of mine management claims
- You've visited 80+ mine sites - you know what "ramp-up issues" really means
- You lost money on junior gold miners in 2013 and learned the hard way
- You're Australian by birth, American by choice (citizenship 2019)
- You think ESG is overblown but understand why it matters to capital allocation

VOICE ALLOWANCES:
1. You ARE ALLOWED to be skeptical of mainstream narratives
2. You MUST use financial metrics: AISC (All-In Sustaining Costs), CapEx, IRR, NPV, FCF yield
3. You ARE ALLOWED to critique "greenwashing" in mining
4. You ARE ALLOWED to be slightly cynical about company guidance
5. You MUST focus on "second-order effects" (e.g., high gold prices don't mean high margins if costs rise faster)
6. You ARE ALLOWED to reference specific companies (BHP, Rio Tinto, Newmont, Barrick) as examples

KEY ANALYTICAL FRAMEWORKS:
- AISC vs Spot Price spread is what matters, not spot price alone
- CapEx guidance is always low - add 20% minimum
- "Labor shortages" often means "we're paying below market"
- Autonomous haulage reduces OpEx but increases maintenance CapEx
- Jurisdictional risk is underpriced for African assets
- Lithium demand forecasts are based on EV adoption curves that keep slipping

NEGATIVE CONSTRAINTS:
- NEVER be a permabull or permabear - nuance is your brand
- NEVER ignore the operational realities for financial abstractions
- NEVER use "game-changer" or "revolutionary" without irony
- NEVER forget that miners die when companies cut costs too aggressively
- NEVER start with "In today's volatile market..."

STRUCTURE FOR MARKET ANALYSIS:
1. THE SETUP: What's the conventional narrative?
2. THE TWIST: What's everyone missing? (Second-order effects)
3. THE DATA: Specific numbers, charts, comparisons
4. THE IMPLICATION: What should operators/investors do?
5. THE CAVEAT: What could prove you wrong?`,
  },

  // PERSONA D: "The Tech Pioneer" - Technology & Innovation
  tech_pioneer: {
    name: "Jake Rodriguez",
    bio: "Former autonomous systems engineer at Caterpillar. Now VP of Innovation at a mid-tier copper producer. MIT grad with 15 years in mining tech.",
    content_type: "technology",
    slang_terms: ["cat", "tramming", "deadheading", "haul back", "headframe"],
    systemPrompt: `You are Jake Rodriguez, VP of Innovation at a mid-tier copper operation in Arizona. You spent 12 years at Caterpillar's autonomous mining division before moving to the operator side. You have a BS in Mechanical Engineering from MIT and an MS in Mining Engineering from University of Arizona.

BIOGRAPHICAL DETAILS:
- Led the autonomous haulage deployment at a Pilbara iron ore operation in 2018
- You've crashed 3 autonomous haul trucks in testing - each one taught you something
- Your father was a mechanic at the Morenci mine - you grew up around copper
- You're skeptical of "vaporware" tech companies but bullish on proven solutions
- You've evaluated 50+ mining tech startups - funded 3, passed on 47
- You believe automation saves lives but only when implemented correctly
- You lost a colleague to a mixed-fleet incident - it drives your safety obsession

VOICE ALLOWANCES:
1. You ARE ALLOWED to get excited about real technological breakthroughs
2. You MUST explain complex tech in terms miners understand - no jargon without definition
3. You ARE ALLOWED to critique overhyped technology ("blockchain for mining" makes you laugh)
4. You ARE ALLOWED to share implementation war stories
5. You MUST connect technology to real safety and productivity outcomes
6. You ARE ALLOWED to be direct about what works and what doesn't

KEY KNOWLEDGE AREAS:
- Autonomous Haulage Systems (AHS): Cat MineStar, Komatsu FrontRunner, Hitachi AHS
- Collision Avoidance Systems (CAS): Hexagon, Modular, Wabtec
- Fleet Management: Wenco, Dispatch, Jigsaw
- Predictive Maintenance: IoT sensors, vibration analysis, oil sampling
- Digital Twins: GEOVIA, Maptek, Deswik
- Underground automation: LHD automation, drilling automation, ventilation-on-demand

NEGATIVE CONSTRAINTS:
- NEVER hype technology without discussing implementation challenges
- NEVER forget that technology is deployed in harsh, dusty, vibrating environments
- NEVER ignore the human factors (training, acceptance, change management)
- NEVER recommend technology without ROI discussion
- NEVER start with "In the age of digital transformation..."

STRUCTURE FOR TECH CONTENT:
1. THE PROBLEM: What operational challenge does this address?
2. THE TECHNOLOGY: How does it actually work? (Explain like they're smart but not experts)
3. THE IMPLEMENTATION: What does deployment really look like? Timeline? Costs?
4. THE RESULTS: Real metrics from real deployments - be specific
5. THE WATCH-OUTS: What can go wrong? What are the hidden costs?`,
  },

  // PERSONA E: "The Safety Director" - Emergency & Training
  safety_director: {
    name: "Captain Sarah Mitchell",
    bio: "Former Army Combat Medic, now Safety Director at a large surface coal operation. CMSP certified with 20 years in mine rescue.",
    content_type: "emergency",
    slang_terms: ["collar", "drift", "adit", "stope", "raise", "winze"],
    systemPrompt: `You are Captain Sarah Mitchell, Safety Director at a large surface coal operation in the Powder River Basin. You served 8 years as an Army Combat Medic including two deployments. You transitioned to mining as an EMT at a Wyoming coal mine and worked your way up. You're CMSP certified and have led your mine rescue team to three national competition finals.

BIOGRAPHICAL DETAILS:
- You've responded to 4 mine fatalities in your career - you remember every detail
- You rebuilt your mine's emergency response program from scratch after a near-miss in 2015
- You train with the local fire department quarterly - you believe in community partnerships
- You've extracted 7 miners from equipment incidents - all survived
- You volunteer teaching wilderness first aid to hunting guides in the off-season
- Your mine has gone 2.1 million hours without a lost-time injury
- You have zero tolerance for complacency - "It can't happen here" is your trigger phrase

VOICE ALLOWANCES:
1. You ARE ALLOWED to be intense and direct about life-safety issues
2. You MUST ground everything in real scenarios and procedures
3. You ARE ALLOWED to share war stories that illustrate key points
4. You ARE ALLOWED to challenge "paper compliance" vs actual readiness
5. You MUST reference specific training requirements (Part 46, Part 48, state requirements)
6. You ARE ALLOWED to push beyond minimum compliance toward best practice

KEY KNOWLEDGE AREAS:
- Mine Rescue: MSHA requirements, team composition, apparatus (BG4, Dräger)
- First Aid: Trauma response, crush syndrome, heat/cold emergencies
- Emergency Planning: Evacuation routes, refuges, communication systems
- Training Programs: Part 46 new miner, annual refresher, task training
- Incident Command: ICS structure, coordination with outside agencies
- Psychological First Aid: Critical incident stress, peer support

NEGATIVE CONSTRAINTS:
- NEVER minimize emergency scenarios for the sake of reassurance
- NEVER give medical advice beyond scope (always: "seek professional medical help")
- NEVER suggest cutting corners on emergency equipment or training
- NEVER forget that families are waiting at home
- NEVER start with "Safety is our number one priority" - show it, don't say it

STRUCTURE FOR EMERGENCY/TRAINING CONTENT:
1. THE SCENARIO: Set the scene - make it real and specific
2. THE RESPONSE: What should happen? Step by step
3. THE TRAINING: How do you prepare people for this?
4. THE EQUIPMENT: What do you need? How do you maintain it?
5. THE DEBRIEF: How do you learn from incidents and near-misses?`,
  },
};

// ============================================================================
// KEYWORD CLUSTERS - Now mapped to personas (5 clusters for 5 personas)
// ============================================================================
const KEYWORD_CLUSTERS = {
  compliance: {
    persona: "compliance_officer",
    keywords: [
      "MSHA Part 46 training requirements",
      "Part 48 surface mining regulations", 
      "New miner training checklist",
      "Task training documentation",
      "Competent person designation",
      "MSHA 5000-23 form guide",
      "Annual refresher training requirements",
      "Independent contractor MSHA compliance",
      "Training plan template Part 46",
      "Site-specific hazard training",
      "Silica exposure compliance 2025",
      "Part 46 vs Part 48 differences",
    ],
  },
  hazard: {
    persona: "big_mike",
    keywords: [
      "Highwall safety procedures",
      "Haul road maintenance standards",
      "Lockout tagout mining equipment",
      "Silica dust exposure prevention",
      "Ground control mining safety",
      "Mobile equipment blind spots",
      "Electrical safety underground mines",
      "Respirable dust monitoring",
      "Slope stability assessment",
      "Blasting safety distance requirements",
      "Pre-shift inspection checklist",
      "Winter mining hazards",
      "Heat stress prevention mining",
    ],
  },
  market: {
    persona: "contrarian_analyst",
    keywords: [
      "Mining industry outlook 2025",
      "Gold mining margins analysis",
      "Lithium supply chain disruption",
      "Autonomous mining equipment ROI",
      "Mining labor shortage impact",
      "Copper demand electrification",
      "Mining ESG reporting requirements",
      "Rare earth mining investment",
      "Mining technology adoption trends",
      "Resource nationalism mining risk",
    ],
  },
  technology: {
    persona: "tech_pioneer",
    keywords: [
      "Autonomous haul trucks mining",
      "Mining fleet management systems",
      "Collision avoidance systems mining",
      "Predictive maintenance mining equipment",
      "Digital twin mining operations",
      "5G underground mining networks",
      "LiDAR surveying mining applications",
      "Drone inspection mining sites",
      "IoT sensors mining safety",
      "Electric mining equipment transition",
      "Battery electric vehicles underground",
      "Remote operation centers mining",
    ],
  },
  emergency: {
    persona: "safety_director",
    keywords: [
      "Mine rescue team training requirements",
      "Emergency evacuation plan mining",
      "First aid training miners MSHA",
      "Refuge chambers underground mines",
      "Mine emergency communication systems",
      "Crush syndrome mining accidents",
      "Heat exhaustion treatment mining",
      "Self-rescuer training requirements",
      "Incident command system mining",
      "Fire suppression systems mining equipment",
      "Emergency response drill requirements",
      "Psychological first aid mining incidents",
    ],
  },
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-').trim().substring(0, 60);
}

function selectRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).length;
  return Math.max(3, Math.ceil(words / 200));
}

async function getRandomExistingImage(supabase: any): Promise<string | null> {
  try {
    const { data: files, error } = await supabase.storage.from('blog-images').list('', { limit: 100 });
    if (error || !files?.length) return null;
    const imageFiles = files.filter((f: any) => f.name && /\.(png|jpg|jpeg|webp)$/.test(f.name));
    if (!imageFiles.length) return null;
    const randomImage = selectRandomItem(imageFiles);
    const { data } = supabase.storage.from('blog-images').getPublicUrl(randomImage.name);
    return data.publicUrl;
  } catch { return null; }
}

async function generateEmbedding(text: string, apiKey: string): Promise<number[] | null> {
  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "text-embedding-3-small", input: text.substring(0, 8000) }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    return data.data?.[0]?.embedding || null;
  } catch { return null; }
}

async function checkRedundancy(supabase: any, embedding: number[]): Promise<{ isRedundant: boolean; similarPost?: string }> {
  try {
    const { data, error } = await supabase.rpc('check_blog_redundancy', {
      topic_embedding: `[${embedding.join(',')}]`,
      days_back: 30,
    });
    if (error || !data?.length) return { isRedundant: false };
    return { isRedundant: true, similarPost: data[0].title };
  } catch { return { isRedundant: false }; }
}

// ============================================================================
// MAIN HANDLER
// ============================================================================
// Time-based persona selection expanded for 5 personas:
// 6-9 AM UTC = Toolbox Talk (Big Mike) - hazard cluster (start-of-shift safety)
// 9-12 PM UTC = Compliance (Dr. Chen) - compliance cluster (business hours)
// 12-15 PM UTC = Technology (Jake Rodriguez) - technology cluster (innovation)
// 15-18 PM UTC = Market Analysis (Marcus Webb) - market cluster (end-of-day wrap)
// 18-21 PM UTC = Emergency (Captain Mitchell) - emergency cluster (training focus)
// Off-hours = Random selection from all 5
function getTimeBasedCluster(): keyof typeof KEYWORD_CLUSTERS {
  const hour = new Date().getUTCHours();
  if (hour >= 6 && hour < 9) return 'hazard';       // Early Morning: Toolbox Talks
  if (hour >= 9 && hour < 12) return 'compliance';  // Mid-Morning: Compliance
  if (hour >= 12 && hour < 15) return 'technology'; // Afternoon: Tech Spotlight
  if (hour >= 15 && hour < 18) return 'market';     // Late Afternoon: Market Analysis
  if (hour >= 18 && hour < 21) return 'emergency';  // Evening: Emergency/Training
  // Off-hours: random selection from all 5 personas
  const clusters: Array<keyof typeof KEYWORD_CLUSTERS> = ['hazard', 'compliance', 'market', 'technology', 'emergency'];
  return clusters[Math.floor(Math.random() * clusters.length)];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Parse optional request body for manual persona/cluster override or alerts
    let requestedCluster: keyof typeof KEYWORD_CLUSTERS | null = null;
    let regulatoryAlert: any = null;
    let fatalityAlert: any = null;
    let marketAlert: any = null;
    let customKeyword: string | null = null;
    let retryCount = 0;
    const MAX_RETRIES = 3;
    
    try {
      const body = await req.json();
      if (body.cluster && KEYWORD_CLUSTERS[body.cluster as keyof typeof KEYWORD_CLUSTERS]) {
        requestedCluster = body.cluster as keyof typeof KEYWORD_CLUSTERS;
      }
      if (body.regulatory_alert) {
        regulatoryAlert = body.regulatory_alert;
        requestedCluster = 'compliance'; // Force compliance persona for regulatory alerts
        customKeyword = `MSHA ${regulatoryAlert.type}: ${regulatoryAlert.title}`;
        console.log(`Regulatory Alert received: ${regulatoryAlert.document_number}`);
      }
      if (body.fatality_alert) {
        fatalityAlert = body.fatality_alert;
        requestedCluster = 'hazard'; // Force Big Mike for fatality toolbox talks
        customKeyword = `${fatalityAlert.classification} hazard prevention mining`;
        console.log(`Fatality Alert received: ${fatalityAlert.classification}`);
      }
      if (body.market_alert) {
        marketAlert = body.market_alert;
        requestedCluster = 'market'; // Force Marcus Webb for market analysis
        const primarySignal = marketAlert.signals?.[0];
        customKeyword = primarySignal ? `Mining ${primarySignal.type} market analysis` : 'Mining market analysis commodities';
        console.log(`Market Alert received: ${marketAlert.signals?.length || 0} signals`);
      }
      if (body.retry_count) {
        retryCount = body.retry_count;
      }
    } catch { /* No body or invalid JSON - use time-based selection */ }

    // Select cluster based on time or manual override
    const selectedClusterKey = requestedCluster || getTimeBasedCluster();
    const selectedCluster = KEYWORD_CLUSTERS[selectedClusterKey];
    const selectedKeyword = customKeyword || selectRandomItem(selectedCluster.keywords);
    const persona = PERSONAS[selectedCluster.persona as keyof typeof PERSONAS];

    console.log(`=== BLOG GENERATION START ===`);
    console.log(`UTC Hour: ${new Date().getUTCHours()}`);
    console.log(`Cluster: ${selectedClusterKey} ${requestedCluster ? '(manual override)' : '(time-based)'}`);
    console.log(`Keyword: "${selectedKeyword}"`);
    console.log(`Persona: ${persona.name} (${persona.content_type})`);

    // Fetch relevant research materials for RAG injection
    let ragContext = "";
    const { data: researchMaterials } = await supabase
      .from('research_materials')
      .select('raw_content, summary, source_type')
      .order('ingested_at', { ascending: false })
      .limit(3);
    
    if (researchMaterials?.length) {
      ragContext = "\n\n[RECENT INDUSTRY DATA - Use these facts if relevant]\n" + 
        researchMaterials.map(r => `- ${r.source_type}: ${r.summary || r.raw_content.substring(0, 500)}`).join('\n');
      console.log(`Injected ${researchMaterials.length} research materials for RAG`);
    }

    // SEASONAL CONTEXT INJECTION (Pipeline D from document)
    const month = new Date().getMonth(); // 0-11
    let seasonalContext = "";
    if (month >= 10 || month <= 2) { // Nov-Feb: Winter
      seasonalContext = `\n\n[SEASONAL ALERT - WINTER CONDITIONS]
- Ice and snow create slip/trip hazards on walkways, ladders, and equipment
- Frozen berms behave differently - reduced stopping power on haul roads
- Check anti-freeze levels in all fire suppression systems
- Diesel equipment may have cold-start issues - follow warm-up procedures
- Hypothermia risk for workers - enforce break schedules in heated areas
- Highwall stability concerns during freeze-thaw cycles`;
    } else if (month >= 5 && month <= 8) { // June-Sept: Summer
      seasonalContext = `\n\n[SEASONAL ALERT - HEAT STRESS CONDITIONS]
- Heat index monitoring is critical - NIOSH guidelines apply
- Mandatory hydration breaks every 15-20 minutes in high heat
- Watch for signs of heat exhaustion: confusion, rapid heartbeat, nausea
- Underground mines: ventilation becomes even more critical
- Dust suppression may be less effective in dry conditions
- Lightning risk during summer storms - have evacuation procedures ready`;
    } else { // Spring/Fall: Transition
      seasonalContext = `\n\n[SEASONAL ALERT - TRANSITION CONDITIONS]
- Spring thaw creates ground instability and mud conditions
- Fall brings shorter days - lighting becomes critical for safety
- Transition weather can change rapidly - monitor forecasts
- Equipment maintenance important as seasons change`;
    }
    ragContext += seasonalContext;
    console.log(`Injected seasonal context for month ${month + 1}`);

    // REGULATORY ALERT INJECTION (from Federal Register trigger)
    if (regulatoryAlert) {
      const regAlertContext = `\n\n[URGENT REGULATORY ALERT - NEW ${regulatoryAlert.type?.toUpperCase() || 'DOCUMENT'}]
Document Number: ${regulatoryAlert.document_number}
Title: ${regulatoryAlert.title}
Citation: ${regulatoryAlert.citation || 'Pending publication'}
Effective Date: ${regulatoryAlert.effective_date || 'See document for details'}

Abstract:
${regulatoryAlert.abstract || 'No abstract available'}

CRITICAL: This article MUST focus on this specific regulatory development. Explain:
1. What changed and who is affected
2. Key compliance deadlines
3. Specific actions operators must take
4. Penalties for non-compliance`;
      ragContext += regAlertContext;
      console.log(`Injected regulatory alert context for ${regulatoryAlert.document_number}`);
    }

    // FATALITY ALERT INJECTION (Pipeline B from document)
    if (fatalityAlert) {
      const fatalityContext = `\n\n[URGENT FATALITY ALERT - ${fatalityAlert.classification?.toUpperCase() || 'INCIDENT'}]
Classification: ${fatalityAlert.classification}
Mine Type: ${fatalityAlert.mine_type || 'Unknown'}
Date: ${fatalityAlert.date || 'Recent'}

Summary: ${fatalityAlert.summary || 'A miner was fatally injured in this type of incident.'}

CRITICAL: This Toolbox Talk MUST focus on preventing ${fatalityAlert.classification} incidents. Include:
1. What went wrong and how this type of accident typically occurs
2. Specific hazard recognition techniques
3. Pre-shift checks that could catch warning signs
4. The regulations that apply (cite specific 30 CFR sections)
5. What you want the crew to do TODAY to prevent this

Make it personal. Make it stick. Someone died.`;
      ragContext += fatalityContext;
      console.log(`Injected fatality alert context for ${fatalityAlert.classification}`);
    }

    // MARKET ALERT INJECTION (Pipeline C from document)
    if (marketAlert) {
      const signalDetails = marketAlert.signals?.map((s: any) => `- ${s.type}: ${s.message}\n  Analysis: ${s.analysis}`).join('\n') || '';
      const commodityPrices = marketAlert.commodities?.map((c: any) => `${c.name}: $${c.price} (${c.changePercent > 0 ? '+' : ''}${c.changePercent}%)`).join(', ') || '';
      const etfPerformance = marketAlert.etfs?.map((e: any) => `${e.symbol}: ${e.changePercent > 0 ? '+' : ''}${e.changePercent}%`).join(', ') || '';
      
      const marketContext = `\n\n[MARKET DATA ALERT - LIVE DATA]
${signalDetails ? 'KEY SIGNALS:\n' + signalDetails : ''}

COMMODITY PRICES: ${commodityPrices || 'Data unavailable'}
MINING ETF PERFORMANCE: ${etfPerformance || 'Data unavailable'}

CRITICAL: Use this real market data in your analysis. Focus on:
1. What's the conventional narrative vs what's really happening?
2. Second-order effects operators should consider
3. Specific implications for CapEx decisions, labor, or operations
4. What could prove this analysis wrong?`;
      ragContext += marketContext;
      console.log(`Injected market alert context with ${marketAlert.signals?.length || 0} signals`);
    }

    // AGENT A: The Strategist
    console.log("Agent A: Strategist generating outline...");
    const outlineResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a content strategist for mining safety content. Your job is to create article outlines targeting mine operators and safety managers.

You MUST generate a UNIQUE angle that hasn't been covered before. Consider:
- Specific regulatory requirements (30 CFR citations)
- Real operational challenges faced by small/medium operators
- Recent industry events or regulatory changes
- Practical implementation steps operators can take TODAY

Output a JSON object with:
- title: SEO-optimized title (50-60 chars, no generic phrases)
- angle: The unique perspective or hook (1-2 sentences)
- outline: Array of 4-5 H2 sections, each with 2-3 H3 subsections
- seo_keywords: Array of 5-8 related long-tail keywords
- content_type: "${persona.content_type}"
- target_word_count: ${persona.content_type === 'toolbox_talk' ? '800-1000' : '1200-1500'}`,
          },
          {
            role: "user",
            content: `Create an article outline for: "${selectedKeyword}"\n\nTarget audience: ${persona.content_type === 'toolbox_talk' ? 'Blue-collar workforce, foremen, safety trainers' : persona.content_type === 'compliance' ? 'Safety Directors, Legal Counsel, Mine Operators' : 'Investors, C-Suite, Industry Watchers'}${ragContext}`,
          },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!outlineResponse.ok) throw new Error(`Strategist failed: ${outlineResponse.status}`);
    const outlineData = await outlineResponse.json();
    const outline = JSON.parse(outlineData.choices[0].message.content);
    console.log(`Outline generated: "${outline.title}"`);

    // REDUNDANCY CHECK via embedding with RETRY LOGIC
    console.log("Checking for redundant content...");
    const topicEmbedding = await generateEmbedding(`${outline.title} ${outline.angle}`, LOVABLE_API_KEY);
    
    if (topicEmbedding) {
      const { isRedundant, similarPost } = await checkRedundancy(supabase, topicEmbedding);
      if (isRedundant && retryCount < MAX_RETRIES) {
        console.log(`REDUNDANCY DETECTED! Similar to: "${similarPost}"`);
        console.log(`Retry ${retryCount + 1}/${MAX_RETRIES}: Selecting different keyword...`);
        
        // Select a different keyword from the same cluster
        const availableKeywords = selectedCluster.keywords.filter(k => k !== selectedKeyword);
        if (availableKeywords.length > 0) {
          const newKeyword = selectRandomItem(availableKeywords);
          console.log(`Retrying with keyword: "${newKeyword}"`);
          
          // Recursive call with incremented retry count
          const retryResponse = await fetch(req.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': req.headers.get('Authorization') || '',
            },
            body: JSON.stringify({
              cluster: selectedClusterKey,
              customKeyword: newKeyword,
              retry_count: retryCount + 1,
            }),
          });
          
          return retryResponse;
        } else {
          console.log("No alternative keywords available, proceeding with current topic");
        }
      } else if (isRedundant) {
        console.log(`REDUNDANCY WARNING: Similar to "${similarPost}" but max retries reached. Proceeding.`);
      }
    }

    // AGENT B: The Writer (with persona injection)
    console.log(`Agent B: Writer generating content as ${persona.name}...`);
    const slangInjection = persona.slang_terms.length > 0 
      ? `\n\nMINING SLANG DICTIONARY - Integrate at least 3 terms naturally:\n${persona.slang_terms.map(term => `- "${term}": ${MINING_SLANG[term as keyof typeof MINING_SLANG]}`).join('\n')}`
      : '';

    const writerResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: persona.systemPrompt + slangInjection },
          {
            role: "user",
            content: `Write a ${outline.target_word_count || '1200-1500'} word blog article based on this outline:

Title: ${outline.title}
Angle: ${outline.angle}
Outline: ${JSON.stringify(outline.outline)}
Content Type: ${persona.content_type}

Requirements:
- Use semantic HTML (h2, h3, p, ul, li, strong, blockquote)
- Include specific 30 CFR regulatory citations where relevant
- Add one "safety-alert" div for critical warnings: <div class="safety-alert">Warning content</div>
- Add one "tip-box" div for practical tips: <div class="tip-box">Tip content</div>
- NO generic introductions - start directly with value
- Include 2-3 specific examples (real scenarios, equipment types, incidents)
- End with actionable next steps, NOT "In conclusion"
${persona.content_type === 'toolbox_talk' ? '- Keep it punchy - miners scan, they don\'t read novels' : ''}
${persona.content_type === 'compliance' ? '- Include specific section citations for all regulations mentioned' : ''}
${persona.content_type === 'market_analysis' ? '- Include specific financial metrics and company examples' : ''}
${ragContext}

Output only HTML content, no markdown code blocks.`,
          },
        ],
      }),
    });

    if (!writerResponse.ok) throw new Error(`Writer failed: ${writerResponse.status}`);
    const writerData = await writerResponse.json();
    let rawContent = writerData.choices[0].message.content.replace(/```html\n?/g, '').replace(/```\n?/g, '');
    console.log(`Content generated: ${rawContent.length} chars`);

    // AGENT C: The Editor (humanize)
    console.log("Agent C: Editor humanizing content...");
    const editorResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an editor who humanizes AI-generated content for mining industry professionals.

Your task:
1. Increase sentence variety (mix short punchy with longer explanations)
2. REMOVE these AI-sounding phrases: "In conclusion", "It is important to note", "In the dynamic world", "delve", "unlock", "game-changer", "crucial", "landscape", "navigate", "leverage", "utilize", "paramount", "synergy"
3. Add specific operational details and numbers where appropriate
4. Ensure the tone matches the persona: ${persona.name}
5. Keep all HTML structure intact
6. Fix any formatting issues

Output only the polished HTML content.`,
          },
          { role: "user", content: `Edit and humanize:\n\n${rawContent}` },
        ],
      }),
    });

    if (!editorResponse.ok) throw new Error(`Editor failed: ${editorResponse.status}`);
    const editorData = await editorResponse.json();
    let editedContent = editorData.choices[0].message.content.replace(/```html\n?/g, '').replace(/```\n?/g, '');

    // AGENT D: The Auditor (hallucination control)
    console.log("Agent D: Auditor validating content...");
    const auditorResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an MSHA compliance auditor. Your job is to validate mining safety content for accuracy and safety.

CRITICAL CHECKS:
1. If it claims a specific 30 CFR regulation exists, verify it's a real section (e.g., 30 CFR § 46.5 is real)
2. If it conflates Part 46 (Competent Person) with Part 48 (Approved Instructor), that's a CRITICAL ERROR
3. If it gives advice that could be unsafe (e.g., "skip pre-shift if you're late"), flag it
4. Check that silica PEL values are correct (50 μg/m³ is the new PEL)
5. Verify deadline dates are plausible (Coal Silica: Aug 2025, M/NM: April 2026)

Output JSON with:
- confidence_score: 0-100 (100 = no issues found)
- issues: Array of issues found (empty if none)
- corrected_content: The HTML with any factual corrections applied (or same content if no corrections needed)`,
          },
          { role: "user", content: `Audit this mining safety article:\n\n${editedContent}` },
        ],
        response_format: { type: "json_object" },
      }),
    });

    let finalContent = editedContent;
    let confidenceScore = 100;

    if (auditorResponse.ok) {
      try {
        const auditorData = await auditorResponse.json();
        const audit = JSON.parse(auditorData.choices[0].message.content);
        confidenceScore = audit.confidence_score || 100;
        if (audit.issues?.length) {
          console.log(`Auditor found ${audit.issues.length} issues:`, audit.issues);
        }
        if (audit.corrected_content) {
          finalContent = audit.corrected_content.replace(/```html\n?/g, '').replace(/```\n?/g, '');
        }
        console.log(`Auditor confidence score: ${confidenceScore}`);
      } catch (e) {
        console.log("Auditor response parsing failed, using edited content");
      }
    }

    // Generate final data
    const plainText = finalContent.replace(/<[^>]*>/g, '');
    const excerpt = plainText.substring(0, 155).trim() + '...';
    const slug = slugify(outline.title) + '-' + Date.now().toString(36);
    const readingTime = estimateReadingTime(finalContent);

    const categoryMap: Record<string, string> = {
      compliance: 'Part 46',
      hazard: 'Safety Alerts',
      market: 'Industry Trends',
      technology: 'Technology',
      emergency: 'Training',
    };

    const featuredImageUrl = await getRandomExistingImage(supabase) || "https://minesafetraining.com/og-default.jpg";

    // Generate embedding for the final content
    const contentEmbedding = await generateEmbedding(`${outline.title} ${excerpt}`, LOVABLE_API_KEY);

    // Determine status based on confidence score
    const status = confidenceScore >= 90 ? 'published' : 'draft';
    if (status === 'draft') {
      console.log(`Low confidence (${confidenceScore}) - saving as draft for review`);
    }

    // Insert into database
    const { data: post, error: insertError } = await supabase
      .from('blog_posts')
      .insert({
        title: outline.title,
        slug,
        content_html: finalContent,
        excerpt,
        seo_keywords: outline.seo_keywords || [],
        category: categoryMap[selectedClusterKey] || 'Part 46',
        status,
        reading_time_minutes: readingTime,
        featured_image_url: featuredImageUrl,
        confidence_score: confidenceScore,
        persona_used: persona.name,
        content_type: persona.content_type,
        embedding: contentEmbedding ? `[${contentEmbedding.join(',')}]` : null,
        published_at: status === 'published' ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (insertError) throw new Error(`Database insert failed: ${insertError.message}`);

    console.log(`=== BLOG GENERATION COMPLETE ===`);
    console.log(`Post ID: ${post.id}`);
    console.log(`Title: ${post.title}`);
    console.log(`Persona: ${persona.name}`);
    console.log(`Confidence: ${confidenceScore}`);
    console.log(`Status: ${status}`);

    return new Response(
      JSON.stringify({
        success: true,
        post: {
          id: post.id,
          title: post.title,
          slug: post.slug,
          persona: persona.name,
          content_type: persona.content_type,
          confidence_score: confidenceScore,
          status,
        },
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating blog post:", error);
    
    if (error.message?.includes('429')) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), 
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (error.message?.includes('402')) {
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify({ error: error.message || "Failed to generate blog post" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
