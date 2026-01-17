import { useCallback, useMemo } from 'react';
import type { Json } from './types';
import { useSearchParams } from 'react-router';

const useQueryParamState = <T extends Json>(key: string, defaultValue: T) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getValue = useCallback(
    (key: string, searchParams: URLSearchParams) => {
      const valueFromUrl = searchParams.get(key);
      if (valueFromUrl === null) return defaultValue;
      try {
        return JSON.parse(valueFromUrl) as T;
      } catch {
        return valueFromUrl as T;
      }
    },
    [defaultValue]
  );

  const value = useMemo(() => getValue(key, searchParams), [getValue, key, searchParams]);

  const setValue = useCallback(
    (newValue: T | ((val: T) => T)) => {
      setSearchParams(prev => {
        const prevValue = getValue(key, prev);
        const valueToStore = newValue instanceof Function ? newValue(prevValue) : newValue;
        // NOTE: this breaks numbers which will get parsed as strings. I'm okay with this because
        //       I prefer clean urls for strings. E.g. `?key=foo` instead of `?key="foo"`.
        const serializedValue =
          typeof valueToStore === 'string' ? valueToStore : JSON.stringify(valueToStore);

        const nextParams = new URLSearchParams(prev);

        if (valueToStore === null) nextParams.delete(key);
        else nextParams.set(key, serializedValue);

        return nextParams;
      });
    },
    [getValue, key, setSearchParams]
  );

  return [value, setValue] as const;
};

export default useQueryParamState;
