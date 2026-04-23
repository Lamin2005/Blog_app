import { useEffect, useState } from "react";
import { Posts } from "../types/post";
import { getPostDetail } from "../services/post";
import { useParams } from "react-router-dom";
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
    <div className="max-w-3xl mx-auto">
      <img
        src={post?.image.url}
        className="w-full h-80 object-cover rounded-2xl mb-6"
      />

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
        {post?.title}
      </h1>

      <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
        <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
          A
        </div>
        <span>Admin</span>
        <span>•</span>

        {post && (
          <span>
            {" "}
            {new Date(post?.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}

        <span>•</span>
        <span>{post?.readTime} min read</span>
      </div>

      <div className="mt-8 space-y-5 text-gray-400 leading-relaxed text-[17px]">
        <p>{post?.description}</p>
      </div>
    </div>
  );
}
