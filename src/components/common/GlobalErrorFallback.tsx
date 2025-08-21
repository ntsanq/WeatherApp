import type { FallbackProps } from 'react-error-boundary';

export default function GlobalErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-red-600">
        Sorry, something went wrong. We are working on it!
      </h1>
      <p className="mt-2 text-gray-500">{error.message}</p>
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-gray-100"
        onClick={resetErrorBoundary}
      >
        Try Again
      </button>
    </div>
  );
}
