export default function NotFoundPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="mt-2 text-lg text-gray-600">Page not found</p>
      <a href="/" className="mt-4 text-blue-500 underline">
        Back to Home
      </a>
    </div>
  );
}
