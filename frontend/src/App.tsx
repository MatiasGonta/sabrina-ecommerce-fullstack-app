import { Home, Error, ProductPage, CartPage, LoginPage, RegisterPage, ShippingAddressPage, PaymentMethodPage, PlaceOrderPage, OrderPage } from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from "./context";
import { ProtectedRoute } from "./components";

interface AppInterface {}

// Reemplazado por react-query: axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/';

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
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </ThemeProvider>
  )
}

export default App