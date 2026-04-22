import { useEffect, useState } from "react";
import type { Posts } from "../types/post";
import PostCard from "../components/PostCard";
import { getPosts } from "../services/post";
import PostSkeleton from "../components/PostSkeleton";

export default function Home() {
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
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={i} />)
          : posts.map((post) => <PostCard key={post._id} post={post} />)}
      </div>
    </div>
  );
}
