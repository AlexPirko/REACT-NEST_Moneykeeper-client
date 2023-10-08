import { FC } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import { IResponseTransLoader } from '../types/types';
import { formatDate } from '../helpers/date-format';
import { formatToUSD } from '../helpers/currency-fomat';

const TransactionTable: FC = () => {
    const { transactions } = useLoaderData() as IResponseTransLoader;

    return (
        <>
            <div className='mt-4 rounded-md bg-slate-800 px-4 py-3'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <td className='font-bold'>№</td>
                            <td className='font-bold'>Title</td>
                            <td className='font-bold'>Amount($)</td>
                            <td className='font-bold'>Category</td>
                            <td className='font-bold'>Date</td>
                            <td className='text-right'>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((trans, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{trans.title}</td>
                                <td className={trans.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                                    {formatToUSD.format(trans.amount)}
                                </td>
                                <td>{trans.category.title}</td>
                                <td>{formatDate(trans.createdAt)}</td>
                                <td>
                                    <button className='btn hover:btn-red ml-auto'>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TransactionTable;
