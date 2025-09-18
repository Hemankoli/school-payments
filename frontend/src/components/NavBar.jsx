import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Button from "./Button";
import { useMainContext } from "../context";
import Theme from "./Theme";

export default function Navbar({ theme, toggleTheme }) {
  const { setModal } = useMainContext();

  return (
    <nav className="m-4 md:m-10 bg-white dark:bg-gray-900/0 backdrop-blur-md shadow-md rounded-sm px-6 py-4 mb-10 flex items-center justify-between transition-colors duration-300">
      <h1 className="text-xl md:text-3xl font-bold text-gradient-to-r from-orange-400 to-orange-600 tracking-wide">
        Dashboard
      </h1>
        <div className="hidden md:flex space-x-6 font-medium">
        <Link
          to="/admin-dashboard/transactions-by-school"
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-100"
        >
          By School
        </Link>
        <Link
          to="/admin-dashboard/check-status"
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-100"
        >
          Check Status
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <Theme theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className="flex items-center gap-3 md:hidden">
        <Theme theme={theme} toggleTheme={toggleTheme} />
        <IoMenu size={24} onClick={()=>setModal("menu-modal")} />
      </div>
    </nav>
  );
}
