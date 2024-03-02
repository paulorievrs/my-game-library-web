"use client";

import { Game } from "@/@types/game";
import { GameReview } from "@/@types/game-review";
import Button from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { MarkdownEditor } from "@/components/MarkdownEditor/MarkdownEditor";
import RatingSelector from "@/components/Rating/RatingSelector";
import Select, { SelectItemProps } from "@/components/Select/Select";
import { useCreateGameReview } from "@/hooks/services/api/useCreateGameReview";
import {
  GameReviewType,
  gameReviewSchema
} from "@/services/api/game-review.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

type Props = {
  gameReview?: GameReview;
};

export default function ReviewForm({ gameReview }: Props) {
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    control,
    watch,
    formState: { errors }
  } = useForm<GameReviewType>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(gameReviewSchema),
    defaultValues: {
      is_public: gameReview?.is_public ?? true,
      beat: gameReview?.beat ?? false,
      gave_up: gameReview?.gave_up ?? false,
      rating: gameReview?.rating ?? 0,
      review: gameReview?.review ?? "",
      game: gameReview?.game as {
        id: number;
        name: string;
      }
    }
  });
  const createGameReview = useCreateGameReview();

  const onSubmit = (data: GameReviewType) => {
    console.log("entrou");
    if (gameReview?.id) return console.log(data);

    createGameReview.mutate(data);
  };

  const beat = watch("beat");
  const gaveUp = watch("gave_up");

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">
        {gameReview?.id ? "Update" : "New"} Review
      </h1>
      <form
        className="flex flex-col gap-5 mt-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="game"
          render={({ field, fieldState: { error } }) => (
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
              error={error?.message}
              value={field.value}
            />
          )}
        />
        <Controller
          control={control}
          name="rating"
          render={({ field: { onChange, value } }) => (
            <div className="pl-1 flex flex-col gap-2 items-start justify-center">
              <span className="text-primary font-bold text-sm">
                Rating (1-5 stars)
              </span>
              <RatingSelector value={value} setValue={onChange} />
            </div>
          )}
        />
        <div className="flex flex-row gap-5 w-full">
          <Input
            placeholder="Time expended playing"
            label="Time playing in numbers"
            autoComplete="off"
            className="w-full"
            {...register("played_for_time")}
            error={errors?.played_for_time?.message}
          />

          <Controller
            control={control}
            name="played_for_long"
            render={({ field, fieldState: { error } }) => (
              <Select<SelectItemProps>
                placeholder="How long did you play?"
                label="Played for"
                containerClassName="max-w-sm"
                onChange={(item) => {
                  field.onChange(item);
                }}
                error={error?.message}
                value={field.value}
                defaultData={[
                  {
                    id: 5,
                    name: "minutes"
                  },
                  {
                    id: 1,
                    name: "hours"
                  },
                  {
                    id: 2,
                    name: "days"
                  },
                  {
                    id: 3,
                    name: "months"
                  }
                ]}
              />
            )}
          />
        </div>

        <MarkdownEditor
          rows={30}
          placeholder="Tell what do you felt playing the game"
          label="Review"
          {...register("review")}
          getValue={() => getValues("review")}
          className="resize-none"
          setValue={(value) => setValue("review", value)}
          error={errors?.review?.message}
        />
        <div className="flex flex-col md:flex-row gap-5">
          {!gaveUp && (
            <div className="flex flex-row gap-2 items-center">
              <label
                htmlFor="beat"
                className="pl-1 text-primary font-bold text-sm"
              >
                Beat the game?
              </label>
              <input {...register("beat")} type="checkbox" />
            </div>
          )}

          {!beat && (
            <div className="flex flex-row gap-2 items-center">
              <label className="pl-1 text-primary font-bold text-sm">
                Gave up the game?
              </label>
              <input type="checkbox" {...register("gave_up")} />
            </div>
          )}
          <div className="flex flex-row gap-2 items-center">
            <label className="pl-1 text-primary font-bold text-sm">
              This is a public review?
            </label>
            <input type="checkbox" {...register("is_public")} />
          </div>
        </div>

        <Button
          type="submit"
          label="Submit"
          disabled={createGameReview?.isPending}
        />
      </form>
    </div>
  );
}
