'use client';

import { useProgram } from '@/context/ProgramContext';

const programColors: Record<string, string> = {
  residency: 'bg-emerald-600',
  certification: 'bg-amber-600',
  fellowship: 'bg-blue-600',
  cbp_library: 'bg-purple-600',
};

export default function ProgramSelector() {
  const { programs, selectedSlug, setSelectedSlug, loading } = useProgram();

  if (loading) {
    return (
      <div className="px-4 py-3">
        <div className="h-8 bg-blue-800 rounded animate-pulse" />
      </div>
    );
  }

  // Only show selectable programs (not cbp_library for now)
  const selectablePrograms = programs.filter((p) => p.slug !== 'cbp_library');

  return (
    <div className="px-4 py-3 space-y-2">
      <label className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
        Program
      </label>
      <div className="space-y-1">
        {selectablePrograms.map((program) => (
          <button
            key={program.slug}
            onClick={() => setSelectedSlug(program.slug)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedSlug === program.slug
                ? `${programColors[program.slug] || 'bg-blue-600'} text-white shadow-md`
                : 'text-blue-200 hover:bg-blue-900/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  selectedSlug === program.slug
                    ? 'bg-white'
                    : programColors[program.slug] || 'bg-blue-400'
                }`}
              />
              {program.name}
            </div>
            {program.slug === 'certification' && (
              <span className="text-xs opacity-60 ml-4">Coming Soon</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
