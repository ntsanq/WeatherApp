import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCitySearch } from '@/features/weather/hooks/useCitySearch';
import { useSearchHistory } from '@/features/weather/hooks/useSearchHistory';
import type { GeoCity } from '@/features/weather/types';
import SearchHistory from '@/components/weather/SearchHistory';
import SearchBar from '@/components/weather/SearchBar';
import Layout from '@/components/Layout';

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
    const cityName = `${city.name}${city.state ? `, ${city.state}` : ''}, ${city.country} [${city.lat?.toFixed(3)},${city.lon?.toFixed(3)}]`;
    addCity(cityName);

    navigate(`/?lat=${city.lat}&lon=${city.lon}`);
  };

  return (
    <Layout title="Search & history">
      <div className="p-4 max-w-2xl mx-auto">
        <SearchBar
          input={input}
          setInput={setInput}
          handleSearch={handleSearch}
          results={results}
          isFetching={isFetching}
          errorCity={errorCity}
          handleSelect={handleSelect}
        />
        <SearchHistory history={history} removeCity={removeCity} navigate={navigate} />
      </div>
    </Layout>
  );
}
