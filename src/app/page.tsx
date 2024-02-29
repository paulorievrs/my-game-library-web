"use client";

import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useLogin } from "@/hooks/services/api/useLogin";
import { LoginType, loginSchema } from "@/services/api/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange"
  });
  const searchParams = useSearchParams();

  const { mutate } = useLogin();

  const onSubmit: SubmitHandler<LoginType> = (data) => {
    mutate(data);
  };
  const router = useRouter();

  return (
    <div className="flex items-center justify-center">
      <form
        className="w-full px-6 max-w-5xl flex flex-col gap-5 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 mb-5">
          <h1 className="text-3xl font-bold text-white">Login</h1>
          <span className="text-white">
            {searchParams.get("redirected") === "true"
              ? "You need to login to access the page"
              : ""}
          </span>
        </div>

        <div className="flex flex-col gap-5">
          <Input
            placeholder="Username or e-mail"
            label="Username or e-mail"
            {...register("usernameOrEmail")}
            autoComplete="off"
            error={errors.usernameOrEmail?.message}
          />
          <Input
            placeholder="Password"
            label="Password"
            {...register("password")}
            type="password"
            error={errors.password?.message}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button label="Login" className="w-full" type="submit" />
          <Link href="/register">
            <Button
              label="Don't have an account?"
              variant="label"
              className="w-full"
              size="sm"
              type="button"
            />
          </Link>
        </div>
      </form>
    </div>
  );
}
