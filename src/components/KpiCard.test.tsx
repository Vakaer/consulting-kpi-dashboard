import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { KpiCard } from '@/components/KpiCard';

describe('KpiCard', () => {
  it('renders label and value with combined aria-label', () => {
    render(<KpiCard label="Total Active" value={3} />);
    expect(screen.getByText('Total Active')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(
      screen.getByRole('group', { name: 'Total Active: 3' }),
    ).toBeInTheDocument();
  });
});
