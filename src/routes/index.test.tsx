import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import type { Engagement } from '@/types/engagement';
import * as engagementsApi from '@/api/engagements';

const sample: Engagement = {
  id: 'eng-1',
  clientName: 'Acme Corp',
  status: 'active',
  budget: 100000,
  actuals: 40000,
  hoursLogged: 100,
  percentComplete: 40,
  startDate: '2026-01-01',
  endDate: '2026-06-30',
  timeline: [{ date: '2026-01-01', milestone: 'Kickoff', complete: true }],
};

vi.mock('@/api/engagements', async importOriginal => {
  const actual = await importOriginal<typeof engagementsApi>();
  return {
    ...actual,
    fetchEngagements: vi.fn(),
    fetchEngagementById: vi.fn(),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

async function renderDashboard() {
  const dashboard = await import('@/routes/index');
  const root = createRootRoute({
    component: dashboard.Route.options.component,
  });
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ['/'] }),
    routeTree: root.addChildren([
      createRoute({ getParentRoute: () => root, path: '/' }),
      createRoute({
        getParentRoute: () => root,
        path: '/engagements/$id',
      }),
    ]),
  });
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
}

describe('DashboardPage', () => {
  it('renders KPIs from engagement list', async () => {
    vi.mocked(engagementsApi.fetchEngagements).mockResolvedValue([sample]);
    await renderDashboard();
    expect(await screen.findByText('Engagements')).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByRole('group', { name: 'Total Active: 1' }),
      ).toBeInTheDocument();
    });
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('shows empty filter message', async () => {
    vi.mocked(engagementsApi.fetchEngagements).mockResolvedValue([]);
    await renderDashboard();
    expect(await screen.findByRole('status')).toHaveTextContent(
      'No engagements match your filters.',
    );
  });

  it('retries on error', async () => {
    const user = userEvent.setup();
    vi.mocked(engagementsApi.fetchEngagements)
      .mockRejectedValueOnce(new Error('boom'))
      .mockResolvedValueOnce([sample]);
    await renderDashboard();
    expect(await screen.findByText('boom')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(await screen.findByText('Acme Corp')).toBeInTheDocument();
  });
});
