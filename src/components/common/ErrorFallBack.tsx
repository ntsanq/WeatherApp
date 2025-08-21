export default function ErrorFallback({ message }: { message: string }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold text-red-600">{message}</h1>
      <a href="/" className="mt-4 text-blue-500 underline">
        Back to Home
      </a>
    </div>
  );
}
