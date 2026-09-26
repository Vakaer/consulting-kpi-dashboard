import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BudgetChart } from './BudgetChart';

describe('BudgetChart', () => {
  it('renders chart heading', () => {
    render(<BudgetChart actuals={40} budget={100} />);
    expect(screen.getByText('Budget vs Actuals')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Budget versus actuals chart'),
    ).toBeInTheDocument();
  });
});
