import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatusBadge } from '@/components/StatusBadge';

describe('StatusBadge', () => {
  it('renders Active for active status', () => {
    render(<StatusBadge status="active" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders At Risk for at_risk status', () => {
    render(<StatusBadge status="at_risk" />);
    expect(screen.getByText('At Risk')).toBeInTheDocument();
  });
});
