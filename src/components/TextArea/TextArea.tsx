import clsx from "clsx";
import React from "react";

type MarkdownProps = {
  label?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// eslint-disable-next-line react/display-name
export const TextArea = React.forwardRef(
  (
    { label, className, ...props }: MarkdownProps,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="pl-1 text-primary font-bold text-sm">{label}</label>
        )}

        <textarea
          className={clsx(
            `py-6 pl-4 w-full border border-[#373737] text-white placeholder:text-primary-gray bg-secondary-black text-sm placeholder:text-gray-1 transition-all duration-150 focus:outline-none border-t-0 rouded-t-none rouded-b-lg`,
            className
          )}
          {...props}
          ref={ref as any}
        />
      </div>
    );
  }
);
