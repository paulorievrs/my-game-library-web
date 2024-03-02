/* eslint-disable @next/next/no-img-element */
"use client";
import { GameReview } from "@/@types/game-review";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";
import Rating from "@/components/Rating/Rating";
import { convertSecondsToReadable } from "@/utils/time";
import Button from "@/components/Button/Button";
import Link from "next/link";
import clsx from "clsx";
import { rajdhani } from "@/layouts/fonts";
import { useUser } from "@/hooks/useUser";

type Props = {
  gameReview?: GameReview;
};

export default function ShowReview({ gameReview }: Props) {
  const user = useUser();
  return (
    <>
      {gameReview?.game?.background_image && (
        <div className="relative">
          <img
            src={gameReview?.game?.background_image}
            alt="Game Background Image"
            className="w-full h-32 md:h-64 object-cover object-top"
          />
          {gameReview?.gave_up && (
            <div className="absolute w-full h-full bg-black bg-opacity-60 top-0 flex flex-row items-center justify-center">
              <span
                className={clsx(
                  "text-white text-3xl border-white border p-1 bg-red-500 bg-opacity-30 border-dashed",
                  rajdhani.className
                )}
              >
                Gave up
              </span>
            </div>
          )}
        </div>
      )}

      <div className="max-w-4xl m-auto">
        <div className="flex flex-col mt-5 mb-5 border-b border-b-primary pb-2">
          <div className="flex flex-row justify-between mb-1">
            <span className="text-white opacity-70">
              Author: {gameReview?.user.username}{" "}
            </span>
            <span className="text-white opacity-70">
              Created on:{" "}
              {gameReview?.review_at
                ? new Date(gameReview?.review_at).toLocaleDateString()
                : null}{" "}
            </span>
          </div>
          <div className="flex flex-row justify-between mb-1">
            <span className="text-white opacity-70">
              {gameReview?.game.name}
            </span>
            <Rating rating={gameReview?.rating ?? 0} unfilledColor="#282828" />
          </div>
          <div className="flex flex-row justify-between mb-1">
            <span className="text-white opacity-70">
              Played for: {convertSecondsToReadable(gameReview?.played_for)}
            </span>
            {gameReview?.user?.id === user?.id && (
              <Link href={`/review/${gameReview?.id}/edit`} className="mt-2">
                <Button label="Edit" variant="label" size="sm" />
              </Link>
            )}
          </div>
        </div>
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeSanitize,
            [rehypeExternalLinks, { content: { type: "text", value: "🔗" } }]
          ]}
          className="prose prose-invert min-w-full h-[649px]"
        >
          {gameReview?.review}
        </Markdown>
      </div>
    </>
  );
}
