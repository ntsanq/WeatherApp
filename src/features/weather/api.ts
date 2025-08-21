import { useQuery } from '@tanstack/react-query';
import { geoHttp, http } from '@/libs/http';
import type { CurrentWeatherResponse, ForecastResponse } from './types';
import { isAxiosError } from 'axios';

const smartRetry = (failureCount: number, error: { response: { status: number } }) => {
  if (isAxiosError(error) && error.response?.status >= 400 && error.response.status < 500) {
    return false;
  }
  return failureCount < 3;
};

export const useCurrentWeatherResponse = (city: string) =>
  useQuery({
    queryKey: ['current-weather', city],
    queryFn: async (): Promise<CurrentWeatherResponse> => {
      const { data } = await http.get<CurrentWeatherResponse>('/weather', {
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
    queryFn: async (): Promise<ForecastResponse> => {
      const { data } = await http.get<ForecastResponse>('/forecast', {
        params: { q: city },
      });
      return data;
    },
    enabled: !!city,
    retry: smartRetry,
  });

export async function fetchUserCity(lat: number, lon: number) {
  const { data } = await geoHttp.get<{ name: string; country: string }[]>('/reverse', {
    params: { lat, lon, limit: 1 },
  });

  return data?.[0]?.name ?? null;
}
