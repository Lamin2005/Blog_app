import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          className="text-2xl font-bold tracking-tight text-indigo-500"
          to={"/"}
        >
          BlogApp
        </Link>

        <nav className="hidden md:flex items-center ml-12 gap-8 text-sm font-medium text-white">
          <Link to="/" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link to="/create" className="hover:text-indigo-400 transition">
            Write
          </Link>
          <Link to="/profile" className="hover:text-indigo-400 transition">
            Profile
          </Link>

        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition">
            Login
          </button>
          <button className="px-4 py-2 rounded-xl border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition">
            Register
          </button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-4">
          <nav className="flex flex-col gap-4 text-white text-sm">
            <Link
              onClick={() => setOpen(false)}
              to="/"
              className="hover:text-indigo-400"
            >
              Home
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/create"
              className="hover:text-indigo-400"
            >
              Write
            </Link>
            <Link
              onClick={() => setOpen(false)}
              to="/profile"
              className="hover:text-indigo-400"
            >
              Profile
            </Link>
          </nav>

          <div className="flex flex-col gap-3 pt-3 border-t border-slate-800">
            <button className="px-4 py-2 rounded-xl bg-indigo-500 text-white">
              Login
            </button>
            <button className="px-4 py-2 rounded-xl border border-indigo-500 text-indigo-400">
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
