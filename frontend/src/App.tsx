import { Home, Error, ProductPage } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

interface AppInterface {}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/product/:slug',
    element: <ProductPage />
  },
  {
    path: '/Medium',
    element: <img />
  },
  {
    path: '/Hard',
    element: <img />
  }
]);

const App: React.FC<AppInterface> = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App