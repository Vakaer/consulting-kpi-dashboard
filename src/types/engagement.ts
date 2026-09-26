export type EngagementStatus = 'active' | 'at_risk' | 'completed';

export interface TimelineEvent {
  date: string;
  milestone: string;
  complete: boolean;
}

export interface Engagement {
  id: string;
  clientName: string;
  status: EngagementStatus;
  budget: number;
  actuals: number;
  hoursLogged: number;
  percentComplete: number;
  startDate: string;
  endDate: string;
  timeline: TimelineEvent[];
}

export interface EngagementFilters {
  status?: EngagementStatus | 'all';
  search?: string;
}

export interface DashboardKpis {
  totalActive: number;
  totalBudget: number;
  atRiskCount: number;
  avgPercentComplete: number;
}
