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
          placeholder="Enter city name..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isFetching) {
              handleSearch();
            }
          }}
          className="border rounded-lg shadow-xl p-2 flex-1 bg-transparent text-gray-100 placeholder-gray-300 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-gray-100 px-4  rounded-lg shadow-xl disabled:bg-gray-400"
          disabled={isFetching}
        >
          Search
        </button>
      </div>

      {errorCity && (!results || results.length === 0) && (
        <p className="text-red-500 text-left">City "{errorCity}" not found</p>
      )}

      {results && results.length > 0 && (
        <ul className="border bg-gray-100 rounded shadow divide-y">
          {results.map((c) => (
            <li
              key={`${c.name}-${c.lat}-${c.lon}`}
              onClick={() => handleSelect(c)}
              className="p-2 hover:bg-gray-300 cursor-pointer"
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
