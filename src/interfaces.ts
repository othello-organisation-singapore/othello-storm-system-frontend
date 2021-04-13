import { HttpErrorCode } from 'enums';

export interface HttpResponseError {
  code: HttpErrorCode;
  message: string;
}

export interface HttpResponse {
  data: any;
  error: HttpResponseError;
}
