import type { Metadata } from "next";

import "./globals.css";
import clsx from "clsx";

import ClientLayout from "../layouts/client-layout";
import ProviderLayout from "../layouts/provider-layout";
import { Toaster } from "react-hot-toast";
import { rubik } from "@/layouts/fonts";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/config";

export const metadata: Metadata = {
  title: "My Game Library",
  description: "A simple game library that you can use to manage your games."
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ProviderLayout>
      <html lang="en">
        <body
          className={clsx(
            rubik.className,
            "bg-primary-black relative scroll-smooth"
          )}
        >
          <ClientLayout>
            <Toaster
              position="bottom-right"
              toastOptions={{
                duration: 5000
              }}
            />
            {children}
          </ClientLayout>
        </body>
      </html>
    </ProviderLayout>
  );
}
