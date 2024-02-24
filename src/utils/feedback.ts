import toast from "react-hot-toast";

export function error(message: string) {
  toast.error(message);
}

export function success(message: string) {
  toast.success(message);
}
