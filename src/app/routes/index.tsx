import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import SearchPage from '@/pages/SearchPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ErrorFallback from '@/components/common/ErrorFallBack';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorFallback message="Something went wrong. Please reload the page!" />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
