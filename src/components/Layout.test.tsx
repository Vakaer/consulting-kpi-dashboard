import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Layout } from '@/components/Layout';

describe('Layout', () => {
  it('exposes a main landmark', () => {
    render(
      <Layout>
        <p>Content</p>
      </Layout>,
    );
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
