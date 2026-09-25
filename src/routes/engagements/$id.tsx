import { Link, createFileRoute } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { TimelineChart } from '@/components/TimelineChart';
import { StatusBadge } from '@/components/StatusBadge';
import { BudgetChart } from '@/components/BudgetChart';
import { useEngagement } from '@/api/hooks';

export const Route = createFileRoute('/engagements/$id')({
  component: EngagementDetailPage,
});

const BackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 600,
  '&:hover': { textDecoration: 'underline' },
}));

const MetaRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

function formatCurrency(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

function EngagementDetailPage() {
  const { id } = Route.useParams();
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
      <Typography component="h1" gutterBottom sx={{ mt: 2 }} variant="h4">
        {data.clientName}
      </Typography>
      <MetaRow>
        <StatusBadge status={data.status} />
        <Typography variant="body2">
          Budget {formatCurrency(data.budget)} · Actuals{' '}
          {formatCurrency(data.actuals)}
        </Typography>
        <Typography variant="body2">
          {data.percentComplete}% complete · {data.hoursLogged} hours
        </Typography>
        <Typography variant="body2">
          {data.startDate} → {data.endDate}
        </Typography>
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
