import clsx from "clsx";

type Props = {
  label: string | React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function EditorButton({
  label,
  disabled,
  type = "button",
  className,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "text-sm font-bold transition-colors duration-150 text-slate-300 cursor-pointer hover:opacity-50",
        disabled ? "opacity-50 hover:opacity-50 cursor-not-allowed" : "",
        className
      )}
      type={type}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
}
