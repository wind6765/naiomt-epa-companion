import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function buildSystemPrompt(
  mode: string,
  program: string,
  programData: { domains: string; competencies: string; epas: string; entrustmentLevels: string }
): string {
  const programLabel =
    program === 'residency' ? 'Residency (ABPTRFE / routine expertise)' :
    program === 'fellowship' ? 'Fellowship (CEBE / advanced expertise)' :
    program === 'certification' ? 'Certification (assessment pathway)' :
    'NAIOMT';

  const base = `You are an expert advisor for the NAIOMT (North American Institute for Orthopedic Manual Therapy) EPA (Essential Professional Activities) framework. You are currently operating in the context of the ${programLabel} program.

CURRENT PROGRAM DATA:

DOMAINS:
${programData.domains}

COMPETENCIES:
${programData.competencies}

EPAs (shared across programs):
${programData.epas}

ENTRUSTMENT LEVELS:
${programData.entrustmentLevels}

3 COMPLEXITY TIERS:
- Low Complexity: Straightforward, routine presentations
- Moderate Complexity: Cases with multiple contributing factors or psychosocial complexity
- High Complexity: Multi-system involvement, significant psychosocial barriers, or atypical presentations

Always be professional, evidence-informed, and focused on advancing clinical excellence in orthopedic manual therapy. Ground all answers in the actual curriculum data above.`;

  switch (mode) {
    case 'qa':
      return `${base}

MODE: EPA & Competency Q&A
Answer questions about EPAs, competencies, domains, entrustment levels, and the curriculum framework. Be specific — reference competency codes, EPA numbers, and domain names from the data above. If a question is about a different program than the one currently selected, note that and answer based on what you know.`;

    case 'clinical':
      return `${base}

MODE: Clinical Reasoning Advisor
Help users analyze clinical scenarios through the lens of the ${programLabel} curriculum. When a user describes a patient:
1. Identify the relevant EPA(s) and competencies
2. Classify the complexity level (low/moderate/high)
3. Consider pain phenotype if applicable
4. ${program === 'residency' ? 'Ground your response in CBP protocols and the routine expertise framework' : 'Ground your response in adaptive reasoning and the CEBE framework'}
5. Suggest assessment approaches and management considerations
6. Reference specific competencies by code`;

    case 'entrustment':
      return `${base}

MODE: Entrustment Decision Support
Help mentors and program directors calibrate entrustment decisions. When a user describes a learner's performance:
1. Map the performance to the entrustment scale levels above
2. Identify which EPA(s) and competencies are being assessed
3. Consider the complexity tier of the cases described
4. Describe what progression to the next level would look like
5. Use the specific behavioral descriptors from the entrustment levels above
6. Note that the ${programLabel} entrustment scale may have different calibration than other programs`;

    case 'research':
      return `${base}

MODE: Research & Document Search
Help users find information across the curriculum framework. Answer questions about:
- What the curriculum says about specific topics
- How competencies relate to each other
- Framework structure and relationships
- Evidence and literature references within the curriculum
Search broadly across the competency definitions, EPA specifications, and domain descriptions above.`;

    default:
      return base;
  }
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { response: 'API key not configured. Please set ANTHROPIC_API_KEY in your environment variables.' },
        { status: 500 }
      );
    }

    const client = new Anthropic({ apiKey });
    const { messages, mode = 'qa', program = 'fellowship' } = await request.json();

    // Fetch program data from Supabase
    const { data: programs } = await supabase
      .from('programs')
      .select('*')
      .eq('slug', program)
      .single();

    const programId = programs?.id;

    // Fetch program-scoped data in parallel
    const [domainsRes, compsRes, epasRes, levelsRes] = await Promise.all([
      programId
        ? supabase.from('competency_domains').select('*').eq('program_id', programId).order('sort_order')
        : Promise.resolve({ data: [] }),
      programId
        ? supabase.from('competencies').select('*').eq('program_id', programId).order('sort_order')
        : Promise.resolve({ data: [] }),
      supabase.from('epas').select('*').order('number'),
      programId
        ? supabase.from('entrustment_levels').select('*').eq('program_id', programId).order('level')
        : Promise.resolve({ data: [] }),
    ]);

    const domains = domainsRes.data || [];
    const comps = compsRes.data || [];
    const epas = epasRes.data || [];
    const levels = levelsRes.data || [];

    // If no program-specific entrustment levels, try generic
    let entrustmentLevels = levels;
    if (entrustmentLevels.length === 0) {
      const { data: fallback } = await supabase
        .from('entrustment_levels')
        .select('*')
        .is('program_id', null)
        .order('level');
      entrustmentLevels = fallback || [];
    }

    const programData = {
      domains: domains.length > 0
        ? domains.map((d: { code: string; name: string; description?: string }) =>
            `${d.code}: ${d.name}${d.description ? ` — ${d.description}` : ''}`
          ).join('\n')
        : 'No domains mapped yet for this program.',
      competencies: comps.length > 0
        ? comps.map((c: { code: string; title: string }) => `${c.code}: ${c.title}`).join('\n')
        : 'No competencies mapped yet for this program.',
      epas: epas.map((e: { number: number; title: string; description?: string }) =>
        `EPA ${e.number}: ${e.title}${e.description ? ` — ${e.description}` : ''}`
      ).join('\n'),
      entrustmentLevels: entrustmentLevels.length > 0
        ? entrustmentLevels.map((l: { level: number; descriptor: string; meaning?: string }) =>
            `Level ${l.level}: ${l.descriptor}${l.meaning ? ` — ${l.meaning}` : ''}`
          ).join('\n')
        : 'Entrustment levels not yet defined for this program.',
    };

    const systemPrompt = buildSystemPrompt(mode, program, programData);

    const maxTokens = mode === 'qa' ? 1000 : 2000;

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: messages.map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
    });

    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

    return Response.json({ response: responseText });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { response: 'An error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
