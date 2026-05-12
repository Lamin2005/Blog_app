import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../features/api/userapi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { logoutuser } from "../features/auth/AuthSlice";
import { Posts } from "../types/post";
import { useState } from "react";
import { deletePosts, onlyUserPosts } from "../services/post";

export default function Profile() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);
  const [posts, setPosts] = useState<Posts[]>([]);
  const [logout, { isLoading }] = useLogoutMutation();

 
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await onlyUserPosts();
        setPosts(response);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setloading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();

      dispatch(logoutuser());
      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingPostId(id);
      const response = await deletePosts(id);
      setPosts(posts.filter((post) => post._id !== id));
      setDeletingPostId(null);
      toast.success(`${response}`);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
      setDeletingPostId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            {userInfo?.images?.url ? (
              <img
                src={userInfo.images.url}
                loading="lazy"
                className="w-28 h-28 rounded-full object-cover border-4 border-slate-800"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-indigo-500 text-white flex items-center justify-center text-3xl font-bold">
                {userInfo?.name?.charAt(0)}
              </div>
            )}

            <Link to={"/edit-profile"} className="absolute cursor-pointer bottom-0 right-0 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full shadow-md">
              ✏️
            </Link>
          </div>

          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold text-white">{userInfo?.name}</h2>
            <p className="text-slate-400 text-sm">{userInfo?.email}</p>

            <button
              className="mt-4 cursor-pointer px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm"
              onClick={handleLogout}
              disabled={isLoading}
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-white mb-4">
          Your Posts - {posts.length > 0 && ` (${posts.length})`}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center overflow-y-auto max-h-[600px] no-scrollbar">
          {loading ? (
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-[80%] bg-slate-900 border border-slate-800 rounded-xl p-4 animate-pulse"
              >
                <div className="w-full h-36 bg-slate-700 rounded-lg mb-3"></div>
                <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-slate-700 rounded w-full"></div>
              </div>
            ))
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post._id}
                className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col gap-3"
              >
                <Link to={`/post-detail/${post._id}`} className="text-white">
                  {post.image?.url && (
                    <img
                      src={post.image.url}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-36 object-cover rounded-lg hover:scale-105 transition duration-300"
                    />
                  )}
                  <span className="mt-2"> {post.title}</span>
                </Link>

                <button
                  disabled={loading}
                  className={`py-2 px-4 rounded-lg text-white ${
                    loading
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 cursor-pointer"
                  }`}
                  onClick={() => handleDelete(post._id)}
                >
                  {deletingPostId === post._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-400">
              You have not created any posts yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
