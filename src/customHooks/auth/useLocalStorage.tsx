import { useState } from "react";

export const useLocalStorage = <T,>(keyName: string, defaultValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const value = localStorage.getItem(keyName);
      if (value) {
        return JSON.parse(value) as T;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (newValue: T) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue));
    } catch (err) {
      console.error(err);
    }
    setStoredValue(newValue);
  };

  return [storedValue, setValue] as const;
};
