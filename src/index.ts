import { version } from '../package.json';
import type {
  Contact,
  CreateContact,
  MailingList,
  MailingListPortalSession,
  SendEmail,
  SendEmailToContact,
  SendEmailToMailingList,
} from './dtos';
import { IndiePitcherResponseError } from './errors';
import type {
  DataResponse,
  EmptyResponse,
  PagedDataResponse,
} from './responses';

export class IndiePitcher {
  private readonly headers: Headers;
  private readonly baseUrl = 'https://api.indiepitcher.com/v1';
  private readonly userAgent = `indiepitcher-node:${version}`;

  constructor(readonly key: string) {
    this.key = key;
    this.headers = new Headers({
      Authorization: `Bearer ${this.key}`,
      'User-Agent': this.userAgent,
      'Content-Type': 'application/json',
    });
  }

  private async fetchRequest<T>(path: string, options = {}): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, options);

    if (!response.ok) {
      const json = await response.json();
      throw new IndiePitcherResponseError(json.reason ?? 'Unknown reason', response.status);
    }

    const data = await response.json();
    return data;
  }

  private async post<T>(path: string, entity?: unknown) {
    const requestOptions = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(entity),
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  private async get<T>(path: string, query?: unknown) {
    const requestOptions = {
      method: 'GET',
      headers: this.headers,
      query: query,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  private async put<T>(path: string, entity: unknown) {
    const requestOptions = {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(entity),
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  private async patch<T>(path: string, entity: unknown) {
    const requestOptions = {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(entity),
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  private async delete<T>(path: string, query?: unknown) {
    const requestOptions = {
      method: 'DELETE',
      headers: this.headers,
      query: query,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }

  async listContacts(
    page = 1,
    perPage = 10,
  ): Promise<PagedDataResponse<Contact>> {
    return this.get<PagedDataResponse<Contact>>('/contacts', {
      page,
      per: perPage,
    });
  }

  async addContact(contact: CreateContact): Promise<DataResponse<Contact>> {
    return this.post<DataResponse<Contact>>('/contacts/create', contact);
  }

  async deleteContact(email: string): Promise<EmptyResponse> {
    return this.post<EmptyResponse>('/contacts/delete', { email });
  }

  async listMailingLists(
    page = 1,
    perPage = 10,
  ): Promise<PagedDataResponse<MailingList>> {
    return this.get<PagedDataResponse<MailingList>>('/lists', {
      page,
      per: perPage,
    });
  }

  async createMailingListsPortalSession(
    contactEmail: string,
    returnURL: string,
  ): Promise<DataResponse<MailingListPortalSession>> {
    return this.post<DataResponse<MailingListPortalSession>>(
      '/lists/portal_session',
      { contactEmail, returnURL },
    );
  }

  async sendEmail(data: SendEmail): Promise<EmptyResponse> {
    return this.post<EmptyResponse>('/email/transactional', data);
  }

  async sendEmailToContact(data: SendEmailToContact): Promise<EmptyResponse> {
    return this.post<EmptyResponse>('/email/contact', data);
  }

  async sendEmailToMailingList(data: SendEmailToMailingList): Promise<EmptyResponse> {
    return this.post<EmptyResponse>('/email/list', data);
  }
}
