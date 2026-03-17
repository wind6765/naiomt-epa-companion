'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useProgram } from '@/context/ProgramContext';
import { useEPAs, useCompetencies, useEPACompetencyMaps, useEntrustmentLevels } from '@/hooks/useSupabaseData';

export default function EPADetailPage() {
  const params = useParams();
  const epaNumber = parseInt(params.id as string);
  const { selectedProgram } = useProgram();
  const { epas, loading: epasLoading } = useEPAs();
  const { competencies } = useCompetencies();
  const { maps } = useEPACompetencyMaps();
  const { levels: entrustmentLevels } = useEntrustmentLevels();

  const epa = useMemo(() => epas.find((e) => e.number === epaNumber), [epas, epaNumber]);

  const programCompIds = useMemo(
    () => new Set(competencies.map((c) => c.id)),
    [competencies]
  );

  const primaryComps = useMemo(() => {
    if (!epa) return [];
    return maps
      .filter((m) => m.epa_id === epa.id && m.relationship === 'primary' && programCompIds.has(m.competency_id))
      .map((m) => competencies.find((c) => c.id === m.competency_id))
      .filter(Boolean);
  }, [epa, maps, competencies, programCompIds]);

  const supportingComps = useMemo(() => {
    if (!epa) return [];
    return maps
      .filter((m) => m.epa_id === epa.id && m.relationship === 'supporting' && programCompIds.has(m.competency_id))
      .map((m) => competencies.find((c) => c.id === m.competency_id))
      .filter(Boolean);
  }, [epa, maps, competencies, programCompIds]);

  if (epasLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="h-12 bg-gray-200 rounded w-2/3" />
          <div className="h-32 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!epa) {
    return (
      <div className="p-8">
        <Link href="/epas" className="text-[#2E75B6] hover:text-[#1F3864] font-medium">
          ← Back to EPA Explorer
        </Link>
        <div className="mt-8 text-center py-12 bg-white rounded-lg">
          <p className="text-gray-600">EPA not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <Link
        href="/epas"
        className="inline-flex items-center gap-2 text-[#2E75B6] hover:text-[#1F3864] font-medium"
      >
        ← Back to EPA Explorer
      </Link>

      {/* Header */}
      <section className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold text-[#2E75B6]">EPA {epa.number}</div>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {selectedProgram?.name}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-[#1F3864]">{epa.title}</h1>
        <p className="text-gray-700 text-lg mt-4">{epa.description}</p>
      </section>

      {/* Observable Elements */}
      {epa.observable_elements && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1F3864]">Observable Elements</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {epa.observable_elements}
            </p>
          </div>
        </section>
      )}

      {/* Competency Mapping */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1F3864]">
          Competency Mapping — {selectedProgram?.name}
        </h2>
        {primaryComps.length === 0 && supportingComps.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-amber-700 text-sm">
            Competency mappings for this program are not yet available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-lg font-bold text-[#1F3864]">
                Primary Competencies ({primaryComps.length})
              </h3>
              <div className="space-y-3">
                {primaryComps.map((comp) => (
                  <div key={comp!.id} className="bg-[#1F3864] text-white rounded-lg p-4 text-sm">
                    <div className="font-bold mb-1">{comp!.code}</div>
                    <div>{comp!.title}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h3 className="text-lg font-bold text-[#1F3864]">
                Supporting Competencies ({supportingComps.length})
              </h3>
              <div className="space-y-3">
                {supportingComps.map((comp) => (
                  <div key={comp!.id} className="bg-[#D6E4F0] text-[#1F3864] rounded-lg p-4 text-sm">
                    <div className="font-bold mb-1">{comp!.code}</div>
                    <div>{comp!.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Entrustment Levels */}
      {entrustmentLevels.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1F3864]">
            Entrustment Scale — {selectedProgram?.name}
          </h2>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1F3864] text-white">
                  <th className="px-4 py-3 text-left font-bold w-16">Level</th>
                  <th className="px-4 py-3 text-left font-bold">Descriptor</th>
                  <th className="px-4 py-3 text-left font-bold">Meaning</th>
                </tr>
              </thead>
              <tbody>
                {entrustmentLevels.map((level, idx) => (
                  <tr key={level.id || idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-bold text-[#1F3864]">{level.level}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{level.descriptor}</td>
                    <td className="px-4 py-3 text-gray-600">{level.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
