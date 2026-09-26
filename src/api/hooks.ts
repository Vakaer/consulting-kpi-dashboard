import { useQuery } from '@tanstack/react-query';

import { fetchEngagementById, fetchEngagements } from '@/api/engagements';
import { QUERY_KEYS } from '@/constants/query-keys';

export function useEngagements() {
  return useQuery({
    queryFn: () => fetchEngagements({ status: 'all' }),
    queryKey: QUERY_KEYS.engagements,
  });
}

export function useEngagement(id: string) {
  return useQuery({
    enabled: Boolean(id),
    queryFn: () => fetchEngagementById(id),
    queryKey: QUERY_KEYS.engagement(id),
  });
}
