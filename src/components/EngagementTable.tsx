import TableContainer from '@mui/material/TableContainer';
import { useNavigate } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

import { StatusBadge } from '@/components/StatusBadge';
import type { Engagement } from '@/types/engagement';

interface EngagementTableProps {
  engagements: Engagement[];
}

const ClickableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2,
  },
}));

function formatCurrency(n: number) {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

export function EngagementTable({ engagements }: EngagementTableProps) {
  const navigate = useNavigate();

  if (engagements.length === 0) {
    return (
      <Typography color="text.secondary" role="status">
        No engagements match your filters.
      </Typography>
    );
  }

  const openDetail = (id: string) => {
    void navigate({ params: { id }, to: '/engagements/$id' });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Engagements">
        <TableHead>
          <TableRow>
            <TableCell component="th" scope="col">
              Client
            </TableCell>
            <TableCell component="th" scope="col">
              Status
            </TableCell>
            <TableCell align="right" component="th" scope="col">
              Budget
            </TableCell>
            <TableCell align="right" component="th" scope="col">
              Actuals
            </TableCell>
            <TableCell align="right" component="th" scope="col">
              % Complete
            </TableCell>
            <TableCell component="th" scope="col">
              Start
            </TableCell>
            <TableCell component="th" scope="col">
              End
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {engagements.map(e => (
            <ClickableRow
              aria-label={`Open ${e.clientName}`}
              hover
              key={e.id}
              onClick={() => openDetail(e.id)}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openDetail(e.id);
                }
              }}
              role="link"
              tabIndex={0}
            >
              <TableCell>{e.clientName}</TableCell>
              <TableCell>
                <StatusBadge status={e.status} />
              </TableCell>
              <TableCell align="right">{formatCurrency(e.budget)}</TableCell>
              <TableCell align="right">{formatCurrency(e.actuals)}</TableCell>
              <TableCell align="right">{e.percentComplete}%</TableCell>
              <TableCell>{e.startDate}</TableCell>
              <TableCell>{e.endDate}</TableCell>
            </ClickableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
