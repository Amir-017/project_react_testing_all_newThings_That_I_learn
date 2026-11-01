import axios from "axios";
import { isRouteErrorResponse, useLoaderData, useRouteError } from "react-router";

/* Route modules intentionally export both data APIs and components. */
/* eslint-disable react-refresh/only-export-components */
export const loader = async ({ params }) => {
    const { data } = await axios.get(`https://dummyjson.com/users/${params.id}`);
    return data;
}



export const Component = () => {
    const user = useLoaderData();
    return (
        <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
            <div className="rounded bg-white p-6 shadow">
                <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                <p className="text-gray-700">{user.email}</p>
            </div>
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

    return <p className="p-4 text-red-600">Unable to load this user.</p>;

}
