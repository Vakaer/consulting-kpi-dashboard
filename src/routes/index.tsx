import { useMemo, useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import type { EngagementFilters as Filters } from '@/types/engagement';
import { EngagementFilters } from '@/components/EngagementFilters';
import { EngagementTable } from '@/components/EngagementTable';
import { computeDashboardKpis } from '@/api/kpi';
import { KpiCard } from '@/components/KpiCard';
import { useEngagements } from '@/api/hooks';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function formatCurrency(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

function DashboardPage() {
  const [filters, setFilters] = useState<Filters>({ status: 'all' });
  const { data, error, isLoading, isFetching, refetch } =
    useEngagements(filters);

  const kpis = useMemo(() => computeDashboardKpis(data ?? []), [data]);

  return (
    <Box>
      <Typography component="h1" gutterBottom variant="h4">
        Engagements
      </Typography>

      <EngagementFilters onChange={setFilters} value={filters} />

      {isLoading ? (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
              <Skeleton height={96} variant="rounded" />
            </Grid>
          ))}
        </Grid>
      ) : null}

      {error ? (
        <Alert
          action={
            <Button color="inherit" onClick={() => void refetch()} size="small">
              Retry
            </Button>
          }
          severity="error"
          sx={{ mb: 2 }}
        >
          {error.message || 'Failed to load engagements'}
        </Alert>
      ) : null}

      {!isLoading && !error ? (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <KpiCard label="Total Active" value={kpis.totalActive} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <KpiCard
              label="Total Budget"
              value={formatCurrency(kpis.totalBudget)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <KpiCard label="At Risk" value={kpis.atRiskCount} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <KpiCard
              label="Avg % Complete"
              value={`${kpis.avgPercentComplete}%`}
            />
          </Grid>
        </Grid>
      ) : null}

      {isFetching && !isLoading ? (
        <Typography color="text.secondary" sx={{ mb: 1 }} variant="body2">
          Updating…
        </Typography>
      ) : null}

      {!isLoading && !error ? (
        <EngagementTable engagements={data ?? []} />
      ) : null}
    </Box>
  );
}
