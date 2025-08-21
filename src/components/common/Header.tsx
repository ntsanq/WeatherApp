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
            navigate(`/?city=${encodeURIComponent(resolvedCity)}`);
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
    <div className="flex justify-between items-center">
      <button onClick={handleLocate} className="p-2">
        📍
      </button>
      <button onClick={() => navigate('/search')} className="p-2">
        🔍
      </button>
    </div>
  );
}
