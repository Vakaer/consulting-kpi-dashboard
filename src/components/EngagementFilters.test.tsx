import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EngagementFilters } from '@/components/EngagementFilters';

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
});
