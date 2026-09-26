import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const Cell = styled(Box, {
  shouldForwardProp: prop => prop !== 'emphasize',
})<{ emphasize?: boolean }>(({ theme, emphasize }) => ({
  padding: theme.spacing(2, 2.5),
  height: '100%',
  minHeight: 88,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(0.5),
  borderRight: `1px solid ${theme.palette.divider}`,
  backgroundColor: emphasize
    ? alpha(theme.palette.secondary.main, 0.06)
    : 'transparent',
  '&:last-child': {
    borderRight: 'none',
  },
  [theme.breakpoints.down('sm')]: {
    borderRight: 'none',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:nth-of-type(odd)': {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    '&:nth-last-child(-n+2)': {
      borderBottom: 'none',
    },
  },
}));

export const Value = styled('p')(({ theme }) => ({
  margin: 0,
  fontFamily: '"IBM Plex Mono", "Source Sans 3", monospace',
  fontWeight: 500,
  fontSize: '1.5rem',
  lineHeight: 1.2,
  letterSpacing: '-0.03em',
  color: theme.palette.text.primary,
}));
