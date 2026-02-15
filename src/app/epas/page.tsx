'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EPAS, getCompetenciesForEPA } from '@/data/framework';

export default function EPAsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEPAs = EPAS.filter((epa) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      epa.title.toLowerCase().includes(searchLower) ||
      epa.shortTitle.toLowerCase().includes(searchLower) ||
      epa.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-[#1F3864]">EPA Explorer</h1>
        <p className="text-gray-700">
          Browse all 10 Essential Professional Activities for the NAIOMT fellowship program
        </p>
      </section>

      {/* Search Bar */}
      <section>
        <input
          type="text"
          placeholder="Search EPAs by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E75B6] bg-white"
        />
      </section>

      {/* EPA Cards Grid */}
      <section>
        {filteredEPAs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredEPAs.map((epa) => {
              const primaryComps = getCompetenciesForEPA(epa.id, 'P');
              const supportingComps = getCompetenciesForEPA(epa.id, 'S');

              return (
                <Link
                  key={epa.id}
                  href={`/epas/${epa.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden hover:border-[#2E75B6] border-2 border-transparent"
                >
                  <div className="bg-gradient-to-r from-[#1F3864] to-[#2E75B6] p-6">
                    <div className="text-sm font-semibold text-blue-100">EPA {epa.id}</div>
                    <h3 className="text-xl font-bold text-white mt-2">{epa.shortTitle}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {epa.description.substring(0, 100)}...
                    </p>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1F3864]">{primaryComps.length}</span>
                        <span className="text-gray-600">Primary</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1F3864]">{supportingComps.length}</span>
                        <span className="text-gray-600">Supporting</span>
                      </div>
                    </div>
                    <div className="text-[#2E75B6] text-sm font-medium">
                      View Details →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">No EPAs found matching "{searchTerm}"</p>
          </div>
        )}
      </section>
    </div>
  );
}
