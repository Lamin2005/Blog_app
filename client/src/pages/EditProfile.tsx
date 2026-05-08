import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../features/api/userapi";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { useState } from "react";
import { setCredentials } from "../features/auth/AuthSlice";

interface FormData {
  name: string;
  email: string;
  password?: string;
}

export default function EditProfile() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
    },
  });

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("email", data.email);

      if (data.password) {
        formData.append("password", data.password);
      }

      if (image) {
        formData.append("image", image);
      }

      const res = await updateProfile(formData).unwrap();

      console.log(res);

      dispatch(setCredentials(res.data));

      toast.success(res.message);
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="flex justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800">
        <h1 className="text-2xl text-white font-bold mb-6 text-center">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col items-center gap-3">
            {preview ? (
              <img
                src={preview}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : userInfo?.images?.url ? (
              <img
                src={userInfo.images.url}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center text-white text-2xl">
                {userInfo?.name?.charAt(0)}
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="text-sm text-slate-400 cursor-pointer"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 bg-slate-800 text-white rounded-xl border border-slate-700"
              {...register("name")}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 bg-slate-800 text-white rounded-xl border border-slate-700"
              {...register("email")}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="New Password (optional)"
              className="w-full px-4 py-3 bg-slate-800 text-white rounded-xl border border-slate-700"
              {...register("password")}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white ${
              isLoading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
            }`}
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
