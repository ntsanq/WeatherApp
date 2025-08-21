import type { ForecastItem, ForecastResponse } from '@/features/weather/types';

type Props = { data: ForecastResponse };

export default function ForecastList({ data }: Props) {
  const grouped: Record<string, ForecastItem[]> = {};
  data.list.forEach((item: ForecastItem) => {
    const dateKey = item.dt_txt.split(' ')[0];
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(item);
  });

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-2xl">
      <h2 className="text-lg font-bold mb-2">5-day Forecast (3 Hours)</h2>

      {Object.entries(grouped).map(([date, entries]) => {
        const isToday = date === todayStr;
        const label = isToday
          ? 'Today'
          : new Date(date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            });

        return (
          <div key={date} className="mb-4">
            <h3 className="font-semibold text-gray-700">{label}</h3>
            <div className="divide-y">
              {entries.map((item) => {
                const time = new Date(item.dt_txt).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false,
                });

                return (
                  <div key={item.dt} className="flex items-center justify-between py-2">
                    <span className="w-14">{time}</span>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                      alt={item.weather[0].description}
                      className="w-8 h-8"
                    />
                    <span className="w-20 text-center">
                      {Math.round(item.main.temp_min)}° / {Math.round(item.main.temp_max)}°
                    </span>
                    <span className="flex-1 text-right capitalize text-gray-600">
                      {item.weather[0].description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
