'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { COMPETENCIES, DOMAINS, EPAS } from '@/data/framework';

export default function CompetenciesPage() {
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompetencies = useMemo(() => {
    return COMPETENCIES.filter((comp) => {
      const matchesDomain = !selectedDomain || comp.domains.includes(selectedDomain);
      const matchesSearch = !searchTerm ||
        comp.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.id.toString().includes(searchTerm);
      return matchesDomain && matchesSearch;
    });
  }, [selectedDomain, searchTerm]);

  const getDomainColor = (domain: string) => {
    const colors: Record<string, string> = {
      'Knowledge for Practice': 'bg-blue-100 text-blue-800',
      'Patient/Client Care and Services': 'bg-green-100 text-green-800',
      'Practice Management': 'bg-purple-100 text-purple-800',
      'Teaching and Learning': 'bg-orange-100 text-orange-800',
      'Communication and Collaboration': 'bg-pink-100 text-pink-800',
      'Professionalism': 'bg-red-100 text-red-800',
      'Stewards of Societal Health': 'bg-teal-100 text-teal-800',
    };
    return colors[domain] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-[#1F3864]">Competency Browser</h1>
        <p className="text-gray-700">
          Explore all 33 core competencies mapped across EPAs and domains
        </p>
      </section>

      {/* Filters */}
      <section className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Domain Filter */}
          <div>
            <label className="block text-sm font-medium text-[#1F3864] mb-2">
              Filter by Domain
            </label>
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E75B6]"
            >
              <option value="">All Domains</option>
              {DOMAINS.map((domain) => (
                <option key={domain.name} value={domain.name}>
                  {domain.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-sm font-medium text-[#1F3864] mb-2">
              Search Competencies
            </label>
            <input
              type="text"
              placeholder="Search by C# or keyword..."
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
          filteredCompetencies.map((comp) => (
            <div key={comp.id} className="bg-white rounded-lg shadow p-6 space-y-3 hover:shadow-md transition-shadow">
              {/* Competency Header */}
              <div className="flex items-start gap-4">
                <div className="bg-[#1F3864] text-white rounded-lg px-4 py-2 font-bold text-lg w-16 text-center">
                  C{comp.id}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium text-base">{comp.text}</p>
                </div>
              </div>

              {/* Domain Tags */}
              <div className="flex flex-wrap gap-2">
                {comp.domains.map((domain) => (
                  <span
                    key={domain}
                    className={`text-xs font-medium px-3 py-1 rounded-full ${getDomainColor(domain)}`}
                  >
                    {domain}
                  </span>
                ))}
              </div>

              {/* EPA Mappings */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
                {comp.epaMappings.map((mapping) => {
                  const epa = EPAS.find((e) => e.id === mapping.epaId);
                  return (
                    <Link
                      key={`${comp.id}-${mapping.epaId}`}
                      href={`/epas/${mapping.epaId}`}
                      className={`text-xs font-semibold px-3 py-1 rounded-full transition-colors ${
                        mapping.role === 'P'
                          ? 'bg-[#1F3864] text-white hover:bg-blue-700'
                          : 'bg-[#D6E4F0] text-[#1F3864] hover:bg-blue-200'
                      }`}
                    >
                      {mapping.role === 'P' ? 'P' : 'S'}: EPA {epa?.id}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">No competencies found matching your filters</p>
          </div>
        )}
      </section>

      {/* Summary */}
      <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
        <p className="text-gray-700 text-sm">
          Showing {filteredCompetencies.length} of {COMPETENCIES.length} competencies
        </p>
      </section>
    </div>
  );
}
