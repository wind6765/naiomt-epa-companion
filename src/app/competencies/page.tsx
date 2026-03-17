'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useProgram } from '@/context/ProgramContext';
import { useCompetencies, useDomains, useEPAs, useEPACompetencyMaps } from '@/hooks/useSupabaseData';

const domainColors = [
  'bg-blue-100 text-blue-800',
  'bg-green-100 text-green-800',
  'bg-purple-100 text-purple-800',
  'bg-orange-100 text-orange-800',
  'bg-pink-100 text-pink-800',
  'bg-red-100 text-red-800',
  'bg-teal-100 text-teal-800',
  'bg-indigo-100 text-indigo-800',
];

export default function CompetenciesPage() {
  const [selectedDomainId, setSelectedDomainId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProgram, selectedSlug } = useProgram();
  const { competencies, loading: compsLoading } = useCompetencies();
  const { domains } = useDomains();
  const { epas } = useEPAs();
  const { maps } = useEPACompetencyMaps();

  const domainMap = useMemo(
    () => new Map(domains.map((d, i) => [d.id, { ...d, colorIdx: i }])),
    [domains]
  );

  const filteredCompetencies = useMemo(() => {
    return competencies.filter((comp) => {
      const matchesDomain = !selectedDomainId || comp.domain_id === selectedDomainId;
      const matchesSearch =
        !searchTerm ||
        (comp.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (comp.code || '').toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDomain && matchesSearch;
    });
  }, [competencies, selectedDomainId, searchTerm]);

  const isCertification = selectedSlug === 'certification';

  if (compsLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/3" />
          <div className="h-6 bg-gray-200 rounded w-2/3" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (isCertification && competencies.length === 0) {
    return (
      <div className="p-8 space-y-8">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold text-[#1F3864]">Competency Browser</h1>
          <p className="text-gray-700">Certification program competencies</p>
        </section>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-bold text-amber-800">Coming Soon</h3>
          <p className="text-amber-700 mt-2 text-sm">
            Certification domain and competency mapping is currently in development.
            Check back soon for the full competency structure.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-[#1F3864]">Competency Browser</h1>
        <p className="text-gray-700">
          Explore all {competencies.length} competencies for the {selectedProgram?.name} program,
          mapped across EPAs and {domains.length} domains
        </p>
      </section>

      {/* Filters */}
      <section className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1F3864] mb-2">
              Filter by Domain
            </label>
            <select
              value={selectedDomainId}
              onChange={(e) => setSelectedDomainId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E75B6]"
            >
              <option value="">All Domains</option>
              {domains.map((domain) => (
                <option key={domain.id} value={domain.id}>
                  {domain.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1F3864] mb-2">
              Search Competencies
            </label>
            <input
              type="text"
              placeholder="Search by code or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E75B6]"
            />
          </div>
        </div>
      </section>

      {/* Competencies List */}
      <section className="space-y-4">
        {filteredCompetencies.length > 0 ? (
          filteredCompetencies.map((comp) => {
            const domain = domainMap.get(comp.domain_id);
            const compMaps = maps.filter((m) => m.competency_id === comp.id);

            return (
              <div key={comp.id} className="bg-white rounded-lg shadow p-6 space-y-3 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-[#1F3864] text-white rounded-lg px-4 py-2 font-bold text-lg min-w-[64px] text-center">
                    {comp.code}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium text-base">{comp.title}</p>
                    {comp.description && (
                      <p className="text-gray-500 text-sm mt-1">{comp.description}</p>
                    )}
                  </div>
                </div>

                {/* Domain Tag */}
                {domain && (
                  <div className="flex flex-wrap gap-2">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${domainColors[domain.colorIdx % domainColors.length]}`}>
                      {domain.name}
                    </span>
                  </div>
                )}

                {/* EPA Mappings */}
                {compMaps.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
                    {compMaps.map((mapping) => {
                      const epa = epas.find((e) => e.id === mapping.epa_id);
                      if (!epa) return null;
                      return (
                        <Link
                          key={`${comp.id}-${mapping.epa_id}`}
                          href={`/epas/${epa.number}`}
                          className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                            mapping.relationship === 'primary'
                              ? 'bg-[#1F3864] text-white hover:bg-blue-700'
                              : 'bg-[#D6E4F0] text-[#1F3864] hover:bg-blue-200'
                          }`}
                        >
                          {mapping.relationship === 'primary' ? 'P' : 'S'}: EPA {epa.number}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">No competencies found matching your filters</p>
          </div>
        )}
      </section>

      <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <p className="text-gray-700 text-sm">
          Showing {filteredCompetencies.length} of {competencies.length} competencies
        </p>
      </section>
    </div>
  );
}
