import { Link } from "react-router-dom";
import { ShoppingCart, UserPlus, LogIn, LogOut, Lock } from "lucide-react";
import { useUserStore } from "../store/useUserStore";
function Navbar() {
  const { user, logout } = useUserStore();
  const isAdmin = user?.role === "admin";
  return (
    <header className="fixed top-0 left-0 w-full bg-white backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-b-white h-20 ">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between flex-wrap items-center">
          <Link
            to="/"
            className="text-3xl font-bold text-black hover:text-gray-600 transition-colors duration-300 items-center space-x-2"
          >
            QuickComm.
          </Link>
          <nav className="flex flex-wrap items-center gap-4">
            <Link
              to="/"
              className="text-black hover:text-gray-600 transition-colors duration-300 ease-in-out"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/cart"
                className="relative group text-black hover:text-gray-600 transition-colors duration-300 ease-in-out"
              >
                <ShoppingCart
                  className="inline-block mr-1 group-hover:text-black "
                  size={20}
                />
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute -top-2 -left-2 bg-green-500 text-white rounded-full px-2 py-0.5 text-xs group:hover:text-black transition duration-300 ease-in-out">
                  3
                </span>
              </Link>
            )}
            {isAdmin && (
              <Link className="bg-emerald-500 text-white px-3 py-1 rounded-md hover:bg-emerald-600 transition-colors duration-300 ease-in-out font-medium flex items-center">
                <Lock className="inline-block mr-1 " size={18} />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            )}

            {user ? (
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition ease-in-out"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline ml-2">Logout</span>
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md flex items-center transition ease-in-out duration-300 "
                >
                  <UserPlus className="mr-2 " size={18} />
                  SignUp
                </Link>
                <Link
                  to="/login"
                  className="bg-orange-500 hover:bg-orange-700 text-white py-2 px-4 rounded-md flex items-center transition ease-in-out duration-300"
                >
                  <LogIn className="mr-2 " size={18} />
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
