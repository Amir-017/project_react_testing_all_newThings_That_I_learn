import { Outlet } from "react-router";
import { Navbar } from "../Components/Navbar";

export const MainLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <Outlet/>
    </div>
  );
};