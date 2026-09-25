import type { Engagement, EngagementFilters } from '@/types/engagement';
import { API_ENDPOINTS } from '@/constants/api-endpoints';

function apiBaseUrl(): string | undefined {
  const url = import.meta.env.VITE_API_URL as string | undefined;
  return url?.replace(/\/$/, '') || undefined;
}

function shouldUseLiveHttpApi(): boolean {
  return Boolean(apiBaseUrl());
}

export function applyEngagementFilters(
  engagements: Engagement[],
  filters: EngagementFilters,
): Engagement[] {
  return engagements.filter(engagement => {
    if (
      filters.status &&
      filters.status !== 'all' &&
      engagement.status !== filters.status
    ) {
      return false;
    }
    if (filters.search) {
      const needle = filters.search.trim().toLowerCase();
      if (needle && !engagement.clientName.toLowerCase().includes(needle)) {
        return false;
      }
    }
    return true;
  });
}

async function loadAllEngagements(): Promise<Engagement[]> {
  if (shouldUseLiveHttpApi()) {
    const base = apiBaseUrl()!;
    const res = await fetch(`${base}${API_ENDPOINTS.engagements}`);
    if (!res.ok) throw new Error('Failed to fetch engagements');
    return res.json() as Promise<Engagement[]>;
  }

  const res = await fetch(API_ENDPOINTS.staticDb);
  if (!res.ok) throw new Error('Failed to fetch engagements');
  const data = (await res.json()) as { engagements: Engagement[] };
  return data.engagements;
}

export async function fetchEngagements(
  filters: EngagementFilters,
): Promise<Engagement[]> {
  const all = await loadAllEngagements();
  return applyEngagementFilters(all, filters);
}

export async function fetchEngagementById(id: string): Promise<Engagement> {
  if (shouldUseLiveHttpApi()) {
    const base = apiBaseUrl()!;
    const res = await fetch(`${base}${API_ENDPOINTS.engagements}/${id}`);
    if (!res.ok) throw new Error('Engagement not found');
    return res.json() as Promise<Engagement>;
  }

  const all = await loadAllEngagements();
  const found = all.find(e => e.id === id);
  if (!found) throw new Error('Engagement not found');
  return found;
}
