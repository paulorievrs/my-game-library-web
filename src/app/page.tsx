import LoginForm from "@/components/Login/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/config";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/home");
  }
  return <LoginForm />;
}
