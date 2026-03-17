'use client';

import Link from 'next/link';
import { useProgram } from '@/context/ProgramContext';
import { useEPAs, useDomains, useCompetencies, useCourses } from '@/hooks/useSupabaseData';

const programDescriptions: Record<string, { subtitle: string; description: string }> = {
  residency: {
    subtitle: 'Routine Expertise Pathway',
    description:
      'A comprehensive clinical training pathway built on 7 ABPTRFE domains and 35 competencies. Develops routine expertise in orthopedic manual physical therapy through structured residency training.',
  },
  fellowship: {
    subtitle: 'Advanced Expertise / CEBE Framework',
    description:
      'An advanced clinical learning and assessment pathway built on the CEBE framework with 7 domains and 33 competencies. Develops adaptive expertise for complex clinical presentations in orthopedic manual physical therapy.',
  },
  certification: {
    subtitle: 'Assessment Pathway',
    description:
      'The certification assessment pathway validates routine expertise through structured evaluation. Domain and competency mapping is currently in development.',
  },
};

const programRoles: Record<string, Array<{ title: string; icon: string; description: string; points: string[]; link: string; linkText: string }>> = {
  residency: [
    {
      title: 'Resident',
      icon: '🎓',
      description: 'Develop your OMPT expertise through the residency EPA framework',
      points: [
        'Track your progression across 10 clinical EPAs',
        'Master 35 competencies across 7 ABPTRFE domains',
        'Navigate complexity at low, moderate, and high levels',
      ],
      link: '/epas',
      linkText: 'Explore EPAs',
    },
    {
      title: 'Mentor',
      icon: '👨‍🏫',
      description: 'Guide residents through structured clinical competency development',
      points: [
        'Use the entrustment matrix to assess readiness',
        'Access competency mapping for holistic development',
        'Reference assessment guidance for each EPA',
      ],
      link: '/epas',
      linkText: 'View Assessment Framework',
    },
    {
      title: 'Program Director',
      icon: '📌',
      description: 'Manage residency curriculum and track cohort progress',
      points: [
        'Monitor competency development across the cohort',
        'Integrate the 7 ABPTRFE domains into education',
        'Use AI advisor to contextualize learning',
      ],
      link: '/advisor',
      linkText: 'AI Advisor',
    },
  ],
  fellowship: [
    {
      title: 'Fellow',
      icon: '🎓',
      description: 'Develop your OMPT expertise through the EPA framework',
      points: [
        'Track your progression across 10 clinical EPAs',
        'Master 33 core competencies in contemporary OMPT',
        'Navigate complexity at low, moderate, and high levels',
      ],
      link: '/epas',
      linkText: 'Explore EPAs',
    },
    {
      title: 'Mentor',
      icon: '👨‍🏫',
      description: 'Guide fellows through structured clinical competency development',
      points: [
        'Use the entrustment matrix to assess readiness',
        'Access competency mapping for holistic development',
        'Reference assessment guidance for each EPA',
      ],
      link: '/epas',
      linkText: 'View Assessment Framework',
    },
    {
      title: 'Program Director',
      icon: '📌',
      description: 'Manage fellowship curriculum and track cohort progress',
      points: [
        'Monitor competency development across the cohort',
        'Integrate the 7 CEBE domains into education',
        'Use AI advisor to contextualize learning',
      ],
      link: '/advisor',
      linkText: 'AI Advisor',
    },
  ],
  certification: [
    {
      title: 'Candidate',
      icon: '🎓',
      description: 'Prepare for NAIOMT certification through EPA-aligned assessment',
      points: [
        'Understand the 10 clinical EPAs used in certification',
        'Review competency expectations for each domain',
        'Self-assess readiness across complexity levels',
      ],
      link: '/epas',
      linkText: 'Explore EPAs',
    },
  ],
};

export default function Home() {
  const { selectedProgram, selectedSlug } = useProgram();
  const { epas } = useEPAs();
  const { domains } = useDomains();
  const { competencies } = useCompetencies();
  const { courses } = useCourses();

  const info = programDescriptions[selectedSlug] || programDescriptions.fellowship;
  const roles = programRoles[selectedSlug] || programRoles.fellowship;

  const isCertification = selectedSlug === 'certification';

  return (
    <div className="p-8 space-y-12">
      {/* Header Section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-[#1F3864]">
          NAIOMT {selectedProgram?.name || 'EPA'} Companion
        </h1>
        <p className="text-sm font-medium text-[#2E75B6]">{info.subtitle}</p>
        <p className="text-lg text-gray-700 max-w-3xl">{info.description}</p>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#2E75B6]">{epas.length}</div>
          <div className="text-sm text-gray-600 mt-2">Essential Professional Activities</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#2E75B6]">
            {isCertification ? '—' : competencies.length}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {isCertification ? 'Competencies (TBD)' : 'Competencies'}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#2E75B6]">
            {isCertification ? '—' : domains.length}
          </div>
          <div className="text-sm text-gray-600 mt-2">
            {isCertification ? 'Domains (TBD)' : 'Knowledge Domains'}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#2E75B6]">{courses.length}</div>
          <div className="text-sm text-gray-600 mt-2">Courses</div>
        </div>
      </section>

      {/* Certification Coming Soon Banner */}
      {isCertification && (
        <section className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-amber-800">Certification Mapping In Progress</h3>
          <p className="text-amber-700 mt-2 text-sm">
            The certification pathway&apos;s domain and competency structure is currently being developed.
            The 10 shared EPAs are available, and the full competency framework will be populated once
            the mapping is complete.
          </p>
        </section>
      )}

      {/* Role-Based Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1F3864]">Get Started</h2>
        <div className={`grid gap-6 ${roles.length === 1 ? 'md:grid-cols-1 max-w-lg' : 'md:grid-cols-3'}`}>
          {roles.map((role) => (
            <div key={role.title} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="bg-gradient-to-r from-[#1F3864] to-[#2E75B6] p-6">
                <div className="text-4xl mb-2">{role.icon}</div>
                <h3 className="text-xl font-bold text-white">{role.title}</h3>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-gray-700 text-sm">{role.description}</p>
                <ul className="space-y-2">
                  {role.points.map((point, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-gray-600">
                      <span className="text-[#C49A2A] font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={role.link}
                  className="inline-block mt-4 px-4 py-2 bg-[#2E75B6] text-white rounded-lg hover:bg-[#1F3864] transition-colors text-sm font-medium"
                >
                  {role.linkText} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <section className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
        <p className="text-gray-700 text-sm">
          This tool is designed for learners, mentors, and program directors across NAIOMT&apos;s
          {' '}{selectedProgram?.name || 'clinical'} program. Use it to guide clinical learning,
          assess competency development, and achieve excellence in orthopedic manual physical therapy.
        </p>
      </section>
    </div>
  );
}
