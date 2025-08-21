import type { CurrentWeatherResponse } from '@/features/weather/types';

type Props = { data: CurrentWeatherResponse };

export default function CurrentWeatherResponseCard({ data }: Props) {
  const { name, weather, main, wind, visibility } = data;
  const weatherInfo = weather[0];
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="p-4 bg-white rounded-lg shadow-2xl mb-6">
      <h1 className="text-xl font-bold text-center">{name}</h1>
      <p className="text-gray-500 text-center">{date}</p>

      <div className="flex justify-center items-center my-4">
        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
          alt={weatherInfo.description}
        />
        <div className="ml-4">
          <p className="text-3xl font-bold">{Math.round(main.temp)}°C</p>
          <p className="capitalize text-gray-600">{weatherInfo.description}</p>
        </div>
      </div>

      <div className="flex justify-around text-gray-700">
        <div>
          <p>Humidity</p>
          <p className="font-bold">{main.humidity}%</p>
        </div>
        <div>
          <p>Winds</p>
          <p className="font-bold">{wind.speed} m/s</p>
        </div>
        <div>
          <p>Visibility</p>
          <p className="font-bold">{visibility / 1000} km</p>
        </div>
      </div>
    </div>
  );
}
