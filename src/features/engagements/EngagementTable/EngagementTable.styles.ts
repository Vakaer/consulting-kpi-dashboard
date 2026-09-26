import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import { Link } from '@tanstack/react-router';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';

export const ClickableRow = styled(TableRow)({
  cursor: 'pointer',
});

export const MonoCell = styled(TableCell)({
  fontFamily: '"IBM Plex Mono", "Source Sans 3", monospace',
});

export const ClientCell = styled(TableCell)({
  fontWeight: 600,
});

export const ClientLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  fontWeight: 600,
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
})) as typeof Link;
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
