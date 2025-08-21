import type { GeoCity } from '@/features/weather/types';

type SearchBarProps = {
  input: string;
  setInput: (val: string) => void;
  handleSearch: () => void;
  results?: GeoCity[];
  isFetching: boolean;
  errorCity: string | null;
  handleSelect: (city: GeoCity) => void;
};

export default function SearchBar({
  input,
  setInput,
  handleSearch,
  results,
  isFetching,
  errorCity,
  handleSelect,
}: SearchBarProps) {
  return (
    <>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city..."
          className="border p-2 flex-1 rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 rounded">
          Search
        </button>
      </div>

      {isFetching && <p>Loading...</p>}

      {errorCity && (!results || results.length === 0) && (
        <p className="text-red-500">City "{errorCity}" not found</p>
      )}

      {results && results.length > 0 && (
        <ul className="border rounded shadow divide-y">
          {results.map((c) => (
            <li
              key={`${c.name}-${c.lat}-${c.lon}`}
              onClick={() => handleSelect(c)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {c.name}, {c.state ? c.state + ', ' : ''}
              {c.country}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
