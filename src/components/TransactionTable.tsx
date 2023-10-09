import { FC, useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTransLoader, ITransaction } from '../types/types';
import { formatDate } from '../helpers/date-format';
import { formatToUSD } from '../helpers/currency-fomat';
import { instance } from '../api/axios.api';
import ReactPaginate from 'react-paginate';

interface ITransTable {
    limit: number;
}

const TransactionTable: FC<ITransTable> = ({ limit = 3 }) => {
    const { transactions } = useLoaderData() as IResponseTransLoader;

    const [data, setData] = useState<ITransaction[]>([]);
    const [currPage, setCurrPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const fetchTransactions = async (page: number) => {
        const response = await instance.get(`transactions/pagination?page=${page}&limit=${limit}`);
        setData(response.data);
        setTotalPages(Math.ceil(transactions.length / limit));
    };

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrPage(selectedItem.selected + 1);
    };

    useEffect(() => {
        fetchTransactions(currPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currPage, transactions]);

    return (
        <>
            <ReactPaginate
                className='flex gap-3 justify-end mt-4 items-center'
                activeClassName='bg-blue-600 rounded-sm'
                pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
                previousClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
                nextClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
                disabledClassName='text-white/50 cursor-not-allowed'
                disabledLinkClassName='text-slate-600 cursor-not-allowed'
                pageCount={totalPages}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
            />

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
                        {data.map((trans, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{trans.title}</td>
                                <td className={trans.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                                    {formatToUSD.format(trans.amount)}
                                </td>
                                <td>{trans.category?.title || 'Other'}</td>
                                <td>{formatDate(trans.createdAt)}</td>
                                <td>
                                    <Form method='delete' action='/transactions'>
                                        <input type='hidden' name='id' value={trans.id} />
                                        <button className='btn hover:btn-red ml-auto'>
                                            <FaTrash />
                                        </button>
                                    </Form>
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
