import { HttpException } from '@nestjs/common';

export class ApiGeneralError extends HttpException {
  error_code: string;
  error_message: string;
  details: string;
  help: string;

  constructor(data: {
    error_code: string;
    error_message: string;
    details: string;
    help: string;
  }) {
    super('', 400);

    this.error_code = data.error_code;
    this.error_message = data.error_message;
    this.details = data.details;
    this.help = data.help;
  }

  static generalError(data: {
    error_code: string;
    error_message: string;
    details: string;
    help: string;
  }) {
    throw new ApiGeneralError(data);
  }
}
