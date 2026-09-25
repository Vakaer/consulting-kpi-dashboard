import Chip from '@mui/material/Chip';

import type { EngagementStatus } from '@/types/engagement';

const LABELS: Record<EngagementStatus, string> = {
  active: 'Active',
  at_risk: 'At Risk',
  completed: 'Completed',
};

const COLORS: Record<EngagementStatus, 'success' | 'warning' | 'default'> = {
  active: 'success',
  at_risk: 'warning',
  completed: 'default',
};

interface StatusBadgeProps {
  status: EngagementStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Chip
      color={COLORS[status]}
      label={LABELS[status]}
      size="small"
      variant="filled"
    />
  );
}
