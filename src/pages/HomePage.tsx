import { useState, useEffect } from 'react';
import { fetchUserCity, useCurrentWeather } from '@/features/weather/api';
import Loading from '@/components/common/Loading';
import ErrorState from '@/components/common/ErrorFallBack';

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

  const { data, isLoading, isError, error } = useCurrentWeather(city);

  if (isLoading) return <Loading />;
  if (isError) return <ErrorState message={error?.response?.data?.message || 'Failed'} />;
  if (!data) return null;

  const { name, weather, main, wind, visibility } = data;
  const weatherInfo = weather[0];
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const weatherDetails = [
    { label: 'Humidity', value: `${main.humidity}%` },
    {
      label: 'Wind',
      value: (
        <>
          <span style={{ transform: `rotate(${wind.deg}deg)` }} className="inline-block mr-2">
            ➤
          </span>
          {wind.speed} m/s
        </>
      ),
    },
    { label: 'Visibility', value: `${visibility / 1000} km` },
  ];

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded-md">
      <h1 className="text-2xl font-bold mb-1 text-left">{name}</h1>
      <p className="text-gray-500 mb-2 text-left">{date}</p>

      <div className="flex items-center mb-4 justify-center">
        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
          alt={weatherInfo.description}
        />
        <div className="ml-4">
          <p className="text-3xl font-bold">{Math.round(main.temp)}°C</p>
          <p className="capitalize text-gray-600">{weatherInfo.description}</p>
        </div>
      </div>

      <div className="px-5 flex justify-between text-gray-700 items-center">
        {weatherDetails.map(({ label, value }) => (
          <div key={label}>
            <p>{label}</p>
            <p className="font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
