import { useCallback, useState } from 'react';
import keys from 'lodash/keys';
import toPairs from 'lodash/toPairs';
import snakecaseKeys from 'snakecase-keys';
import useDeepCompareEffect from 'use-deep-compare-effect';

import useFetch from './useFetch';
import { HttpMethod } from 'enums';

export const joinParams = (params: object) =>
  toPairs(snakecaseKeys(params))
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');

function useGet(url: string, params: object = {}) {
  const { request, status, isLoading, error } = useFetch();
  const [refreshKey, setRefreshKey] = useState(0);
  const [data, setData] = useState({});

  useDeepCompareEffect(() => {
    const controller = new AbortController();
    const query = keys(params).length > 0 ? `?${joinParams(params)}` : '';

    request(`${url}${query}`, HttpMethod.GET).then(response => {
      if (!controller.signal.aborted && error.code === 0) {
        setData(response.data);
      }
      return () => controller.abort();
    });
  }, [params, url, refreshKey]);

  return {
    data,
    status,
    isLoading,
    error,
    refresh: useCallback(() => setRefreshKey(k => (k + 1) % 1000000), [
      setRefreshKey,
    ]),
  };
}
