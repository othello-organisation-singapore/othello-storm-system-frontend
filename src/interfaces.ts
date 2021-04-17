import { HttpErrorCode } from 'enums';

export interface HttpResponseError {
  code: HttpErrorCode;
  message: string;
}

export interface HttpResponse {
  success: any;
  error: HttpResponseError;
}
