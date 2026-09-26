import { createFileRoute, useParams } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import {
  BackLink,
  MetaFigure,
  MetaRow,
  PageTitle,
} from '@/routes/engagements/-$id.styles';
import { TimelineChart } from '@/features/engagements/TimelineChart';
import { StatusBadge } from '@/components/StatusBadge';
import { BudgetChart } from '@/features/engagements/BudgetChart';
import { useEngagement } from '@/api/hooks';
import { formatCurrency } from '@/utils/format-currency';

export const Route = createFileRoute('/engagements/$id')({
  component: EngagementDetailPage,
});

function EngagementDetailPage() {
  const params = useParams({ strict: false });
  const id = typeof params.id === 'string' ? params.id : '';
  const { data, error, isLoading, refetch } = useEngagement(id);

  if (isLoading) {
    return (
      <Box>
        <Skeleton height={40} width={280} />
        <Skeleton height={24} sx={{ mt: 1 }} width={160} />
        <Skeleton height={320} sx={{ mt: 3 }} variant="rounded" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        action={
          <Button color="inherit" onClick={() => void refetch()} size="small">
            Retry
          </Button>
        }
        severity="error"
      >
        {error.message || 'Failed to load engagement'}
      </Alert>
    );
  }

  if (!data) {
    return (
      <Typography color="text.secondary" role="status">
        Engagement not found.
      </Typography>
    );
  }

  return (
    <Box>
      <BackLink to="/">← Back to dashboard</BackLink>
      <PageTitle component="h1" gutterBottom variant="h4">
        {data.clientName}
      </PageTitle>
      <MetaRow>
        <StatusBadge status={data.status} />
        <MetaFigure>
          Budget {formatCurrency(data.budget)} · Actuals{' '}
          {formatCurrency(data.actuals)}
        </MetaFigure>
        <MetaFigure>
          {data.percentComplete}% complete · {data.hoursLogged} hours
        </MetaFigure>
        <MetaFigure>
          {data.startDate} → {data.endDate}
        </MetaFigure>
      </MetaRow>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <BudgetChart actuals={data.actuals} budget={data.budget} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TimelineChart timeline={data.timeline} />
        </Grid>
      </Grid>
    </Box>
  );
}
