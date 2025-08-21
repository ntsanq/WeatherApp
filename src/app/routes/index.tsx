import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@/pages/HomePage.tsx';
import ErrorFallback from '@/components/common/ErrorFallBack.tsx';
import NotFoundPage from '@/pages/NotFoundPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorFallback message="Something went wrong. Please reload the page!" />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
