import { Link } from 'react-router-dom';

export default function ErrorFallback({ message }: { message: string }) {
  return (
    <>
      <Link to="/" className="absolute left-10 top-10 text-gray-100 hover:underline inline-block">
        ← Back to Home
      </Link>
      <div className="flex h-screen flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-red-500">{message}</h1>
      </div>
    </>
  );
}
