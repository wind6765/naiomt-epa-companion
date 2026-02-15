import Link from 'next/link';
import { EPAS, COMPETENCIES, DOMAINS, ENTRUSTMENT_LEVELS } from '@/data/framework';

export default function Home() {
  const frameworks = [
    { name: 'Adaptive Expertise', icon: '🧠' },
    { name: 'Person-Centered Hypothesis', icon: '👤' },
    { name: 'Pain Mechanism Classification', icon: '📊' },
    { name: 'Contextual Factors', icon: '🌍' },
    { name: 'Red Flags & Safety', icon: '⚠️' },
    { name: 'OMPT Complexity', icon: '📈' },
  ];

  const roles = [
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
        'Integrate the 7 foundational domains into education',
        'Use clinical advisor to contextualize learning',
      ],
      link: '/advisor',
      linkText: 'Clinical Advisor',
    },
  ];

  return (
    <div className="p-8 space-y-12">
      {/* Header Section */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-[#1F3864]">
          NAIOMT Fellowship EPA Companion
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl">
          A comprehensive clinical learning and assessment tool designed to guide fellows through the
          NAIOMT EPA framework. Integrates 10 essential professional activities, 33 competencies, 7 knowledge domains,
          and 5 entrustment levels for excellence in orthopedic manual physical therapy.
        </p>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#2E75B6]">{EPAS.length}</div>
          <div className="text-sm text-gray-600 mt-2">Essential Professional Activities</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#2E75B6]">{COMPETENCIES.length}</div>
          <div className="text-sm text-gray-600 mt-2">Core Competencies</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#2E75B6]">{DOMAINS.length}</div>
          <div className="text-sm text-gray-600 mt-2">Knowledge Domains</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="text-3xl font-bold text-[#2E75B6]">{ENTRUSTMENT_LEVELS.length}</div>
          <div className="text-sm text-gray-600 mt-2">Entrustment Levels</div>
        </div>
      </section>

      {/* Role-Based Cards */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1F3864]">Get Started</h2>
        <div className="grid md:grid-cols-3 gap-6">
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

      {/* Conceptual Foundations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1F3864]">Conceptual Foundations</h2>
        <p className="text-gray-700">
          The NAIOMT EPA framework is built on six integrated theoretical foundations:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {frameworks.map((framework) => (
            <div key={framework.name} className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-3xl mb-2">{framework.icon}</div>
              <p className="font-medium text-[#1F3864] text-sm">{framework.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Info */}
      <section className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
        <p className="text-gray-700 text-sm">
          This tool is designed for fellows, mentors, and program directors in the NAIOMT fellowship program.
          Use it to guide clinical learning, assess competency development, and achieve excellence in orthopedic manual physical therapy.
        </p>
      </section>
    </div>
  );
}
