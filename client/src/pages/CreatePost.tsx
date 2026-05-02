import React, { useEffect, useState } from "react";
import { createPosts } from "../services/post";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      toast.error("You must be logged in to create a post");
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      form.category == "" ||
      form.title == "" ||
      form.description == "" ||
      !image
    ) {
      toast.error("Please fill all input!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("description", form.description);

      if (image) {
        formData.append("image", image);
      }

      await createPosts(formData);

      setForm({ title: "", category: "", description: "" });
      setImage(null);
      setPreview(undefined);

      toast.success("Post created successfully 🚀");
    } catch (error) {
      console.log(error);
      toast.error("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">Create New Post</h1>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <form className="space-y-5 " onSubmit={handlSubmit}>
          <input
            type="text"
            placeholder="Post title..."
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div>
            <label className="text-sm text-slate-400">Upload Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full mt-2 text-sm text-slate-300
              file:mr-4 file:py-2 file:px-4
              file:rounded-xl file:border-0
              file:bg-indigo-500 file:text-white
              hover:file:bg-indigo-600"
            />
          </div>

          {image && (
            <div className="mt-3">
              <img
                src={preview}
                alt="preview"
                className="w-full h-60 object-cover rounded-xl border border-slate-700"
              />
            </div>
          )}

          <input
            type="text"
            placeholder="Category..."
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <textarea
            rows={6}
            value={form.description}
            name="description"
            onChange={handleChange}
            placeholder="Write your post..."
            className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-medium transition
             ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600 cursor-pointer"}
                `}
          >
            {loading ? "Publishing Post..." : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
