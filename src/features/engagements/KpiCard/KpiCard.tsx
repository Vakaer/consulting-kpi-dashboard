import type { ReactNode } from 'react';

import Typography from '@mui/material/Typography';

import { Cell, Value } from './KpiCard.styles';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  /** Warm accent for the risk cell only */
  emphasize?: boolean;
}

export function KpiCard({ label, value, icon, emphasize }: KpiCardProps) {
  const ariaLabel = `${label}: ${value}`;
  return (
    <Cell aria-label={ariaLabel} emphasize={emphasize} role="group">
      {icon}
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
      <Value>{value}</Value>
    </Cell>
  );
}
