import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import { APP_BAR_HEIGHT } from '@/constants/layout';

export const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

export const BrandBar = styled(AppBar)({
  zIndex: 1100,
});

export const BrandToolbar = styled(Toolbar)(({ theme }) => ({
  paddingInline: theme.spacing(2),
  minHeight: APP_BAR_HEIGHT,
  height: APP_BAR_HEIGHT,
}));

export const BrandTitle = styled(Typography)({
  flexGrow: 1,
  fontWeight: 600,
  fontSize: '0.95rem',
}) as typeof Typography;

export const BrandMark = styled('span')(({ theme }) => ({
  display: 'inline-block',
  width: 8,
  height: 8,
  marginRight: theme.spacing(1.25),
  backgroundColor: theme.palette.primary.main,
  verticalAlign: 'middle',
}));

export const Main = styled('main')(({ theme }) => ({
  flex: 1,
  width: '100%',
  maxWidth: theme.breakpoints.values.lg,
  marginInline: 'auto',
  paddingInline: theme.spacing(2),
  paddingBlock: theme.spacing(3),
  boxSizing: 'border-box',
}));
