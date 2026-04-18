import PostCard from "../components/PostCard";

const posts = [1,2,3,4,5,6];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Discover Modern Blogs
        </h1>
        <p className="text-gray-500 mt-3">
          Insights, tutorials, and ideas from developers
        </p>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <PostCard key={p} />
        ))}
      </div>
    </div>
  );
}