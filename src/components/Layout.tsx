import type { ReactNode } from 'react';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

interface LayoutProps {
  children: ReactNode;
}

const Root = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const Main = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingBlock: theme.spacing(3),
}));

export function Layout({ children }: LayoutProps) {
  return (
    <Root>
      <AppBar elevation={0} position="static">
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }} variant="h6">
            <Link color="inherit" href="/" underline="none">
              Consulting KPI Dashboard
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Main component="main">{children}</Main>
    </Root>
  );
}
