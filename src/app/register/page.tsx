"use client";

import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { useRegister } from "@/hooks/services/api/useRegister";
import { RegisterType, registerSchema } from "@/services/api/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: "all",
    reValidateMode: "onChange"
  });
  const router = useRouter();

  const { mutate } = useRegister();

  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        className="w-full px-6 max-w-5xl flex flex-col gap-5 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2 mb-5">
          <h1 className="text-3xl font-bold text-white">Register</h1>
        </div>

        <div className="flex flex-col gap-5">
          <Input
            placeholder="E-mail"
            label="E-mail"
            {...register("email")}
            autoComplete="off"
            error={errors.email?.message}
          />
          <Input
            placeholder="Username"
            label="Username"
            {...register("username")}
            autoComplete="off"
            error={errors.username?.message}
          />
          <Input
            placeholder="Password"
            label="Password"
            {...register("password")}
            type="password"
            error={errors.password?.message}
            autoComplete="off"
          />
          <Input
            placeholder="Biography"
            label="Biography"
            {...register("bio")}
            error={errors.bio?.message}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button label="Register" className="w-full" type="submit" />
          <Button
            label="Already have an account?"
            variant="label"
            className="w-full"
            size="sm"
            type="button"
            onClick={() => router.push("/")}
          />
        </div>
      </form>
    </div>
  );
}
