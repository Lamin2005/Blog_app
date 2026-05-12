import { useEffect, useState } from "react";
import type { Posts } from "../types/post";
import PostCard from "../components/PostCard";
import { getPosts, searchPosts } from "../services/post";
import PostSkeleton from "../components/PostSkeleton";
import { Link } from "react-router-dom";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [totalpost, setTotalPost] = useState<number>(0);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [totalpage, setTotalPage] = useState<number>(1);
  const limit = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchdata = search.trim();
        if (searchdata) {
          const { posts, totalPosts, currentPage, totalPages } =
            await searchPosts(searchdata, page, limit);
          setPosts(posts);
          setTotalPost(totalPosts);
          setPage(currentPage);
          setTotalPage(totalPages);
        } else {
          const { posts, currentPage, totalPages } = await getPosts(
            page,
            limit,
          );
          setPosts(posts);
          setTotalPost(0);
          setPage(currentPage);
          setTotalPage(totalPages);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search, page]);

  console.log(search);
  console.log(posts);
  console.log(totalpost);
  console.log(page);
  console.log(totalpage);

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
            {loading ? (
              <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full" />
            ) : (
              "🔍"
            )}
          </span>
        </div>
      </div>

      {posts.length != 0 && totalpost != 0 && (
        <h2 className="mt-6 text-2xl font-semibold text-slate-200 mb-3">
          {`${totalpost} Post Found`}
        </h2>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && posts.length === 0
          ? Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={i} />)
          : posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>

      {!loading && totalpage > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
          <button
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded-lg border transition
              ${
                page === 1
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-indigo-500 cursor-pointer"
              }
            `}
          >
            Previous
          </button>

          <p className="text-gray-100">
            {page} / {totalpage}
          </p>

          <button
            disabled={page === totalpage}
            onClick={() => setPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded-lg border transition
              ${
                page === totalpage
                  ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                  : "bg-slate-900 text-white hover:bg-indigo-500 cursor-pointer"
              }
            `}
          >
            Next
          </button>
        </div>
      )}

      {posts.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center shadow-inner">
            <span className="text-3xl">{search ? "🕵️‍♂️" : "📝"}</span>
          </div>

          <h2 className="mt-6 text-2xl font-semibold text-slate-200">
            {search ? `No results for "${search}"` : "No Blogs Yet"}
          </h2>

          <p className="mt-2 text-sm text-slate-500 max-w-md">
            {search
              ? "Try adjusting your search keywords to find what you're looking for."
              : "You haven't created any posts yet. Start sharing your ideas."}
          </p>

          {!search && (
            <Link
              to={"/create"}
              className="cursor-pointer mt-6 px-5 py-2.5 rounded-xl bg-indigo-500 text-white text-sm hover:bg-indigo-600 transition shadow-md"
            >
              Create Your First Post
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
