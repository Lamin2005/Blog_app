import { useEffect, useState } from "react";
import { Posts } from "../types/post";
import { getPostDetail } from "../services/post";
import { Link, useParams } from "react-router-dom";
import PostDetailSkeleton from "../components/PostDetailSkeleton";

export default function PostDetail() {
  const { id } = useParams<string>();
  const [post, setPost] = useState<Posts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      try {
        if (!id) return;
        const fetchdata = await getPostDetail(id);
        setPost(fetchdata);
        console.log(fetchdata);
      } catch (error) {
        console.log("Error in Detail Post : ", error);
      } finally {
        setLoading(false);
      }
    };

    getDetail();
  }, [id]);

  console.log(post);

  if (loading) {
    return <PostDetailSkeleton />;
  }

  return (
  <div className="max-w-3xl mx-auto px-3 sm:px-6">

  
  <img
    src={post?.image.url}
    className="w-full h-44 xs:h-52 sm:h-72 md:h-96 object-cover rounded-xl sm:rounded-2xl mb-5"
  />

  
  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

    <div>
      <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug break-words">
        {post?.title}
      </h1>

      <span className="inline-block mt-2 px-3 py-1 text-[10px] xs:text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
        {post?.category}
      </span>
    </div>

    <Link
      to={`/edit/${id}`}
      className="w-full sm:w-auto text-center px-3 py-2 text-xs xs:text-sm bg-slate-800 border border-slate-700 rounded-lg sm:rounded-xl text-white hover:bg-slate-700 transition"
    >
      ✏️ Edit
    </Link>

  </div>

  
  <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 sm:gap-3 mt-3 text-[10px] xs:text-xs sm:text-sm text-gray-500">

    <div className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
      A
    </div>

    <span>Admin</span>
    <span>•</span>

    {post && (
      <span>
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })}
      </span>
    )}

    <span>•</span>
    <span>{post?.readTime} min read</span>
  </div>

  {/* DESCRIPTION */}
  <div
    className="mt-6 sm:mt-8 prose prose-invert max-w-none text-[14px] xs:text-[15px] sm:text-[17px] leading-relaxed break-words"
    dangerouslySetInnerHTML={{ __html: post?.description || "" }}
  />

</div>
  );
}
