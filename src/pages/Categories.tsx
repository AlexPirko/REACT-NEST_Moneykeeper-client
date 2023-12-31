import { FC, useState } from 'react';
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import CategoryModal from '../components/CategoryModal';
import { instance } from '../api/axios.api';
import { ICategory } from '../types/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, react-refresh/only-export-components
export const categoriesAction = async ({ request }: any) => {
    switch (request.method) {
        case 'POST': {
            const formData = await request.formData();
            const title = {
                title: formData.get('title'),
            };
            await instance.post('/categories', title);
            return null;
        }
        case 'PATCH': {
            const formData = await request.formData();
            const category = {
                id: formData.get('id'),
                title: formData.get('title'),
            };
            await instance.patch(`/categories/category/${category.id}`, category);
            return null;
        }
        case 'DELETE': {
            const formData = await request.formData();
            const categoryId = formData.get('id');
            await instance.delete(`/categories/category/${categoryId}`);
            return null;
        }
    }
};

// eslint-disable-next-line react-refresh/only-export-components
export const categoryLoader = async () => {
    const { data } = await instance.get<ICategory[]>('/categories');
    return data;
};

const Categories: FC = () => {
    const categories = useLoaderData() as ICategory[];
    const [categoryId, setCategoryId] = useState<number>(0);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    return (
        <>
            <div className='mt-10 p-4 rounded-md bg-slate-800'>
                <h1>Your category list:</h1>
                <div className='flex items-center mt-2 flex-wrap gap-2'>
                    {categories.map((category, idx) => (
                        <div
                            key={idx}
                            className='group relative py-2 px-4 rounded-lg bg-blue-600 flex items-center gap-2'>
                            {category.title}
                            <div className='px-2 py-2 absolute left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 hidden items-center justify-between group-hover:flex'>
                                <button
                                    onClick={() => {
                                        setCategoryId(category.id);
                                        setVisibleModal(true);
                                        setIsEdit(true);
                                    }}>
                                    <AiFillEdit />
                                </button>

                                <Form className='flex' method='delete' action='/categories'>
                                    <input type='hidden' name='id' value={category.id} />
                                    <button type='submit'>
                                        <AiFillCloseCircle />
                                    </button>
                                </Form>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setVisibleModal(true)}
                    className='max-w-fit flex items-center mt-3 gap-2 text-white/50 hover:text-white'>
                    <FaPlus />
                    <span>Create a new category</span>
                </button>
            </div>

            {visibleModal && <CategoryModal type='post' setVisibleModal={setVisibleModal} />}

            {visibleModal && isEdit && <CategoryModal type='patch' id={categoryId} setVisibleModal={setVisibleModal} />}
        </>
    );
};

export default Categories;
