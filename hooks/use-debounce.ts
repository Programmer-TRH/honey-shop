"use client";
import { useEffect, useState, useRef } from "react";

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousRef = useRef<T>(value);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      // Only update state if value has changed (shallow check)
      if (!Object.is(previousRef.current, value)) {
        setDebouncedValue(value);
        previousRef.current = value;
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useDebounceCallback<T>(
  callback: (value: T) => void,
  value: T,
  delay: number = 500
) {
  const debouncedValue = useDebounce(value, delay);
  const callbackRef = useRef(callback);

  // Keep callback ref up-to-date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    callbackRef.current(debouncedValue);
  }, [debouncedValue]);
}

