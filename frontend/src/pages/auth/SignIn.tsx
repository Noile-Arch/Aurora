import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./Layout";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const SignIn = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [inpType, setInpType] = useState("password");
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        switch (res.status) {
          case 401:
            setError("password", {
              type: "manual",
              message: "Invalid email or password",
            });
            toast.error("Invalid credentials");
            break;
          case 429:
            toast.error("Too many attempts. Please try again later");
            break;
          case 403:
            toast.error("Account locked. Please contact support");
            break;
          default:
            toast.error("An error occurred. Please try again");
        }
        return;
      }

      const { data: {user, token} } = result;
      
      localStorage.setItem("auroraAuth", JSON.stringify(token));
      
      setUser(user);

      toast.success(`Welcome back, ${user.email}!`);

    } catch (error) {
      console.error("Login error:", error);
      toast.error("Network error. Please check your connection");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePass = () => {
    setInpType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  useEffect(() => {
    const checkExistingSession = async () => {
      const token = localStorage.getItem("auroraAuth");
      if (token) {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/verify`, {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          });
          
          if (res.ok) {
            const { user } = await res.json();
            setUser(user);
            navigate("/home/overview");
          } else {
            localStorage.removeItem("auroraAuth");
          }
        } catch (error) {
          console.error("Session verification error:", error);
        }
      }
    };

    checkExistingSession();
  }, [navigate, setUser]);

  return (
    <AuthLayout title="Welcome Back!">
      <form
        className="w-full flex-1 flex flex-col gap-[20px] px-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full flex flex-col gap-[5px]">
          <label
            htmlFor="email"
            className="text-primary-100 text-sm md:text-base font-semibold"
          >
            Email:
          </label>
          <span className="text-xs text-zinc-600 capitalize">
            Please provide a valid email address
          </span>
          <input
            id="email"
            type="email"
            autoComplete="email"
            disabled={isLoading}
            className="outline-none px-2 w-full bg-[transparent] h-[60px] border border-[gray]/20 placeholder:text-[gray]/60 disabled:opacity-50"
            placeholder="johndoe@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-[red]/80">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="w-full flex flex-col gap-[5px]">
          <label
            htmlFor="password"
            className="text-primary-100 text-sm md:text-base font-semibold"
          >
            Password:
          </label>
          <span className="text-xs text-zinc-600 capitalize">
            Please provide a strong password
          </span>
          <div className="w-full flex flex-row border border-[gray]/20">
            <input
              id="password"
              type={inpType}
              autoComplete="current-password"
              disabled={isLoading}
              className="outline-none px-2 w-full bg-[transparent] h-[60px] placeholder:text-[gray]/60 disabled:opacity-50"
              placeholder="*****"
              {...register("password")}
            />
            <button
              type="button"
              onClick={handleTogglePass}
              className="h-full flex items-center justify-center px-4 text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              {inpType === "password" ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-[red]/80">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="transition-all ease-in-out w-full h-[60px] md:h-[60px] p-4 bg-chocolate items-center justify-center cursor-pointer rounded-lg flex mt-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-semibold capitalize text-white">
            {isLoading ? "Logging in..." : "Login"}
          </span>
        </button>

        <div>
          <p className="text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="ml-[5px] text-chocolate underline text-sm"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
