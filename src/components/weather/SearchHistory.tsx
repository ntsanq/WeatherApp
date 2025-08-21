type SearchHistoryProps = {
  history: string[];
  removeCity: (city: string) => void;
  navigate: (to: string) => void;
};

export default function SearchHistory({ history, removeCity, navigate }: SearchHistoryProps) {
  const handleHistoryClick = (city: string) => {
    const parts = city.split(',').map((p) => p.trim());
    let url = `/?city=${encodeURIComponent(parts[0])}`;
    if (parts[1]) url += `&state=${encodeURIComponent(parts[1])}`;
    if (parts[2]) url += `&country=${encodeURIComponent(parts[2])}`;

    navigate(url);
  };

  return (
    <ul className="divide-y">
      {history.map((c) => (
        <li key={c} className="flex justify-between items-center py-1">
          <button onClick={() => handleHistoryClick(c)} className="text-blue-600">
            {c}
          </button>
          <button onClick={() => removeCity(c)} className="text-red-500">
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
