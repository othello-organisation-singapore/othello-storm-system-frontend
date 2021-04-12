import React, { useCallback } from 'react';

import { HttpMethod } from 'enums';

function useFetch(url: string, method: HttpMethod, props: object = {}) {
  return useCallback(() => {
    return fetch(url, {
      method,
      credentials: 'include',
      ...props,
    }).then(response => response.json());
  }, [url, method, props]);
}

export default useFetch;
