'use client';

import { useMemo } from 'react';
import { useProgram } from '@/context/ProgramContext';
import { useDomains, useCompetencies } from '@/hooks/useSupabaseData';

const domainAccentColors = [
  'border-l-blue-500',
  'border-l-green-500',
  'border-l-purple-500',
  'border-l-orange-500',
  'border-l-pink-500',
  'border-l-red-500',
  'border-l-teal-500',
  'border-l-indigo-500',
];

export default function DomainsPage() {
  const { selectedProgram, selectedSlug } = useProgram();
  const { domains, loading: domainsLoading } = useDomains();
  const { competencies } = useCompetencies();

  const domainWithComps = useMemo(() => {
    return domains.map((domain, idx) => ({
      ...domain,
      competencies: competencies
        .filter((c) => c.domain_id === domain.id)
        .sort((a, b) => a.sort_order - b.sort_order),
      colorIdx: idx,
    }));
  }, [domains, competencies]);

  const isCertification = selectedSlug === 'certification';

  if (domainsLoading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/3" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (isCertification && domains.length === 0) {
    return (
      <div className="p-8 space-y-8">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold text-[#1F3864]">Knowledge Domains</h1>
        </section>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-bold text-amber-800">Coming Soon</h3>
          <p className="text-amber-700 mt-2 text-sm">
            Certification domain structure is currently in development.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-[#1F3864]">Knowledge Domains</h1>
        <p className="text-gray-700">
          {domains.length} domains for the {selectedProgram?.name} program, containing{' '}
          {competencies.length} competencies
        </p>
      </section>

      <section className="space-y-6">
        {domainWithComps.map((domain) => (
          <div
            key={domain.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${
              domainAccentColors[domain.colorIdx % domainAccentColors.length]
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#2E75B6] uppercase tracking-wider">
                    {domain.code}
                  </div>
                  <h2 className="text-xl font-bold text-[#1F3864] mt-1">{domain.name}</h2>
                  {domain.description && (
                    <p className="text-gray-600 text-sm mt-2">{domain.description}</p>
                  )}
                </div>
                <div className="bg-[#1F3864] text-white rounded-full px-3 py-1 text-sm font-bold">
                  {domain.competencies.length}
                </div>
              </div>

              {domain.competencies.length > 0 && (
                <div className="mt-4 space-y-2">
                  {domain.competencies.map((comp) => (
                    <div
                      key={comp.id}
                      className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg"
                    >
                      <span className="text-xs font-bold text-[#2E75B6] bg-blue-50 px-2 py-1 rounded min-w-[48px] text-center">
                        {comp.code}
                      </span>
                      <span className="text-sm text-gray-700">{comp.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
