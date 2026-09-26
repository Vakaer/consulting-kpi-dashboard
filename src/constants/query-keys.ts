export const QUERY_KEYS = {
  engagement: (id: string) => ['engagement', id] as const,
  engagements: ['engagements'] as const,
} as const;
