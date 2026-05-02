import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../features/api/userapi";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { logoutuser } from "../features/auth/AuthSlice";

export default function Profile() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout, { isLoading }] = useLogoutMutation();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

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

  // dummy posts (FIXED UNIQUE KEY)
  const posts = [
    { _id: "1", title: "Post 1" },
    { _id: "2", title: "Post 2" },
    { _id: "3", title: "Post 3" },
    { _id: "4", title: "Post 4" },
    { _id: "5", title: "Post 5" },
    { _id: "6", title: "Post 6" },
    { _id: "7", title: "Post 7" },
    { _id: "8", title: "Post 8" },
    { _id: "9", title: "Post 9" },
    { _id: "10", title: "Post 1" },
    { _id: "11", title: "Post 2" },
    { _id: "12", title: "Post 3" },
    { _id: "13", title: "Post 4" },
    { _id: "14", title: "Post 5" },
    { _id: "15", title: "Post 6" },
    { _id: "16", title: "Post 7" },
    { _id: "17", title: "Post 8" },
    { _id: "18", title: "Post 9" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            {userInfo?.images?.url ? (
              <img
                src={userInfo.images.url}
                className="w-28 h-28 rounded-full object-cover border-4 border-slate-800"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-indigo-500 text-white flex items-center justify-center text-3xl font-bold">
                {userInfo?.name?.charAt(0)}
              </div>
            )}

            <button className="absolute cursor-pointer bottom-0 right-0 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full shadow-md">
              ✏️
            </button>
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

      {/* POSTS */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-white mb-4">Your Posts</h3>

        <div className="grid sm:grid-cols-2 gap-4 overflow-y-auto max-h-96 no-scrollbar">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between"
            >
              <Link to={`/post-detail/${post._id}`} className="text-white">
                {post.title}
              </Link>

              <button className="text-red-400 cursor-pointer hover:text-red-500">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
