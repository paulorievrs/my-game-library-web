"use client";

import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { MarkdownEditor } from "@/components/MarkdownEditor/MarkdownEditor";
import { useForm } from "react-hook-form";

type GameReview = {
  review: string;
};

export default function ReviewForm() {
  const { handleSubmit, register, getValues, setValue } = useForm<GameReview>();

  const onSubmit = (data: GameReview) => {
    console.log(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">New Review</h1>
      <form
        className="flex flex-col gap-5 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input label="Title" placeholder="Title" />
        <MarkdownEditor
          rows={30}
          placeholder="Tell what do you felt playing the game"
          label="Review"
          {...register("review")}
          getValue={() => getValues("review")}
          className="resize-none"
          setValue={(value) => setValue("review", value)}
        />
        <Button type="submit" label="Submit" />
      </form>
    </div>
  );
}
