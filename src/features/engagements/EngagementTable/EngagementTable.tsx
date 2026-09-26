import { useNavigate } from '@tanstack/react-router';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';

import {
  ClickableRow,
  ClientCell,
  ClientLink,
  EmptyState,
  MonoCell,
  ScrollPaper,
  WideTable,
} from './EngagementTable.styles';
import { formatCurrency } from '@/utils/format-currency';
import { StatusBadge } from '@/components/StatusBadge';
import type { Engagement } from '@/types/engagement';

interface EngagementTableProps {
  engagements: Engagement[];
}

export function EngagementTable({ engagements }: EngagementTableProps) {
  const navigate = useNavigate();

  if (engagements.length === 0) {
    return (
      <EmptyState role="status">No engagements match your filters.</EmptyState>
    );
  }

  const openDetail = (id: string) => {
    void navigate({ params: { id }, to: '/engagements/$id' });
  };

  return (
    <ScrollPaper variant="outlined">
      <WideTable aria-label="Engagements" size="small">
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
            <ClickableRow hover key={e.id} onClick={() => openDetail(e.id)}>
              <ClientCell>
                <ClientLink
                  aria-label={`Open ${e.clientName}`}
                  onClick={event => event.stopPropagation()}
                  params={{ id: e.id }}
                  to="/engagements/$id"
                >
                  {e.clientName}
                </ClientLink>
              </ClientCell>
              <TableCell>
                <StatusBadge status={e.status} />
              </TableCell>
              <MonoCell align="right">{formatCurrency(e.budget)}</MonoCell>
              <MonoCell align="right">{formatCurrency(e.actuals)}</MonoCell>
              <MonoCell align="right">{e.percentComplete}%</MonoCell>
              <TableCell>{e.startDate}</TableCell>
              <TableCell>{e.endDate}</TableCell>
            </ClickableRow>
          ))}
        </TableBody>
      </WideTable>
    </ScrollPaper>
  );
}
