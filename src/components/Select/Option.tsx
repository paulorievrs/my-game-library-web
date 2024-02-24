/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line @next/next/no-img-element

import clsx from "clsx";

type OptionProps = {
  onClick?: () => void;
  image?: string;
  label: string;
  active?: boolean;
};

export function OptionLoading() {
  return (
    <div className="animate-pulse">
      <div className="px-2 py-3 rounded-lg flex flex-row gap-2 items-center w-full bg-primary-black h-12" />
    </div>
  );
}

export default function Option({ onClick, image, label, active }: OptionProps) {
  return (
    <button
      className={clsx(
        "px-2 py-3 rounded-lg flex flex-row gap-2 items-center w-full transition-colors duration-150",
        active
          ? "bg-primary hover:opacity-50"
          : "bg-primary-black hover:bg-primary"
      )}
      type="button"
      onClick={onClick}
    >
      {image && <img src={image} className="w-5 h-5" alt={label} />}

      <span className="text-white">{label}</span>
    </button>
  );
}
