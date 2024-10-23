export class IndiePitcherResponseError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'IndiePitcherError';
    this.statusCode = statusCode;
  }
}
