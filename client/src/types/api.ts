export class ApiError extends Error {
  status;
  message;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
