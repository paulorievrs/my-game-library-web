import { GameReview } from "@/@types/game-review";
import Rating from "../Rating/Rating";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { rajdhani } from "@/layouts/fonts";
/* eslint-disable @next/next/no-img-element */

type Props = {
  gameReview: GameReview;
};
export default function GameReviewCard({ gameReview }: Props) {
  return (
    <Transition
      show={true}
      appear={true}
      enter="transition-opacity duration-200"
      enterFrom="opacity-0"
      enterTo="opacity-50"
      leave="transition-opacity duration-200"
      leaveFrom="opacity-50"
      leaveTo="opacity-0"
    >
      <div className="bg-secondary-black shadow-md rounded-md transition-all duration-150 cursor-pointer hover:scale-105 hover:shadow-2xl">
        <div className="relative">
          <img
            src={gameReview.game.background_image}
            alt={`${gameReview.game.name} image`}
            className="max-h-[288px] md:max-h-[253px] lg:h-[227px] lg:w-[405px] w-full"
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

        <div className="p-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-white">
              {gameReview.game.name.slice(0, 18) +
                (gameReview.game.name.length > 18 ? "..." : "")}
            </h1>
            <Rating rating={gameReview.rating} />
            <p className="text-gray-400">
              {new Date(gameReview.review_at).toLocaleDateString()}
            </p>
          </div>

          <p className="text-white mt-5 break-words text-nowrap">
            {gameReview.review.substring(0, 31) +
              (gameReview.review.length > 31 ? "..." : "")}
          </p>
        </div>
      </div>
    </Transition>
  );
}
