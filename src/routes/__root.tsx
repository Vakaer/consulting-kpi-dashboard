import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Outlet, createRootRoute } from '@tanstack/react-router';

import { ThemeProvider } from '@/providers/theme';
import { Layout } from '@/components/Layout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider>
      <Layout>
        <Outlet />
      </Layout>
      {import.meta.env.DEV ? (
        <TanStackRouterDevtools position="bottom-right" />
      ) : null}
    </ThemeProvider>
  );
}
