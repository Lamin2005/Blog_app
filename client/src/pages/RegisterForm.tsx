import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/register";
import * as z from "zod";
import { toast } from "react-toastify";

function RegisterForm() {
  type FormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast.success("Registration successful!");
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Create Account
        </h1>

        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register("name", { required: true })}
            />
            <span className="text-red-500 text-sm">{errors.name?.message}</span>
          </div>

          <div className="mb-5">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register("email", { required: true })}
            />
            <span className="text-red-500 text-sm">
              {errors.email?.message}
            </span>
          </div>

          <div className="mb-5">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              {...register("password", { required: true })}
            />
            <span className="text-red-500 text-sm">
              {errors.password?.message}
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 transition text-white font-medium"
            disabled={isLoading}
          >
            Register
          </button>
        </form>

        <p className="text-sm text-slate-500 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;
