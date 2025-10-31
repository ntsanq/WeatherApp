import { useState, useEffect } from 'react';
import type { CityHistoryItem } from '../types';

const SEARCH_HISTORY_KEY = 'weather-history';

export function useSearchHistory() {
  const [history, setHistory] = useState<CityHistoryItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (raw) setHistory(JSON.parse(raw));
  }, []);

  const addCity = (city: CityHistoryItem) => {
    setHistory((prev) => {
      const exists = prev.some((c) => c.lat === city.lat && c.lon === city.lon);
      const next = exists ? prev : [city, ...prev];
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  };

  const removeCity = (city: CityHistoryItem) => {
    setHistory((prev) => {
      const next = prev.filter((c) => c.lat !== city.lat || c.lon !== city.lon);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(next));
      return next;
    });
  };

  return { history, addCity, removeCity };
}
