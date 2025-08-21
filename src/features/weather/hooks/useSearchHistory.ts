import { useState, useEffect } from 'react';

const SEARCH_HISTORY_KEY = 'weather-history';

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (raw) setHistory(JSON.parse(raw));
  }, []);

  const addCity = (city: string) => {
    setHistory((prev) => {
      const next = Array.from(new Set([city, ...prev]));
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  };

  const removeCity = (city: string) => {
    setHistory((prev) => {
      const next = prev.filter((c) => c !== city);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { history, addCity, removeCity };
}
