import { FC } from 'react';
import { Form } from 'react-router-dom';

interface Props {
    type: 'post' | 'patch';
    id?: number;
    setVisibleModal: (visible: boolean) => void;
}

const CategoryModal: FC<Props> = ({ type, setVisibleModal }) => {
    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center'>
            <Form action='/categories' method={type} className='grid gap-2 w-[300px] bg-slate-900 p-5 rounded-md'>
                <label htmlFor='title'>
                    <small>Category title</small>
                    <input className='input w-full mt-1' type='text' name='title' placeholder='Title...' />
                </label>

                <div className='flex items-center gap-2'>
                    <button className='btn btn-green' type='submit'>
                        {type === 'patch' ? 'Save' : 'Create'}
                    </button>
                    <button onClick={() => setVisibleModal(false)} className='btn btn-red'>
                        Close
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default CategoryModal;
