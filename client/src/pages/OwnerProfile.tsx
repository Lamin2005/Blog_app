import { useParams, Link } from "react-router-dom";
import { useOwenerProfileQuery } from "../features/api/userapi";

function OwnerProfile() {
  //   interface UserProfileType {
  //     _id: string;
  //     name: string;
  //     email: string;
  //     images?: {
  //       url: string;
  //     };
  //   }

  interface PostType {
    _id: string;
    title: string;
    category: string;
    description: string;
    image?: {
      url: string;
    };
  }

  const { id } = useParams();

  const { data } = useOwenerProfileQuery(id!, {
    skip: !id,
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* PROFILE CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* PROFILE IMAGE */}
          <div className="shrink-0">
            {data?.user?.images.url != "" ? (
              <img
                src={data?.user?.images.url}
                loading="lazy"
                alt="profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-indigo-500 text-white flex items-center justify-center text-3xl font-bold">
                {data?.user?.name?.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {data?.user?.name}
            </h1>

            <p className="text-slate-400 mt-2 text-sm md:text-base">
              Full Stack MERN Developer
            </p>

          
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
              <div className="bg-slate-800 px-5 py-3 rounded-2xl">
                <h2 className="text-white text-xl font-bold">
                  {data?.posts?.length}
                </h2>
                <p className="text-slate-400 text-sm">Posts</p>
              </div>

              <div className="bg-slate-800 px-5 py-3 rounded-2xl">
                <h2 className="text-white text-xl font-bold">12k</h2>
                <p className="text-slate-400 text-sm">Followers</p>
              </div>

              <div className="bg-slate-800 px-5 py-3 rounded-2xl">
                <h2 className="text-white text-xl font-bold">310</h2>
                <p className="text-slate-400 text-sm">Following</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* POSTS SECTION */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Latest Posts</h2>

          <button className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-white text-sm">
            Follow
          </button>
        </div>

        {/* POSTS GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CARD */}
          {data?.posts.map((post: PostType) => {
            return (
              <div
                key={post._id}
                className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500 transition duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.image?.url}
                    alt={post?.title}
                    className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-5">
                  <span className="text-xs bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full">
                    {post?.category}
                  </span>

                  <h3 className="mt-4 text-lg font-semibold text-white line-clamp-2">
                    {post?.title}
                  </h3>

                  <p className="text-slate-400 text-sm mt-3 line-clamp-3">
                    {post?.description}
                  </p>

                  <div className="flex items-center justify-between mt-5">
                    <p className="text-slate-500 text-sm">5 min read</p>

                    <Link
                      to={`/post-detail/${post?._id}`}
                      className="text-indigo-400 hover:text-indigo-300 text-sm"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* CARD 
          <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500 transition duration-300">
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                alt="post"
                className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            <div className="p-5">
              <span className="text-xs bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full">
                Node.js
              </span>

              <h3 className="mt-4 text-lg font-semibold text-white line-clamp-2">
                Advanced Backend Authentication with JWT & Cookies
              </h3>

              <p className="text-slate-400 text-sm mt-3 line-clamp-3">
                Understand secure authentication systems using JWT, refresh
                tokens, and HTTP-only cookies in MERN apps.
              </p>

              <div className="flex items-center justify-between mt-5">
                <p className="text-slate-500 text-sm">8 min read</p>

                <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                  Read More →
                </button>
              </div>
            </div>
          </div>

          
          <div className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-indigo-500 transition duration-300">
            <div className="overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                alt="post"
                className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
              />
            </div>

            <div className="p-5">
              <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                MongoDB
              </span>

              <h3 className="mt-4 text-lg font-semibold text-white line-clamp-2">
                Understanding MongoDB Indexing for Faster Search
              </h3>

              <p className="text-slate-400 text-sm mt-3 line-clamp-3">
                Learn how MongoDB indexing improves search performance and
                reduces database query execution time.
              </p>

              <div className="flex items-center justify-between mt-5">
                <p className="text-slate-500 text-sm">6 min read</p>

                <button className="text-indigo-400 hover:text-indigo-300 text-sm">
                  Read More →
                </button>
              </div>
            </div>
          </div>*/}
        </div>
      </div>
    </div>
  );
}

export default OwnerProfile;
