import Link from 'next/link';
import { EPAS, COMPETENCIES, getCompetenciesForEPA } from '@/data/framework';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return EPAS.map((epa) => ({
    id: epa.id.toString(),
  }));
}

export default async function EPADetailPage(props: PageProps) {
  const params = await props.params;
  const epa = EPAS.find((e) => e.id === parseInt(params.id));

  if (!epa) {
    notFound();
  }

  const primaryComps = getCompetenciesForEPA(epa.id, 'P');
  const supportingComps = getCompetenciesForEPA(epa.id, 'S');

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      {/* Back Button */}
      <Link
        href="/epas"
        className="inline-flex items-center gap-2 text-[#2E75B6] hover:text-[#1F3864] font-medium"
      >
        ← Back to EPA Explorer
      </Link>

      {/* Header */}
      <section className="space-y-2">
        <div className="text-sm font-semibold text-[#2E75B6]">EPA {epa.id}</div>
        <h1 className="text-4xl font-bold text-[#1F3864]">{epa.title}</h1>
        <p className="text-gray-700 text-lg mt-4">{epa.description}</p>
      </section>

      {/* Specifications */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1F3864]">Specifications</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <tbody>
              {epa.specifications.map((spec, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}>
                  <td className="px-6 py-4 font-semibold text-[#1F3864] w-12">{spec.number}</td>
                  <td className="px-6 py-4 text-gray-700">{spec.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Competency Mapping */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1F3864]">Competency Mapping</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Primary Competencies */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1F3864]">Primary Competencies</h3>
            <div className="space-y-3">
              {primaryComps.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-[#1F3864] text-white rounded-lg p-4 text-sm"
                >
                  <div className="font-bold mb-1">C{comp.id}</div>
                  <div>{comp.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Supporting Competencies */}
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1F3864]">Supporting Competencies</h3>
            <div className="space-y-3">
              {supportingComps.map((comp) => (
                <div
                  key={comp.id}
                  className="bg-[#D6E4F0] text-[#1F3864] rounded-lg p-4 text-sm"
                >
                  <div className="font-bold mb-1">C{comp.id}</div>
                  <div>{comp.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Entrustment × Complexity Matrix */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1F3864]">Entrustment × Complexity Matrix</h2>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1F3864] text-white">
                <th className="px-4 py-3 text-left font-bold">Level</th>
                <th className="px-4 py-3 text-left font-bold">Descriptor</th>
                <th className="px-4 py-3 text-left font-bold bg-blue-600">Low</th>
                <th className="px-4 py-3 text-left font-bold bg-[#2E75B6]">Moderate</th>
                <th className="px-4 py-3 text-left font-bold bg-[#1F3864]">High</th>
              </tr>
            </thead>
            <tbody>
              {epa.matrix.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                  <td className="px-4 py-3 font-bold text-[#1F3864] w-12">{row.level}</td>
                  <td className="px-4 py-3 text-gray-700 text-xs">{row.levelDesc}</td>
                  <td className="px-4 py-3 text-gray-700 text-xs">{row.low}</td>
                  <td className="px-4 py-3 text-gray-700 text-xs">{row.moderate}</td>
                  <td className="px-4 py-3 text-gray-700 text-xs">{row.high}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Assessment Guidance */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Assessment Methods */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#1F3864]">Assessment Methods</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{epa.assessmentMethods}</p>
        </div>

        {/* Key Questions */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#1F3864]">Key Questions</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{epa.assessmentQuestions}</p>
        </div>

        {/* Literature */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#1F3864]">Key Literature</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{epa.literature}</p>
        </div>
      </section>
    </div>
  );
}
