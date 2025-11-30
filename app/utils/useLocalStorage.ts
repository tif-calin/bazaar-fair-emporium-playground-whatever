import React from 'react';

const SITE_KEY = 'play.culi.page';

const dispatchStorageEvent = (key: string, newValue?: string | null | undefined) => {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }));
};
const subscribe = (callback: (e: StorageEvent) => void) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};
const getLocalStorageItem = (key: string) => window.localStorage.getItem(key);
const setLocalStorageItem = (key: string, value: unknown) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, JSON.stringify(value));
  dispatchStorageEvent(key, stringifiedValue);
};
const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};
const getServerSnapshot = () => {
  throw Error('useLocalStorage is a client-only hook');
};

const useLocalStorage = <T>(key: string, fallbackValue: T) => {
  const nameSpacedKey = `${SITE_KEY}::${key}`;

  const getSnapshot = React.useCallback(() => {
    return getLocalStorageItem(nameSpacedKey);
  }, [nameSpacedKey]);

  const store = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const storedValue = React.useMemo(
    () => (store ? JSON.parse(store) : fallbackValue),
    [fallbackValue, store]
  );

  const setStoredValue = React.useCallback(
    (newValue: T | ((val: T) => T)) => {
      try {
        const valueToStore = newValue instanceof Function ? newValue(storedValue) : newValue;
        if (newValue === undefined || newValue === null) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, valueToStore);
        }
        window.localStorage.setItem(nameSpacedKey, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [key, nameSpacedKey, storedValue]
  );

  React.useEffect(() => {
    if (getLocalStorageItem(key) === null && typeof fallbackValue !== 'undefined') {
      setLocalStorageItem(key, fallbackValue);
    }
  }, [key, fallbackValue]);

  return [storedValue, setStoredValue] as const;
};

export default useLocalStorage;
