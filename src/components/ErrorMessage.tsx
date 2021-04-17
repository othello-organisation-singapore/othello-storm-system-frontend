import React, { FC, ReactNode } from 'react';

import { Message } from 'semantic-ui-react';

import { HttpErrorCode } from 'enums';

interface ErrorMessageProps {
  errorCode: HttpErrorCode;
  errorMessageOverride?: { [errorCode in HttpErrorCode]: ReactNode };
}

const ErrorMessage: FC<ErrorMessageProps> = ({
  errorCode,
  errorMessageOverride = {},
}) => {
  if (errorMessageOverride[errorCode] !== undefined) {
    return <Message error>{errorMessageOverride[errorCode]}</Message>;
  }

  switch (errorCode) {
    case HttpErrorCode.NoError:
      return null;
    case HttpErrorCode.BadRequestError:
      return (
        <Message error>
          Bad request parameters, please check your parameters again.
        </Message>
      );
    case HttpErrorCode.AuthenticationFailed:
      return (
        <Message error>
          Your account is not available in our database.
          <br />
          Please try to re-log, or contact admin if this issue persists.
        </Message>
      );
    case HttpErrorCode.AutomaticPairingError:
      return (
        <Message error>
          Some unexpected error happens during pairing.
          <br />
          Please proceed with manual pairing, and please report this to admin.
        </Message>
      );
    case HttpErrorCode.DatabaseError:
      return (
        <Message error>
          Network error, this app cannot access the database. Please contact
          admin.
        </Message>
      );
    case HttpErrorCode.ExternalConnectionError:
      return (
        <Message error>
          Your session has expired, please re-log to continue.
        </Message>
      );
    case HttpErrorCode.TokenExpired:
      return (
        <Message error>
          Network error, this app cannot access external sources. Please contact
          admin.
        </Message>
      );
    default:
      return <Message error>Unknown error, please contact admin</Message>;
  }
};

export default ErrorMessage;
