import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchCities } from '../api';
import type { GeoCity } from '@/features/weather/types';

export function useCitySearch(query: string) {
  const [enabled, setEnabled] = useState(false);

  const result = useQuery<GeoCity[]>({
    queryKey: ['city-search', query],
    queryFn: () => searchCities(query),
    enabled: enabled && query.length > 1,
  });

  return {
    ...result,
    enableSearch: () => setEnabled(true),
    disableSearch: () => setEnabled(false),
  };
}
