import { useNavigate } from 'react-router-dom';
import { fetchUserCity } from '@/features/weather/api';

export function Header() {
  const navigate = useNavigate();

  const handleLocate = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          const resolvedCity = await fetchUserCity(coords.latitude, coords.longitude);
          if (resolvedCity) {
            navigate(`/?lat=${coords.latitude}&lon=${coords.longitude}`);
          }
        },
        (err) => {
          console.warn('User denied geolocation:', err);
        }
      );
    } else {
      console.warn('Geolocation not available');
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={handleLocate}
        className="p-2 text-gray-100 font-bold border shadow-xl rounded-lg"
      >
        📍 My location
      </button>
      <button onClick={() => navigate('/search')} className="p-2  border rounded-lg shadow-xl">
        🔍
      </button>
    </div>
  );
}
