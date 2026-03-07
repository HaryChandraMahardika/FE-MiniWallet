import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      toast.success("Logout success");
    } catch (err) { }

    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center transition-all">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <h1 className="font-black text-xl tracking-tighter text-gray-800 uppercase">
          Mini<span className="text-blue-600">Wallet</span>
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end leading-none">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Akun Anda</span>
          <span className="text-sm font-black text-gray-800">{user?.username}</span>
        </div>

        <button
          onClick={handleLogout}
          className="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-5 py-2 rounded-xl font-bold text-sm transition-all duration-300 border border-transparent hover:border-red-100 shadow-sm cursor-pointer"
        >
          Keluar
        </button>
      </div>
    </nav>
  );
}

export default Navbar;