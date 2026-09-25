import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import type { Engagement } from '@/types/engagement';
import * as engagementsApi from '@/api/engagements';

const sample: Engagement = {
  id: 'eng-1',
  clientName: 'Acme Corp',
  status: 'at_risk',
  budget: 100000,
  actuals: 90000,
  hoursLogged: 200,
  percentComplete: 80,
  startDate: '2026-01-01',
  endDate: '2026-06-30',
  timeline: [{ date: '2026-01-01', milestone: 'Kickoff', complete: true }],
};

vi.mock('@/api/engagements', async importOriginal => {
  const actual = await importOriginal<typeof engagementsApi>();
  return {
    ...actual,
    fetchEngagementById: vi.fn(),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

async function renderDetail(id = 'eng-1') {
  const detail = await import('@/routes/engagements/$id');
  const root = createRootRoute();
  const route = createRoute({
    getParentRoute: () => root,
    path: '/engagements/$id',
    component: detail.Route.options.component,
  });
  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: [`/engagements/${id}`],
    }),
    routeTree: root.addChildren([route]),
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

describe('EngagementDetailPage', () => {
  it('renders client name and status on success', async () => {
    vi.mocked(engagementsApi.fetchEngagementById).mockResolvedValue(sample);
    await renderDetail();
    expect(await screen.findByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('At Risk')).toBeInTheDocument();
    expect(screen.getByText('Budget vs Actuals')).toBeInTheDocument();
  });
});
