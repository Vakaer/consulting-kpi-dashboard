import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import type { Engagement } from '@/types/engagement';
import { EngagementTable } from './EngagementTable';

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
  timeline: [],
};

function renderWithRouter(ui: React.ReactNode) {
  const root = createRootRoute({
    component: () => ui,
  });
  const detail = createRoute({
    getParentRoute: () => root,
    path: '/engagements/$id',
  });
  const index = createRoute({
    getParentRoute: () => root,
    path: '/',
  });
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: ['/'] }),
    routeTree: root.addChildren([index, detail]),
  });
  return {
    ...render(<RouterProvider router={router} />),
    router,
  };
}

describe('EngagementTable', () => {
  it('renders engagement rows', async () => {
    renderWithRouter(<EngagementTable engagements={[sample]} />);
    expect(await screen.findByText('Acme Corp')).toBeInTheDocument();
    expect(
      screen.getByRole('table', { name: 'Engagements' }),
    ).toBeInTheDocument();
  });

  it('shows empty message when no engagements', async () => {
    renderWithRouter(<EngagementTable engagements={[]} />);
    expect(await screen.findByRole('status')).toHaveTextContent(
      'No engagements match your filters.',
    );
  });

  it('navigates to detail on client link Enter', async () => {
    const user = userEvent.setup();
    const { router } = renderWithRouter(
      <EngagementTable engagements={[sample]} />,
    );
    const link = await screen.findByRole('link', { name: 'Open Acme Corp' });
    link.focus();
    await user.keyboard('{Enter}');
    expect(router.state.location.pathname).toBe('/engagements/eng-1');
  });

  it('navigates to detail on row click', async () => {
    const user = userEvent.setup();
    const { router } = renderWithRouter(
      <EngagementTable engagements={[sample]} />,
    );
    await user.click(await screen.findByText('40%'));
    expect(router.state.location.pathname).toBe('/engagements/eng-1');
  });
});
