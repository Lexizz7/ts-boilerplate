import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('undici', async (importOriginal) => {
  const actual = await importOriginal<typeof import('undici')>();
  return {
    ...actual,
    request: vi.fn(),
  };
});

import { request } from 'undici';
import { createApiClient, HttpError } from '../client.js';

const mockedRequest = vi.mocked(request);

describe('createApiClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET returns typed response', async () => {
    mockedRequest.mockResolvedValueOnce({
      statusCode: 200,
      body: {
        json: () => Promise.resolve({ data: 'hello' }),
      },
    } as unknown as Awaited<ReturnType<typeof request>>);

    const client = createApiClient({ baseUrl: 'http://localhost' });
    const result = await client.get<{ data: string }>('/test');
    expect(result.data).toBe('hello');
  });

  it('POST sends body and returns response', async () => {
    mockedRequest.mockResolvedValueOnce({
      statusCode: 201,
      body: {
        json: () => Promise.resolve({ created: true }),
      },
    } as unknown as Awaited<ReturnType<typeof request>>);

    const client = createApiClient({ baseUrl: 'http://localhost' });
    const result = await client.post<{ created: boolean }, { name: string }>('/test', {
      name: 'test',
    });
    expect(result.created).toBe(true);
  });

  it('throws HttpError on 4xx', async () => {
    mockedRequest.mockResolvedValueOnce({
      statusCode: 404,
      body: {
        json: () => Promise.resolve({}),
      },
    } as unknown as Awaited<ReturnType<typeof request>>);

    const client = createApiClient({ baseUrl: 'http://localhost' });
    await expect(client.get('/missing')).rejects.toThrow(HttpError);
  });
});
