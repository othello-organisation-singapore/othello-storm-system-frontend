import { useRef, useCallback, MutableRefObject } from 'react';

type Callback<T, S> = (...args: T[]) => S;

export default function useEventCallback<T, S>(callback: Callback<T, S>) {
  type Cb = Callback<T, S>;
  const ref = useRef<Cb>(null) as MutableRefObject<Cb>;

  ref.current = callback;

  return useCallback<Cb>(
    (...args) => {
      const fn = ref.current as Cb;
      return fn(...args);
    },
    [ref]
  );
}
