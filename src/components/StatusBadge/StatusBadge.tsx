import Chip from '@mui/material/Chip';
import type { ChipProps } from '@mui/material/Chip';

import { AtRiskChip } from './StatusBadge.styles';
import type { EngagementStatus } from '@/types/engagement';

const LABELS: Record<EngagementStatus, string> = {
  active: 'Active',
  at_risk: 'At Risk',
  completed: 'Completed',
};

const CHIP_PROPS: Record<
  Exclude<EngagementStatus, 'at_risk'>,
  Pick<ChipProps, 'color' | 'variant'>
> = {
  active: { color: 'success', variant: 'outlined' },
  completed: { variant: 'outlined' },
};

interface StatusBadgeProps {
  status: EngagementStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === 'at_risk') {
    return <AtRiskChip label={LABELS[status]} size="small" variant="filled" />;
  }

  return (
    <Chip label={LABELS[status]} size="small" {...CHIP_PROPS[status]} />
  );
}
