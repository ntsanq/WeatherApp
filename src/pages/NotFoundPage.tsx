export default function NotFoundPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center px-4 text-gray-100">
      <div className="max-w-md text-center">
        <h1 className="text-[10rem] font-extrabold text-red-500 drop-shadow-lg">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mt-4">Oops! Page not found</h2>
        <p className="mt-2">The page you are looking for does not exist or has been moved.</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-500 px-6 py-3 text-gray-100 font-medium shadow-lg hover:bg-blue-600 transition-colors"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
