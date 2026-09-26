import { Link } from '@tanstack/react-router';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

export const BackLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  '&:hover': { textDecoration: 'underline' },
}));

export const MetaRow = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  paddingBottom: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const MetaFigure = styled(Typography)(({ theme }) => ({
  fontFamily: '"IBM Plex Mono", "Source Sans 3", monospace',
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
})) as typeof Typography;
