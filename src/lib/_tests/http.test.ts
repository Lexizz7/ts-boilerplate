import { describe, expect, it } from 'vitest';
import { httpClient } from '../http.js';

describe('httpClient', () => {
  it('returns a ky instance with default options', () => {
    const client = httpClient({ timeout: 5000 });
    expect(client).toBeDefined();
    expect(client).toHaveProperty('get');
    expect(client).toHaveProperty('post');
  });
});
