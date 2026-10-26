import { Link } from "react-router";

export const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
     <Link to='/login' className="">Login</Link>
     <Link to='/register'>Register</Link>
     <Link to='/about'>About</Link>
     <Link to='/'>Home</Link>
      {/* <Link to='/users/1'>User Details</Link> */}
      <Link to='/zustand'>Zustand</Link>
    </div>
  );
};