/* eslint-disable react-refresh/only-export-components */
import { FC } from 'react';
import TransactionsForm from '../components/TransactionsForm';
import { instance } from '../api/axios.api';
import { ICategory } from '../types/types';
import { toast } from 'react-toastify';
import TransactionTable from '../components/TransactionTable';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transactionsAction = async ({ request }: any) => {
    switch (request.method) {
        case 'POST': {
            const formData = await request.formData();
            const newTransaction = {
                title: formData.get('title'),
                amount: +formData.get('amount'),
                category: formData.get('category'),
                type: formData.get('type'),
            };

            await instance.post('/transactions', newTransaction);
            toast.success('Transaction added');
            return null;
        }
        case 'DELETE': {
        }
    }
};

export const transactionsLoader = async () => {
    const categories = await instance.get<ICategory[]>('/categories');
    const transactions = await instance.get('/transactions');
    const data = {
        categories: categories.data,
        transactions: transactions.data,
    };
    return data;
};

const Transactions: FC = () => {
    return (
        <>
            <div className='grid grid-cols-3 gap-4 mt-4 items-start'>
                <div className='grid col-span-2'>
                    <TransactionsForm />
                </div>
                <div className='rounded-md bg-slate-800 p-3'>
                    <div className='grid grid-cols-2 gap-3'>
                        <div>
                            <p className='uppercase text-md font-bold text-center'>Total Income:</p>
                            <p className='mt-2 rounded-sm bg-green-600 p-1 text-center'>$1000</p>
                        </div>
                        <div>
                            <p className='uppercase text-md font-bold text-center'>Total Expense:</p>
                            <p className='mt-2 rounded-sm bg-red-500 p-1 text-center'>$100</p>
                        </div>
                    </div>
                    <>Chart</>
                </div>
            </div>

            <h1 className='my-5'>
                <TransactionTable />
            </h1>
        </>
    );
};

export default Transactions;
