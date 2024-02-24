import React from "react";
import { EyeOpen } from "../icons/EyeOpen";
import { EyeClosed } from "../icons/EyeClosed";
import clsx from "clsx";

type InputProps = {
  className?: string;
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

// eslint-disable-next-line react/display-name
export const Input = React.forwardRef(
  ({ label, className, error, ...props }: InputProps, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const EyeComponent = showPassword ? EyeClosed : EyeOpen;

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="pl-1 text-primary font-bold text-sm">{label}</label>
        )}
        <div className="relative">
          <input
            className={clsx(
              `py-2 pl-4 w-full border border-[#373737] text-white placeholder:text-primary-gray bg-secondary-black rounded-lg bg-black-5 text-sm placeholder:text-gray-1 transition-all duration-150 focus:outline-none focus:border-primary`,
              className,
              props.type === "password" ? "pr-10" : "pr-4"
            )}
            {...props}
            ref={ref as any}
            type={
              props.type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : props.type
            }
          />
          {props.type === "password" && (
            <EyeComponent
              className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>

        {error && (
          <p className="text-red-500 text-xs font-bold mb-2 pl-1 first-letter:uppercase">
            {error}
          </p>
        )}
      </div>
    );
  }
);
