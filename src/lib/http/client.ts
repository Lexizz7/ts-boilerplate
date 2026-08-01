import { type Dispatcher, request } from 'undici';

type ApiClientOptions = {
  baseUrl: string;
  dispatcher?: Dispatcher;
};

class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
  }
}

export function createApiClient(options: ApiClientOptions) {
  const { baseUrl, dispatcher } = options;

  async function get<T>(path: string): Promise<T> {
    const url = new URL(path, baseUrl);
    const response = await request(url.toString(), {
      method: 'GET',
      headers: { accept: 'application/json' },
      ...(dispatcher ? { dispatcher } : {}),
    });

    if (response.statusCode >= 400) {
      throw new HttpError(response.statusCode, `GET ${url.toString()} failed`);
    }

    return response.body.json() as Promise<T>;
  }

  async function post<T, B>(path: string, body: B): Promise<T> {
    const url = new URL(path, baseUrl);
    const response = await request(url.toString(), {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(body),
      ...(dispatcher ? { dispatcher } : {}),
    });

    if (response.statusCode >= 400) {
      throw new HttpError(response.statusCode, `POST ${url.toString()} failed`);
    }

    return response.body.json() as Promise<T>;
  }

  return { get, post };
}

export type ApiClient = ReturnType<typeof createApiClient>;
export { HttpError };
