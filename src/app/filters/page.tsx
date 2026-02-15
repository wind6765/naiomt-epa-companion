'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { EPAS, COMPETENCIES, ENTRUSTMENT_LEVELS } from '@/data/framework';

const clinicalFocusMapping: Record<string, number> = {
  'Examination': 1,
  'Diagnosis': 2,
  'Management': 3,
  'Self-Management': 4,
  'Intervention': 5,
  'Outcomes': 6,
  'Safety': 7,
  'Education': 8,
  'Supervision': 9,
  'Discharge': 10,
};

const painPhenotypeCompetencies = [6, 13, 20, 24];

export default function FiltersPage() {
  const [complexity, setComplexity] = useState<'low' | 'moderate' | 'high' | ''>('');
  const [painPhenotype, setPainPhenotype] = useState<string>('');
  const [clinicalFocus, setClinicalFocus] = useState<string>('');
  const [entrustmentLevel, setEntrustmentLevel] = useState<number | ''>('');

  const relevantEPAs = useMemo(() => {
    if (!clinicalFocus) return [];
    const epaId = clinicalFocusMapping[clinicalFocus];
    return EPAS.filter((e) => e.id === epaId);
  }, [clinicalFocus]);

  const relevantCompetencies = useMemo(() => {
    let comps = COMPETENCIES;

    if (painPhenotype) {
      comps = comps.filter((c) => painPhenotypeCompetencies.includes(c.id));
    }

    if (clinicalFocus) {
      const epaId = clinicalFocusMapping[clinicalFocus];
      const epa = EPAS.find((e) => e.id === epaId);
      if (epa) {
        const epaCompIds = [
          ...epa.primaryCompetencies,
          ...epa.supportingCompetencies,
        ];
        comps = comps.filter((c) => epaCompIds.includes(c.id));
      }
    }

    return comps;
  }, [painPhenotype, clinicalFocus]);

  const selectedEPA = relevantEPAs.length > 0 ? relevantEPAs[0] : null;
  const selectedMatrix = selectedEPA && entrustmentLevel ?
    selectedEPA.matrix.find((row) => row.level === entrustmentLevel) :
    null;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-[#1F3864]">Clinical Filters</h1>
        <p className="text-gray-700">
          Guided lookup tool to find relevant EPAs and competencies for your clinical scenarios
        </p>
      </section>

      {/* Filter Controls */}
      <section className="bg-white rounded-lg shadow p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Complexity Level */}
          <div>
            <label className="block text-sm font-bold text-[#1F3864] mb-3">
              Complexity Level
            </label>
            <div className="space-y-2">
              {['low', 'moderate', 'high'].map((level) => (
                <label key={level} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="complexity"
                    value={level}
                    checked={complexity === level}
                    onChange={(e) => setComplexity(e.target.value as 'low' | 'moderate' | 'high')}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-700 capitalize">{level} Complexity</span>
                </label>
              ))}
            </div>
          </div>

          {/* Pain Phenotype */}
          <div>
            <label className="block text-sm font-bold text-[#1F3864] mb-3">
              Pain Phenotype
            </label>
            <select
              value={painPhenotype}
              onChange={(e) => setPainPhenotype(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E75B6]"
            >
              <option value="">-- Select Phenotype --</option>
              <option value="nociceptive">Nociceptive</option>
              <option value="nociplastic">Nociplastic</option>
              <option value="neuropathic">Neuropathic</option>
              <option value="mixed">Mixed/Unclear</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Clinical Focus */}
          <div>
            <label className="block text-sm font-bold text-[#1F3864] mb-3">
              Clinical Focus
            </label>
            <select
              value={clinicalFocus}
              onChange={(e) => setClinicalFocus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E75B6]"
            >
              <option value="">-- Select Focus --</option>
              {Object.keys(clinicalFocusMapping).map((focus) => (
                <option key={focus} value={focus}>
                  {focus}
                </option>
              ))}
            </select>
          </div>

          {/* Entrustment Level */}
          <div>
            <label className="block text-sm font-bold text-[#1F3864] mb-3">
              Entrustment Level (if EPA selected)
            </label>
            <select
              value={entrustmentLevel}
              onChange={(e) => setEntrustmentLevel(e.target.value ? parseInt(e.target.value) : '')}
              disabled={!selectedEPA}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E75B6] disabled:bg-gray-100"
            >
              <option value="">-- Select Level --</option>
              {ENTRUSTMENT_LEVELS.map((level) => (
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
        {/* Relevant EPAs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1F3864]">Relevant EPAs</h2>
          {selectedEPA ? (
            <div className="bg-white rounded-lg shadow p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-[#1F3864] text-white rounded-lg px-4 py-2 font-bold text-lg">
                  EPA {selectedEPA.id}
                </div>
                <div className="flex-1">
                  <Link
                    href={`/epas/${selectedEPA.id}`}
                    className="text-[#2E75B6] hover:text-[#1F3864] font-bold text-base"
                  >
                    {selectedEPA.shortTitle} →
                  </Link>
                  <p className="text-gray-700 text-sm mt-2">{selectedEPA.description.substring(0, 150)}...</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center text-gray-600">
              Select a clinical focus to view relevant EPAs
            </div>
          )}
        </section>

        {/* Relevant Competencies */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1F3864]">Relevant Competencies</h2>
          {relevantCompetencies.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {relevantCompetencies.map((comp) => (
                <div key={comp.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#2E75B6] text-white rounded-lg px-3 py-1 font-bold text-sm flex-shrink-0">
                      C{comp.id}
                    </div>
                    <p className="text-gray-700 text-sm">{comp.text}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 text-center text-gray-600">
              Select filters to view relevant competencies
            </div>
          )}
        </section>
      </div>

      {/* Entrustment Matrix Row (if selected) */}
      {selectedMatrix && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1F3864]">Entrustment Level {selectedMatrix.level} - {selectedMatrix.levelDesc}</h2>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#1F3864] text-white">
                  <th className="px-4 py-3 text-left font-bold bg-blue-600">Low Complexity</th>
                  <th className="px-4 py-3 text-left font-bold bg-[#2E75B6]">Moderate Complexity</th>
                  <th className="px-4 py-3 text-left font-bold bg-[#1F3864]">High Complexity</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-slate-50">
                  <td className="px-4 py-4 text-gray-700">{selectedMatrix.low}</td>
                  <td className="px-4 py-4 text-gray-700">{selectedMatrix.moderate}</td>
                  <td className="px-4 py-4 text-gray-700">{selectedMatrix.high}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
