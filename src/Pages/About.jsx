import axios from "axios";
import { isRouteErrorResponse, Link, useLoaderData, useRouteError } from "react-router";

/* Route modules intentionally export both data APIs and components. */
/* eslint-disable react-refresh/only-export-components */
export const loader = async () => {
    const[ users , posts , carts ] = await Promise.all([
        axios.get('https://dummyjson.com/users'),
        axios.get('https://dummyjson.com/posts'),
        axios.get('https://dummyjson.com/carts')
    ]);
    return { users: users.data.users, posts: posts.data.posts, carts: carts.data.carts };
}

export const Component = () => {
    const { users } = useLoaderData();
    return (
        <div className="w-full  text-black">
            {users?.map((user) => (

                <Link to={`/users/${user.id}`} key={user.id} className="w-full  text-black p-4 m-2 rounded shadow-md">
                    <h1 className="text-xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
                    <p className="text-gray-700 mb-2">Email: {user.email}</p>
                    <p className="text-gray-700 mb-2">Phone: {user.phone}</p>
                    <p className="text-gray-700 mb-2">Age: {user.age}</p>
                    <p className="text-gray-700 mb-2">Gender: {user.gender}</p>
                    <p className="text-gray-700 mb-2">Address: {user.address.address}, {user.address.city}, {user.address.state}, {user.address.postalCode}</p>
                </Link>

            ))}
        </div>
    )
}

export const ErrorBoundary = () => {
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <div className="w-full h-screen bg-red-500 text-black flex items-center justify-center">
                <h1 className="text-2xl font-bold">Error: {error.message}</h1>
            </div>
        )
    }

    return <p className="p-4 text-red-600">Unable to load users.</p>;

}