import { useNavigate, useLocation } from "react-router-dom";
import bnpParibasLogo from "../assets/BNP-Paribas.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Navbar */}
      <div className="navbar fixed top-0 left-0 w-full z-50 bg-white shadow-md flex justify-between items-center px-10 py-3">
        {/* Logo */}
        <span
          className="inline-flex items-center gap-3 text-black cursor-pointer hover:text-emerald-700 transition duration-200"
          onClick={() => navigate("/")}
        >
          <img
            src={bnpParibasLogo}
            alt="BNP Paribas"
            className="h-10 w-32 rounded bg-white object-cover"
          />
          <span className="hidden sm:inline text-sm font-medium whitespace-nowrap">
            The bank for a changing world
          </span>
        </span>

        {/* Right-side nav items */}
        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <button
            className={`rounded-full px-3 py-2 text-sm font-medium transition duration-200 ${
              isActive("/") ? "bg-emerald-100 text-emerald-900" : "text-gray-800 hover:text-emerald-700"
            }`}
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className={`rounded-full px-3 py-2 text-sm font-medium transition duration-200 ${
              isActive("/about") ? "bg-emerald-100 text-emerald-900" : "text-gray-800 hover:text-emerald-700"
            }`}
            onClick={() => navigate("/about")}
          >
            About
          </button>
          <button
            className={`rounded-full px-3 py-2 text-sm font-medium transition duration-200 ${
              isActive("/ContactUs") ? "bg-emerald-100 text-emerald-900" : "text-gray-800 hover:text-emerald-700"
            }`}
            onClick={() => navigate("/ContactUs")}
          >
            Contact
          </button>
          <button
            className={`rounded-full px-4 py-2 font-medium transition duration-200 ${
              isActive("/chatbot")
                ? "bg-emerald-100 text-emerald-900"
                : "text-gray-800 hover:text-emerald-700"
            }`}
            onClick={() => navigate("/chatbot")}
          >
            RAG Chat
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
