import { DefaultSession } from "next-auth";
import { PartnershipStatusType } from "../@types/user";
import { User as MyUser } from "../user";
import { DefaultJWT } from "next-auth/jwt";

export { default } from "next-auth";
export { JWT } from "next-auth/jwt";

declare module "next-auth" {
  type User = DefaultSession["user"] & MyUser;

  interface Session {
    accessToken: string;
    user: {
      id: string;
      email?: string | null;
      username?: string;
      bio?: string;
      isActive?: boolean;
      profile_img?: string;
    } & DefaultSession["user"];
  }

  interface JWT {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    email?: string | null;
    username?: string;
    bio?: string;
    isActive?: boolean;
    profile_img?: string;
    access_token?: string;
  }
}
