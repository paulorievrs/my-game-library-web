import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import { login } from "@/services/api/auth.service";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const response = await login({
          usernameOrEmail: credentials.username,
          password: credentials.password
        });

        const user = response.data;
        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  callbacks: {
    session({ session, token }) {
      session.user = {
        email: token.email,
        username: token.username,
        bio: token.bio,
        isActive: token.isActive,
        profile_img: token.profile_img,
        id: token.id
      };
      session.accessToken = token.access_token ?? "";
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          ...user
        };
      }
      return token;
    }
  },
  pages: {
    signIn: "/"
  }
};
