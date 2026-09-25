import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Layout } from '@/components/Layout';

describe('Layout', () => {
  it('exposes a main landmark', async () => {
    const root = createRootRoute({
      component: () => (
        <Layout>
          <p>Content</p>
        </Layout>
      ),
    });
    const router = createRouter({
      history: createMemoryHistory({ initialEntries: ['/'] }),
      routeTree: root,
    });
    render(<RouterProvider router={router} />);
    expect(await screen.findByRole('main')).toBeInTheDocument();
  });
});
