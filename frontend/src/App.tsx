import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "@/redux";
import { HelmetProvider } from 'react-helmet-async';
import { PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LoadingSpinner, ProtectedRoute, ProtectedAdminRoute } from "./components";
import { lazy, Suspense } from "react";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Home = lazy(() => import('./pages/Home/Home'));
const ProductsPage = lazy(() => import('./pages/ProductsPage/ProductsPage'));
const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'));
const Error = lazy(() => import('./pages/Error/Error'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const SizesGuide = lazy(() => import('./pages/SizesGuide/SizesGuide'));
const CartPage = lazy(() => import('./pages/CartPage/CartPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RecoverAccount = lazy(() => import('./pages/RecoverAccount/RecoverAccount'));
const RestorePassword = lazy(() => import('./pages/RestorePassword/RestorePassword'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const VerifyAccount = lazy(() => import('./pages/VerifyAccount/VerifyAccount'));
const ShippingAddressPage = lazy(() => import('./pages/ShippingAddressPage/ShippingAddressPage'));
const PaymentMethodPage = lazy(() => import('./pages/PaymentMethodPage/PaymentMethodPage'));
const PlaceOrderPage = lazy(() => import('./pages/PlaceOrderPage/PlaceOrderPage'));
const OrderPage = lazy(() => import('./pages/OrderPage/OrderPage'));
const OrderHistoryPage = lazy(() => import('./pages/OrderHistoryPage/OrderHistoryPage'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Ordersboard = lazy(() => import('./pages/Ordersboard/Ordersboard'));
const Productsboard = lazy(() => import('./pages/Productsboard/Productsboard'));
const Usersboard = lazy(() => import('./pages/Usersboard/Usersboard'));
const UpdateUserPage = lazy(() => import('./pages/UpdateUserPage/UpdateUserPage'));
const UpdateProductPage = lazy(() => import('./pages/UpdateProductPage/UpdateProductPage'));
const CreateProductPage = lazy(() => import('./pages/CreateProductPage/CreateProductPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />
  },
  {
    path: '/products',
    element: <ProductsPage />
  },
  {
    path: '/search',
    element: <SearchPage />
  },
  {
    path: '/products/:slug',
    element: <ProductPage />
  },
  {
    path: '/sizes-guide',
    element: <SizesGuide /> 
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
    path: '/restore-password',
    element: <RecoverAccount />
  },
  {
    path: '/restore-password/:id',
    element: <RestorePassword />
  },
  {
    path: '/verify/:id',
    element: <VerifyAccount /> 
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
        path: '/dashboard',
        element: <ProtectedAdminRoute />,
        children: [
          {
            path: '',
            element: <Dashboard />
          },
          {
            path: 'orders',
            element: <Ordersboard />
          },
          {
            path: 'products',
            element: <Productsboard />
          },
          {
            path: 'products/create-product',
            element: <CreateProductPage />
          },
          {
            path: 'products/update-product/:slug',
            element: <UpdateProductPage />
          },
          {
            path: 'users',
            element: <Usersboard />,
          },
          {
            path: 'users/update-user/:id',
            element: <UpdateUserPage />
          }
        ]
      }
    ]
  }
]);

interface AppInterface {}

const paypalOptions: ReactPayPalScriptOptions = {
  'clientId': 'sb',
}

const App: React.FC<AppInterface> = () => {
  const queryClient = new QueryClient();

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Suspense fallback={<LoadingSpinner type='noflex' />}>
              <ToastContainer position="bottom-center" limit={3} autoClose={3000} />
              <RouterProvider router={router} />
              <ReactQueryDevtools initialIsOpen={false} />
            </Suspense>
          </Provider>
        </QueryClientProvider>
      </HelmetProvider>
    </PayPalScriptProvider>
  )
}

export default App