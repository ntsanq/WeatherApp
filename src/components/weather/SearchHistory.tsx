import type { CityHistoryItem } from '@/features/weather/types';

type SearchHistoryProps = {
  history: CityHistoryItem[];
  removeCity: (city: CityHistoryItem) => void;
  navigate: (to: string) => void;
};

export default function SearchHistory({ history, removeCity, navigate }: SearchHistoryProps) {
  const handleHistoryClick = (city: CityHistoryItem) => {
    navigate(`/?lat=${city.lat}&lon=${city.lon}`);
  };

  return (
    <div className="p-4 mt-8 bg-gray-100 rounded-lg shadow-2xl">
      <h3 className="font-bold text-lg mb-2">History</h3>
      <ul className="divide-y">
        {history.length > 0 ? (
          <ul className="divide-y">
            {history.map((c) => (
              <li
                key={`${c.name}-${c.lat}-${c.lon}`}
                className="flex justify-between items-center py-3 hover:font-bold"
              >
                <button onClick={() => handleHistoryClick(c)}>
                  {c.name} [{c.lat != null ? c.lat.toFixed(4) : 'N/A'},
                  {c.lon != null ? c.lon.toFixed(4) : 'N/A'}]
                </button>
                <button onClick={() => removeCity(c)} className="text-red-500">
                  ✕
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-4">No history yet</p>
        )}
      </ul>
    </div>
  );
}
