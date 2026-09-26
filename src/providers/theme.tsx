import type { ReactNode } from 'react';

import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const INK = '#0A1628';
const PAPER = '#F7F8FA';
const SURFACE = '#FFFFFF';
const RULE = '#D8DEE6';
const PRIMARY = '#0B3D5C';
const SIGNAL = '#B33B1E';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: PRIMARY, contrastText: '#FFFFFF' },
    secondary: { main: SIGNAL, contrastText: '#FFFFFF' },
    error: { main: SIGNAL },
    warning: { main: '#9A5B14' },
    success: { main: '#1B6B4A' },
    background: { default: PAPER, paper: SURFACE },
    text: { primary: INK, secondary: '#5A6575' },
    divider: RULE,
  },
  shape: { borderRadius: 2 },
  typography: {
    fontFamily: '"Source Sans 3", "Segoe UI", sans-serif',
    h1: { fontWeight: 600, letterSpacing: '-0.02em' },
    h4: { fontWeight: 600, letterSpacing: '-0.02em', fontSize: '1.5rem' },
    h5: {
      fontFamily: '"IBM Plex Mono", "Source Sans 3", monospace',
      fontWeight: 500,
      letterSpacing: '-0.03em',
    },
    h6: { fontWeight: 600, fontSize: '1rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: PAPER,
          color: INK,
        },
        '@media (prefers-reduced-motion: reduce)': {
          '*, *::before, *::after': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'transparent' },
      styleOverrides: {
        root: {
          backgroundColor: SURFACE,
          color: INK,
          borderBottom: `1px solid ${RULE}`,
        },
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        outlined: {
          borderColor: RULE,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          color: '#5A6575',
          backgroundColor: PAPER,
          borderBottom: `1px solid ${RULE}`,
        },
        body: {
          borderBottom: `1px solid ${RULE}`,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: SURFACE,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          fontWeight: 600,
        },
      },
    },
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
