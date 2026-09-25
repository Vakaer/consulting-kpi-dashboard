import { useQuery } from '@tanstack/react-query';

import { fetchEngagementById, fetchEngagements } from '@/api/engagements';
import type { EngagementFilters } from '@/types/engagement';
import { QUERY_KEYS } from '@/constants/query-keys';

export function useEngagements(filters: EngagementFilters) {
  return useQuery({
    queryFn: () => fetchEngagements(filters),
    queryKey: QUERY_KEYS.engagements(filters),
  });
}

export function useEngagement(id: string) {
  return useQuery({
    enabled: Boolean(id),
    queryFn: () => fetchEngagementById(id),
    queryKey: QUERY_KEYS.engagement(id),
  });
}
