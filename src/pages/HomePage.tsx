import { useCurrentWeather, useForecast } from '@/features/weather/api';
import Loading from '@/components/common/Loading';
import ErrorState from '@/components/common/ErrorFallBack';
import CurrentWeatherResponseCard from '@/components/weather/CurrentWeatherCard';
import ForecastList from '@/components/weather/ForecastList';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/common/Header';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const city = searchParams.get('city') || 'singapore';
  const current = useCurrentWeather(city);
  const forecast = useForecast(city);

  if (current.isLoading || forecast.isLoading) return <Loading />;
  if (current.isError || forecast.isError)
    return <ErrorState message="Failed to load weather data" />;

  if (!current.data || !forecast.data) return null;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Header />
      <CurrentWeatherResponseCard data={current.data} />
      <ForecastList data={forecast.data} />
    </div>
  );
}
