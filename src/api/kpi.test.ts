import { describe, expect, it } from 'vitest';

import type { Engagement } from '@/types/engagement';
import { computeDashboardKpis } from '@/api/kpi';

const list: Engagement[] = [
  {
    actuals: 0,
    budget: 100,
    clientName: 'A',
    endDate: '2026-01-01',
    hoursLogged: 0,
    id: '1',
    percentComplete: 40,
    startDate: '2026-01-01',
    status: 'active',
    timeline: [],
  },
  {
    actuals: 0,
    budget: 200,
    clientName: 'B',
    endDate: '2026-01-01',
    hoursLogged: 0,
    id: '2',
    percentComplete: 60,
    startDate: '2026-01-01',
    status: 'at_risk',
    timeline: [],
  },
];

describe('computeDashboardKpis', () => {
  it('computes totals from the list', () => {
    expect(computeDashboardKpis(list)).toEqual({
      atRiskCount: 1,
      avgPercentComplete: 50,
      totalActive: 1,
      totalBudget: 300,
    });
  });
});
