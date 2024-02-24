/* eslint-disable @next/next/no-img-element */

import { useUser } from "@/hooks/useUser";

type Props = {
  username: string;
  gameReviewsCount: number;
};

export default function ProfileCard({ username, gameReviewsCount }: Props) {
  const user = useUser();

  return (
    <div className="bg-secondary-black shadow-md rounded-md mt-16">
      <div className="flex items-center justify-center md:justify-start">
        <img
          src={user?.profile_img ?? "/assets/user.jpg"}
          className="rounded-full w-32 h-32 border-4 border-white -mt-10"
          alt="Profile image"
        />
      </div>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white">{username}</h1>
        <p className="text-gray-400 mt-2">{gameReviewsCount ?? 0} reviews</p>
        <p className="text-white mt-5" suppressHydrationWarning>
          {user?.bio}
        </p>
      </div>
    </div>
  );
}
