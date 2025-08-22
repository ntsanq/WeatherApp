import { useCurrentWeather, useForecast } from '@/features/weather/api';
import Loading from '@/components/common/Loading';
import ErrorState from '@/components/common/ErrorFallBack';
import CurrentWeatherCard from '@/components/weather/CurrentWeatherCard';
import ForecastList from '@/components/weather/ForecastList';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/common/Header';
import Layout from '../components/Layout';

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const latStr = searchParams.get('lat');
  const lonStr = searchParams.get('lon');
  const lat = latStr ? Number(latStr) : 1.2899;
  const lon = lonStr ? Number(lonStr) : 103.8519; // Singapore as default

  const current = useCurrentWeather(lat, lon);
  const forecast = useForecast(lat, lon);

  if (current.isLoading || forecast.isLoading) return <Loading />;
  if (current.isError || forecast.isError)
    return <ErrorState message="Failed to load weather data" />;

  if (!current.data || !forecast.data) return null;

  return (
    <Layout title="weather app">
      <div className="p-4 max-w-2xl mx-auto">
        <Header />
        <CurrentWeatherCard data={current.data} />
        <ForecastList data={forecast.data} />
      </div>
    </Layout>
  );
}
