import { useCallback, useState } from 'react';
import keys from 'lodash/keys';
import toPairs from 'lodash/toPairs';
import snakecaseKeys from 'snakecase-keys';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { HttpErrorCode, HttpMethod } from 'utils/enums';
import useFetch from './useFetch';

type ParamsValue = string | number | boolean;
export const joinParams = (params: { [key: string]: ParamsValue }) =>
  toPairs(snakecaseKeys(params))
    .map(
      ([k, v]) =>
        `${encodeURIComponent(k)}=${encodeURIComponent(v as ParamsValue)}`
    )
    .join('&');

function useGet<TResPayload>(
  path: string,
  params: { [key: string]: ParamsValue } = {}
) {
  const { request, isLoading } = useFetch<TResPayload>();
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
        setData(response);
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
