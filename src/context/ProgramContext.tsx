'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';

export interface Program {
  id: string;
  slug: string;
  name: string;
  tier: string;
  description: string | null;
  sort_order: number;
}

interface ProgramContextType {
  programs: Program[];
  selectedProgram: Program | null;
  selectedSlug: string;
  setSelectedSlug: (slug: string) => void;
  loading: boolean;
}

const ProgramContext = createContext<ProgramContextType>({
  programs: [],
  selectedProgram: null,
  selectedSlug: 'fellowship',
  setSelectedSlug: () => {},
  loading: true,
});

export function ProgramProvider({ children }: { children: ReactNode }) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [selectedSlug, setSelectedSlug] = useState('fellowship');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrograms() {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .order('sort_order');

      if (!error && data) {
        setPrograms(data);
      }
      setLoading(false);
    }
    fetchPrograms();
  }, []);

  const selectedProgram = programs.find((p) => p.slug === selectedSlug) || null;

  return (
    <ProgramContext.Provider
      value={{ programs, selectedProgram, selectedSlug, setSelectedSlug, loading }}
    >
      {children}
    </ProgramContext.Provider>
  );
}

export function useProgram() {
  return useContext(ProgramContext);
}
