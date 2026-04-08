import { useState, useEffect, useCallback, useRef } from 'react';

export function useLocalStorage(key, initialVal) {
  const [value, setValue] = useState(initialVal);
  const hasLoadedRef = useRef(false);
  const initialValueRef = useRef(initialVal);

  useEffect(() => {
    initialValueRef.current = initialVal;
  }, [key]);

  useEffect(() => {
    if (!globalThis.window) return;
    try {
      const stored = globalThis.localStorage.getItem(key);
      if (stored === null) {
        setValue(initialValueRef.current);
      } else {
        setValue(JSON.parse(stored));
      }
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to read "${key}":`, err);
      setValue(initialValueRef.current);
    } finally {
      hasLoadedRef.current = true;
    }
  }, [key]);

  useEffect(() => {
    if (!hasLoadedRef.current) return;
    try {
      globalThis.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to write "${key}":`, err);
    }
  }, [key, value]);

  useEffect(() => {
    if (!globalThis.window) return;
    const handleStorage = (e) => {
      if (e.key !== key) return;
      try {
        if (e.newValue === null) {
          setValue(initialValueRef.current);
        } else {
          setValue(JSON.parse(e.newValue));
        }
      } catch (err) {
        console.warn(`[useLocalStorage] Failed to sync "${key}" across tabs:`, err);
      }
    };
    globalThis.addEventListener('storage', handleStorage);
    return () => globalThis.removeEventListener('storage', handleStorage);
  }, [key]);

  const remove = useCallback(() => {
    try {
      globalThis.localStorage.removeItem(key);
      setValue(initialValueRef.current);
    } catch (err) {
      console.warn(`[useLocalStorage] Failed to remove "${key}":`, err);
    }
  }, [key]);

  return [value, setValue, remove];
}