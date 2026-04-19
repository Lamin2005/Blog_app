import PostCard from "../components/PostCard";

const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Home() {
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
        {posts.map((p) => (
          <PostCard key={p} />
        ))}
      </div>
    </div>
  );
}
