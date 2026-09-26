import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EngagementFilters } from './EngagementFilters';

describe('EngagementFilters', () => {
  it('calls onChange when search text changes after debounce', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<EngagementFilters onChange={onChange} value={{ status: 'all' }} />);
    await user.type(
      screen.getByRole('textbox', { name: 'Search engagements' }),
      'a',
    );
    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalled();
      },
      { timeout: 2000 },
    );
  });

  it('preserves status when search debounce fires after status change', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <EngagementFilters onChange={onChange} value={{ status: 'all' }} />,
    );
    await user.type(
      screen.getByRole('textbox', { name: 'Search engagements' }),
      'ac',
    );
    rerender(
      <EngagementFilters onChange={onChange} value={{ status: 'at_risk' }} />,
    );
    await waitFor(
      () => {
        expect(onChange).toHaveBeenCalled();
        const last = onChange.mock.calls.at(-1)?.[0] as {
          search?: string;
          status?: string;
        };
        expect(last.status).toBe('at_risk');
        expect(last.search).toBe('ac');
      },
      { timeout: 2000 },
    );
  });
});
