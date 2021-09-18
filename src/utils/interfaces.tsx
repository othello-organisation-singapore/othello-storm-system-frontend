import { HttpErrorCodes } from 'utils/enums';

export interface HttpResponseError {
  code: HttpErrorCodes;
  message: string;
}

export interface HttpResponse<TResPayload> {
  success: '' | TResPayload;
  error: HttpResponseError;
}

export interface ClosableComponentProps {
  isOpen: boolean;
  handleClose: () => void;
}

export interface RequestOptions {
  skip: boolean;
}
