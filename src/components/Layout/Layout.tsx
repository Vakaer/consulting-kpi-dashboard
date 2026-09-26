import type { ReactNode } from 'react';

import { Link as RouterLink } from '@tanstack/react-router';
import MuiLink from '@mui/material/Link';

import {
  BrandBar,
  BrandMark,
  BrandTitle,
  BrandToolbar,
  Main,
  Root,
} from './Layout.styles';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Root>
      <BrandBar position="sticky">
        <BrandToolbar disableGutters>
          <BrandTitle component="div" variant="h6">
            <MuiLink
              color="inherit"
              component={RouterLink}
              to="/"
              underline="none"
            >
              <BrandMark aria-hidden />
              Consulting KPI Dashboard
            </MuiLink>
          </BrandTitle>
        </BrandToolbar>
      </BrandBar>
      <Main>{children}</Main>
    </Root>
  );
}
