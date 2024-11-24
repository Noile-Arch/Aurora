/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import AuthLayout from "./Layout";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { registerSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";

const SignUp = () => {
  const [inpType, setInpType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    console.log("Form submitted:", data)

    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        switch (res.status) {
          case 409:
            setError("email", {
              type: "manual",
              message: "Email already exists",
            });
            toast.error("Email already registered");
            break;
          case 400:
            toast.error(result.message || "Invalid input data");
            break;
          case 429:
            toast.error("Too many attempts. Please try again later");
            break;
          default:
            toast.error("Registration failed. Please try again");
        }
        return;
      }

      const {
        data: { user, token },
      } = result;

      localStorage.setItem("auroraAuth", JSON.stringify(token));

      setUser(user);

      toast.success("Account created successfully!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTogglePass = () => {
    setInpType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <AuthLayout title="Create Account">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex-1 flex flex-col gap-[20px] px-4"
      >
        <div className="w-full flex flex-col gap-[5px]">
          <label
            htmlFor="name"
            className="text-primary-100 text-sm md:text-base font-semibold"
          >
            Full Name:
          </label>
          <span className="text-xs text-zinc-600 capitalize">
            Please enter your full name
          </span>
          <input
            id="name"
            type="text"
            autoComplete="name"
            disabled={isLoading}
            className="outline-none px-2 w-full bg-[transparent] h-[60px] border border-[gray]/20 placeholder:text-[gray]/60 disabled:opacity-50"
            placeholder="John Doe"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-[red]/80">
              {errors.name.message as string}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-[5px]">
          <label
            htmlFor="email"
            className="text-primary-100 text-sm md:text-base font-semibold"
          >
            Email:
          </label>
          <span className="text-xs text-zinc-600 capitalize">
            please provide a valid email address
          </span>
          <input
            id="email"
            type="email"
            autoComplete="off"
            disabled={isLoading}
            className="outline-none px-2 w-full bg-[transparent] h-[60px] border border-[gray]/20 placeholder:text-[gray]/60"
            placeholder="johndoe@email.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-[red]/80">
              {errors.email.message as string}
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
            please provide a strong password
          </span>
          <div className="w-full flex flex-row border border-[gray]/20">
            <input
              id="password"
              type={inpType}
              autoComplete="off"
              disabled={isLoading}
              className="outline-none px-2 w-full bg-[transparent] h-[60px]  placeholder:text-[gray]/60"
              placeholder="*****"
              {...register("password")}
            />
            <div className="h-full flex items-center justify-center px-4">
              {inpType == "password" ? (
                <FaEyeSlash onClick={handleTogglePass} />
              ) : (
                <FaEye
                  onClick={() => {
                    setInpType("password");
                  }}
                />
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-xs text-[red]/80">
              {errors.password.message as string}
            </p>
          )}
        </div>
        <div className="w-full flex flex-col gap-[5px]">
          <label
            htmlFor="password"
            className="text-primary-100 text-sm md:text-base font-semibold"
          >
            confirm password:
          </label>

          <div className="w-full flex flex-row border border-[gray]/20">
            <input
              id="confirmPassword"
              type={inpType}
              autoComplete="off"
              disabled={isLoading}
              className="outline-none px-2 w-full bg-[transparent] h-[60px]  placeholder:text-[gray]/60"
              placeholder="*****"
              {...register("confirmPassword")}
            />
            <div className="h-full flex items-center justify-center px-4">
              {inpType == "password" ? (
                <FaEyeSlash onClick={handleTogglePass} />
              ) : (
                <FaEye
                  onClick={() => {
                    setInpType("password");
                  }}
                />
              )}
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-[red]/80">
              {errors.confirmPassword.message as string}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="transition-all ease-in-out w-full h-[60px] md:h-[60px] p-4 bg-chocolate items-center justify-center cursor-pointer rounded-lg flex mt-[10px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="font-semibold capitalize text-white">
            {isLoading ? "Creating Account..." : "Register"}
          </span>
        </button>
        <div>
          <p className="text-sm">
            Have an account?
            <Link
              to={"/login"}
              className="ml-[5px] text-chocolate underline text-sm"
            >
              SignIn
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;