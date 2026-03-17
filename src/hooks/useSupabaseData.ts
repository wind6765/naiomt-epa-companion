'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useProgram } from '@/context/ProgramContext';

// ── Types ──────────────────────────────────────────────

export interface Domain {
  id: string;
  code: string;
  name: string;
  description: string | null;
  program_id: string;
  sort_order: number;
}

export interface Competency {
  id: string;
  code: string;
  title: string;
  description: string | null;
  domain_id: string;
  program_id: string;
  sort_order: number;
}

export interface EPA {
  id: string;
  number: number;
  title: string;
  description: string | null;
  observable_elements: string | null;
}

export interface EPACompetencyMap {
  id: string;
  epa_id: string;
  competency_id: string;
  relationship: 'primary' | 'supporting';
}

export interface Course {
  id: string;
  code: string;
  title: string;
  pathway: string | null;
  region: string | null;
  contact_hours: number | null;
  delivery_mode: string | null;
  status: string;
}

export interface CourseProgram {
  id: string;
  course_id: string;
  program_id: string;
  verified: boolean;
}

export interface CourseCompetencyMap {
  id: string;
  course_id: string;
  competency_id: string;
  coverage_level: string | null;
  program_id: string | null;
}

export interface DataFreshness {
  timestamp: string;
}

// ── Hook: useEPAs ──────────────────────────────────────

export function useEPAs() {
  const [epas, setEpas] = useState<EPA[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('epas')
        .select('*')
        .order('number');
      if (data) setEpas(data);
      setLoading(false);
    }
    fetch();
  }, []);

  return { epas, loading };
}

// ── Hook: useDomains (program-scoped) ──────────────────

export function useDomains() {
  const { selectedProgram } = useProgram();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      if (!selectedProgram) {
        setDomains([]);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('competency_domains')
        .select('*')
        .eq('program_id', selectedProgram.id)
        .order('sort_order');
      if (data) setDomains(data);
      setLoading(false);
    }
    fetch();
  }, [selectedProgram]);

  return { domains, loading };
}

// ── Hook: useCompetencies (program-scoped) ─────────────

export function useCompetencies() {
  const { selectedProgram } = useProgram();
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      if (!selectedProgram) {
        setCompetencies([]);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('competencies')
        .select('*')
        .eq('program_id', selectedProgram.id)
        .order('sort_order');
      if (data) setCompetencies(data);
      setLoading(false);
    }
    fetch();
  }, [selectedProgram]);

  return { competencies, loading };
}

// ── Hook: useEPACompetencyMaps ─────────────────────────

export function useEPACompetencyMaps() {
  const [maps, setMaps] = useState<EPACompetencyMap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from('epa_competency_map')
        .select('*');
      if (data) setMaps(data);
      setLoading(false);
    }
    fetch();
  }, []);

  return { maps, loading };
}

// ── Hook: useCourses (program-scoped via course_programs) ──

export function useCourses() {
  const { selectedProgram } = useProgram();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      if (!selectedProgram) {
        setCourses([]);
        setLoading(false);
        return;
      }

      // Get course IDs for this program
      const { data: cpData } = await supabase
        .from('course_programs')
        .select('course_id')
        .eq('program_id', selectedProgram.id);

      if (!cpData || cpData.length === 0) {
        setCourses([]);
        setLoading(false);
        return;
      }

      const courseIds = cpData.map((cp) => cp.course_id);
      const { data } = await supabase
        .from('courses')
        .select('*')
        .in('id', courseIds)
        .eq('status', 'active')
        .order('sort_order');

      if (data) setCourses(data);
      setLoading(false);
    }
    fetch();
  }, [selectedProgram]);

  return { courses, loading };
}

// ── Hook: useCourseCompetencyMaps (program-scoped) ─────

export function useCourseCompetencyMaps() {
  const { selectedProgram } = useProgram();
  const [maps, setMaps] = useState<CourseCompetencyMap[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      if (!selectedProgram) {
        setMaps([]);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from('course_competency_map')
        .select('*')
        .eq('program_id', selectedProgram.id);
      if (data) setMaps(data);
      setLoading(false);
    }
    fetch();
  }, [selectedProgram]);

  return { maps, loading };
}

// ── Hook: useEntrustmentScale (program-scoped) ─────────

export interface EntrustmentLevel {
  id: string;
  level: number;
  descriptor: string;
  meaning: string;
  program_id: string | null;
}

export function useEntrustmentLevels() {
  const { selectedProgram } = useProgram();
  const [levels, setLevels] = useState<EntrustmentLevel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      // Try program-specific levels first, fall back to generic
      let query = supabase
        .from('entrustment_levels')
        .select('*')
        .order('level');

      if (selectedProgram) {
        query = query.eq('program_id', selectedProgram.id);
      }

      const { data } = await query;

      // If no program-specific levels, try without filter
      if (!data || data.length === 0) {
        const { data: fallback } = await supabase
          .from('entrustment_levels')
          .select('*')
          .is('program_id', null)
          .order('level');
        if (fallback) setLevels(fallback);
      } else {
        setLevels(data);
      }
      setLoading(false);
    }
    fetch();
  }, [selectedProgram]);

  return { levels, loading };
}

// ── Hook: useDataFreshness ─────────────────────────────

export function useDataFreshness() {
  const [timestamp, setTimestamp] = useState<string>('');

  useEffect(() => {
    setTimestamp(new Date().toISOString());
  }, []);

  return { timestamp };
}
