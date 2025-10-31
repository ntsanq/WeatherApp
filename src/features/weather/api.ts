import { useQuery } from '@tanstack/react-query';
import { geoHttp, http } from '@/libs/http';
import type {
  CurrentWeatherResponse,
  FetchUserCityResponse,
  ForecastResponse,
  GeoCity,
} from './types';
import { isAxiosError } from 'axios';

const smartRetry = (failureCount: number, error: { response: { status: number } }) => {
  if (isAxiosError(error) && error.response?.status >= 400 && error.response.status < 500) {
    return false;
  }
  return failureCount < 3;
};

export const useCurrentWeather = (lat: number, lon: number) =>
  useQuery({
    queryKey: ['current-weather', lat, lon],
    queryFn: async (): Promise<CurrentWeatherResponse> => {
      const { data } = await http.get<CurrentWeatherResponse>('/weather', {
        params: {
          lat: lat,
          lon: lon,
        },
      });
      return data;
    },
    enabled: !!lat && !!lon,
    retry: smartRetry,
  });

export const useForecast = (lat: number, lon: number) =>
  useQuery({
    queryKey: ['forecast', lat, lon],
    queryFn: async (): Promise<ForecastResponse> => {
      const { data } = await http.get<ForecastResponse>('/forecast', {
        params: {
          lat: lat,
          lon: lon,
        },
      });
      return data;
    },
    enabled: !!lat && !!lon,
    retry: smartRetry,
  });

export async function fetchUserCity(lat: number, lon: number) {
  const { data } = await geoHttp.get<FetchUserCityResponse[]>('/reverse', {
    params: { lat, lon, limit: 1 },
  });

  return data?.[0]?.name ?? null;
}

export async function searchCities(query: string, limit = 10): Promise<GeoCity[]> {
  if (!query) return [];
  const { data } = await geoHttp.get<GeoCity[]>('/direct', {
    params: { q: query, limit },
  });
  return data;
}
