import { useCallback, useState } from 'react';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';

import { HttpMethod } from 'enums';
import { HttpResponse } from 'interfaces';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    async (
      path: string,
      method: HttpMethod,
      body?: object,
      options: object = {}
    ) => {
      const url = `${process.env.REACT_APP_DOMAIN}${path}`;
      setIsLoading(true);

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
      setIsLoading(false);

      const camelcasedResponse: HttpResponse = camelcaseKeys(
        await response.json(),
        {
          deep: true,
        }
      );

      return {
        response: camelcasedResponse.success,
        error: camelcasedResponse?.error,
      };
    },
    []
  );

  return {
    request,
    isLoading,
  };
}

export default useFetch;
