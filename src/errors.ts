import { HttpResponse, HttpResponseError } from 'interfaces';
import { HttpErrorCode } from 'enums';

export class FetchError extends Error implements HttpResponseError {
  code: HttpErrorCode;
  message: string;

  constructor(props: HttpResponse) {
    super('test');
    this.code = props.error.code;
    this.message = props.error.message;
  }
}
