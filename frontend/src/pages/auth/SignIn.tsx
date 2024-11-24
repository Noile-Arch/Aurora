import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./Layout";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/use/user";

const SignIn = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (data: LoginInput) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      console.log(data);
      console.log(user);
      toast.success(`Welcome back!`);
      navigate("/", { replace: true });
    } catch (error) {
      const status = (error as { response?: { status: number } })?.response
        ?.status;
      console.log(error);

      if (status === 401) {
        setError("password", { message: "Invalid email or password" });
        toast.error("Invalid credentials");
      } else if (status === 429) {
        toast.error("Too many attempts. Please try again later");
      } else {
        toast.error("Login failed. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back!">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full flex-1 flex flex-col gap-5 px-4"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            autoComplete="email"
            disabled={isLoading}
            placeholder="Enter your email"
            className="h-12 px-3 bg-white border rounded-lg disabled:opacity-50"
          />
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold">
            Password
          </label>
          <div className="relative">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              disabled={isLoading}
              placeholder="Enter your password"
              className="h-12 px-3 bg-white w-full border rounded-lg disabled:opacity-50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="h-12 mt-4 bg-chocolate text-white rounded-lg font-medium
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-chocolate hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
