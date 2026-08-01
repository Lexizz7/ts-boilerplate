import ky, { type Options } from 'ky';

export function httpClient(defaultOptions?: Options) {
  const client = ky.create(defaultOptions);

  return client;
}
