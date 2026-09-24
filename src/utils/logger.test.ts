import { describe, expect, it } from 'vitest';

import { logger } from './logger';

describe('logger', () => {
  it('exposes an error method', () => {
    expect(typeof logger.error).toBe('function');
  });
});
