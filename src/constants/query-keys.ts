import type { EngagementFilters } from '@/types/engagement';

export const QUERY_KEYS = {
  engagement: (id: string) => ['engagement', id] as const,
  engagements: (filters: EngagementFilters) =>
    ['engagements', filters] as const,
} as const;
