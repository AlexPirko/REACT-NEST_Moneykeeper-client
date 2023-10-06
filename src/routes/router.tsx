import { createBrowserRouter } from 'react-router-dom';
import Transactions from '../pages/Transactions';
import Categories from '../pages/Categories';
import Layout from '../pages/Layout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Auth from '../pages/Auth';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: 'transactions',
                        element: <Transactions />,
                    },
                    {
                        path: 'categories',
                        element: <Categories />,
                    },
                    {
                        path: 'auth',
                        element: <Auth />,
                    },
                ],
            },
        ],
    },
]);
