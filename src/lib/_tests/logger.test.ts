import { describe, expect, it } from 'vitest';
import { getLogger } from '../logger.js';

describe('logger', () => {
  it('getLogger returns child logger with name', () => {
    const child = getLogger('test');
    expect(child).toBeDefined();
    expect(child.bindings()).toHaveProperty('name', 'test');
  });
});
