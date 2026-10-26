import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router';

const FormSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }).min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
    isAdmin: z.boolean(),
    createdAt: z.coerce.date({ message: "Please select a date" }),
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
            isAdmin: true,
            createdAt: new Date(),
        },
    });

    const onSubmit = (data) => {
        console.log(data);
        navigate('/login');
    };

    return (
        <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
            <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

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

                <div className="mb-4 flex items-center justify-between">
                    <label htmlFor="isAdmin" className="text-gray-700 font-bold">
                        Is Admin
                    </label>
                    <input
                        type="checkbox"
                        id="isAdmin"
                        {...register('isAdmin')}
                        className="w-5 h-5 accent-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="createdAt" className="block text-gray-700 font-bold mb-2">
                        Creation Date
                    </label>
                    <input
                        type="date"
                        id="createdAt"
                        {...register('createdAt')}
                        className={`w-full px-3 py-2 border rounded ${errors.createdAt ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.createdAt && <p className="text-red-500 text-sm mt-1">{errors.createdAt.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                >
                    Register
                </button>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}
