"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type UseLocalStorageOptions<T> = {
  /** Serialize value before writing to localStorage (default: JSON.stringify) */
  serialize?: (value: T) => string;
  /** Parse value read from localStorage (default: JSON.parse) */
  parse?: (raw: string) => T;
  /** If false, don't mirror updates from other tabs/windows (default: true) */
  sync?: boolean;
  /** If false, don't write `initialValue` to storage when no value exists (default: true) */
  writeDefaults?: boolean;
};

/**
 * SSR-safe, typed localStorage hook with cross-tab sync.
 * - Calls `onChange` via returned setter; updates localStorage and state in lockstep
 * - Hydrates on mount; provides `isHydrated` to avoid pre/post mismatch flashes
 * - Optionally syncs changes from other tabs via the `storage` event
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options: UseLocalStorageOptions<T> = {}
) {
  const {
    serialize = JSON.stringify,
    parse = JSON.parse as unknown as (raw: string) => T,
    sync = true,
    writeDefaults = true,
  } = options;

  const isServer = typeof window === "undefined";
  const lazyInitial = useMemo(
    () => (typeof initialValue === "function" ? (initialValue as () => T)() : initialValue),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // State
  const [value, setValue] = useState<T>(() => {
    if (isServer) return lazyInitial;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw == null) return lazyInitial;
      return parse(raw);
    } catch {
      return lazyInitial;
    }
  });
  const [isHydrated, setHydrated] = useState(!isServer);

  // Keep a ref of the current key to detect changes
  const keyRef = useRef(key);

  // Read & hydrate on mount / key change
  useEffect(() => {
    if (isServer) return;

    const read = () => {
      try {
        const raw = window.localStorage.getItem(key);
        if (raw == null) {
          if (writeDefaults) {
            window.localStorage.setItem(key, serialize(lazyInitial));
          }
          setValue(lazyInitial);
          return;
        }
        setValue(parse(raw));
      } catch {
        setValue(lazyInitial);
      }
    };

    // If key changed, re-read from storage
    if (keyRef.current !== key) keyRef.current = key;
    read();
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Cross-tab sync
  useEffect(() => {
    if (isServer || !sync) return;
    const onStorage = (e: StorageEvent) => {
      if (e.storageArea !== window.localStorage) return;
      if (e.key !== key) return;
      try {
        if (e.newValue == null) {
          setValue(lazyInitial);
        } else {
          setValue(parse(e.newValue));
        }
      } catch {
        /* ignore parse errors from other tabs */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [isServer, key, lazyInitial, parse, sync]);

  // Setter that writes to storage
  const set = useCallback(
    (updater: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const next = typeof updater === "function" ? (updater as (p: T) => T)(prev) : updater;
        try {
          if (!isServer) {
            window.localStorage.setItem(key, serialize(next));
          }
        } catch {
          /* quota exceeded or unavailable */
        }
        return next;
      });
    },
    [isServer, key, serialize]
  );

  // Remove key from storage and reset to initial
  const remove = useCallback(() => {
    try {
      if (!isServer) {
        window.localStorage.removeItem(key);
      }
    } catch {
      /* ignore */
    }
    setValue(lazyInitial);
  }, [isServer, key, lazyInitial]);

  return { value, set, remove, isHydrated } as const;
}

// Convenience tuple wrapper if you prefer array style
export function useLocalStorageState<T>(
  key: string,
  initialValue: T | (() => T),
  options?: UseLocalStorageOptions<T>
): [T, (v: T | ((p: T) => T)) => void, () => void, boolean] {
  const { value, set, remove, isHydrated } = useLocalStorage<T>(key, initialValue, options);
  return [value, set, remove, isHydrated];
}
