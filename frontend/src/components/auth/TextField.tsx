import { forwardRef, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

type TextFieldProps = {
  type: string;
  placeholder: string;
  disabled: boolean;
  border: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type, placeholder, disabled, border, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="w-full">
        <div className="relative">
          <input
            ref={ref}
            type={type === "password" ? (showPassword ? "text" : "password") : type}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full p-3 bg-transparent border rounded-lg outline-none ${border} ${
              error ? "border-red-500" : "border-gray-600"
            }`}
            {...props}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
