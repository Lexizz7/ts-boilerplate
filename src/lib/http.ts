import ky, { type Options } from 'ky';
import { fetch, Headers, Request, Response } from 'undici';

globalThis.fetch = fetch;
globalThis.Request = Request;
globalThis.Response = Response;
globalThis.Headers = Headers;

export function httpClient(defaultOptions?: Options) {
  const client = ky.create(defaultOptions);

  return client;
}
