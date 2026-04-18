export default function CreatePost() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Create New Post</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <form className="space-y-5">
          <input
            type="text"
            placeholder="Post title..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div>
            <label className="text-sm text-slate-400">Upload Image</label>

            <input
              type="file"
              accept="image/*"
              className="w-full mt-2 text-sm text-slate-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0
              file:bg-indigo-500 file:text-white
              hover:file:bg-indigo-600"
            />
          </div>

          {/* Image Preview */}
          {/* {image && (
            <div className="mt-3">
              <img
                src={image}
                alt="preview"
                className="w-full h-60 object-cover rounded-xl border border-slate-700"
              />
            </div>
          )} */}

          {/* Category */}
          <input
            type="text"
            placeholder="Category..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {/* Content */}
          <textarea
            rows={6}
            placeholder="Write your post..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium"
          >
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}
