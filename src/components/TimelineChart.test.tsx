import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TimelineChart } from '@/components/TimelineChart';

describe('TimelineChart', () => {
  it('renders timeline heading', () => {
    render(
      <TimelineChart
        timeline={[
          { date: '2026-01-01', milestone: 'Kickoff', complete: true },
          { date: '2026-06-01', milestone: 'Go-live', complete: false },
        ]}
      />,
    );
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Engagement timeline chart'),
    ).toBeInTheDocument();
  });
});
