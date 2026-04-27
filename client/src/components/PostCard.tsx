import { Link } from "react-router-dom";
import type { Posts } from "../types/post";

type Props = {
  post: Posts;
};

export default function PostCard({ post }: Props) {
  return (
    <div className="group bg-[#1e293b] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300">
      <div className="overflow-hidden">
        <img
          src={post.image.url}
          loading="lazy"
          className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      <div className="p-5">
        <p className="text-xs text-indigo-500 font-medium mb-2">
          {post.category}
        </p>

        <h3 className="text-lg font-semibold leading-snug group-hover:text-indigo-600 transition">
          {post.title}
        </h3>

        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {post.description}
        </p>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
          <span>{post.readTime} min read</span>

          <Link
            to={`/post-detail/${post._id}`}
            className="text-indigo-500 font-medium hover:underline"
          >
            Read →
          </Link>
        </div>
      </div>
    </div>
  );
}
