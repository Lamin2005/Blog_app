import { useEffect, useState } from "react";
import type { Posts } from "../types/post";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/post";
import PostSkeleton from "../components/PostSkeleton";
import { Link } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Discover Modern Blogs
        </h1>
        <p className="text-gray-500 mt-3">
          Insights, tutorials, and ideas from developers
        </p>
      </div>
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && posts.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={i} />)
          : posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>

      {posts.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center shadow-inner">
            <span className="text-3xl">📝</span>
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-slate-200">
            No Blogs Yet
          </h2>

          <p className="mt-2 text-sm text-slate-500 max-w-md">
            You haven't created any posts yet. Start sharing your ideas with the
            world.
          </p>

          <Link
            to={"/create"}
            className="cursor-pointer mt-6 px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-sm hover:bg-indigo-600 transition shadow-md"
          >
            Create Your First Post
          </Link>
        </div>
      )}
    </div>
  );
}
