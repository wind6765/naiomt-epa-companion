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
    text: "Perform systemic screening and red flag assessment to identify urgent/emergent conditions and safety parameters.",
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
    text: "Integrate evidence-based classification systems and reasoning frameworks to generate and test clinical hypotheses.",
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
    text: "Recognize and respond to urgent/emergent status changes through rapid assessment and appropriate escalation.",
    domains: ["Patient/Client Care and Services", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 1, role: 'S' },
      { epaId: 2, role: 'S' },
      { epaId: 7, role: 'P' }
    ]
  },
  {
    id: 5,
    text: "Use shared decision-making and person-centered communication to co-construct management approaches.",
    domains: ["Communication and Collaboration", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'S' },
      { epaId: 3, role: 'P' },
      { epaId: 4, role: 'S' },
      { epaId: 8, role: 'S' }
    ]
  },
  {
    id: 6,
    text: "Identify and classify pain phenotypes (nociceptive, nociplastic, neuropathic) through integrated subjective and objective findings.",
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
    text: "Apply complexity assessment frameworks to stratify patients across subjective and objective domains.",
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
    text: "Perform targeted, evidence-informed objective examination with real-time adaptation to emerging findings.",
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
    text: "Integrate regional interdependence and multi-system reasoning into examination and management planning.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'P' },
      { epaId: 2, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 6, role: 'S' }
    ]
  },
  {
    id: 10,
    text: "Apply dual-processing clinical reasoning (Type I and Type II) to synthesize diagnostic hypotheses.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'P' },
      { epaId: 2, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 6, role: 'S' }
    ]
  },
  {
    id: 11,
    text: "Assess and integrate mitigating and perpetuating factors to establish individualized prognosis.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 2, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 6, role: 'S' }
    ]
  },
  {
    id: 12,
    text: "Conduct skilled, person-centered examination across diverse body regions and age groups.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'P' },
      { epaId: 2, role: 'S' },
      { epaId: 6, role: 'S' }
    ]
  },
  {
    id: 13,
    text: "Communicate diagnosis and prognosis using shared decision-making and person-appropriate language.",
    domains: ["Communication and Collaboration", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 2, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 8, role: 'P' }
    ]
  },
  {
    id: 14,
    text: "Deliver pain-science and health education as an integrated component of care.",
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
    text: "Apply psychosocial screening and complexity assessment to inform intervention dosing and progression.",
    domains: ["Knowledge for Practice", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 1, role: 'S' },
      { epaId: 3, role: 'S' },
      { epaId: 5, role: 'P' }
    ]
  },
  {
    id: 16,
    text: "Develop individualized self-management and exercise programs based on readiness and complexity.",
    domains: ["Patient/Client Care and Services", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 2, role: 'P' },
      { epaId: 3, role: 'S' },
      { epaId: 4, role: 'P' }
    ]
  },
  {
    id: 17,
    text: "Teach self-management strategies through awareness of movement, positions, and environmental modification.",
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
    text: "Perform iterative reassessment and interpret outcome data to inform plan modification or closure.",
    domains: ["Patient/Client Care and Services", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 1, role: 'S' },
      { epaId: 3, role: 'S' },
      { epaId: 6, role: 'P' },
      { epaId: 10, role: 'S' }
    ]
  },
  {
    id: 19,
    text: "Integrate PROMs, functional status, and quality-of-life indicators into discharge and transition planning.",
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
    text: "Select and implement training dosage appropriate to functional and psychosocial goals.",
    domains: ["Patient/Client Care and Services", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 3, role: 'S' },
      { epaId: 4, role: 'S' },
      { epaId: 5, role: 'P' }
    ]
  },
  {
    id: 21,
    text: "Deliver targeted and dosed manual therapy appropriate to presentation and pain phenotype.",
    domains: ["Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 5, role: 'P' }
    ]
  },
  {
    id: 22,
    text: "Integrate manual therapy, exercise, and education for functional and psychosocial goals.",
    domains: ["Patient/Client Care and Services", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 3, role: 'S' },
      { epaId: 4, role: 'P' },
      { epaId: 5, role: 'P' }
    ]
  },
  {
    id: 23,
    text: "Grade patient autonomy and progression across the episode of care.",
    domains: ["Patient/Client Care and Services", "Teaching and Learning"],
    epaMappings: [
      { epaId: 4, role: 'P' },
      { epaId: 5, role: 'S' },
      { epaId: 8, role: 'S' }
    ]
  },
  {
    id: 24,
    text: "Mentor peers and learners in contemporary OMPT and advanced clinical reasoning.",
    domains: ["Patient/Client Care and Services", "Teaching and Learning"],
    epaMappings: [
      { epaId: 4, role: 'P' },
      { epaId: 8, role: 'P' }
    ]
  },
  {
    id: 25,
    text: "Demonstrate leadership, scholarship, and evidence currency in OMPT.",
    domains: ["Teaching and Learning", "Patient/Client Care and Services"],
    epaMappings: [
      { epaId: 4, role: 'P' },
      { epaId: 5, role: 'S' },
      { epaId: 8, role: 'P' }
    ]
  },
  {
    id: 26,
    text: "Demonstrate reflective practice to refine diagnostic and treatment hypotheses.",
    domains: ["Professionalism", "Knowledge for Practice"],
    epaMappings: [
      { epaId: 2, role: 'S' },
      { epaId: 3, role: 'P' },
      { epaId: 5, role: 'S' }
    ]
  },
  {
    id: 27,
    text: "Engage in adaptive expertise by recognizing non-response and redirecting management.",
    domains: ["Patient/Client Care and Services", "Professionalism"],
    epaMappings: [
      { epaId: 1, role: 'S' },
      { epaId: 3, role: 'S' },
      { epaId: 5, role: 'P' },
      { epaId: 7, role: 'S' }
    ]
  },
  {
    id: 28,
    text: "Integrate evidence-based practice with clinical experience when evidence is lacking.",
    domains: ["Knowledge for Practice", "Professionalism"],
    epaMappings: [
      { epaId: 2, role: 'S' },
      { epaId: 3, role: 'P' },
      { epaId: 5, role: 'S' },
      { epaId: 6, role: 'P' }
    ]
  },
  {
    id: 29,
    text: "Coordinate multidisciplinary care and communicate across healthcare teams.",
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
    text: "Triage, delegate, and supervise care tasks matching complexity to scope and competence.",
    domains: ["Practice Management", "Professionalism"],
    epaMappings: [
      { epaId: 3, role: 'S' },
      { epaId: 9, role: 'P' }
    ]
  },
  {
    id: 31,
    text: "Provide structured feedback and support professional development of supervisees and learners.",
    domains: ["Teaching and Learning", "Professionalism"],
    epaMappings: [
      { epaId: 8, role: 'P' },
      { epaId: 9, role: 'P' }
    ]
  },
  {
    id: 32,
    text: "Demonstrate advocacy and leadership in health promotion, prevention, and population health.",
    domains: ["Professionalism", "Stewards of Societal Health"],
    epaMappings: [
      { epaId: 3, role: 'S' },
      { epaId: 8, role: 'P' },
      { epaId: 9, role: 'S' }
    ]
  },
  {
    id: 33,
    text: "Determine discharge readiness and develop post-discharge self-maintenance and relapse prevention plans.",
    domains: ["Patient/Client Care and Services", "Communication and Collaboration"],
    epaMappings: [
      { epaId: 6, role: 'S' },
      { epaId: 10, role: 'P' }
    ]
  }
];

export const EPAS: EPA[] = [
  {
    id: 1,
    title: "Perform Initial Examination of Persons at All Complexity Levels",
    shortTitle: "Initial Examination",
    description: "The fellow conducts a comprehensive initial examination that integrates a person-centered interview, systemic screening, pain-phenotype identification, complexity assessment, and targeted objective testing. This EPA encompasses the full scope of the first encounter—from building the therapeutic alliance through the subjective history to the hands-on objective examination—across low, moderate, and high complexity presentations.",
    specifications: [
      {
        number: 1,
        text: "Conducts a skilled, person-centered motivational interview that builds therapeutic alliance and elicits the patient's narrative, goals, and concerns."
      },
      {
        number: 2,
        text: "Performs systemic screening (red flags, SINSS) to identify urgent/emergent conditions and establish safety parameters for testing."
      },
      {
        number: 3,
        text: "Identifies the dominant pain phenotype (nociceptive, nociplastic, neuropathic) through structured subjective and objective findings."
      },
      {
        number: 4,
        text: "Assesses subjective and objective domains of complexity, including psychosocial screening, chronicity indicators, and risk-stratification tools."
      },
      {
        number: 5,
        text: "Performs a targeted, evidence-informed objective examination for each relevant impairment region, informed by the subjective findings."
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
    primaryCompetencies: [1, 7, 9, 10, 12],
    supportingCompetencies: [2, 4, 5, 6, 8, 15, 18, 27],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Conducts a structured interview and standard objective exam for straightforward presentations. May miss secondary findings.",
        moderate: "Conducts a reasonable exam but may not fully adapt to emerging complexity. Requires guidance to prioritize screening tools.",
        high: "Needs the mentor present to guide the examination sequence, complexity screening, and safety decision-making."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently conducts a thorough, person-centered examination. Identifies pain phenotype and relevant impairments with confidence.",
        moderate: "Manages the exam with growing independence. Can identify complexity domains but benefits from real-time discussion.",
        high: "Can initiate the exam but requires co-reasoning with the mentor to navigate multi-system presentations."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Performs an efficient, targeted examination tailored to the presentation. Integrates SINSS, pain phenotyping, and complexity screening seamlessly.",
        moderate: "Independently manages the full exam scope. Adapts strategy in real time. May consult for unusual presentations.",
        high: "Conducts a comprehensive exam across complexity domains. May seek consultation for the most atypical cases."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Examination is efficient, focused, and consistently high quality.",
        moderate: "Independently manages all moderate-complexity examinations with adaptive expertise.",
        high: "Independently manages high-complexity examinations. Integrates all complexity domains and contextual factors."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners through straightforward examinations, articulating reasoning and modeling technique.",
        moderate: "Can mentor learners through moderately complex examinations, teaching adaptive strategies.",
        high: "Can mentor learners through high-complexity examinations, teaching integration of multiple complexity domains."
      }
    ],
    assessmentMethods: "Direct observation during initial evaluations; structured case discussion; review of documented examination findings and clinical reasoning.",
    assessmentQuestions: "Does the fellow adapt the examination to the emerging clinical picture? Can the fellow identify and integrate complexity domains? Does the fellow maintain safety awareness throughout?",
    literature: "Finucane et al. (2020); Shepherd et al. (2025); Keiter (2024) & Poulter (2025)"
  },
  {
    id: 2,
    title: "Establish Diagnosis and Prognosis at All Complexity Levels",
    shortTitle: "Diagnosis & Prognosis",
    description: "The fellow integrates examination findings to establish a clinical diagnosis and complexity-informed prognosis. This EPA requires dual-processing clinical reasoning, pain phenotype identification, assessment of mitigating and perpetuating factors, risk stratification, and person-appropriate communication of findings.",
    specifications: [
      {
        number: 1,
        text: "Applies dual-processing clinical reasoning (Type I and Type II) to synthesize examination data into diagnostic hypotheses."
      },
      {
        number: 2,
        text: "Identifies the dominant pain phenotype and communicates this classification in person-appropriate language."
      },
      {
        number: 3,
        text: "Integrates subjective and objective complexity domains to establish a complexity profile that informs prognosis."
      },
      {
        number: 4,
        text: "Develops a prognosis using assessment of mitigating and perpetuating factors."
      },
      {
        number: 5,
        text: "Stratifies risk using validated screening tools to identify potential non-responders."
      },
      {
        number: 6,
        text: "Communicates the diagnosis, clinical patterns, and prognosis using shared decision-making."
      },
      {
        number: 7,
        text: "Engages in reflective practice to refine diagnostic hypotheses when findings are ambiguous."
      }
    ],
    primaryCompetencies: [2, 6, 9, 10, 11, 13, 16],
    supportingCompetencies: [3, 4, 5, 7, 8, 12, 14, 26, 28],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Identifies straightforward diagnoses. Formulates a basic prognosis. May rely heavily on Type I reasoning.",
        moderate: "Can generate hypotheses but may struggle to integrate competing findings. Needs guidance to weigh perpetuating factors.",
        high: "Requires the mentor to guide hypothesis generation. May not recognize atypical pain phenotypes."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently establishes diagnosis and prognosis. Communicates findings clearly.",
        moderate: "Generates and tests hypotheses with growing sophistication. Benefits from co-reasoning to refine prognosis.",
        high: "Can initiate diagnostic reasoning but requires shared decision-making for atypical presentations."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Diagnosis and prognosis are efficient, accurate, and clearly communicated.",
        moderate: "Independently manages diagnostic reasoning. Demonstrates adaptive expertise when hypotheses are disconfirmed.",
        high: "Manages most high-complexity diagnoses independently. Demonstrates tolerance of uncertainty."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Diagnostic reasoning is automatic and accurate.",
        moderate: "All moderate-complexity diagnoses handled independently with sophistication.",
        high: "Independently establishes diagnosis and prognosis for high-complexity cases with full integration."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in diagnostic reasoning fundamentals.",
        moderate: "Can mentor learners through moderate-complexity diagnoses, modeling hypothesis testing.",
        high: "Can mentor learners through high-complexity diagnostic challenges, teaching adaptive expertise."
      }
    ],
    assessmentMethods: "Case-based oral examination; structured review of written diagnoses; direct observation of patient communication.",
    assessmentQuestions: "Does the fellow demonstrate both Type I and Type II reasoning? Is the prognosis individualized to the complexity profile?",
    literature: "Mylopoulos & Woods (2017); Cook et al. (2023); Shepherd et al. (2025)"
  },
  {
    id: 3,
    title: "Develop Management Plans at All Complexity Levels",
    shortTitle: "Management Plans",
    description: "The fellow develops comprehensive, individualized management plans integrating diagnosis, prognosis, complexity profile, and person's goals. Requires shared decision-making, regional interdependence, adaptive expertise under uncertainty, and interprofessional collaboration.",
    specifications: [
      {
        number: 1,
        text: "Develops an individualized management plan informed by the diagnosis, prognosis, and complexity profile."
      },
      {
        number: 2,
        text: "Utilizes shared decision-making and informed consent to co-construct the plan."
      },
      {
        number: 3,
        text: "Incorporates regional interdependence, coexisting MSK pathologies, and functional impairments."
      },
      {
        number: 4,
        text: "Integrates evidence-based practice with clinical experience when evidence is lacking."
      },
      {
        number: 5,
        text: "Demonstrates adaptive expertise by revising the plan when initial approaches are ineffective."
      },
      {
        number: 6,
        text: "Coordinates with multidisciplinary providers to optimize care delivery."
      },
      {
        number: 7,
        text: "Structures the plan to address the dominant pain phenotype, contextual factors, and modifiable perpetuating factors."
      }
    ],
    primaryCompetencies: [5, 8, 26, 28, 29],
    supportingCompetencies: [1, 2, 3, 6, 7, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 22, 27, 30, 32],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Develops a straightforward plan for uncomplicated presentations. May lack integration of secondary factors.",
        moderate: "Can draft a plan but may struggle to prioritize competing demands. Needs guidance on integration.",
        high: "Requires the mentor to co-develop the plan. May default to template-based approaches."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently develops well-structured plans integrating diagnosis, prognosis, and patient goals.",
        moderate: "Develops increasingly sophisticated plans. Benefits from co-reasoning for cases with multiple perpetuating factors.",
        high: "Can draft a preliminary plan but requires shared decision-making for multi-system complexity."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Plans are efficient, individualized, and clearly articulated.",
        moderate: "Independently develops plans for moderate complexity with adaptive expertise.",
        high: "Manages most high-complexity plans independently. Plans demonstrate full integration."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Plan development is expert-level.",
        moderate: "All moderate-complexity plans developed independently as living documents.",
        high: "Independently develops and adapts plans for the most complex cases."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in fundamentals of person-centered management planning.",
        moderate: "Can mentor learners through moderate-complexity planning, teaching regional-interdependence reasoning.",
        high: "Can mentor learners through high-complexity planning, teaching management under uncertainty."
      }
    ],
    assessmentMethods: "Review of written management plans; case-based discussion; direct observation of shared decision-making; longitudinal review of plan adaptations.",
    assessmentQuestions: "Is the plan individualized? Does the fellow use shared decision-making genuinely? Does the plan evolve with the clinical picture?",
    literature: "Shepherd et al. (2025); Mylopoulos & Woods (2017); Keiter (2024) & Poulter (2025)"
  },
  {
    id: 4,
    title: "Establish Self-Management Programs at All Complexity Levels",
    shortTitle: "Self-Management",
    description: "The fellow develops individualized self-management programs that empower the patient. Encompasses complexity-informed plans, training progression based on readiness, pain-science education, symptom-management strategies, dosage selection, and adherence strategies.",
    specifications: [
      {
        number: 1,
        text: "Develops self-management plans based on the person's complexity profile, readiness, and goals."
      },
      {
        number: 2,
        text: "Trains and progresses individualized programs using clear goals, structured feedback, and graded autonomy."
      },
      {
        number: 3,
        text: "Selects and implements training dosage to achieve functional and psychosocial goals."
      },
      {
        number: 4,
        text: "Incorporates pain-science and health education into the self-management approach."
      },
      {
        number: 5,
        text: "Teaches symptom-management strategies through awareness of movement, positions, and environment."
      },
      {
        number: 6,
        text: "Facilitates attendance, adherence, and preventative/self-maintenance."
      },
      {
        number: 7,
        text: "Grades patient autonomy across the episode of care."
      }
    ],
    primaryCompetencies: [16, 17, 22, 23, 24, 25],
    supportingCompetencies: [1, 5, 20],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Prescribes standard self-management programs. May lack individualization.",
        moderate: "Can develop a plan but may not adequately address psychosocial barriers or readiness.",
        high: "Requires the mentor to guide program design for complex presentations."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently develops individualized programs with clear goals. Pain-science education is integrated.",
        moderate: "Develops programs with growing sophistication. Benefits from co-reasoning for psychosocial complexity.",
        high: "Can initiate program design but requires shared decision-making for significant barriers."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Programs are efficient, well-dosed, and seamlessly integrated with education.",
        moderate: "Independently manages design and progression. May consult for atypical barriers.",
        high: "Manages most high-complexity programs independently. Consults for the most resistant profiles."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Programs are expert-level: individualized and outcome-driven.",
        moderate: "All moderate-complexity programs managed independently.",
        high: "Independently designs, implements, and adapts for high-complexity cases."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in foundational self-management programming.",
        moderate: "Can mentor learners through moderate-complexity self-management.",
        high: "Can mentor learners through high-complexity programming with significant barriers."
      }
    ],
    assessmentMethods: "Review of self-management documentation; direct observation of education sessions; patient feedback; longitudinal adherence tracking.",
    assessmentQuestions: "Is the program individualized to complexity and readiness? Does the fellow grade autonomy effectively? Is pain-science education integrated rather than generic?",
    literature: "Cook et al. (2023); Poulter (2025); Shepherd et al. (2025)"
  },
  {
    id: 5,
    title: "Implement Interventions at All Complexity Levels",
    shortTitle: "Interventions",
    description: "The fellow implements comprehensive, multimodal intervention integrating manual therapy, exercise, and education for functional and psychosocial goals. Encompasses targeted manual therapy, training dosage, mobility/movement impairment integration, and real-time adaptation.",
    specifications: [
      {
        number: 1,
        text: "Delivers targeted and dosed manual therapy techniques appropriate to the presentation."
      },
      {
        number: 2,
        text: "Integrates manual therapy with exercise and education for functional and psychosocial gains."
      },
      {
        number: 3,
        text: "Selects and implements training dosage to achieve goals across meaningful ADLs."
      },
      {
        number: 4,
        text: "Addresses mobility and movement-coordination impairments through integrated strategies."
      },
      {
        number: 5,
        text: "Adapts intervention strategies in real time based on patient response."
      },
      {
        number: 6,
        text: "Demonstrates safe, effective, efficient practice across all ages, complexity levels, and body regions."
      },
      {
        number: 7,
        text: "Incorporates pain-phenotype classification into intervention selection and dosing."
      }
    ],
    primaryCompetencies: [15, 20, 21, 22, 27],
    supportingCompetencies: [3, 6, 7, 8, 14, 23, 25, 28],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Delivers basic manual therapy and standard exercise prescriptions. Safe but may lack dosing specificity.",
        moderate: "Can implement interventions but may struggle to integrate coherently. Requires guidance on dosing.",
        high: "Needs the mentor present to guide technique selection and real-time adaptation."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently delivers well-targeted, dosed interventions.",
        moderate: "Manages multimodal intervention with growing skill. Benefits from co-reasoning for complex cases.",
        high: "Can initiate intervention but requires shared decision-making for multi-system dosing."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Interventions are efficient, targeted, and consistently well-dosed.",
        moderate: "Independently manages multimodal interventions. Real-time adaptation is fluid.",
        high: "Manages most high-complexity interventions independently. Consults for challenging cases."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Intervention delivery is expert-level.",
        moderate: "All moderate-complexity interventions handled independently with adaptive expertise.",
        high: "Independently implements for high-complexity cases with full adaptive expertise."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in foundational technique, dosing, and integration.",
        moderate: "Can mentor learners through moderate-complexity interventions, teaching adaptation.",
        high: "Can mentor learners through high-complexity interventions, teaching adaptive technique selection."
      }
    ],
    assessmentMethods: "Direct observation of treatment sessions; video review; patient outcome tracking; structured case discussion.",
    assessmentQuestions: "Does the fellow integrate manual therapy, exercise, and education coherently? Are techniques appropriately dosed? Does the fellow adapt in real time?",
    literature: "Cook et al. (2023); Keiter (2024) & Poulter (2025); Mylopoulos & Woods (2017)"
  },
  {
    id: 6,
    title: "Interpret Outcomes to Inform Management",
    shortTitle: "Outcome Interpretation",
    description: "The fellow utilizes iterative reassessments to interpret symptom and functional change data, evaluate care effectiveness, and inform plan modification or closure. Requires reflective practice, adaptive expertise, and meaningful communication of outcome data.",
    specifications: [
      {
        number: 1,
        text: "Performs iterative subjective and objective reassessments at appropriate intervals."
      },
      {
        number: 2,
        text: "Assesses, interprets, and communicates symptom and functional change data."
      },
      {
        number: 3,
        text: "Uses outcome data to evaluate care effectiveness and inform plan modification or closure."
      },
      {
        number: 4,
        text: "Integrates PROMs, functional status, and quality-of-life indicators into decision-making."
      },
      {
        number: 5,
        text: "Engages in reflective practice to identify outcome deviations."
      },
      {
        number: 6,
        text: "Demonstrates adaptive expertise by recognizing non-response and redirecting management."
      },
      {
        number: 7,
        text: "Identifies potential non-responders through complexity reassessment and outcome trend analysis."
      }
    ],
    primaryCompetencies: [3, 18, 19, 28],
    supportingCompetencies: [2, 9, 10, 11, 12, 17, 27, 29],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Performs basic reassessments. Recognizes straightforward outcome trends.",
        moderate: "Can perform reassessments but may miss subtle deviations. Needs guidance connecting data to plan modification.",
        high: "Requires the mentor to guide outcome interpretation for complex cases."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently interprets outcomes. Uses PROMs to support decisions.",
        moderate: "Interprets with growing sophistication. Can identify non-response patterns.",
        high: "Can collect and analyze data but requires shared decision-making for conflicting trends."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Outcome interpretation is seamless and efficient.",
        moderate: "Independently manages interpretation. Identifies non-response early.",
        high: "Manages most high-complexity outcome interpretation independently."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Outcome interpretation is expert-level.",
        moderate: "All moderate-complexity outcome management handled independently.",
        high: "Independently interprets and acts on outcomes for high-complexity cases."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in basic outcome interpretation.",
        moderate: "Can mentor learners through moderate-complexity outcome challenges.",
        high: "Can mentor learners through high-complexity outcome interpretation."
      }
    ],
    assessmentMethods: "Longitudinal review of outcome documentation; case discussion of non-response management; review of PROM integration; direct observation of reassessment.",
    assessmentQuestions: "Does the fellow reassess at appropriate intervals? Can the fellow identify non-response early? Does outcome data drive plan modifications?",
    literature: "Mylopoulos & Woods (2017); Shepherd et al. (2025); Poulter (2025)"
  },
  {
    id: 7,
    title: "Recognize and Respond to Urgent/Emergent Status Changes",
    shortTitle: "Urgent/Emergent",
    description: "The fellow uses systemic screening to recognize urgent or emergent changes and initiates appropriate safety measures, escalation pathways, and referral processes. Reflects the safety gatekeeper role—detecting red flags for serious pathology and acting decisively.",
    specifications: [
      {
        number: 1,
        text: "Performs systemic screening using validated red-flag frameworks for serious pathology."
      },
      {
        number: 2,
        text: "Recognizes urgent and emergent status changes during examination, treatment, or ongoing care."
      },
      {
        number: 3,
        text: "Assesses SINSS to establish and maintain safety parameters."
      },
      {
        number: 4,
        text: "Initiates appropriate safety measures when urgent/emergent conditions are identified."
      },
      {
        number: 5,
        text: "Activates escalation pathways and referral processes appropriate to the scenario."
      },
      {
        number: 6,
        text: "Communicates urgent findings clearly to all stakeholders."
      },
      {
        number: 7,
        text: "Documents screening findings and referral rationale."
      }
    ],
    primaryCompetencies: [4],
    supportingCompetencies: [7, 27],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Recognizes obvious red flags. May require prompting to initiate referral.",
        moderate: "Can perform basic screening but may miss subtle presentations. Needs guidance differentiating urgency.",
        high: "Requires the mentor to guide screening interpretation for complex cases."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently screens for and recognizes red flags.",
        moderate: "Screens effectively. Benefits from co-reasoning for ambiguous findings.",
        high: "Can perform screening but requires shared decision-making for complex red-flag scenarios."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Red-flag screening is automatic and reliable.",
        moderate: "Independently manages screening and escalation for moderate complexity.",
        high: "Manages most high-complexity urgent/emergent scenarios independently."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Screening and escalation are expert-level.",
        moderate: "All moderate-complexity scenarios handled independently.",
        high: "Independently recognizes and responds for high-complexity cases."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in red-flag screening fundamentals.",
        moderate: "Can mentor learners through moderate-complexity screening scenarios.",
        high: "Can mentor learners through high-complexity urgent/emergent scenarios."
      }
    ],
    assessmentMethods: "Direct observation; structured case review of screening documentation; simulation; review of referral communications.",
    assessmentQuestions: "Does the fellow screen systematically? Can the fellow differentiate true red flags from clinical noise? Is the escalation proportionate and timely?",
    literature: "Finucane et al. (2020); NAIOMT OMPT Complexity Framework"
  },
  {
    id: 8,
    title: "Educate Patients, Caregivers, Families, and Healthcare Professionals",
    shortTitle: "Education & Mentoring",
    description: "The fellow educates diverse audiences in contemporary OMPT, pain science, self-management, and advanced clinical reasoning. Spans patient/caregiver education and professional education/mentoring.",
    specifications: [
      {
        number: 1,
        text: "Communicates diagnoses and pain phenotypes in person-appropriate, non-biased language."
      },
      {
        number: 2,
        text: "Integrates and communicates contemporary, evidence-informed OMPT models."
      },
      {
        number: 3,
        text: "Delivers pain-science and health education as part of self-management and intervention."
      },
      {
        number: 4,
        text: "Teaches symptom-management strategies tailored to the individual."
      },
      {
        number: 5,
        text: "Mentors peers and learners in contemporary OMPT and advanced clinical reasoning."
      },
      {
        number: 6,
        text: "Demonstrates leadership, scholarship, and evidence currency."
      },
      {
        number: 7,
        text: "Adapts educational approach to the audience's knowledge level and cultural context."
      }
    ],
    primaryCompetencies: [13, 14, 24, 25, 31, 32],
    supportingCompetencies: [1, 5, 17, 19, 23],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Communicates basic diagnoses and instructions clearly.",
        moderate: "Can educate on common conditions but struggles with complex explanatory models.",
        high: "Requires the mentor to guide education for complex presentations."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently educates patients on diagnoses and self-management.",
        moderate: "Delivers increasingly sophisticated education. Beginning to mentor peers.",
        high: "Can initiate education but requires shared decision-making for complex frameworks."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Patient education is seamless and effective.",
        moderate: "Independently manages all education for moderate complexity. Mentors learners.",
        high: "Manages most high-complexity education independently."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Education is expert-level.",
        moderate: "All moderate-complexity education managed independently. Mentoring is a strength.",
        high: "Independently manages education for the most complex patients and professional mentoring."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in communication fundamentals.",
        moderate: "Can mentor learners in moderate-complexity education and clinical mentoring.",
        high: "Can mentor learners in advanced education and professional mentoring methodology."
      }
    ],
    assessmentMethods: "Direct observation of education sessions; review of materials; peer and learner feedback; professional education contributions.",
    assessmentQuestions: "Does the fellow adapt to the audience? Is pain-science education evidence-informed? Does the fellow develop learners' reasoning, not just instruct?",
    literature: "Cook et al. (2023); Shepherd et al. (2025); Mylopoulos & Woods (2017)"
  },
  {
    id: 9,
    title: "Supervise or Delegate to PTAs, Aides, Technicians, and Junior Learners",
    shortTitle: "Supervision & Delegation",
    description: "The fellow triages, delegates, and supervises care by aligning tasks with scope, competence, and complexity while maintaining accountability. Encompasses mentoring and systems-thinking leadership.",
    specifications: [
      {
        number: 1,
        text: "Triages care tasks by matching complexity to supervisee scope and competency."
      },
      {
        number: 2,
        text: "Delegates appropriately while maintaining clinical accountability."
      },
      {
        number: 3,
        text: "Provides supervision calibrated to supervisee competence and patient complexity."
      },
      {
        number: 4,
        text: "Escalates care when complexity exceeds the supervisee's scope."
      },
      {
        number: 5,
        text: "Mentors peers and junior learners in OMPT and clinical reasoning."
      },
      {
        number: 6,
        text: "Provides structured feedback and supports professional development."
      },
      {
        number: 7,
        text: "Documents delegation rationale and outcome accountability."
      }
    ],
    primaryCompetencies: [30, 31],
    supportingCompetencies: [29, 32],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Can delegate basic tasks for straightforward patients.",
        moderate: "Can identify delegable tasks but may struggle to match complexity. Mentoring is nascent.",
        high: "Requires the mentor to guide delegation decisions for high-complexity patients."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently delegates and supervises for straightforward patients.",
        moderate: "Delegates with growing judgment. Benefits from co-reasoning for calibration.",
        high: "Can initiate delegation but requires shared decision-making for high-complexity decisions."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Delegation and supervision are efficient and calibrated.",
        moderate: "Independently manages delegation for moderate complexity. Mentoring is effective.",
        high: "Manages most high-complexity delegation independently."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Delegation is expert-level.",
        moderate: "All moderate-complexity supervisory scenarios handled independently.",
        high: "Independently manages delegation for high-complexity cases."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in delegation fundamentals.",
        moderate: "Can mentor learners in moderate-complexity supervisory practice.",
        high: "Can mentor learners in advanced supervisory leadership."
      }
    ],
    assessmentMethods: "Direct observation; review of delegation documentation; supervisee feedback; case discussion; learner progress assessment.",
    assessmentQuestions: "Does the fellow match task complexity to supervisee competence? Does the fellow maintain outcome accountability? Can the fellow escalate appropriately?",
    literature: "NAIOMT OMPT Complexity Framework; Mylopoulos & Woods (2017)"
  },
  {
    id: 10,
    title: "Conclude Episodes of Care",
    shortTitle: "Episode Conclusion",
    description: "The fellow concludes episodes by integrating outcomes, functional status, patient goals, and feedback to determine discharge readiness or transition. Requires synthesis of all data streams into a discharge decision with clear communication and self-maintenance planning.",
    specifications: [
      {
        number: 1,
        text: "Integrates outcome data, functional status, and patient goals to determine discharge readiness."
      },
      {
        number: 2,
        text: "Assesses whether the patient has sufficient self-management competence."
      },
      {
        number: 3,
        text: "Communicates the discharge rationale clearly and constructively."
      },
      {
        number: 4,
        text: "Develops a post-discharge self-maintenance plan with relapse prevention."
      },
      {
        number: 5,
        text: "Coordinates care transitions when needed."
      },
      {
        number: 6,
        text: "Documents episode closure including outcomes, outstanding issues, and recommendations."
      },
      {
        number: 7,
        text: "Solicits and integrates patient feedback."
      }
    ],
    primaryCompetencies: [19, 33],
    supportingCompetencies: [18, 29],
    matrix: [
      {
        level: 1,
        levelDesc: "Direct supervision for high complexity",
        low: "Can conclude straightforward episodes when goals are clearly met.",
        moderate: "Can identify when episodes should conclude but may struggle with timing.",
        high: "Requires the mentor to guide discharge decisions for complex cases."
      },
      {
        level: 2,
        levelDesc: "Shared decision-making for high complexity",
        low: "Independently concludes straightforward episodes with clear communication.",
        moderate: "Concludes moderate-complexity episodes with growing confidence.",
        high: "Can initiate discharge but requires shared decision-making for mixed outcomes."
      },
      {
        level: 3,
        levelDesc: "Consultation available for high complexity",
        low: "Episode conclusion is seamless.",
        moderate: "Independently manages conclusion for moderate complexity.",
        high: "Manages most high-complexity conclusions independently."
      },
      {
        level: 4,
        levelDesc: "Independent with oversight",
        low: "Episode conclusion is expert-level.",
        moderate: "All moderate-complexity conclusions managed independently.",
        high: "Independently concludes high-complexity episodes with full integration."
      },
      {
        level: 5,
        levelDesc: "Ready to mentor others",
        low: "Can mentor learners in episode conclusion fundamentals.",
        moderate: "Can mentor learners through moderate-complexity conclusions.",
        high: "Can mentor learners through high-complexity conclusions."
      }
    ],
    assessmentMethods: "Review of discharge documentation; case discussion; direct observation of discharge conversations; care transition review; patient feedback.",
    assessmentQuestions: "Does the fellow determine readiness based on data? Is the post-discharge plan individualized? Does the fellow coordinate transitions proactively?",
    literature: "Shepherd et al. (2025); NAIOMT OMPT Complexity Framework"
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
