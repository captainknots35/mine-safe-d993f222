import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// MSHA Fatality classifications for categorization
const FATALITY_CLASSIFICATIONS = [
  "Powered Haulage",
  "Machinery",
  "Electrical",
  "Fall of Face/Rib/Side/Highwall",
  "Fall of Roof/Back",
  "Handling Materials",
  "Slip/Fall of Person",
  "Falling/Rolling/Sliding Rock or Material",
  "Drowning",
  "Inundation",
  "Exploding Vessels Under Pressure",
  "Fire",
  "Ignition or Explosion of Gas or Dust",
  "Other",
];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    console.log("=== MSHA FATALITY FETCH START ===");

    // Fetch recent fatalities from MSHA Data Retrieval System
    // Note: MSHA doesn't have a public API, so we use their open data endpoints
    // This fetches from their publicly available fatality data
    const currentYear = new Date().getFullYear();
    
    // MSHA publishes fatality data in various formats - we'll use their open data
    const mshaUrl = `https://arlweb.msha.gov/OpenGovernmentData/DataSets/Fatalities.txt`;
    
    console.log(`Fetching MSHA fatality data from: ${mshaUrl}`);
    
    const response = await fetch(mshaUrl);
    if (!response.ok) {
      console.log(`MSHA data fetch failed with status: ${response.status}`);
      // Fallback: Create synthetic fatality alerts based on common patterns
      // This ensures the pipeline works even if MSHA data is unavailable
      const syntheticFatalities = generateSyntheticFatalityAlerts();
      await storeFatalityResearch(supabase, syntheticFatalities);
      
      return new Response(JSON.stringify({
        success: true,
        source: "synthetic",
        message: "Generated synthetic fatality research based on common patterns",
        records: syntheticFatalities.length,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const rawData = await response.text();
    const fatalities = parseMSHAFatalities(rawData, currentYear);
    
    console.log(`Parsed ${fatalities.length} fatalities from ${currentYear}`);

    // Store new fatalities as research materials for RAG
    let newRecords = 0;
    for (const fatality of fatalities) {
      // Check if we already have this fatality
      const { data: existing } = await supabase
        .from('research_materials')
        .select('id')
        .eq('source_type', 'msha_fatality')
        .eq('source_id', fatality.id)
        .single();

      if (!existing) {
        const { error } = await supabase.from('research_materials').insert({
          source_type: 'msha_fatality',
          source_id: fatality.id,
          raw_content: JSON.stringify(fatality),
          summary: fatality.summary,
          metadata: {
            classification: fatality.classification,
            mine_type: fatality.mine_type,
            date: fatality.date,
            state: fatality.state,
          },
        });

        if (!error) {
          newRecords++;
          console.log(`Stored fatality: ${fatality.id} - ${fatality.classification}`);
        }
      }
    }

    // Trigger toolbox talk if we have new fatalities
    if (newRecords > 0) {
      const recentFatality = fatalities[0];
      console.log(`Triggering toolbox talk for: ${recentFatality.classification}`);
      
      // Invoke blog generation with fatality context
      await supabase.functions.invoke('generate-blog-post', {
        body: {
          cluster: 'hazard',
          fatality_alert: {
            classification: recentFatality.classification,
            mine_type: recentFatality.mine_type,
            summary: recentFatality.summary,
            date: recentFatality.date,
          },
        },
      });
    }

    console.log(`=== MSHA FATALITY FETCH COMPLETE: ${newRecords} new records ===`);

    return new Response(JSON.stringify({
      success: true,
      source: "msha",
      new_records: newRecords,
      total_fetched: fatalities.length,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("MSHA Fatality fetch error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function parseMSHAFatalities(rawData: string, targetYear: number): any[] {
  const lines = rawData.split('\n');
  const fatalities: any[] = [];
  
  // Skip header line
  for (let i = 1; i < lines.length && fatalities.length < 20; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const fields = line.split('|');
    if (fields.length < 10) continue;
    
    const year = parseInt(fields[0]);
    if (year !== targetYear && year !== targetYear - 1) continue;
    
    const fatality = {
      id: `msha-${fields[1] || i}`,
      date: fields[2] || 'Unknown',
      mine_type: fields[3]?.includes('UNDERGROUND') ? 'Underground' : 
                 fields[3]?.includes('SURFACE') ? 'Surface' : 'Unknown',
      classification: mapClassification(fields[5]),
      state: fields[4] || 'Unknown',
      summary: generateFatalitySummary(fields),
    };
    
    fatalities.push(fatality);
  }
  
  return fatalities;
}

function mapClassification(rawClassification: string): string {
  const normalized = rawClassification?.toUpperCase() || '';
  
  if (normalized.includes('HAULAGE') || normalized.includes('HAUL')) return 'Powered Haulage';
  if (normalized.includes('MACHINERY') || normalized.includes('MACHINE')) return 'Machinery';
  if (normalized.includes('ELECTRICAL') || normalized.includes('ELECTRIC')) return 'Electrical';
  if (normalized.includes('HIGHWALL') || normalized.includes('RIB') || normalized.includes('FACE')) return 'Fall of Face/Rib/Side/Highwall';
  if (normalized.includes('ROOF') || normalized.includes('BACK')) return 'Fall of Roof/Back';
  if (normalized.includes('MATERIAL') || normalized.includes('HANDLING')) return 'Handling Materials';
  if (normalized.includes('SLIP') || normalized.includes('FALL OF PERSON')) return 'Slip/Fall of Person';
  if (normalized.includes('FALLING') || normalized.includes('ROLLING') || normalized.includes('SLIDING')) return 'Falling/Rolling/Sliding Rock or Material';
  if (normalized.includes('DROWN')) return 'Drowning';
  if (normalized.includes('FIRE')) return 'Fire';
  if (normalized.includes('EXPLOSION') || normalized.includes('IGNITION')) return 'Ignition or Explosion of Gas or Dust';
  
  return 'Other';
}

function generateFatalitySummary(fields: string[]): string {
  const mineType = fields[3] || 'mining operation';
  const classification = mapClassification(fields[5]);
  const state = fields[4] || 'unknown location';
  
  return `A miner was fatally injured in a ${classification.toLowerCase()} incident at a ${mineType.toLowerCase()} in ${state}. This incident highlights the critical importance of safety protocols related to ${classification.toLowerCase()} hazards.`;
}

function generateSyntheticFatalityAlerts(): any[] {
  // Generate research materials based on common fatality patterns for RAG
  const commonPatterns = [
    {
      classification: 'Powered Haulage',
      context: 'Haul truck incidents remain the leading cause of mining fatalities. Common factors include: blind spots, failure to yield right-of-way, speeding on haul roads, inadequate berms, and equipment failure.',
      prevention: 'Pre-shift inspections, maintaining proper berms, speed limits, traffic management plans, and proximity detection systems.',
    },
    {
      classification: 'Machinery',
      context: 'Machinery-related fatalities often involve entanglement, crushing, or struck-by incidents during maintenance or operation.',
      prevention: 'Lockout/tagout procedures (30 CFR 56/57.12016), guarding requirements, training on equipment hazards.',
    },
    {
      classification: 'Fall of Face/Rib/Side/Highwall',
      context: 'Ground failures cause significant fatalities in both surface and underground operations. Factors include weather, blasting, geological conditions.',
      prevention: 'Regular scaling, ground support, highwall monitoring, weather-based protocols, exclusion zones.',
    },
    {
      classification: 'Electrical',
      context: 'Electrical fatalities occur during equipment repair, cable handling, and work near energized systems.',
      prevention: 'Electrical work permits, proper insulation, grounding systems, qualified electrical workers only.',
    },
  ];

  return commonPatterns.map((pattern, idx) => ({
    id: `synthetic-${Date.now()}-${idx}`,
    source_type: 'msha_fatality_pattern',
    summary: `${pattern.classification}: ${pattern.context} Prevention: ${pattern.prevention}`,
    classification: pattern.classification,
    context: pattern.context,
    prevention: pattern.prevention,
  }));
}

async function storeFatalityResearch(supabase: any, patterns: any[]) {
  for (const pattern of patterns) {
    const { data: existing } = await supabase
      .from('research_materials')
      .select('id')
      .eq('source_type', 'msha_fatality_pattern')
      .eq('source_id', pattern.classification)
      .single();

    if (!existing) {
      await supabase.from('research_materials').insert({
        source_type: 'msha_fatality_pattern',
        source_id: pattern.classification,
        raw_content: JSON.stringify(pattern),
        summary: pattern.summary,
        metadata: {
          classification: pattern.classification,
          prevention: pattern.prevention,
        },
      });
    }
  }
}
