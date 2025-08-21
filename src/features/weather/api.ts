import { useQuery } from '@tanstack/react-query';
import { http } from '@/libs/http';
import type { CurrentWeather, ForecastResponse } from './types';
import { isAxiosError } from 'axios';

const smartRetry = (failureCount: number, error: { response: { status: number } }) => {
  if (isAxiosError(error) && error.response?.status >= 400 && error.response.status < 500) {
    return false;
  }
  return failureCount < 3;
};

export const useCurrentWeather = (city: string) =>
  useQuery({
    queryKey: ['current-weather', city],
    queryFn: async () => {
      const { data } = await http.get<CurrentWeather>('/weather', {
        params: { q: city },
      });
      return data;
    },
    enabled: !!city,
    retry: smartRetry,
  });

export const useForecast = (city: string) =>
  useQuery({
    queryKey: ['forecast', city],
    queryFn: async () => {
      const { data } = await http.get<ForecastResponse>('/forecast', {
        params: { q: city },
      });
      return data;
    },
    enabled: !!city,
    retry: smartRetry,
  });
