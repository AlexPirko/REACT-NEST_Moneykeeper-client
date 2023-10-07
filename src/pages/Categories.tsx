import { FC, useState } from 'react';
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { Form } from 'react-router-dom';
import CategoryModal from '../components/CategoryModal';
import { instance } from '../api/axios.api';

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
            return null;
        }
        case 'DELETE': {
            return null;
        }
    }
};

const Categories: FC = () => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    return (
        <>
            <div className='mt-10 p-4 rounded-md bg-slate-800'>
                <h1>Your category list:</h1>
                <div className='flex items-center mt-2 flex-wrap gap-2'>
                    <div className='group relative py-2 px-4 rounded-lg bg-blue-600 flex items-center gap-2'>
                        Salary
                        <div className='adsolute px-2 py-2 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 hidden items-center justify-between group-hover:flex'>
                            <button>
                                <AiFillEdit />
                            </button>

                            <Form className='flex' method='delete' action='/categories'>
                                <input type='hidden' value={'Category ID'} />
                                <button type='submit'>
                                    <AiFillCloseCircle />
                                </button>
                            </Form>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => setVisibleModal(true)}
                    className='max-w-fit flex items-center mt-3 gap-2 text-white/50 hover:text-white'>
                    <FaPlus />
                    <span>Create a new category</span>
                </button>
            </div>

            {visibleModal && <CategoryModal type='post' setVisibleModal={setVisibleModal} />}
        </>
    );
};

export default Categories;
