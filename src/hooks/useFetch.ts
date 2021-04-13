import { useCallback, useState } from 'react';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';

import { HttpErrorCode, HttpMethod, HttpRequestStatus } from 'enums';
import { HttpResponse, HttpResponseError } from 'interfaces';

function useFetch() {
  const [status, setStatus] = useState(HttpRequestStatus.IDLE);
  const [error, setError] = useState({
    code: HttpErrorCode.NoError,
    message: '',
  });

  const request = useCallback(
    async (
      url: string,
      method: HttpMethod,
      body?: object,
      options: object = {}
    ) => {
      setStatus(HttpRequestStatus.PENDING);

      const bodyPayload = body
        ? JSON.stringify(snakecaseKeys(body, { deep: true }))
        : null;

      const response = await fetch(url, {
        method,
        credentials: 'include',
        body: bodyPayload,
        headers: new Headers({ 'Content-Type': 'application/json' }),
        ...options,
      });

      const camelcasedResponse: HttpResponse = camelcaseKeys(
        await response.json(),
        {
          deep: true,
        }
      );

      if (camelcasedResponse?.error?.code !== 0) {
        setStatus(HttpRequestStatus.FAIL);
        setError(camelcasedResponse.error);
      } else {
        setStatus(HttpRequestStatus.SUCCESS);
        setError({
          code: HttpErrorCode.NoError,
          message: '',
        });
      }

      return camelcasedResponse;
    },
    []
  );

  return {
    request,
    status,
    isLoading: status === HttpRequestStatus.PENDING,
    error,
  };
}

export default useFetch;
