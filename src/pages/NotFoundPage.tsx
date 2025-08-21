import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <Link to="/" className="absolute left-10 top-10 text-gray-100 hover:underline inline-block">
        ← Back to Home
      </Link>
      <div className="flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center px-4 text-gray-200">
        <div className="max-w-md text-center">
          <h1 className="text-[7rem] font-extrabold text-red-500 drop-shadow-lg">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mt-4">Oops! Page not found</h2>
        </div>
      </div>
    </>
  );
}
