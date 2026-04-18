import { Link } from "react-router-dom";

export default function PostCard() {
  return (
    <div className="group bg-[#1e293b] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
      <div className="overflow-hidden">
        <img
          src="https://via.placeholder.com/400"
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-indigo-500 font-medium mb-2">Technology</p>

        <h3 className="text-lg font-semibold leading-snug group-hover:text-indigo-600 transition">
          Build a Premium UI with Tailwind CSS
        </h3>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          Learn how to design modern and clean UI using Tailwind CSS...
        </p>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <span>5 min read</span>

          <Link
            to="/post-detail"
            className="text-indigo-500 font-medium hover:underline"
          >
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
}
