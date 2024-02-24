import clsx from "clsx";

type ButtonProps = {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "label" | "menu";
  label: string;
  className?: string;
  leftIcon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonSize: {
  [key in ButtonProps["size"] as string]: string;
} = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base md:text-lg",
  lg: "px-6 py-4 text-xl"
};

const ButtonVariant: {
  [key in ButtonProps["variant"] as string]: string;
} = {
  primary:
    "bg-primary text-white rounded-lg hover:opacity-90 transition-all duration-200",
  secondary: "bg-white rounded-lg text-primary",
  label: "text-primary font-bold hover:opacity-90 transition-all duration-200",
  menu: "text-primary font-bold transition-all hover:opacity-70 cursor-pointer duration-200 bg-primary-black w-full text-left rounded-lg hover:bg-primary-black-50"
};

export default function Button({
  size = "md",
  variant = "primary",
  label,
  className,
  leftIcon,
  ...props
}: ButtonProps) {
  const sizeClass = ButtonSize[size];
  const variantClass = ButtonVariant[variant];
  const rightClass = `${sizeClass} ${variantClass} ${className}`;

  return (
    <div
      className={clsx(
        rightClass,
        leftIcon && "flex flex-row gap-2 items-center",
        "text-center"
      )}
    >
      {leftIcon && leftIcon}
      <button {...props}>{label}</button>
    </div>
  );
}
