"use client";

import { Game } from "@/@types/game";
import Button from "@/components/Button/Button";
import { MarkdownEditor } from "@/components/MarkdownEditor/MarkdownEditor";
import Select from "@/components/Select/Select";
import { Controller, useForm } from "react-hook-form";

type GameReview = {
  review: string;
  game: Game;
  beat: boolean;
};

export default function ReviewForm() {
  const { handleSubmit, register, getValues, setValue, control } =
    useForm<GameReview>();

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
        <Controller
          control={control}
          name="game"
          render={({ field }) => (
            <Select<Game>
              placeholder="Select a game"
              label="Game"
              searchApi="/game"
              helperText="Start typing to find a game"
              itemNotFoundText="Game not found, try a different search!"
              queryKey="select-games"
              inputSearchPlaceholder="Search game..."
              onChange={(game) => {
                field.onChange(game);
              }}
              value={field.value}
            />
          )}
        />

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
