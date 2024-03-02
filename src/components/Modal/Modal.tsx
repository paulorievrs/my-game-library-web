import { useCallback, useEffect, useRef } from "react";
import { Close } from "../icons/Close";
import clsx from "clsx";

export type ModalProps = {
  onClose: () => void;
  open: boolean;
  children: React.ReactNode;
  modalBoxClassName?: string;
};

export default function Modal({
  onClose,
  open,
  children,
  modalBoxClassName
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node) && open) {
        handleClose();
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref, open, handleClose]);

  if (!open) return null;

  return (
    <div className="fixed w-full h-screen bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="absolute w-full max-w-lg">
        <div
          className={clsx(
            " bg-primary-black shadow-lg rounded-md border-slate-200 border p-5 m-5 md:m-0",
            modalBoxClassName
          )}
          ref={ref}
        >
          <div className="flex items-center justify-end w-full">
            <Close
              className="transition-transform duration-150 hover:scale-110 cursor-pointer"
              onClick={handleClose}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
