import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  applyEngagementFilters,
  fetchEngagementById,
  fetchEngagements,
} from '@/api/engagements';
import type { Engagement } from '@/types/engagement';

const sample: Engagement[] = [
  {
    actuals: 10,
    budget: 100,
    clientName: 'Northwind Retail Group',
    endDate: '2026-09-30',
    hoursLogged: 1,
    id: 'eng-001',
    percentComplete: 50,
    startDate: '2026-03-01',
    status: 'active',
    timeline: [],
  },
  {
    actuals: 20,
    budget: 200,
    clientName: 'Contoso Financial',
    endDate: '2026-08-15',
    hoursLogged: 2,
    id: 'eng-002',
    percentComplete: 70,
    startDate: '2026-01-15',
    status: 'at_risk',
    timeline: [],
  },
];

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('applyEngagementFilters', () => {
  it('filters by status active', () => {
    expect(applyEngagementFilters(sample, { status: 'active' })).toHaveLength(
      1,
    );
  });

  it('filters by partial client name case-insensitively', () => {
    expect(applyEngagementFilters(sample, { search: 'north' })[0]?.id).toBe(
      'eng-001',
    );
  });
});

describe('fetchEngagements', () => {
  it('returns filtered static data when VITE_API_URL is unset', async () => {
    vi.stubEnv('VITE_API_URL', '');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({ engagements: sample }),
        ok: true,
      }),
    );

    const result = await fetchEngagements({ status: 'active' });
    expect(result).toHaveLength(1);
    expect(result[0]?.clientName).toBe('Northwind Retail Group');
  });

  it('throws when response is not ok', async () => {
    vi.stubEnv('VITE_API_URL', '');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    await expect(fetchEngagements({})).rejects.toThrow(
      'Failed to fetch engagements',
    );
  });
});

describe('fetchEngagementById', () => {
  it('returns engagement from static db', async () => {
    vi.stubEnv('VITE_API_URL', '');
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: async () => ({ engagements: sample }),
        ok: true,
      }),
    );
    const eng = await fetchEngagementById('eng-002');
    expect(eng.clientName).toBe('Contoso Financial');
  });
});
