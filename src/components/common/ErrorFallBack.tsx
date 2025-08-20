export default function ErrorFallback() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-red-600">Something went wrong 😢</h1>
      <p className="text-gray-500">Please try again later.</p>
      <a href="/" className="mt-4 text-blue-500 underline">
        Back to Home
      </a>
    </div>
  );
}
