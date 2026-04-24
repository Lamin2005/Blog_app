import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="text-center max-w-xl">
        <div className="relative mx-auto w-28 h-28 mb-6">
          <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full"></div>
          <div className="relative flex items-center justify-center w-full h-full rounded-full bg-slate-900 border border-slate-800 text-4xl">
            🚫
          </div>
        </div>

        <h1 className="text-6xl font-extrabold bg-linear-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-slate-200">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-500 text-sm leading-relaxed">
          The page you're looking for doesn’t exist or has been moved. Try going
          back to the homepage.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition shadow-md"
          >
            ⬅ Back Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm hover:bg-slate-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
