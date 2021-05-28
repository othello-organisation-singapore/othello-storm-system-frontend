import { HttpErrorCode } from 'utils/enums';

export interface HttpResponseError {
  code: HttpErrorCode;
  message: string;
}

export interface HttpResponse<TResPayload> {
  success: '' | TResPayload;
  error: HttpResponseError;
}
