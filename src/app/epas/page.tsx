'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useProgram } from '@/context/ProgramContext';
import { useEPAs, useCompetencies, useEPACompetencyMaps } from '@/hooks/useSupabaseData';

export default function EPAsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProgram } = useProgram();
  const { epas, loading: epasLoading } = useEPAs();
  const { competencies } = useCompetencies();
  const { maps } = useEPACompetencyMaps();

  const programCompIds = useMemo(
    () => new Set(competencies.map((c) => c.id)),
    [competencies]
  );

  const filteredEPAs = useMemo(() => {
    return epas.filter((epa) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        (epa.title || '').toLowerCase().includes(searchLower) ||
        (epa.description || '').toLowerCase().includes(searchLower)
      );
    });
  }, [epas, searchTerm]);

  const getCompCountsForEPA = (epaId: string) => {
    const epaLinks = maps.filter((m) => m.epa_id === epaId && programCompIds.has(m.competency_id));
    return {
      primary: epaLinks.filter((m) => m.relationship === 'primary').length,
      supporting: epaLinks.filter((m) => m.relationship === 'supporting').length,
    };
  };

  if (epasLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/3" />
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-[#1F3864]">EPA Explorer</h1>
        <p className="text-gray-700">
          Browse all {epas.length} Essential Professional Activities for the NAIOMT{' '}
          {selectedProgram?.name || ''} program
        </p>
      </section>

      <section>
        <input
          type="text"
          placeholder="Search EPAs by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E75B6] bg-white"
        />
      </section>

      <section>
        {filteredEPAs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredEPAs.map((epa) => {
              const counts = getCompCountsForEPA(epa.id);
              return (
                <Link
                  key={epa.id}
                  href={`/epas/${epa.number}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden hover:border-[#2E75B6] border-2 border-transparent"
                >
                  <div className="bg-gradient-to-r from-[#1F3864] to-[#2E75B6] p-6">
                    <div className="text-sm font-semibold text-blue-100">EPA {epa.number}</div>
                    <h3 className="text-xl font-bold text-white mt-2">{epa.title}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {(epa.description || '').substring(0, 120)}...
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1F3864]">{counts.primary}</span>
                        <span className="text-gray-600">Primary</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1F3864]">{counts.supporting}</span>
                        <span className="text-gray-600">Supporting</span>
                      </div>
                    </div>
                    <div className="text-[#2E75B6] text-sm font-medium">View Details →</div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">No EPAs found matching &quot;{searchTerm}&quot;</p>
          </div>
        )}
      </section>
    </div>
  );
}
