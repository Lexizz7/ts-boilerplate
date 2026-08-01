import { describe, expect, it } from 'vitest';
import { datetime } from '../datetime.js';

describe('datetime', () => {
  it('has UTC plugin loaded', () => {
    const date = datetime.utc('2024-01-01');
    expect(date.isUTC()).toBe(true);
  });

  it('has timezone plugin loaded', () => {
    const date = datetime.tz('2024-01-01', 'America/New_York');
    expect(date.format('Z')).toBe('-05:00');
  });
});
