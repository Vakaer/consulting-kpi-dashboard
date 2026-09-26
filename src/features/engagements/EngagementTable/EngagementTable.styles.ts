import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

export const ClickableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: -2,
  },
}));

export const MonoCell = styled(TableCell)({
  fontFamily: '"IBM Plex Mono", "Source Sans 3", monospace',
});

export const ClientCell = styled(TableCell)({
  fontWeight: 600,
});

export const ScrollPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  overflowX: 'auto',
  WebkitOverflowScrolling: 'touch',
}));

export const WideTable = styled(Table)({
  minWidth: 720,
});

export const EmptyState = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.text.secondary,
  paddingBlock: theme.spacing(4),
}));
