import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from "./components/admin/layouts/dashboard";
import SimpleLayout from "./components/admin/layouts/simple";

//Login
import SignUp from "./components/auth/Auth";

// customer
import Home from "./components/user/Home/Home";
import DashboardAppPage from "./components/admin/pages/DashboardAppPage";
import UserPage from "./components/admin/pages/UserPage";
import ProductsPage from "./components/admin/pages/ProductsPage";
import BlogPage from "./components/admin/pages/BlogPage";
import Page404 from "./components/admin/pages/Page404";
import BookDetails from "./components/user/PostDetails/BookDetails";
import Checkout from "./components/user/pay/Checkout";

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/admin',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/admin/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/customer',
      element: <Home />,
    },
    {
      path: '/customer/book/:id',
      element: <BookDetails />,
    },
    {
      path: '/login',
      element: <SignUp />,

    },
    {
      path: '/payment',
      element: <Checkout />,

    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },

      ],
    },
    {
      path: '*',
      element: <Navigate to="login" replace />,
    },
  ]);

  return routes;
}
