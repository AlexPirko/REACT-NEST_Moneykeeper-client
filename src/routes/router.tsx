import { createBrowserRouter } from 'react-router-dom';
import Transactions, { transactionsAction, transactionsLoader } from '../pages/Transactions';
import Categories, { categoriesAction, categoryLoader } from '../pages/Categories';
import Layout from '../pages/Layout';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import ProtectedRoute from '../components/ProtectedRoute';

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
                        action: transactionsAction,
                        loader: transactionsLoader,
                        element: (
                            <ProtectedRoute>
                                <Transactions />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'categories',
                        action: categoriesAction,
                        loader: categoryLoader,
                        element: (
                            <ProtectedRoute>
                                <Categories />
                            </ProtectedRoute>
                        ),
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
