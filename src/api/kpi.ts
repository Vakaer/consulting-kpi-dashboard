import type { DashboardKpis, Engagement } from '@/types/engagement';

export function computeDashboardKpis(engagements: Engagement[]): DashboardKpis {
  const totalActive = engagements.filter(e => e.status === 'active').length;
  const totalBudget = engagements.reduce((sum, e) => sum + e.budget, 0);
  const atRiskCount = engagements.filter(e => e.status === 'at_risk').length;
  const avgPercentComplete =
    engagements.length === 0
      ? 0
      : Math.round(
          engagements.reduce((sum, e) => sum + e.percentComplete, 0) /
            engagements.length,
        );

  return { atRiskCount, avgPercentComplete, totalActive, totalBudget };
}
