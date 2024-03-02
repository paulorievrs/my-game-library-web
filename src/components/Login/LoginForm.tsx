"use client";

import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { LoginType, loginSchema } from "@/services/api/auth.service";
import { error, success } from "@/utils/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Loading } from "../Loading/Loading";
import clsx from "clsx";

export default function LoginForm() {
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginType> = async (data) => {
    setLoading(true);
    const response = await signIn("credentials", {
      username: data.usernameOrEmail,
      password: data.password,
      redirect: false
    });
    setLoading(false);
    if (response?.ok) {
      success("Logged in successfully");
      router.push("/home");
      return;
    }
    error("Invalid credentials");
  };

  return (
    <div className="flex items-center justify-center relative">
      {loading && (
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 absolute border-primary z-50"></div>
      )}
      <form
        className={clsx(
          "w-full px-6 max-w-5xl flex flex-col gap-5 mt-10",
          loading && "pointer-events-none opacity-50"
        )}
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
            disabled={loading}
          />
          <Input
            placeholder="Password"
            label="Password"
            {...register("password")}
            type="password"
            error={errors.password?.message}
            autoComplete="off"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            label="Login"
            className="w-full"
            type="submit"
            disabled={loading}
          />
          <Link href="/register">
            <Button
              label="Don't have an account?"
              variant="label"
              className="w-full"
              size="sm"
              type="button"
              disabled={loading}
            />
          </Link>
        </div>
      </form>
    </div>
  );
}
