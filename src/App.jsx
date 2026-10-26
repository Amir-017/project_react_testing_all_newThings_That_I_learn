import { useQuery } from "@tanstack/react-query";
import { api } from "./api/axios";
import { queryClient } from "./Tank stack/queryClient";


const usersQuery = {
  queryKey: ["users"],
  queryFn: async () => {
    const { data } = await api.get("/users");
    return data.users;
  },
};


export async function loader() {
  await queryClient.ensureQueryData(usersQuery);
  return null;
}

export function Component() {
  const { data: users } = useQuery(usersQuery);

  return (
    <div className="">
      <h1>all users</h1>
      <p>Here are all the users:</p>
      <ul className="grid  grid-cols-3 gap-2">
        {users?.map((user) => (
          <li key={user.id} className=" border p-2 rounded-md shadow-sm">
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ErrorBoundary() {
  return <p>there was an error when fetching users.</p>;
}