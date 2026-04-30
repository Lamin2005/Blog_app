import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/login";
import * as z from "zod";
import { toast } from "react-toastify";

function LoginForm() {
  type FormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const submitHandler = (data: FormData) => {
    console.log(data);
    toast.success("Login successful!");
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
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
            Login
          </button>
        </form>

        <p className="text-sm text-slate-500 text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
