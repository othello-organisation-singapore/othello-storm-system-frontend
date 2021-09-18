import { useCallback, useState } from 'react';
import snakecaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';
import { parse } from 'cookie';

import { HttpMethod } from 'utils/enums';
import { HttpResponse } from 'utils/interfaces';

function useFetch<TResPayload>() {
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

      const { jwt } = parse(document.cookie);

      const response = await fetch(url, {
        method,
        credentials: 'include',
        body: bodyPayload,
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Authorization': jwt,
        }),
        ...options,
      });
      setIsLoading(false);

      const camelcasedResponse: HttpResponse<TResPayload> = camelcaseKeys(
        await response.json(),
        {
          deep: true,
        }
      );

      return {
        response: camelcasedResponse.success,
        error: camelcasedResponse.error,
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
