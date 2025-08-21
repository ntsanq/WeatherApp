import { useState } from 'react';
import { useCitySearch } from '@/features/weather/hooks/useCitySearch';
import type { GeoCity } from '@/features/weather/types';

interface Props {
  onSelect: (city: GeoCity) => void;
}

export default function CitySearchBar({ onSelect }: Props) {
  const [input, setInput] = useState('');
  const { data: suggestions, enableSearch, disableSearch, isLoading } = useCitySearch(input);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          enableSearch();
        }}
        placeholder="Search city..."
        className="border p-2 w-full rounded"
      />
      {isLoading && <p className="absolute bg-gray-100 p-2">Loading...</p>}
      {suggestions && suggestions.length > 0 && (
        <ul className="absolute bg-gray-100 border w-full mt-1 rounded shadow">
          {suggestions.map((city) => (
            <li
              key={`${city.name}-${city.lat}-${city.lon}`}
              onClick={() => {
                onSelect(city);
                setInput(`${city.name}, ${city.country}`);
                disableSearch();
              }}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {city.name}, {city.state ? city.state + ', ' : ''}
              {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
