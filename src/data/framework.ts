export interface Competency {
  id: number;
  text: string;
  domains: string[];
  epaMappings: { epaId: number; role: 'P' | 'S' }[];
}

export interface Specification {
  number: number;
  text: string;
}

export interface MatrixCell {
  level: number;
  levelDesc: string;
  low: string;
  moderate: string;
  high: string;
}

export interface EPA {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  specifications: Specification[];
  primaryCompetencies: number[];
  supportingCompetencies: number[];
  matrix: MatrixCell[];
  assessmentMethods: string;
  assessmentQuestions: string;
  literature: string;
}

export interface Domain {
  name: string;
  description: string;
}

export interface EntrustmentLevel {
  level: number;
  descriptor: string;
  meaning: string;
}

export const DOMAINS: Domain[] = [
  {
    name: "Knowledge for Practice",
    description: "Integration of foundational, behavioral, and movement sciences into clinical reasoning"
  },
  {
    name: "Patient/Client Care and Services",
    description: "Evidence-informed, person-centered evaluation and intervention across complexity levels"
  },
  {
    name: "Practice Management",
    description: "Value-based care delivery with administrative oversight and resource stewardship"
  },
  {
    name: "Teaching and Learning",
    description: "Education to empower patients, communities, peers, and learners"
  },
  {
    name: "Communication and Collaboration",
    description: "Culturally responsive, interprofessional relationships and shared decision-making"
  },
  {
    name: "Professionalism",
    description: "Leadership, ethical practice, and lifelong scholarship"
  },
  {
    name: "Stewards of Societal Health",
    description: "Health promotion, prevention, and advocacy at the population level"
  }
];

export const ENTRUSTMENT_LEVELS: EntrustmentLevel[] = [
  {
    level: 1,
    descriptor: "Direct supervision for high complexity",
    meaning: "Can manage routine/moderate cases; high-complexity cases require the mentor to be present and actively guiding decisions."
  },
  {
    level: 2,
    descriptor: "Shared decision-making for high complexity",
    meaning: "Can manage moderate cases with growing independence; high-complexity cases require real-time co-reasoning with the mentor."
  },
  {
    level: 3,
    descriptor: "Consultation available for high complexity",
    meaning: "Can manage most cases independently; may seek consultation for the most complex or atypical presentations."
  },
  {
    level: 4,
    descriptor: "Independent with oversight",
    meaning: "Can manage all cases independently; mentor available but not routinely needed. Oversight is periodic and summative."
  },
  {
    level: 5,
    descriptor: "Ready to mentor others",
    meaning: "Practices independently and is prepared to mentor peers and learners in the competencies associated with this EPA."
  }
];

export const COMPETENCIES: Competency[] = [
  {
    id: 1,
    text: "Demonstrate a skilled, person-centered, motivational interview to build a meaningful therapeutic alliance.",
    domains: ["Patient/Client Care and Services", "Communication and Collaboration"],
    epaMappings: [
      { epaId: 1, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 4, role: 'S' },
      { epaId: 8, role: 'S' }
    ]
  },
  {
    id: 2,
    text: "Apply dual-processing clinical reasoning to generate, test, and refine diagnostic hypotheses.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'S' },
      { epaId: 2, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 6, role: 'S' }
    ]
  },
  {
    id: 3,
    text: "Engage in and learn from reflective practice with real-time problem solving and post-encounter review.",
    domains: ["Knowledge for Practice", "Professionalism"],
    epaMappings: [
      { epaId: 2, role: 'S' },
      { epaId: 3, role: 'S' },
      { epaId: 5, role: 'S' },
      { epaId: 6, role: 'P' }
    ]
  },
  {
    id: 4,
    text: "Use systemic screening to recognize and act on urgent or emergent changes by initiating appropriate safety measures, escalation pathways, and appropriate referral processes.",
    domains: ["Patient/Client Care and Services", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 1, role: 'S' },
      { epaId: 2, role: 'S' },
      { epaId: 7, role: 'P' }
    ]
  },
  {
    id: 5,
    text: "Use shared decision-making and person-appropriate non-biased communication to establish the management plan and informed consent.",
    domains: ["Communication and Collaboration", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'S' },
      { epaId: 2, role: 'S' },
      { epaId: 3, role: 'P' },
      { epaId: 4, role: 'S' },
      { epaId: 8, role: 'S' }
    ]
  },
  {
    id: 6,
    text: "Utilize dominant pain-phenotypes identification to guide evaluation, intervention, and management.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'S' },
      { epaId: 2, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 5, role: 'S' }
    ]
  },
  {
    id: 7,
    text: "Assess SINSS to guide safe and appropriate dosing/vigor and/or triage of testing, interventions, and management.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'P' },
      { epaId: 2, role: 'S' },
      { epaId: 3, role: 'S' },
      { epaId: 5, role: 'S' },
      { epaId: 7, role: 'S' }
    ]
  },
  {
    id: 8,
    text: "Incorporate regional-interdependence, coexisting MSK pathologies, and functional impairments into management planning.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'S' },
      { epaId: 2, role: 'S' },
      { epaId: 3, role: 'P' },
      { epaId: 5, role: 'S' }
    ]
  },
  {
    id: 9,
    text: "Identify subjective domains of complexity and early indicators of chronicity/recurrence using appropriate screening tools.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'P' },
      { epaId: 2, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 6, role: 'P' }
    ]
  },
  {
    id: 10,
    text: "Identify objective domains of complexity risk using appropriate observation and palpation screening tools.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'P' },
      { epaId: 2, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 6, role: 'P' }
    ]
  },
  {
    id: 11,
    text: "Develop prognoses using assessment of mitigating and perpetuating factors.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 2, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 6, role: 'P' }
    ]
  },
  {
    id: 12,
    text: "Demonstrate a targeted, evidence-informed objective examination for each relevant impairment region.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'P' },
      { epaId: 2, role: 'S' },
      { epaId: 6, role: 'S' }
    ]
  },
  {
    id: 13,
    text: "Person-appropriate communication of diagnoses and clinical patterns (pain types, pathoanatomic and movement impairments).",
    domains: ["Communication and Collaboration", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 2, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 8, role: 'P' }
    ]
  },
  {
    id: 14,
    text: "Communicate and integrate contemporary, comprehensive, and evidence-informed OMPT models with person-centered reasoning.",
    domains: ["Knowledge for Practice", "Communication and Collaboration"],
    epaMappings: [
      { epaId: 2, role: 'S' },
      { epaId: 3, role: 'S' },
      { epaId: 5, role: 'S' },
      { epaId: 8, role: 'P' }
    ]
  },
  {
    id: 15,
    text: "Integrate the identification and relative importance of mobility impairments or movement-coordination impairments into intervention and management.",
    domains: ["Patient/Client Care and Services", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 1, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 5, role: 'P' }
    ]
  },
  {
    id: 16,
    text: "Develop the prognosis and self-management plan based on the person's complexity profile.",
    domains: ["Patient/Client Care and Services", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 2, role: 'S' },
      { epaId: 3, role: 'S' },
      { epaId: 4, role: 'P' }
    ]
  },
  {
    id: 17,
    text: "Facilitate positive outcomes by using management strategies that enhance attendance, adherence, and preventative/self-maintenance.",
    domains: ["Patient/Client Care and Services", "Communication and Collaboration"],
    epaMappings: [
      { epaId: 3, role: 'S' },
      { epaId: 4, role: 'P' },
      { epaId: 6, role: 'S' },
      { epaId: 8, role: 'S' }
    ]
  },
  {
    id: 18,
    text: "Utilize iterative/ongoing subjective and objective reassessments throughout the episode of care.",
    domains: ["Patient/Client Care and Services", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 1, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 6, role: 'P' },
      { epaId: 10, role: 'S' }
    ]
  },
  {
    id: 19,
    text: "Assess, interpret and communicate the subjective and objective symptom and functional changes data to inform plan modification, care effectiveness and/or episode closure.",
    domains: ["Patient/Client Care and Services", "Communication and Collaboration"],
    epaMappings: [
      { epaId: 3, role: 'S' },
      { epaId: 6, role: 'P' },
      { epaId: 8, role: 'S' },
      { epaId: 10, role: 'P' }
    ]
  },
  {
    id: 20,
    text: "Integrate components of a comprehensive, contemporary manual therapy, multi-modal approach for functional and psychosocial gains.",
    domains: ["Patient/Client Care and Services", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 3, role: 'S' },
      { epaId: 4, role: 'S' },
      { epaId: 5, role: 'P' }
    ]
  },
  {
    id: 21,
    text: "Demonstrate targeted and dosed manual therapy techniques.",
    domains: ["Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 5, role: 'P' }
    ]
  },
  {
    id: 22,
    text: "Select and implement training dosage to achieve functional and psychosocial goals across meaningful ADLs, hobbies, and roles.",
    domains: ["Patient/Client Care and Services", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 3, role: 'S' },
      { epaId: 4, role: 'P' },
      { epaId: 5, role: 'P' }
    ]
  },
  {
    id: 23,
    text: "Train and progress individualized self-management programs based on readiness and status.",
    domains: ["Patient/Client Care and Services", "Teaching and Learning"],
    epaMappings: [
      { epaId: 4, role: 'P' },
      { epaId: 5, role: 'S' },
      { epaId: 8, role: 'S' }
    ]
  },
  {
    id: 24,
    text: "Incorporate self-management strategies, including pain-science and health education.",
    domains: ["Teaching and Learning", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 4, role: 'S' },
      { epaId: 8, role: 'P' }
    ]
  },
  {
    id: 25,
    text: "Teach symptom-management strategies through awareness of movement, static positions, and external environment.",
    domains: ["Teaching and Learning", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 4, role: 'P' },
      { epaId: 5, role: 'S' },
      { epaId: 8, role: 'P' }
    ]
  },
  {
    id: 26,
    text: "Utilize evidence-informed practice, integrating clinical experience and/or patient preferences when research evidence is lacking.",
    domains: ["Knowledge for Practice", "Professionalism"],
    epaMappings: [
      { epaId: 2, role: 'S' },
      { epaId: 3, role: 'P' }
    ]
  },
  {
    id: 27,
    text: "Demonstrate safe, effective, efficient practice across all ages, complexity levels, and body regions.",
    domains: ["Patient/Client Care and Services", "Professionalism"],
    epaMappings: [
      { epaId: 1, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 5, role: 'P' },
      { epaId: 6, role: 'S' },
      { epaId: 7, role: 'P' }
    ]
  },
  {
    id: 28,
    text: "Demonstrate adaptive expertise throughout the episode of care.",
    domains: ["Patient/Client Care and Services", "Professionalism"],
    epaMappings: [
      { epaId: 2, role: 'S' },
      { epaId: 3, role: 'P' },
      { epaId: 5, role: 'S' },
      { epaId: 6, role: 'P' }
    ]
  },
  {
    id: 29,
    text: "Collaborate with peers, multidisciplinary providers, and digital adjuncts to facilitate quality and outcomes.",
    domains: ["Communication and Collaboration", "Practice Management"],
    epaMappings: [
      { epaId: 3, role: 'P' },
      { epaId: 6, role: 'S' },
      { epaId: 9, role: 'S' },
      { epaId: 10, role: 'S' }
    ]
  },
  {
    id: 30,
    text: "Triage, delegate and supervise care by aligning the tasks with the scope, competence and patient complexity, while maintaining accountability for quality and outcomes.",
    domains: ["Practice Management", "Professionalism"],
    epaMappings: [
      { epaId: 3, role: 'S' },
      { epaId: 9, role: 'P' }
    ]
  },
  {
    id: 31,
    text: "Mentor peers and learners in contemporary OMPT and advanced clinical reasoning.",
    domains: ["Teaching and Learning", "Professionalism"],
    epaMappings: [
      { epaId: 8, role: 'P' },
      { epaId: 9, role: 'P' }
    ]
  },
  {
    id: 32,
    text: "Demonstrate leadership, lifelong scholarship, evidence currency, and contribution to evidence-informed PT.",
    domains: ["Professionalism", "Stewards of Societal Health"],
    epaMappings: [
      { epaId: 3, role: 'S' },
      { epaId: 8, role: 'P' },
      { epaId: 9, role: 'S' }
    ]
  },
  {
    id: 33,
    text: "Conclude an episode of care by integrating outcomes, functional status, patient goals and feedback to determine readiness for discharge or transition.",
    domains: ["Patient/Client Care and Services", "Communication and Collaboration"],
    epaMappings: [
      { epaId: 10, role: 'P' }
    ]
  }
];

export const EPAS: EPA[] = [
  {
    id: 1,
    title: "Perform Initial Examination of Persons at All Complexity Levels",
    shortTitle: "Initial Examination",
    description: "The fellow conducts a comprehensive initial examination that integrates a person-centered interview, systemic screening, pain-phenotype identification, complexity assessment, and targeted objective testing. This EPA encompasses the full scope of the first encounter--from building the therapeutic alliance through the subjective history to the hands-on objective examination--across low, moderate, and high complexity presentations. The fellow must demonstrate the capacity to adapt examination depth and focus based on emerging clinical findings, safety considerations, SINSS assessment, and the person's unique contextual factors.",
    specifications: [
      {
        number: 1,
        text: "Conducts a skilled, person-centered motivational interview that builds therapeutic alliance and elicits the patient's narrative, goals, and concerns."
      },
      {
        number: 2,
        text: "Performs screening (all flags and SINSS) to identify urgent/emergent conditions and establish safety parameters and dosing/vigor for testing, intervention, and management."
      },
      {
        number: 3,
        text: "Identifies the dominant pain phenotype(s) (nociceptive, nociplastic, neuropathic) through structured subjective and objective findings of each impairment region."
      },
      {
        number: 4,
        text: "Assesses subjective and objective domains of complexity, including psychosocial screening, chronicity/recurrence indicators, and risk-stratification tools, including potential non-responders."
      },
      {
        number: 5,
        text: "Performs a targeted, evidence-informed objective examination for each relevant impairment region(s), informed by the subjective findings."
      },
      {
        number: 6,
        text: "Integrates regional-interdependence reasoning to identify contributing regions and coexisting pathologies."
      },
      {
        number: 7,
        text: "Adapts examination strategy in real time based on emerging findings, safety concerns, and patient response."
      }
    ],
    primaryCompetencies: [1, 7, 9, 10, 12, 15, 18, 27],
    supportingCompetencies: [2, 4, 5, 6, 8],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Conducts a structured interview and standard objective exam for straightforward presentations. May miss secondary findings. Identifies obvious red flags with prompting.",
        moderate: "Conducts a reasonable exam but may not fully adapt to emerging complexity. Requires guidance to prioritize screening tools and interpret psychosocial factors.",
        high: "Needs the mentor present to guide the examination sequence, complexity screening, and safety decision-making. May become overwhelmed by competing clinical demands."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently conducts a thorough, person-centered examination. Identifies pain phenotype and relevant impairments with confidence.",
        moderate: "Manages the exam with growing independence. Can identify complexity domains but benefits from real-time discussion to refine the approach and integrate regional interdependence.",
        high: "Can initiate the exam but requires co-reasoning with the mentor to navigate multi-system presentations, atypical pain patterns, and layered psychosocial factors."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Performs an efficient, targeted examination tailored to the presentation. Integrates SINSS, pain phenotyping, and complexity screening seamlessly.",
        moderate: "Independently manages the full exam scope. Adapts strategy in real time based on findings. May consult mentor for unusual or ambiguous presentations.",
        high: "Conducts a comprehensive exam across complexity domains. May seek consultation for the most atypical or multi-system cases but demonstrates sound clinical judgment throughout."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Examination is efficient, focused, and consistently high quality. Rarely requires any input.",
        moderate: "Independently manages all moderate-complexity examinations with adaptive expertise. Demonstrates real-time hypothesis testing and strategy adjustment.",
        high: "Independently manages high-complexity examinations. Integrates all complexity domains, contextual factors, and safety considerations. Oversight is periodic and confirmatory."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners through straightforward examinations, articulating reasoning and modeling person-centered technique.",
        moderate: "Can mentor learners through moderately complex examinations, teaching adaptive examination strategies and complexity screening.",
        high: "Can mentor learners through high-complexity examinations, teaching integration of multiple complexity domains, contextual reasoning, and real-time adaptive decision-making."
      }
    ],
    assessmentMethods: "Recommended Methods: Direct observation during initial evaluations; structured case discussion (post-encounter review); review of documented examination findings and clinical reasoning.",
    assessmentQuestions: "Key Assessment Questions: Does the fellow adapt the examination to the emerging clinical picture? Can the fellow identify and integrate complexity domains? Does the fellow maintain safety awareness (all flags) throughout, and identify the SINSS status? Is the therapeutic alliance established effectively?",
    literature: "Finucane et al. (2020) -- red flag screening; Petersen (2021) -- SINSS construct in clinical reasoning; Shepherd et al. (2025) -- person-centered hypothesis framework; Keiter (2024) & Poulter (2025) -- contextual factors in examination."
  },
  {
    id: 2,
    title: "Establish Diagnosis and Prognosis at All Complexity Levels",
    shortTitle: "Diagnosis & Prognosis",
    description: "The fellow integrates examination findings (subjective and objective) to hypothesize and to name or classify the clinical diagnosis(es) (pain type, pathoanatomical and/or movement impairments) and the complexity-informed prognosis. This EPA requires the application of dual-processing clinical reasoning to generate, test, and refine diagnostic hypotheses for each problem region; identification of the dominant pain phenotype(s); assessment of mitigating and perpetuating factors; risk stratification for chronicity, recurrence, and/or non-response; and person-appropriate communication of the diagnosis(es) and clinical patterns. The prognosis must account for the full complexity profile, including psychosocial, biomedical, and contextual factors, to set realistic expectations and guide management planning.",
    specifications: [
      {
        number: 1,
        text: "Applies dual-processing clinical reasoning (Type I and Type II) to synthesize examination data into diagnostic hypotheses."
      },
      {
        number: 2,
        text: "Identifies (i) the dominant pain phenotype(s) (nociceptive, nociplastic, neuropathic), (ii) identifies and names the probable pathoanatomical condition(s) and/or potential tissue/structural damage/injury, (iii) hypothesizes the location(s) of possible movement impairment(s), and communicates this classification to the patient in person-appropriate language."
      },
      {
        number: 3,
        text: "Integrates subjective and objective complexity domains to establish a complexity profile that informs prognosis."
      },
      {
        number: 4,
        text: "Develops a prognosis using assessment of mitigating and perpetuating factors, including early indicators of chronicity/recurrence, and potential non-responders."
      },
      {
        number: 5,
        text: "Stratifies risk using validated screening tools to identify potential non-responders."
      },
      {
        number: 6,
        text: "Discusses diagnoses (pain types, pathoanatomic and movement impairments) and clinical patterns to patients, caregivers, and others in person-appropriate, non-biased language to provide understanding and clarity to the current management plan and future self-management."
      },
      {
        number: 7,
        text: "Engages in reflective practice to refine diagnostic hypotheses when findings are ambiguous or conflicting."
      }
    ],
    primaryCompetencies: [2, 6, 9, 10, 11, 13],
    supportingCompetencies: [3, 4, 5, 7, 8, 12, 14, 16, 26, 28],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Identifies straightforward diagnoses (e.g., clear nociceptive pattern, single-region impairment). Formulates a basic prognosis. May rely heavily on Type I reasoning.",
        moderate: "Can generate diagnostic hypotheses but may struggle to integrate competing findings. Prognosis may not account for all complexity domains. Needs guidance to weigh perpetuating factors.",
        high: "Requires the mentor to guide hypothesis generation and testing. May not recognize atypical pain phenotypes or multi-domain complexity. Prognosis development needs direct supervision."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently establishes diagnosis and prognosis. Communicates findings clearly. Applies pain-phenotype classification confidently.",
        moderate: "Generates and tests hypotheses with growing sophistication. Integrates complexity domains but benefits from real-time co-reasoning to refine prognosis and identify non-responder risk.",
        high: "Can initiate diagnostic reasoning but requires shared decision-making with the mentor for atypical presentations, mixed pain phenotypes, and multi-layered perpetuating/mitigating factors."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Diagnosis and prognosis are efficient, accurate, and clearly communicated. Demonstrates seamless integration of phenotype, complexity, and contextual factors.",
        moderate: "Independently manages diagnostic reasoning for moderate complexity. Demonstrates adaptive expertise when initial hypotheses are disconfirmed. Prognosis is nuanced and individualized.",
        high: "Manages most high-complexity diagnoses independently. May seek consultation for the most ambiguous or rare presentations. Demonstrates tolerance of uncertainty and systematic hypothesis revision."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Diagnostic reasoning is fast, accurate, and intuitive. Fellow articulates reasoning transparently for documentation and patient communication.",
        moderate: "All moderate-complexity diagnoses handled independently with sophistication. Integrates reflective practice and adaptive expertise as standard.",
        high: "Independently establishes diagnosis and prognosis for high-complexity cases. Contextual factors, mixed phenotypes, and perpetuating/mitigating factors are fully integrated. Oversight is confirmatory."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in diagnostic reasoning, teaching the interplay of Type I and Type II processing for straightforward cases.",
        moderate: "Can mentor learners through moderate-complexity diagnoses, modeling hypothesis testing, complexity profiling, and person-centered communication of findings.",
        high: "Can mentor learners through high-complexity diagnostic challenges, teaching adaptive expertise, uncertainty tolerance, and the integration of contextual factors into prognostic reasoning."
      }
    ],
    assessmentMethods: "Recommended Methods: Case-based oral examination; structured review of written diagnoses and prognoses; direct observation of patient communication during diagnosis delivery.",
    assessmentQuestions: "Key Assessment Questions: Does the fellow demonstrate both Type I and Type II reasoning? Can the fellow identify when routine reasoning has failed and shift to analytical processing? Is the prognosis individualized to the complexity profile? Is the diagnosis communicated in person-appropriate, non-biased language?",
    literature: "Mylopoulos & Woods (2017) -- adaptive expertise and dual-processing; Cook et al. (2023) -- pain mechanism frameworks; O'Keeffe et al. (2022) -- diagnostic labeling; Shepherd et al. (2025) -- person-centered hypothesis framework."
  },
  {
    id: 3,
    title: "Develop Management Plans at All Complexity Levels",
    shortTitle: "Management Plans",
    description: "The fellow develops a contemporary, comprehensive, individualized manual therapy-approach management plan that integrates the diagnosis(es), prognosis(es), and complexity profile, recognizing the individuality of each person and case, and the person's goals, preferences, and contextual factors. This EPA requires shared decision-making, incorporation of regional interdependence and coexisting pathologies, adaptive expertise under uncertainty, evidence-informed reasoning supplemented by clinical experience when evidence is insufficient, and interprofessional collaboration. The management plan must be a living document--responsive to evolving clinical findings, patient response, and contextual influences throughout the episode of care.",
    specifications: [
      {
        number: 1,
        text: "Develops an individualized management plan informed by the diagnosis, prognosis, and complexity profile."
      },
      {
        number: 2,
        text: "Utilizes shared decision-making and informed consent to co-construct the plan with the patient."
      },
      {
        number: 3,
        text: "Incorporates regional interdependence, coexisting MSK pathologies, and functional impairments into the plan design."
      },
      {
        number: 4,
        text: "Utilizes evidence-informed practice, integrating clinical experience and/or patient preferences when research evidence is lacking."
      },
      {
        number: 5,
        text: "Demonstrates adaptive expertise by revising the plan when initial approaches are ineffective or when new findings emerge."
      },
      {
        number: 6,
        text: "Coordinates with multidisciplinary providers and digital adjuncts to optimize care delivery and reduce unnecessary utilization."
      },
      {
        number: 7,
        text: "Structures the plan to address the dominant pain phenotype(s), contextual factors, and modifiable perpetuating factors."
      }
    ],
    primaryCompetencies: [5, 8, 26, 28, 29],
    supportingCompetencies: [1, 2, 3, 6, 7, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 22, 27, 30, 32],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Develops a straightforward management plan for uncomplicated presentations. Plan addresses the primary impairment but may lack integration of secondary factors or contextual considerations.",
        moderate: "Can draft a management plan but may struggle to prioritize competing demands. Needs guidance to integrate regional interdependence, psychosocial factors, and collaboration with other providers.",
        high: "Requires the mentor to co-develop the plan. May default to template-based approaches rather than individualized, complexity-informed reasoning. Shared decision-making may be superficial."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently develops well-structured plans that integrate diagnosis, prognosis, and patient goals. Shared decision-making is genuine and effective.",
        moderate: "Develops increasingly sophisticated plans. Can incorporate regional interdependence and coexisting pathologies. Benefits from co-reasoning to refine the approach for cases with multiple perpetuating factors.",
        high: "Can draft a preliminary plan but requires shared decision-making with the mentor to address multi-system complexity, interprofessional coordination, and management under significant uncertainty."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Management plans are efficient, individualized, and clearly articulated. Integrates evidence, clinical experience, and patient preferences seamlessly.",
        moderate: "Independently develops plans for moderate complexity. Demonstrates adaptive expertise when initial plans require revision. Interprofessional collaboration is proactive.",
        high: "Manages most high complexity plans independently. May consult for rare or exceptionally layered presentations. Plans demonstrate integration of contextual factors, pain phenotype, and complexity domains."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Plan development is expert-level: efficient, precise, and consistently outcome-oriented.",
        moderate: "All moderate-complexity management plans developed independently. Plans are living documents that evolve with the clinical picture.",
        high: "Independently develops and adapts management plans for the most complex cases. Full integration of adaptive expertise, contextual reasoning, and interprofessional coordination. Oversight is confirmatory."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in fundamentals of person-centered management planning, teaching shared decision-making and evidence integration.",
        moderate: "Can mentor learners through moderate-complexity management planning, teaching regional-interdependence reasoning, collaboration, and adaptive plan revision.",
        high: "Can mentor learners through high-complexity management planning, teaching integration of contextual factors, management under uncertainty, and interprofessional coordination for multi-system cases."
      }
    ],
    assessmentMethods: "Recommended Methods: Review of written management plans; case-based discussion of planning rationale; direct observation of shared decision-making conversations; longitudinal review of plan adaptations across an episode of care.",
    assessmentQuestions: "Key Assessment Questions: Is the plan individualized to the complexity profile and patient goals? Does the fellow use shared decision-making genuinely, not perfunctorily? Does the plan evolve with the clinical picture? Does the fellow integrate interprofessional collaboration when indicated? Can the fellow manage under uncertainty using adaptive expertise? Can the fellow manage more than one region and/or pain/pathology/movement impairment simultaneously?",
    literature: "Shepherd et al. (2025) -- person-centered hypothesis framework; Mylopoulos & Woods (2017) -- adaptive expertise; Keiter (2024) & Poulter (2025) -- contextual factors in management."
  },
  {
    id: 4,
    title: "Establish Self-Management Programs at All Complexity Levels",
    shortTitle: "Self-Management",
    description: "The fellow develops and implements individualized short-term, long-term, and life-long self-management programs that empower the patient to take an active role in their recovery and long-term health. This EPA encompasses the development of complexity-informed self-management plans, training and progression of programs based on readiness and status, incorporation of pain-science and health education, teaching of symptom-management strategies, dosage selection for functional goals, and strategies that enhance adherence, attendance, and preventative self-maintenance. The fellow must grade autonomy across the episode of care, transitioning the patient from structured guidance to independent self-management.",
    specifications: [
      {
        number: 1,
        text: "Develops short-term, long-term, and life-long self-management plans based on the person's complexity profile, readiness, and goals."
      },
      {
        number: 2,
        text: "Trains and progresses individualized programs using clear goals, structured feedback, and graded autonomy."
      },
      {
        number: 3,
        text: "Selects and implements appropriate training dosage with precision to provide protection for local or adjacent sensitive regions, to achieve functional and psychosocial goals across meaningful ADLs, hobbies, and roles."
      },
      {
        number: 4,
        text: "Incorporates pain-science and health education into the self-management approach."
      },
      {
        number: 5,
        text: "Teaches symptom-management strategies through awareness of movement, static positions, and environmental influences."
      },
      {
        number: 6,
        text: "Facilitates attendance, adherence, and preventative/self-maintenance through motivational and behavioral strategies."
      },
      {
        number: 7,
        text: "Grades patient autonomy across the episode of care, shifting from structured to independent self-management."
      }
    ],
    primaryCompetencies: [16, 17, 22, 23, 25],
    supportingCompetencies: [1, 5, 20, 24],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Prescribes standard self-management programs (e.g., basic HEP) for straightforward cases. May lack individualization. Education is accurate but may be generic.",
        moderate: "Can develop a self-management plan but may not adequately address psychosocial barriers, adherence challenges, or readiness. Needs guidance to integrate pain-science education effectively.",
        high: "Requires the mentor to guide self-management program design for complex presentations. May struggle to grade autonomy or adapt dosage for patients with multiple barriers to self-management."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently develops individualized self-management programs with clear goals and feedback. Pain-science education is integrated effectively.",
        moderate: "Develops programs with growing sophistication. Addresses adherence and readiness. Benefits from co-reasoning to optimize dosage and autonomy grading for cases with psychosocial complexity.",
        high: "Can initiate program design but requires shared decision-making to navigate significant barriers to self-management, multi-layered pain presentations, and patients with limited health literacy or readiness."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Self-management programs are efficient, well-dosed, and seamlessly integrated with education. Patient autonomy is graded appropriately.",
        moderate: "Independently manages program design and progression. Symptom-management education is tailored to the individual. May consult for atypical barriers or complex motivational challenges.",
        high: "Manages most high-complexity self-management programs independently. Integrates pain-science education, readiness assessment, and graded autonomy. Consults for the most resistant or complex behavioral profiles."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Self-management programs are expert-level: individualized, efficiently progressed, and consistently outcome-driven.",
        moderate: "All moderate-complexity programs managed independently. Adherence strategies and motivational approaches are seamlessly integrated.",
        high: "Independently designs, implements, and adapts self-management for high-complexity cases. Full integration of behavioral strategies, pain education, dosage, and graded autonomy. Oversight is confirmatory."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in foundational self-management programming, teaching goal-setting, dosage selection, and basic pain-science education.",
        moderate: "Can mentor learners through moderate-complexity self-management, teaching adherence strategies, readiness assessment, and individualized pain education.",
        high: "Can mentor learners through high-complexity self-management programming, teaching motivational strategies, graded autonomy, and adaptation for patients with significant psychosocial and behavioral barriers."
      }
    ],
    assessmentMethods: "Recommended Methods: Review of self-management program documentation; direct observation of patient education sessions; patient feedback on program clarity and utility; longitudinal tracking of adherence and autonomy progression.",
    assessmentQuestions: "Key Assessment Questions: Is the program individualized to the person's complexity profile and readiness? Does the fellow grade autonomy effectively across the episode? Is pain-science education integrated rather than generic? Does the fellow address barriers to adherence proactively?",
    literature: "Cook et al. (2023) -- pain mechanism frameworks for education; Poulter (2025) -- contextual effects on self-management; Shepherd et al. (2025) -- person-centered reasoning in program design."
  },
  {
    id: 5,
    title: "Implement Interventions at All Complexity Levels",
    shortTitle: "Interventions",
    description: "The fellow implements a comprehensive, multimodal intervention program that integrates manual therapy, therapeutic exercise, and education to achieve functional and psychosocial goals. This EPA encompasses the skilled delivery of targeted and dosed manual therapy techniques, selection of appropriate training dosage across meaningful activities of daily living, and integration of mobility and movement-coordination impairments into the treatment approach. The fellow must demonstrate safe, effective, and efficient practice across all ages, body regions, and complexity levels, adapting interventions in real time based on patient response and contextual factors.",
    specifications: [
      {
        number: 1,
        text: "Delivers targeted and dosed manual therapy techniques appropriate to the clinical presentation, tissue reactivity, and patient tolerance."
      },
      {
        number: 2,
        text: "Integrates manual therapy with exercise and education for functional and psychosocial gains."
      },
      {
        number: 3,
        text: "Selects and implements training dosage to achieve goals across meaningful ADLs, hobbies, and roles."
      },
      {
        number: 4,
        text: "Addresses mobility impairments and movement-coordination impairments through integrated intervention strategies."
      },
      {
        number: 5,
        text: "Adapts intervention strategies in real time based on patient response, reassessment findings, and contextual factors."
      },
      {
        number: 6,
        text: "Demonstrates safe, effective, efficient practice across all ages, complexity levels, and body regions."
      },
      {
        number: 7,
        text: "Incorporates pain-phenotype(s) classification into intervention selection and dosing decisions."
      }
    ],
    primaryCompetencies: [15, 20, 21, 22, 27],
    supportingCompetencies: [3, 6, 7, 8, 14, 23, 25, 28],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Delivers basic manual therapy techniques and standard exercise prescriptions for straightforward presentations. Techniques are safe but may lack specificity in dosing.",
        moderate: "Can implement interventions but may struggle to integrate manual therapy with exercise and education coherently. Requires guidance on dosing for irritable or multi-region presentations.",
        high: "Needs the mentor present to guide technique selection, dosing decisions, and real-time adaptation. May default to routine approaches when complexity demands innovation."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently delivers well-targeted, dosed interventions. Integrates manual therapy with exercise and education effectively.",
        moderate: "Manages multimodal intervention with growing skill. Adapts dosing to tissue reactivity and patient response. Benefits from co-reasoning with the mentor for complex regional-interdependence cases.",
        high: "Can initiate intervention but requires shared decision-making for dosing in multi-system presentations, managing pain-phenotype(s)-specific adaptations, and integrating psychosocial factors into treatment."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Interventions are efficient, targeted, and consistently well-dosed. Demonstrates seamless integration of manual therapy, exercise, and education.",
        moderate: "Independently manages multimodal interventions. Real-time adaptation is fluid. May consult mentor for unusual tissue responses or atypical presentations.",
        high: "Manages most high-complexity interventions independently. Integrates pain phenotype(s), contextual factors, and regional interdependence. Consults for the most atypical or multi-system cases."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Intervention delivery is expert-level--efficient, precise, and consistently outcome-oriented.",
        moderate: "All moderate-complexity interventions handled independently with adaptive expertise. Real-time adjustment based on patient response is seamless.",
        high: "Independently implements interventions for high-complexity cases. Technique selection, dosing, and multimodal integration reflect full adaptive expertise. Oversight is periodic and confirmatory."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in foundational manual therapy technique, dosing principles, and multimodal integration for straightforward cases.",
        moderate: "Can mentor learners through moderately complex interventions, teaching real-time adaptation, phenotype(s)-specific dosing, and the integration of exercise with manual therapy.",
        high: "Can mentor learners through high-complexity interventions, teaching adaptive technique selection, contextual dosing decisions, and the synthesis of manual therapy, exercise, and education for complex presentations."
      }
    ],
    assessmentMethods: "Recommended Methods: Direct observation of treatment sessions; video review of manual therapy technique and dosing; patient outcome tracking; structured case discussion on intervention rationale.",
    assessmentQuestions: "Key Assessment Questions: Does the fellow integrate manual therapy, exercise, and education into a coherent treatment approach? Are techniques targeted and appropriately dosed for the presentation? Does the fellow adapt in real time based on patient response? Is the intervention safe and efficient across body regions and age groups?",
    literature: "Cook et al. (2023) -- pain mechanism frameworks for intervention selection; Keiter (2024) & Poulter (2025) -- contextual factors influencing treatment mechanisms; Mylopoulos & Woods (2017) -- adaptive expertise in intervention delivery; Petersen (2021) -- SINSS construct."
  },
  {
    id: 6,
    title: "Interpret Outcomes to Inform Management",
    shortTitle: "Outcome Interpretation",
    description: "The fellow utilizes iterative subjective and objective reassessments throughout the episode of care to interpret symptom and functional change data, evaluate care effectiveness, recognize changes in complexity level, and inform plan modification or episode closure. This EPA requires reflective practice, adaptive expertise, and the capacity to communicate outcome data meaningfully to patients, caregivers, and other providers. The fellow must integrate patient-reported outcome measures, functional assessments, and quality-of-life indicators into an ongoing process of clinical decision-making that keeps the management plan responsive to the evolving clinical picture.",
    specifications: [
      {
        number: 1,
        text: "Performs iterative/cyclical subjective, objective, and functional reassessments at frequent and appropriate intervals through the episode of care."
      },
      {
        number: 2,
        text: "Assesses, interprets, and communicates symptom and functional change data to the patient and care team."
      },
      {
        number: 3,
        text: "Uses outcome data to evaluate care effectiveness and inform plan modification, continuation, or closure."
      },
      {
        number: 4,
        text: "Integrates patient-reported outcome measures (PROMs), functional status, and quality-of-life indicators into decision-making."
      },
      {
        number: 5,
        text: "Engages in reflective practice to identify when outcomes deviate from expected trajectories."
      },
      {
        number: 6,
        text: "Demonstrates adaptive expertise by recognizing non-response, revising hypotheses, and redirecting management in real time."
      },
      {
        number: 7,
        text: "Identifies potential non-responders through complexity domain reassessment and outcome trend analysis."
      }
    ],
    primaryCompetencies: [3, 9, 10, 11, 18, 19, 28],
    supportingCompetencies: [2, 12, 17, 27, 29],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Performs basic reassessments and recognizes straightforward outcome trends (e.g., improving or worsening). May not integrate PROMs systematically. Communicates changes in general terms.",
        moderate: "Can perform reassessments but may miss subtle outcome deviations. Needs guidance to connect outcome data to plan modification and to recognize early indicators of non-response.",
        high: "Requires the mentor to guide outcome interpretation for complex cases. May not recognize when outcomes deviate from expected trajectories across multiple complexity domains simultaneously."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently interprets outcomes for straightforward cases. Communicates findings clearly. Uses PROMs to support clinical decisions.",
        moderate: "Interprets outcomes with growing sophistication. Can identify non-response patterns. Benefits from co-reasoning to determine when and how to modify the plan for moderate-complexity cases.",
        high: "Can collect and analyze outcome data but requires shared decision-making to interpret conflicting trends, determine plan modifications for multi-system non-responders, and revise prognostic expectations."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Outcome interpretation is seamless and efficient. Data drives plan decisions automatically.",
        moderate: "Independently manages outcome interpretation. Identifies non-response early and adjusts proactively. May consult for ambiguous trend data or unexpected deterioration.",
        high: "Manages most high-complexity outcome interpretation independently. Integrates PROMs, functional data, and complexity reassessment. Consults for the most confounding outcome patterns."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Outcome interpretation is expert-level and efficient. Fellow articulates reasoning transparently.",
        moderate: "All moderate-complexity outcome management handled independently. Reflective practice and adaptive expertise are standard operating procedure.",
        high: "Independently interprets and acts on outcomes for high-complexity cases. Integrates all data streams, recognizes non-response patterns, and adapts management with full adaptive expertise. Oversight is confirmatory."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in basic outcome interpretation, teaching use of PROMs and functional assessment for plan decisions.",
        moderate: "Can mentor learners through moderate-complexity outcome challenges, teaching non-response recognition, reflective practice, and plan adaptation.",
        high: "Can mentor learners through high-complexity outcome interpretation, teaching integration of multiple data streams, adaptive expertise under ambiguity, and strategic plan revision."
      }
    ],
    assessmentMethods: "Recommended Methods: Longitudinal review of outcome documentation and plan modifications; case discussion of non-response management; review of PROM integration into clinical decisions; direct observation of reassessment technique and patient communication of findings.",
    assessmentQuestions: "Key Assessment Questions: Does the fellow reassess at appropriate intervals? Can the fellow identify non-response early? Does outcome data drive plan modifications or is it pro forma? Has the fellow collaborated with peers or multidisciplinary providers when outcomes plateau or deviate? Does the fellow communicate outcomes in a way that supports shared decision-making? Does the fellow demonstrate reflective practice when outcomes deviate from expectations?",
    literature: "Mylopoulos & Woods (2017) -- adaptive expertise in outcome interpretation; Shepherd et al. (2025) -- person-centered reasoning in reassessment; Poulter (2025) -- contextual factors influencing outcome interpretation."
  },
  {
    id: 7,
    title: "Recognize and Respond to Urgent/Emergent Status Changes",
    shortTitle: "Urgent/Emergent",
    description: "The fellow uses systemic screening (visceral, vascular, neurogenic, spondylogenic, psychogenic, general illness/inflammation/glucose intolerance) to recognize urgent or emergent changes in a patient's status and initiates appropriate safety measures, escalation pathways, and referral processes. This EPA reflects the fellow's role as a safety gatekeeper--the capacity to detect red flags for serious pathology (including cauda equina syndrome, cord or CNS compromise, fracture, malignancy, vascular injury/insufficiency, infection, or issues including acute psychiatric/mental health), to recognize deterioration or new-onset symptoms that warrant immediate action, and to act decisively within the appropriate scope of practice. While this EPA has fewer primary competencies than others, its importance is disproportionate: failure in this EPA has the most serious clinical consequences.",
    specifications: [
      {
        number: 1,
        text: "Performs systemic screening using validated red-flag frameworks (Finucane et al., 2020) to identify potential serious spinal and non-spinal pathology, including peripheral and extremity conditions."
      },
      {
        number: 2,
        text: "Recognizes urgent and emergent status changes during examination, treatment, or ongoing care."
      },
      {
        number: 3,
        text: "Assesses SINSS to establish and maintain safety parameters throughout the episode of care."
      },
      {
        number: 4,
        text: "Initiates appropriate safety measures when urgent/emergent conditions are identified."
      },
      {
        number: 5,
        text: "Activates escalation pathways and referral processes appropriate to the clinical scenario."
      },
      {
        number: 6,
        text: "Communicates urgent findings clearly to the patient, caregivers, and receiving providers."
      },
      {
        number: 7,
        text: "Documents screening findings and referral rationale in accordance with professional and legal standards."
      },
      {
        number: 8,
        text: "Performs systematic screening (Cervical Framework -- Rushton, Rev. 2020) to identify potential serious cervical vascular pathology."
      }
    ],
    primaryCompetencies: [4, 27],
    supportingCompetencies: [7],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Recognizes obvious red flags (e.g., saddle anesthesia, unrelenting night pain) in straightforward presentations. May require prompting to initiate the appropriate referral pathway.",
        moderate: "Can perform basic screening but may miss subtle or atypical red-flag presentations. Needs guidance to differentiate true urgency from clinical noise in moderate-complexity patients with multiple comorbidities.",
        high: "Requires the mentor to guide screening interpretation for complex cases where red flags are obscured by pain behavior, psychosocial overlay, or multi-system presentations. Decision to escalate needs direct supervision."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently screens for and recognizes red flags. Initiates appropriate referral without hesitation for clear presentations.",
        moderate: "Screens effectively and recognizes most urgent/emergent indicators. Benefits from co-reasoning to interpret ambiguous findings and to calibrate the urgency of the response.",
        high: "Can perform screening but requires shared decision-making to interpret complex red-flag scenarios, determine appropriate escalation level, and manage the patient's response to urgent findings."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Red-flag screening is automatic and reliable. Escalation is swift and appropriate.",
        moderate: "Independently manages screening and escalation for moderate-complexity cases. Communicates urgent findings clearly to all stakeholders.",
        high: "Manages most high-complexity urgent/emergent scenarios independently. May consult for the most ambiguous presentations or when escalation pathways are unclear. Clinical judgment under pressure is sound."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Screening and escalation are expert-level. Fellow is a reliable safety gatekeeper for straightforward cases.",
        moderate: "All moderate-complexity urgent/emergent scenarios handled independently with sound judgment and clear communication.",
        high: "Independently recognizes and responds to urgent/emergent changes in high-complexity cases. Decision-making under pressure is decisive, well-reasoned, and appropriately communicated. Oversight is confirmatory."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in red-flag screening fundamentals, teaching the Finucane et al. (2020) framework and basic escalation protocols.",
        moderate: "Can mentor learners through moderate-complexity screening scenarios, teaching differentiation of true urgency from clinical noise and appropriate escalation calibration.",
        high: "Can mentor learners through high-complexity urgent/emergent scenarios, teaching decision-making under pressure, management of ambiguous red-flag presentations, and communication of urgent findings in complex clinical contexts."
      }
    ],
    assessmentMethods: "Recommended Methods: Direct observation during examination and treatment (particularly when unexpected findings emerge); structured case review of screening documentation; simulation of urgent/emergent scenarios; review of referral communications.",
    assessmentQuestions: "Key Assessment Questions: Does the fellow screen systematically rather than reactively? Can the fellow differentiate true red flags from clinical noise? Is the escalation response proportionate and timely? Does the fellow communicate urgent findings clearly and calmly? Does documentation meet professional and legal standards?",
    literature: "Finucane et al. (2020) -- international framework for red flags for serious spinal pathology; NAIOMT OMPT Complexity Framework -- safety screening within complexity domains."
  },
  {
    id: 8,
    title: "Educate Patients, Caregivers, Families, and Healthcare Professionals",
    shortTitle: "Education & Mentoring",
    description: "The fellow educates diverse audiences--patients, caregivers, families, healthcare professionals, and learners--in contemporary OMPT, pain science, self-management, and advanced clinical reasoning. This EPA spans two interconnected domains: patient/caregiver education that empowers individuals to understand their condition and participate in their care, and professional education that advances the knowledge, skills, and attributes of peers and learners. The fellow must communicate complex clinical concepts in person-appropriate language, integrate contemporary evidence-informed OMPT models, and demonstrate the capacity to mentor others in the competencies that define fellowship-level practice.",
    specifications: [
      {
        number: 1,
        text: "Communicates diagnoses, clinical patterns, and pain phenotypes to patients and caregivers in person-appropriate, non-biased language."
      },
      {
        number: 2,
        text: "Integrates and communicates contemporary, evidence-informed OMPT models with person-centered reasoning."
      },
      {
        number: 3,
        text: "Delivers pain-science and health education as part of self-management and intervention programs."
      },
      {
        number: 4,
        text: "Teaches symptom-management strategies tailored to the individual's movement, positional, and environmental context."
      },
      {
        number: 5,
        text: "Mentors peers and learners in contemporary OMPT and advanced clinical reasoning, advancing the knowledge, skills, and attributes of peers and learners."
      },
      {
        number: 6,
        text: "Demonstrates leadership, scholarship, and evidence currency (maintaining current knowledge of emerging research and clinical advances) in professional education settings."
      },
      {
        number: 7,
        text: "Adapts educational approach to the audience's knowledge level, learning style, and cultural context."
      }
    ],
    primaryCompetencies: [13, 14, 24, 25, 31, 32],
    supportingCompetencies: [1, 5, 17, 19, 23],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Communicates basic diagnoses and exercise instructions clearly for straightforward cases. Professional education contributions are limited to observation and participation.",
        moderate: "Can educate patients on common conditions but may struggle with complex explanatory models or pain-science education. Mentoring of learners is nascent. Needs guidance to adapt communication to psychosocial complexity.",
        high: "Requires the mentor to guide education for patients with complex presentations, health literacy challenges, or significant psychosocial barriers. Professional mentoring is not yet at a level appropriate for junior learners."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently educates patients on diagnoses, pain phenotypes, and self-management with confidence and clarity.",
        moderate: "Delivers increasingly sophisticated patient education. Beginning to mentor peers on clinical reasoning. Benefits from co-reasoning to refine educational messaging for complex or resistant patients.",
        high: "Can initiate education but requires shared decision-making to navigate complex explanatory frameworks, patients with limited health literacy, and professional mentoring of learners on high-complexity reasoning."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Patient education is seamless, person-centered, and effective. Professional education contributions are valued by peers.",
        moderate: "Independently manages all patient education for moderate complexity. Mentors learners in clinical reasoning and OMPT models. May consult for the most challenging educational scenarios.",
        high: "Manages most high-complexity education independently. Can mentor learners on advanced topics. Consults for the most challenging pedagogical scenarios involving resistant learners or highly complex patient education needs."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Education is expert-level. Communication is efficient, clear, and consistently person-centered.",
        moderate: "All moderate-complexity education managed independently. Mentoring of peers and learners is a consistent strength.",
        high: "Independently manages education for the most complex patients and professional mentoring for advanced learners. Demonstrates leadership and scholarship in educational settings. Oversight is confirmatory."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in patient communication fundamentals, teaching person-centered language and basic pain education.",
        moderate: "Can mentor learners in moderate-complexity patient education and early clinical mentoring, teaching integration of OMPT models and pain-science communication.",
        high: "Can mentor learners in advanced patient education for complex cases, professional mentoring methodology, and leadership in evidence-informed professional education."
      }
    ],
    assessmentMethods: "Recommended Methods: Direct observation of patient education sessions (assessing whether the fellow addresses pain, pathoanatomical, and movement impairment domains); review of educational materials created by the fellow; peer and learner feedback on mentoring quality; assessment of professional education contributions (presentations, case discussions, teaching sessions).",
    assessmentQuestions: "Key Assessment Questions: Does the fellow adapt communication to the audience? Is pain-science education evidence-informed, person-centered, and timely? Does the fellow mentor effectively--not just instruct but develop learners' clinical reasoning? Does the fellow demonstrate scholarship and evidence currency in professional education?",
    literature: "Cook et al. (2023) -- pain mechanism frameworks for patient education; Shepherd et al. (2025) -- person-centered reasoning in communication; Mylopoulos & Woods (2017) -- adaptive expertise in mentoring."
  },
  {
    id: 9,
    title: "Supervise or Delegate to PTAs, Aides, Technicians, and Junior Learners",
    shortTitle: "Supervision & Delegation",
    description: "The fellow triages, delegates, and supervises care by aligning tasks with the scope, competence, and complexity of the clinical scenario while maintaining accountability for quality and outcomes, including coordination across clinical settings and with external providers. This EPA also encompasses the mentoring of peers and learners in contemporary OMPT and advanced clinical reasoning. The fellow must demonstrate the judgment to match the right provider to the right task for the right patient, provide appropriate oversight, and step in when the complexity of the case or the competency of the supervisee requires escalation. This EPA represents the leadership and systems-thinking dimension of fellowship-level practice.",
    specifications: [
      {
        number: 1,
        text: "Triages care tasks by matching task complexity to the scope and competency of the supervisee."
      },
      {
        number: 2,
        text: "Delegates tasks appropriately while maintaining clinical accountability for quality and outcomes."
      },
      {
        number: 3,
        text: "Provides supervision calibrated to the supervisee's competence level and the patient's complexity."
      },
      {
        number: 4,
        text: "Escalates care back to the fellow's direct management when complexity exceeds the supervisee's scope."
      },
      {
        number: 5,
        text: "Mentors peers and junior learners in OMPT practice and clinical reasoning."
      },
      {
        number: 6,
        text: "Collaborates with the supervisee to provide structured feedback and support professional development."
      },
      {
        number: 7,
        text: "Documents delegation rationale, supervisory oversight, and outcome accountability."
      }
    ],
    primaryCompetencies: [30, 31],
    supportingCompetencies: [29, 32],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Can delegate basic tasks (e.g., modality application, simple exercise supervision) for straightforward patients. May not calibrate supervision intensity to the supervisee's competence.",
        moderate: "Can identify tasks that could be delegated but may struggle to match complexity appropriately. Needs guidance on when to escalate care back to direct management. Mentoring is nascent.",
        high: "Requires the mentor to guide delegation decisions for high-complexity patients. May delegate inappropriately (too much or too little). Supervisory judgment is developing."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently delegates and supervises for straightforward patients. Provides constructive feedback to supervisees.",
        moderate: "Delegates with growing judgment. Can identify when escalation is needed. Benefits from co-reasoning to calibrate supervision intensity and mentoring approach for more complex delegation scenarios.",
        high: "Can initiate delegation but requires shared decision-making to navigate high-complexity delegation decisions, manage supervisees with limited competency, and determine when full escalation is warranted."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Delegation and supervision are efficient and appropriately calibrated. Mentoring contributions are valued.",
        moderate: "Independently manages delegation and supervision for moderate-complexity scenarios. Escalation judgment is sound. Mentoring of learners is effective.",
        high: "Manages most high-complexity delegation independently. May consult for the most challenging supervisory scenarios (e.g., managing underperforming supervisees or navigating scope-of-practice boundaries in complex cases)."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Delegation is expert-level: efficient, well-calibrated, and consistently safe.",
        moderate: "All moderate-complexity supervisory scenarios handled independently. Accountability for outcomes is maintained throughout.",
        high: "Independently manages delegation and supervision for high-complexity cases. Mentoring, escalation, and accountability are fully integrated into practice. Oversight is confirmatory."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in basic delegation principles, teaching task-matching and supervision fundamentals.",
        moderate: "Can mentor learners in moderate-complexity supervisory practice, teaching calibration of oversight, escalation criteria, and feedback delivery.",
        high: "Can mentor learners in advanced supervisory leadership, teaching high-complexity delegation judgment, management of supervisee development, and systems-level accountability for care quality."
      }
    ],
    assessmentMethods: "Recommended Methods: Direct observation of delegation and supervisory interactions; review of delegation documentation; supervisee feedback; case discussion of delegation rationale and escalation decisions; assessment of mentoring effectiveness through learner progress.",
    assessmentQuestions: "Key Assessment Questions: Does the fellow match task complexity to supervisee competence? Does the fellow maintain accountability for outcomes of delegated care? Can the fellow escalate appropriately when complexity exceeds scope? Is the fellow's mentoring effective in developing the supervisee's competence?",
    literature: "NAIOMT OMPT Complexity Framework -- complexity-matched delegation; Mylopoulos & Woods (2017) -- adaptive expertise in supervisory judgment."
  },
  {
    id: 10,
    title: "Conclude Episodes of Care",
    shortTitle: "Episode Conclusion",
    description: "The fellow concludes episodes of care by integrating outcomes, functional status, patient goals, and patient feedback to determine readiness for discharge or transition. This EPA requires the fellow to synthesize all data streams--patient-reported outcomes, objective findings, complexity reassessment, and the patient's own assessment of goal attainment--into a discharge or transition decision. The fellow must communicate the conclusion clearly, ensure the patient has the self-management tools for ongoing health, and coordinate care transitions when appropriate. Concluding care well is a hallmark of expert clinical practice: it requires the judgment to know when care is complete and the communication skill to close the therapeutic relationship constructively.",
    specifications: [
      {
        number: 1,
        text: "Integrates outcome data, functional status, and patient goals to determine readiness for discharge or care transition."
      },
      {
        number: 2,
        text: "Assesses whether the patient has achieved sufficient self-management competence for ongoing independent health management."
      },
      {
        number: 3,
        text: "Communicates the discharge or transition rationale to the patient, caregiver, and receiving providers clearly and constructively."
      },
      {
        number: 4,
        text: "Develops and communicates a post-discharge self-maintenance plan, including strategies for relapse prevention, potential distance/electronic follow-ups, and the role of OMPT as an ongoing musculoskeletal primary care resource."
      },
      {
        number: 5,
        text: "Coordinates care transitions with other providers when the episode requires handoff rather than full discharge."
      },
      {
        number: 6,
        text: "Documents episode closure including outcomes achieved, outstanding issues, and recommendations for ongoing care."
      },
      {
        number: 7,
        text: "Solicits and integrates patient feedback on the care experience to inform future practice."
      }
    ],
    primaryCompetencies: [19, 33],
    supportingCompetencies: [18, 29],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Can conclude straightforward episodes when goals are clearly met. Discharge communication covers the basics. May not proactively develop a post-discharge self-maintenance plan.",
        moderate: "Can identify when moderate-complexity episodes should conclude but may struggle with timing or with communicating the rationale when goals are only partially met. Needs guidance on care transition coordination.",
        high: "Requires the mentor to guide discharge decisions for complex cases where outcomes are mixed, goals are partially met, or care transitions involve multiple providers. Post-discharge planning needs direct supervision."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently concludes straightforward episodes with clear communication and a post-discharge plan.",
        moderate: "Concludes moderate-complexity episodes with growing confidence. Can navigate partial goal attainment. Benefits from co-reasoning for timing decisions and care transition planning.",
        high: "Can initiate the discharge process but requires shared decision-making for high-complexity cases where multiple stakeholders, mixed outcomes, and care transition coordination create competing demands."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Episode conclusion is seamless. Self-maintenance plans are individualized and clear.",
        moderate: "Independently manages episode conclusion for moderate complexity. Care transitions are coordinated proactively. May consult for particularly complex multi-provider handoffs.",
        high: "Manages most high-complexity episode conclusions independently. Integrates outcome data, patient feedback, and stakeholder coordination. Consults for the most challenging transition scenarios."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Episode conclusion is expert-level: timely, well-communicated, and outcome-documented.",
        moderate: "All moderate-complexity episode conclusions managed independently. Post-discharge planning is thorough and individualized.",
        high: "Independently concludes high-complexity episodes. Full integration of outcome data, care transitions, patient feedback, and post-discharge planning. Oversight is confirmatory."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in episode conclusion fundamentals, teaching discharge criteria, communication, and self-maintenance planning.",
        moderate: "Can mentor learners through moderate-complexity episode conclusions, teaching timing judgment, partial-goal navigation, and care transition coordination.",
        high: "Can mentor learners through high-complexity episode conclusions, teaching multi-stakeholder coordination, mixed-outcome management, and strategic post-discharge planning for patients with ongoing complexity."
      }
    ],
    assessmentMethods: "Recommended Methods: Review of discharge documentation and post-discharge plans; case discussion of discharge timing and rationale; direct observation of discharge conversations with patients; review of care transition communications; patient feedback on episode conclusion.",
    assessmentQuestions: "Key Assessment Questions: Does the fellow determine discharge readiness based on data rather than arbitrary timelines? Is the post-discharge plan individualized and actionable? Does the fellow coordinate care transitions proactively? Is patient feedback solicited and integrated? Does the fellow communicate episode closure constructively?",
    literature: "Balinski et al. (2024) -- PT attendance and self-discharge; Shepherd et al. (2025) -- person-centered reasoning in care conclusion; NAIOMT OMPT Complexity Framework -- complexity-informed discharge decisions."
  }
];

export function getCompetenciesForEPA(epaId: number, role?: 'P' | 'S'): Competency[] {
  return COMPETENCIES.filter(c =>
    c.epaMappings.some(m => m.epaId === epaId && (!role || m.role === role))
  );
}

export function getEPAsForCompetency(compId: number): EPA[] {
  const comp = COMPETENCIES.find(c => c.id === compId);
  if (!comp) return [];
  return comp.epaMappings.map(m => EPAS.find(e => e.id === m.epaId)!).filter(Boolean);
}
