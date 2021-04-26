import { useCallback, useState } from 'react';
import keys from 'lodash/keys';
import toPairs from 'lodash/toPairs';
import snakecaseKeys from 'snakecase-keys';
import useDeepCompareEffect from 'use-deep-compare-effect';

import useFetch from './useFetch';
import { HttpErrorCode, HttpMethod } from 'enums';

export const joinParams = (params: object) =>
  toPairs(snakecaseKeys(params))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

function useGet(path: string, params: object = {}) {
  const { request, isLoading } = useFetch();
  const [refreshKey, setRefreshKey] = useState(0);
  const [data, setData] = useState({});
  const [error, setError] = useState({
    code: HttpErrorCode.NoError,
    message: '',
  });

  useDeepCompareEffect(() => {
    const controller = new AbortController();
    const query = keys(params).length > 0 ? `?${joinParams(params)}` : '';

    request(`${path}${query}`, HttpMethod.GET).then(({ response, error }) => {
      setError(error);
      if (!controller.signal.aborted && error.code === 0) {
        setData(response.data);
      }
      return () => controller.abort();
    });
  }, [params, path, refreshKey]);

  return {
    data,
    isLoading,
    error,
    refresh: useCallback(() => setRefreshKey(k => (k + 1) % 1000000), [
      setRefreshKey,
    ]),
  };
}
