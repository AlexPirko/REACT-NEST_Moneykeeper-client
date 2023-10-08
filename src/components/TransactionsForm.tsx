import { FC, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTransLoader } from '../types/types';
import CategoryModal from './CategoryModal';

const TransactionsForm: FC = () => {
    const { categories } = useLoaderData() as IResponseTransLoader;
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    return (
        <div className='rounded-md bg-slate-800 p-4'>
            <Form className='grid gap-2' method='post' action='/transactions'>
                <label className='grid' htmlFor='title'>
                    <span>Title</span>
                    <input
                        className='input border-slate-700'
                        type='text'
                        name='title'
                        placeholder='Title...'
                        required
                    />
                </label>
                <label className='grid' htmlFor='amount'>
                    <span>Amount</span>
                    <input
                        className='input border-slate-700'
                        type='number'
                        name='amount'
                        placeholder='Amount...'
                        required
                    />
                </label>

                {categories?.length ? (
                    <label className='grid' htmlFor='category'>
                        <span>Category</span>
                        <select className='input border-slate-700 bg-slate-800' name='category' required>
                            {categories.map((ctg, idx) => (
                                <option key={idx} value={ctg.id}>
                                    {ctg.title}
                                </option>
                            ))}
                        </select>
                    </label>
                ) : (
                    <h1 className='mt-1 text-red-300'>To continue create a category first</h1>
                )}

                <button
                    onClick={() => setVisibleModal(true)}
                    className='max-w-fit flex items-center mt-2 gap-2 text-white/50 hover:text-white'>
                    <FaPlus />
                    <span>Manage Categories</span>
                </button>

                <div className='flex gap-4 items-center'>
                    <label className='flex cursor-pointer items-center gap-2'>
                        <input className='form-radio text-blue-600' type='radio' name='type' value={'income'} />
                        <span>Income</span>
                    </label>
                    <label className='flex cursor-pointer items-center gap-2'>
                        <input className='form-radio text-blue-600' type='radio' name='type' value={'expense'} />
                        <span>Expense</span>
                    </label>
                </div>

                <button className='btn btn-green max-w-fit mt-2'>Submit</button>
            </Form>

            {visibleModal && <CategoryModal type='post' setVisibleModal={setVisibleModal} />}
        </div>
    );
};

export default TransactionsForm;
