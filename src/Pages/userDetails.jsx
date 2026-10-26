import axios from "axios";
import { isRouteErrorResponse, useLoaderData, useRouteError } from "react-router";

export const loader = async ({ params }) => {
    const { data } = await axios.get(`https://dummyjson.com/users/${params.id}`);
    return data;
}



export const Component = () => {
    const user = useLoaderData();
    console.log(user);
    return (
        <div className="w-full h-screen bg-gray-200 flex items-center justify-center">
            <h1 className="text-2xl font-bold">User Details Page</h1>
        </div>
    )
}

export const ErrorBoundary = () => {
    const error = useRouteError();
    console.log(error.message);
    if (isRouteErrorResponse(error)) {
        return (

            <div className="w-full h-screen bg-red-500 text-black flex items-center justify-center">
                <h1 className="text-2xl font-bold">Error: {error.message}</h1>
            </div>
        )
    }

}
