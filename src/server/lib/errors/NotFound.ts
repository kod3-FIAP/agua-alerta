export class NotFoundErr extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = 404;
    this.details = details;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundErr);
    }
  }
}
