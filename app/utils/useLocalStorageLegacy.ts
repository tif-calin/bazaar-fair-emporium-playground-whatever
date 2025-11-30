import React from 'react';

const SITE_KEY = 'play.culi.page';

/**
 * See `useLocalStorage` which differs by its utilization of `React.useSyncExternalStore`. This
 * allows for better synchronization of state between components.
 */
const useLocalStorageLegacy = <T>(key: string, initialValue: T) => {
  const nameSpacedKey = `${SITE_KEY}::${key}`;

  const [stateValue, setStateValue] = React.useState<T>(() => {
    try {
      const stored = window?.localStorage?.getItem(nameSpacedKey);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setStoredValue = React.useCallback(
    (newValue: T | ((val: T) => T)) => {
      try {
        const valueToStore = newValue instanceof Function ? newValue(stateValue) : newValue;
        setStateValue(newValue);
        window.localStorage.setItem(nameSpacedKey, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    },
    [nameSpacedKey, stateValue]
  );

  return [stateValue, setStoredValue] as const;
};

export default useLocalStorageLegacy;
