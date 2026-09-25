import type { ReactNode } from 'react';

import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

interface KpiCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
}));

export function KpiCard({ label, value, icon }: KpiCardProps) {
  const ariaLabel = `${label}: ${value}`;
  return (
    <Card aria-label={ariaLabel} elevation={1} role="group">
      {icon}
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
      <Typography component="p" variant="h5">
        {value}
      </Typography>
    </Card>
  );
}
