import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCitySearch } from '@/features/weather/hooks/useCitySearch';
import { useSearchHistory } from '@/features/weather/hooks/useSearchHistory';
import type { GeoCity } from '@/features/weather/types';
import SearchHistory from '@/components/weather/SearchHistory';
import SearchBar from '@/components/weather/SearchBar';

export default function SearchPage() {
  const [input, setInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { history, addCity, removeCity } = useSearchHistory();
  const { data: results, refetch, isFetching } = useCitySearch(input);

  const errorCity = searchParams.get('city');

  const handleSearch = async () => {
    const { data } = await refetch();
    if (!data || data.length === 0) {
      setSearchParams({ city: input });
    }
  };

  const handleSelect = (city: GeoCity) => {
    const cityName = `${city.name}, ${city.state ?? ''}, ${city.country}`;
    addCity(cityName);

    let url = `/?city=${encodeURIComponent(city.name)}`;
    if (city.state) url += `&state=${encodeURIComponent(city.state)}`;
    if (city.country) url += `&country=${encodeURIComponent(city.country)}`;

    navigate(url);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <SearchBar
        input={input}
        setInput={setInput}
        handleSearch={handleSearch}
        results={results}
        isFetching={isFetching}
        errorCity={errorCity}
        handleSelect={handleSelect}
      />

      <h3 className="mt-6 font-bold">History</h3>
      <SearchHistory history={history} removeCity={removeCity} navigate={navigate} />
    </div>
  );
}
