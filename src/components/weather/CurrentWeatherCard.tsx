import type { CurrentWeatherResponse } from '@/features/weather/types';

type Props = { data: CurrentWeatherResponse };

export default function CurrentWeatherCard({ data }: Props) {
  const { name, weather, main, wind, visibility, sys } = data;
  const weatherInfo = weather[0];
  const date = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-2xl mb-6">
      <h1 className="text-xl font-bold text-center">
        {name}, {sys.country}
      </h1>
      <p className="text-gray-500 text-center">{date}</p>

      <div className="flex justify-center items-center my-4">
        <img
          className="drop-shadow-[5px_5px_10px_rgba(0,0,0,0.5)]"
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
          <span style={{ transform: `rotate(${wind.deg}deg)` }} className="inline-block mr-2">
            ➤
          </span>
          <span className="font-bold">{wind.speed} m/s</span>
        </div>
        <div>
          <p>Visibility</p>
          <p className="font-bold">{visibility / 1000} km</p>
        </div>
      </div>
    </div>
  );
}
