import { HttpStatus } from '@nestjs/common';

export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export class ApiResult<T> {
  public status: ApiStatus = ApiStatus.ERROR;
  public code: number;
  public errorCode: string;
  public error_code: string;
  public error_message: string;
  public details: string;
  public help: string;
  public message: string;
  public data: T | undefined;
  public success(data?: T, message?: string) {
    this.status = ApiStatus.SUCCESS;
    this.code = HttpStatus.OK;
    if (message) {
      this.message = 'OK';
    }
    this.data = data;

    return this;
  }

  public setMessage(message: string) {
    this.message = message;

    return this;
  }

  public error(message: string, code: number, errorCode?: string) {
    this.status = ApiStatus.ERROR;
    this.errorCode = errorCode || 'UNAUTHORIZED';
    this.message = message;
    this.code = code;

    return this;
  }

  public generalError(
    data: {
      error_code: string;
      error_message: string;
      details: string;
      help: string;
    },
    errorCode?: number,
  ) {
    this.status = ApiStatus.ERROR;
    this.error_code = data.error_code;
    this.error_message = data.error_message;
    this.details = data.details;
    this.help = data.help;
    this.code = errorCode || 400;

    return this;
  }
}

export class CommonResponseDTO extends ApiResult<boolean> {
  data: boolean;

  public static success(data: boolean) {
    const result = new CommonResponseDTO();
    result.success(data);
    return result;
  }
}
