'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useProgram } from '@/context/ProgramContext';
import { useEPAs, useCompetencies, useEPACompetencyMaps, useEntrustmentLevels } from '@/hooks/useSupabaseData';

export default function FiltersPage() {
  const { selectedProgram } = useProgram();
  const { epas } = useEPAs();
  const { competencies } = useCompetencies();
  const { maps } = useEPACompetencyMaps();
  const { levels: entrustmentLevels } = useEntrustmentLevels();

  const [complexity, setComplexity] = useState<'low' | 'moderate' | 'high' | ''>('');
  const [clinicalFocusEPA, setClinicalFocusEPA] = useState('');
  const [entrustmentLevel, setEntrustmentLevel] = useState<number | ''>('');

  const programCompIds = useMemo(
    () => new Set(competencies.map((c) => c.id)),
    [competencies]
  );

  const selectedEPA = useMemo(
    () => epas.find((e) => e.id === clinicalFocusEPA) || null,
    [epas, clinicalFocusEPA]
  );

  const relevantCompetencies = useMemo(() => {
    if (!selectedEPA) return competencies;

    const epaCompIds = new Set(
      maps.filter((m) => m.epa_id === selectedEPA.id && programCompIds.has(m.competency_id))
        .map((m) => m.competency_id)
    );

    return competencies.filter((c) => epaCompIds.has(c.id));
  }, [selectedEPA, competencies, maps, programCompIds]);

  return (
    <div className="p-8 space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-[#1F3864]">Clinical Filters</h1>
        <p className="text-gray-700">
          Guided lookup tool to find relevant EPAs and competencies for the{' '}
          {selectedProgram?.name} program
        </p>
      </section>

      {/* Filter Controls */}
      <section className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-[#1F3864] mb-3">
              Complexity Level
            </label>
            <div className="space-y-2">
              {(['low', 'moderate', 'high'] as const).map((level) => (
                <label key={level} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="complexity"
                    value={level}
                    checked={complexity === level}
                    onChange={(e) => setComplexity(e.target.value as typeof complexity)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 capitalize">{level} Complexity</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#1F3864] mb-3">
              Clinical Focus (EPA)
            </label>
            <select
              value={clinicalFocusEPA}
              onChange={(e) => setClinicalFocusEPA(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E75B6]"
            >
              <option value="">-- Select EPA --</option>
              {epas.map((epa) => (
                <option key={epa.id} value={epa.id}>
                  EPA {epa.number}: {epa.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-[#1F3864] mb-3">
              Entrustment Level
            </label>
            <select
              value={entrustmentLevel}
              onChange={(e) => setEntrustmentLevel(e.target.value ? parseInt(e.target.value) : '')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E75B6]"
            >
              <option value="">-- Select Level --</option>
              {entrustmentLevels.map((level) => (
                <option key={level.level} value={level.level}>
                  {level.level}: {level.descriptor}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Selected EPA */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1F3864]">Selected EPA</h2>
          {selectedEPA ? (
            <div className="bg-white rounded-lg shadow p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-[#1F3864] text-white rounded-lg px-4 py-2 font-bold text-lg">
                  EPA {selectedEPA.number}
                </div>
                <div className="flex-1">
                  <Link
                    href={`/epas/${selectedEPA.number}`}
                    className="text-[#2E75B6] hover:text-[#1F3864] font-bold text-base"
                  >
                    {selectedEPA.title} →
                  </Link>
                  <p className="text-gray-700 text-sm mt-2">
                    {(selectedEPA.description || '').substring(0, 150)}...
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center text-gray-600">
              Select an EPA to view details
            </div>
          )}
        </section>

        {/* Relevant Competencies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1F3864]">
            Relevant Competencies ({relevantCompetencies.length})
          </h2>
          {relevantCompetencies.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {relevantCompetencies.map((comp) => {
                const mapping = selectedEPA
                  ? maps.find((m) => m.epa_id === selectedEPA.id && m.competency_id === comp.id)
                  : null;
                return (
                  <div key={comp.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-start gap-3">
                      <div className={`rounded-lg px-3 py-1 font-bold text-sm flex-shrink-0 ${
                        mapping?.relationship === 'primary'
                          ? 'bg-[#1F3864] text-white'
                          : 'bg-[#2E75B6] text-white'
                      }`}>
                        {comp.code}
                      </div>
                      <div>
                        <p className="text-gray-700 text-sm">{comp.title}</p>
                        {mapping && (
                          <span className="text-xs text-gray-400 mt-1">
                            {mapping.relationship === 'primary' ? 'Primary' : 'Supporting'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center text-gray-600">
              Select filters to view relevant competencies
            </div>
          )}
        </section>
      </div>

      {/* Entrustment Level Detail */}
      {entrustmentLevel && (
        <section className="space-y-4">
          {(() => {
            const level = entrustmentLevels.find((l) => l.level === entrustmentLevel);
            if (!level) return null;
            return (
              <>
                <h2 className="text-2xl font-bold text-[#1F3864]">
                  Entrustment Level {level.level}: {level.descriptor}
                </h2>
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-gray-700">{level.meaning}</p>
                </div>
              </>
            );
          })()}
        </section>
      )}
    </div>
  );
}
