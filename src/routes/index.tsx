import { useMemo, useState } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import type { EngagementFilters as Filters } from '@/types/engagement';
import {
  ErrorAlert,
  KpiSkeletonCell,
  UpdatingLabel,
} from '@/routes/-index.styles';
import { EngagementFilters } from '@/features/engagements/EngagementFilters';
import { EngagementTable } from '@/features/engagements/EngagementTable';
import { applyEngagementFilters } from '@/api/engagements';
import { computeDashboardKpis } from '@/api/kpi';
import { KpiLedger } from '@/features/engagements/KpiLedger';
import { KpiCard } from '@/features/engagements/KpiCard';
import { useEngagements } from '@/api/hooks';
import { formatCurrency } from '@/utils/format-currency';

export const Route = createFileRoute('/')({
  component: DashboardPage,
});

function DashboardPage() {
  const [filters, setFilters] = useState<Filters>({ status: 'all' });
  const { data: allEngagements, error, isLoading, isFetching, refetch } =
    useEngagements();

  const data = useMemo(
    () => applyEngagementFilters(allEngagements ?? [], filters),
    [allEngagements, filters],
  );
  const kpis = useMemo(() => computeDashboardKpis(data), [data]);

  return (
    <Box>
      <Typography component="h1" gutterBottom variant="h4">
        Engagements
      </Typography>

      <EngagementFilters onChange={setFilters} value={filters} />

      {isLoading ? (
        <KpiLedger>
          {Array.from({ length: 4 }).map((_, i) => (
            <KpiSkeletonCell key={i}>
              <Skeleton height={14} width="40%" />
              <Skeleton height={28} sx={{ mt: 1 }} width="55%" />
            </KpiSkeletonCell>
          ))}
        </KpiLedger>
      ) : null}

      {error ? (
        <ErrorAlert
          action={
            <Button color="inherit" onClick={() => void refetch()} size="small">
              Retry
            </Button>
          }
          severity="error"
        >
          {error.message || 'Failed to load engagements'}
        </ErrorAlert>
      ) : null}

      {!isLoading && !error ? (
        <KpiLedger>
          <KpiCard label="Total Active" value={kpis.totalActive} />
          <KpiCard
            label="Total Budget"
            value={formatCurrency(kpis.totalBudget)}
          />
          <KpiCard emphasize label="At Risk" value={kpis.atRiskCount} />
          <KpiCard
            label="Avg % Complete"
            value={`${kpis.avgPercentComplete}%`}
          />
        </KpiLedger>
      ) : null}

      {isFetching && !isLoading ? (
        <UpdatingLabel variant="body2">Updating…</UpdatingLabel>
      ) : null}

      {!isLoading && !error ? (
        <EngagementTable engagements={data ?? []} />
      ) : null}
    </Box>
  );
}
