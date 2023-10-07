import { FC, useState } from 'react';
import { AuthService } from '../service/auth.service';
import { toast } from 'react-toastify';

const Auth: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await AuthService.registration({ email, password });
            if (data) {
                toast.success('Account has been created');
                setIsLogin(!isLogin);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            // const data = await AuthService.registration({ email, password });
            // if (data) {
            //     toast.success('Account has been created');
            //     setIsLogin(!isLogin);
            // }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    };

    return (
        <div className='mt-40 flex flex-col justify-center items-center bg-slate-900 text-white'>
            <h1 className='text-center text-xl'>{isLogin ? 'Login' : 'Registration'}</h1>

            <form
                onSubmit={isLogin ? loginHandler : registrationHandler}
                className='flex w-1/3 flex-col mx-auto mt-5 gap-5'>
                <input type='text' className='input' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                <input
                    type='password'
                    className='input'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className='btn btn-green mx-auto'>Submit</button>
            </form>

            <div className='flex justify-center mt-5'>
                {isLogin ? (
                    <button onClick={() => setIsLogin(!isLogin)} className='text-slate-300 hover:text-white'>
                        You don't have an account?
                    </button>
                ) : (
                    <button onClick={() => setIsLogin(!isLogin)} className='text-slate-300 hover:text-white'>
                        Already have an account?
                    </button>
                )}
            </div>
        </div>
    );
};

export default Auth;
