import { Outlet } from "react-router";

export const AuthLayout = ({ children }) => {
  return (
    <div >
     <Outlet />
    </div>
  );
};