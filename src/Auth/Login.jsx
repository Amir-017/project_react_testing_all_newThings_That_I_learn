import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { useNavigate } from 'react-router';
const FormSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
});


export const Component = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: '',
            email: '',
          
        },
    });
    const onSubmit = (data) => {
        navigate('/about');
    };
   return (
    <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
        <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    {...register('username')}
                    className={`w-full px-3 py-2 border rounded ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full px-3 py-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
                Login
            </button>
        </form>
    </div>
   );
}