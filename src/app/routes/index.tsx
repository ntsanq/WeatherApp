import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "../../pages/HomePage.tsx";
import ForecastPage from "../../pages/ForecastPage.tsx";
import ErrorFallback from "../../components/common/ErrorFallBack.tsx";
import NotFoundPage from "../../pages/NotFoundPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>,
    errorElement: <ErrorFallback/>
  },
  {
    path: "/forecast",
    element: <ForecastPage/>,
    errorElement: <ErrorFallback/>
  },
  {
    path: "*",
    element: <NotFoundPage />, // catch-all route
  },
])

export default function AppRouter() {
  return <RouterProvider router={router}/>
}