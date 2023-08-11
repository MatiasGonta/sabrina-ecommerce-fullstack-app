import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from "./context";
import { LoadingSpinner, ProtectedRoute, ProtectedAdminRoute } from "./components";
import { lazy, Suspense } from "react";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface AppInterface {}

// Reemplazado por react-query: axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/';

const Home = lazy(() => import('./pages/Home/Home'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));
const Error = lazy(() => import('./pages/Error/Error'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const ShippingAddressPage = lazy(() => import('./pages/ShippingAddressPage/ShippingAddressPage'));
const PaymentMethodPage = lazy(() => import('./pages/PaymentMethodPage/PaymentMethodPage'));
const PlaceOrderPage = lazy(() => import('./pages/PlaceOrderPage/PlaceOrderPage'));
const OrderPage = lazy(() => import('./pages/OrderPage/OrderPage'));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage/OrderHistoryPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/search',
    element: <SearchPage />
  },
  {
    path: '/product/:slug',
    element: <ProductPage />
  },
  {
    path: '/favorites',
    element: <FavoritesPage />
  },
  {
    path: '/cart',
    element: <CartPage />
  },
  {
    path: '/signin',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <RegisterPage />
  },
  {
    path: '',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/shipping',
        element: <ShippingAddressPage />
      },
      {
        path: '/payment',
        element: <PaymentMethodPage />
      },
      {
        path: '/placeorder',
        element: <PlaceOrderPage />
      },
      {
        path: '/order/:id',
        element: <OrderPage />
      },
      {
        path: '/orderhistory',
        element: <OrderHistoryPage />
      },
      {
        path: '',
        element: <ProtectedAdminRoute />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />
          }
        ]
      }
    ]
  }
]);

const paypalOptions: ReactPayPalScriptOptions = {
  'clientId': 'sb',
}

const App: React.FC<AppInterface> = () => {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider>
      <PayPalScriptProvider options={paypalOptions} deferLoading={true}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoadingSpinner type='noflex' />}>
              <ToastContainer position="bottom-center" limit={3} />
              <RouterProvider router={router} />
              <ReactQueryDevtools initialIsOpen={false} />
            </Suspense>
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </ThemeProvider>
  )
}

export default App