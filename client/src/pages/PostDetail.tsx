export default function PostDetail() {
  return (
    <div className="max-w-3xl mx-auto">
      <img
        src="https://via.placeholder.com/800"
        className="w-full h-80 object-cover rounded-2xl mb-6"
      />

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
        Build a Premium UI with Tailwind CSS
      </h1>

      <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
        <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
          A
        </div>
        <span>Admin</span>
        <span>•</span>
        <span>May 2026</span>
        <span>•</span>
        <span>5 min read</span>
      </div>

      <div className="mt-8 space-y-5 text-gray-400 leading-relaxed text-[17px]">
        <p>
          Tailwind CSS is a powerful utility-first framework that helps you
          build modern UI faster...
        </p>

        <p>
          In this tutorial, we will explore how to design premium layouts using
          spacing, typography, and components...
        </p>
      </div>
    </div>
  );
}
