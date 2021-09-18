import { useCallback, useState } from 'react';
import keys from 'lodash/keys';
import toPairs from 'lodash/toPairs';
import snakecaseKeys from 'snakecase-keys';
import useDeepCompareEffect from 'use-deep-compare-effect';

import { HttpErrorCodes } from 'utils/enums';
import { RequestOptions } from 'utils/interfaces';
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
  params: { [key: string]: ParamsValue } = {},
  options: RequestOptions = { skip: false }
) {
  const { request, isLoading } = useFetch<TResPayload>();
  const [refreshKey, setRefreshKey] = useState(0);
  const [data, setData] = useState<TResPayload>(null);
  const [error, setError] = useState({
    code: HttpErrorCodes.NoError,
    message: '',
  });

  useDeepCompareEffect(() => {
    if (options.skip) {
      return;
    }

    const controller = new AbortController();
    const query = keys(params).length > 0 ? `?${joinParams(params)}` : '';

    request(`${path}${query}`, 'GET').then(({ response, error }) => {
      setError(error);
      if (!controller.signal.aborted && error.code === 0 && response !== '') {
        setData(response);
      }
      return () => controller.abort();
    });
  }, [params, path, refreshKey, options]);

  return {
    data,
    isLoading,
    error,
    refresh: useCallback(() => setRefreshKey(k => (k + 1) % 1000000), [
      setRefreshKey,
    ]),
  };
}

export default useGet;
