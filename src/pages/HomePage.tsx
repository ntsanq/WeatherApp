import { useState, useEffect } from 'react';
import { fetchUserCity, useCurrentWeatherResponse, useForecast } from '@/features/weather/api';
import Loading from '@/components/common/Loading';
import ErrorState from '@/components/common/ErrorFallBack';
import CurrentWeatherResponseCard from '@/components/CurrentWeatherCard';
import ForecastList from '@/components/ForecastList';

export default function HomePage() {
  const [city, setCity] = useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const resolvedCity = await fetchUserCity(coords.latitude, coords.longitude);
          if (resolvedCity) setCity(resolvedCity);
        },
        (err) => {
          console.warn('User denied geolocation:', err);
        }
      );
    }
  }, []);

  const cityOrDefault = city ?? 'singapore';

  const current = useCurrentWeatherResponse(cityOrDefault);
  const forecast = useForecast(cityOrDefault);

  if (current.isLoading || forecast.isLoading) return <Loading />;
  if (current.isError || forecast.isError)
    return <ErrorState message="Failed to load weather data" />;

  if (!current.data || !forecast.data) return null;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <CurrentWeatherResponseCard data={current.data} />
      <ForecastList data={forecast.data} />
    </div>
  );
}
