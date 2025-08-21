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
    <div className="p-4 mt-8 bg-gray-100 rounded-lg shadow-2xl">
      <h3 className="font-bold text-lg mb-2">History</h3>
      <ul className="divide-y">
        {history.length > 0 ? (
          <ul className="divide-y">
            {history.map((c) => (
              <li key={c} className="flex justify-between items-center py-3 hover:font-bold">
                <button onClick={() => handleHistoryClick(c)} className="">
                  {c}
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
