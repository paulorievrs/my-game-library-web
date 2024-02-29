import clsx from "clsx";
import ChevronDown from "../icons/ChevronDown";
import Option, { OptionLoading } from "./Option";
import { Input } from "../Input/Input";
import useDebounce from "@/hooks/useDebounce";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api/api";

export type SelectItemProps = {
  id: number;
  name: string;
};

type SelectProps<T> = {
  className?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  value?: any;
  disabled?: boolean;
  onChange?: (e: any) => void;
  searchApi?: string;
  helperText?: string;
  itemNotFoundText?: string;
  queryKey?: string;
  inputSearchPlaceholder?: string;
  defaultData?: T[];
  containerClassName?: string;
};

export default function Select<T>({
  label,
  className,
  error,
  placeholder,
  value,
  onChange,
  searchApi,
  helperText,
  itemNotFoundText,
  queryKey,
  inputSearchPlaceholder,
  defaultData,
  containerClassName,
  ...props
}: SelectProps<T>) {
  //TODO: Implement search functionality without re-renders
  const [search, setSearch] = useState("");
  const searchDebounced = useDebounce(search, 2000);
  const [showDropdown, setShowDropdown] = useState(false);

  const { data, isLoading } = useQuery({
    queryFn: () => api.get<T[]>(`${searchApi}?name=${search}` ?? ""),
    queryKey: [queryKey, searchDebounced, searchApi],
    enabled: searchDebounced.length > 0 && Boolean(searchApi)
  });

  const toogleDropdown = useCallback(() => {
    setShowDropdown((prev) => !prev);
  }, []);

  const handleSelect = (item: any) => {
    if (item?.id === value?.id) {
      onChange?.(null);
      toogleDropdown();
      return;
    }
    onChange?.(item);
    toogleDropdown();
  };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node) && showDropdown) {
        toogleDropdown();
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, showDropdown, toogleDropdown]);

  return (
    <div
      className={clsx(
        "flex flex-col gap-2 relative w-full",
        containerClassName
      )}
      ref={ref}
    >
      {label && (
        <label className="pl-1 text-primary font-bold text-sm">{label}</label>
      )}
      <div className="relative">
        <button
          className={clsx(
            `py-2 pl-4 w-full border border-[#373737] flex items-start text-white bg-secondary-black rounded-lg bg-black-5 text-sm transition-all duration-150 focus:outline-none`,
            className
          )}
          onClick={toogleDropdown}
          {...props}
          type="button"
        >
          {!value && placeholder && (
            <span className="opacity-50">{placeholder}</span>
          )}
          {value && <span>{value?.name}</span>}
        </button>
        <ChevronDown
          color="#5858FA"
          className={clsx(
            "absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer",
            props.disabled && "pointer-events-none opacity-50"
          )}
        />
      </div>
      {showDropdown && (
        <div className="absolute top-20 p-2 bg-secondary-black border shadow-2xl border-[#727272] z-50 w-full rounded-lg">
          <div className="flex flex-col gap-5 mb-4">
            {searchApi && (
              <Input
                placeholder={inputSearchPlaceholder}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}

            {!search && helperText && (
              <span className="text-white font-bold text-sm text-center self-center">
                {helperText}
              </span>
            )}
            {search &&
              !isLoading &&
              data?.data.length === 0 &&
              itemNotFoundText && (
                <span className="text-white font-bold text-sm text-center self-center">
                  {itemNotFoundText}
                </span>
              )}
          </div>

          <div className="flex flex-col gap-2">
            {isLoading ||
              (search && !data && (
                <>
                  <OptionLoading />
                  <OptionLoading />
                </>
              ))}
            {!isLoading &&
              data &&
              search &&
              data?.data?.length > 0 &&
              data?.data?.map((item: any) => (
                <Option
                  key={item.id}
                  label={item.name}
                  image={item.background_image}
                  active={value?.id === item.id}
                  onClick={() => handleSelect(item)}
                />
              ))}
            {!isLoading &&
              !data &&
              defaultData &&
              defaultData.map((item: any) => (
                <Option
                  key={item.id}
                  label={item.name}
                  image={item.background_image}
                  active={value?.id === item.id}
                  onClick={() => handleSelect(item)}
                />
              ))}
          </div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-xs font-bold mb-2 pl-1 first-letter:uppercase">
          {error}
        </p>
      )}
    </div>
  );
}
