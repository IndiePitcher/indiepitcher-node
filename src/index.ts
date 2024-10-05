import { version } from '../package.json';

export class IndiePitcher {

  private readonly headers: Headers;
  private readonly baseUrl = 'https://api.indiepitcher.com';
  private readonly userAgent = `indiepitcher-node:${version}`;

  constructor(readonly key: string) {
    this.key = key;
    this.headers = new Headers({
      Authorization: `Bearer ${this.key}`,
      'User-Agent': this.userAgent,
      'Content-Type': 'application/json',
    });
  }

  async fetchRequest<T>(
    path: string,
    options = {},
  ): Promise<T> {

    const response = await fetch(`${this.baseUrl}${path}`, options);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error);
    }

    const data = await response.json();
    return data;
  }

  async post<T>(path: string, entity?: unknown) {
    const requestOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(entity)
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async get<T>(path: string, query?: unknown) {
    const requestOptions = {
      method: 'GET',
      headers: this.headers,
      query: query
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async put<T>(path: string, entity: unknown) {
    const requestOptions = {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(entity)
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async patch<T>(path: string, entity: unknown) {
    const requestOptions = {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(entity)
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async delete<T>(path: string, query?: unknown) {
    const requestOptions = {
      method: 'DELETE',
      headers: this.headers,
      query: query
    };

    return this.fetchRequest<T>(path, requestOptions);
  }
}