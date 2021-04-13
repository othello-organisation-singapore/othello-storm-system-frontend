import React, { useCallback, useState } from 'react';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';

import { HttpMethod, HttpRequestStatus } from 'enums';
import { FetchError } from 'errors';
import { HttpResponse } from 'interfaces';

function useFetch() {
  const [status, setStatus] = useState(HttpRequestStatus.IDLE);

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
        throw new FetchError(camelcasedResponse);
      }

      setStatus(HttpRequestStatus.SUCCESS);
      return camelcasedResponse;
    },
    []
  );

  return { request, status, isLoading: status === HttpRequestStatus.PENDING };
}

export default useFetch;
