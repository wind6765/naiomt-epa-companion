'use client';

import { useMemo, useState } from 'react';
import { useProgram } from '@/context/ProgramContext';
import { useCompetencies, useCourses, useCourseCompetencyMaps } from '@/hooks/useSupabaseData';

export default function CourseCoveragePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { selectedProgram, selectedSlug } = useProgram();
  const { competencies, loading: compsLoading } = useCompetencies();
  const { courses, loading: coursesLoading } = useCourses();
  const { maps } = useCourseCompetencyMaps();

  // Build coverage matrix: which courses cover which competencies
  const coverageMatrix = useMemo(() => {
    const matrix: Record<string, Set<string>> = {};
    for (const map of maps) {
      if (!matrix[map.competency_id]) {
        matrix[map.competency_id] = new Set();
      }
      matrix[map.competency_id].add(map.course_id);
    }
    return matrix;
  }, [maps]);

  const filteredCourses = useMemo(() => {
    if (!searchTerm) return courses;
    const lower = searchTerm.toLowerCase();
    return courses.filter(
      (c) =>
        (c.title || '').toLowerCase().includes(lower) ||
        (c.code || '').toLowerCase().includes(lower)
    );
  }, [courses, searchTerm]);

  const loading = compsLoading || coursesLoading;

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-1/3" />
          <div className="h-64 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  if (selectedSlug === 'certification' && competencies.length === 0) {
    return (
      <div className="p-8 space-y-8">
        <h1 className="text-4xl font-bold text-[#1F3864]">Course Coverage</h1>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 text-center">
          <h3 className="text-lg font-bold text-amber-800">Coming Soon</h3>
          <p className="text-amber-700 mt-2 text-sm">
            Course coverage mapping will be available once certification competencies are defined.
          </p>
        </div>
      </div>
    );
  }

  // Coverage stats
  const coveredComps = competencies.filter((c) => (coverageMatrix[c.id]?.size || 0) > 0);
  const coveragePercent = competencies.length > 0
    ? Math.round((coveredComps.length / competencies.length) * 100)
    : 0;

  return (
    <div className="p-8 space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-[#1F3864]">Course Coverage</h1>
        <p className="text-gray-700">
          Competency × course matrix for the {selectedProgram?.name} program
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-[#2E75B6]">{courses.length}</div>
          <div className="text-xs text-gray-600 mt-1">Courses</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-[#2E75B6]">{competencies.length}</div>
          <div className="text-xs text-gray-600 mt-1">Competencies</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-[#2E75B6]">{coveredComps.length}</div>
          <div className="text-xs text-gray-600 mt-1">Covered</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className={`text-2xl font-bold ${coveragePercent >= 80 ? 'text-green-600' : coveragePercent >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
            {coveragePercent}%
          </div>
          <div className="text-xs text-gray-600 mt-1">Coverage</div>
        </div>
      </section>

      {/* Search */}
      <section>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2E75B6] bg-white"
        />
      </section>

      {/* Course List with Competency Coverage */}
      <section className="space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const coveredCompIds = new Set(
              maps.filter((m) => m.course_id === course.id).map((m) => m.competency_id)
            );
            const coveredCount = competencies.filter((c) => coveredCompIds.has(c.id)).length;

            return (
              <div key={course.id} className="bg-white rounded-lg shadow p-6 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-semibold text-[#2E75B6]">{course.code}</div>
                    <h3 className="font-bold text-[#1F3864]">{course.title}</h3>
                    <div className="flex gap-3 mt-1 text-xs text-gray-500">
                      {course.pathway && <span>{course.pathway}</span>}
                      {course.region && <span>{course.region}</span>}
                      {course.contact_hours && <span>{course.contact_hours}h</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#2E75B6]">{coveredCount}</div>
                    <div className="text-xs text-gray-500">competencies</div>
                  </div>
                </div>

                {/* Competency coverage chips */}
                {coveredCount > 0 && (
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-gray-100">
                    {competencies.map((comp) => (
                      <span
                        key={comp.id}
                        className={`text-xs px-2 py-0.5 rounded ${
                          coveredCompIds.has(comp.id)
                            ? 'bg-[#1F3864] text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}
                      >
                        {comp.code}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600">
              {courses.length === 0
                ? 'No courses are tagged to this program yet.'
                : `No courses matching "${searchTerm}"`}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
