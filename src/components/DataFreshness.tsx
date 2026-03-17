'use client';

import { useDataFreshness } from '@/hooks/useSupabaseData';

export default function DataFreshness() {
  const { timestamp } = useDataFreshness();

  if (!timestamp) return null;

  const formatted = new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  return (
    <div className="px-4 py-2 text-xs text-blue-300/60">
      Data synced: {formatted}
    </div>
  );
}
