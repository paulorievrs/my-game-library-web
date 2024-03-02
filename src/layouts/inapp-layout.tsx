"use client";

import Button from "@/components/Button/Button";
import Menu from "@/components/icons/Menu";
import { useEffect, useState } from "react";
import { Close } from "@/components/icons/Close";
import User from "@/components/icons/User";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { Transition } from "@headlessui/react";
import SignOut from "@/components/icons/SignOut";
import Home from "@/components/icons/Home";
import Search from "@/components/icons/Search";
import { signOut } from "next-auth/react";
import { success } from "@/utils/feedback";
import LoginModalForm from "@/components/Login/LoginModalForm";

type Props = {
  children: React.ReactNode;
};

export default function InAppLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const user = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleUserIconClick = () => {
    if (user) {
      router.push(`/profile/${user?.username}`);
      return;
    }
    setShowLoginModal(true);
  };

  return (
    <div className="z-10">
      <Transition
        show={open}
        enter="transition-all duration-500"
        enterFrom="-ml-64"
        enterTo="ml-0"
        leave="transition-all duration-300"
        leaveTo="-ml-64"
      >
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity z-10"
            onClick={handleClose}
          />
          <div className={`w-full z-10`}>
            <div className="absolute h-screen w-3/4 z-10 md:w-2/4 bg-secondary-black border-r border-r-primary-black px-5 py-4 max-w-sm">
              <div className="relative h-full">
                <div className="flex flex-row justify-between items-center max-w-sm">
                  <h2 className="text-xl text-primary font-bold">
                    My Game Library
                  </h2>
                  <Close className="cursor-pointer" onClick={handleClose} />
                </div>
                <div className="mt-10 flex flex-col gap-1 items-start">
                  <Button
                    variant="menu"
                    label="Home"
                    leftIcon={<Home />}
                    onClick={() => {
                      router.push("/home");
                      handleClose();
                    }}
                  />
                  <Button
                    variant="menu"
                    label="Search"
                    leftIcon={<Search className="scale-125" />}
                  />
                </div>
                <div className="absolute bottom-3 w-full flex flex-col gap-1 items-start">
                  <Button
                    variant="menu"
                    label="My Reviews"
                    onClick={() => {
                      router.push(`/profile/${user?.username}`);
                      handleClose();
                    }}
                    leftIcon={<User className="scale-90" color="#5858FA" />}
                  />
                  <Button
                    variant="menu"
                    label="Logout"
                    onClick={() => {
                      signOut();
                      success("Logged out successfully");
                    }}
                    leftIcon={<SignOut />}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </Transition>
      <LoginModalForm
        onClose={() => setShowLoginModal(false)}
        open={showLoginModal}
      />
      <div className="bg-secondary-black p-3">
        <div className="flex flex-row justify-between items-center max-w-7xl m-auto">
          <div
            className="flex flex-row gap-3 items-center cursor-pointer"
            onClick={() => {
              setOpen(true);
              document.body.style.overflow = "hidden";
            }}
          >
            <Menu />
            <h2 className="text-xl text-primary font-bold">My Game Library</h2>
          </div>
          <div
            className="flex flex-row gap-3 cursor-pointer"
            onClick={handleUserIconClick}
          >
            <User />
            <span className="text-white hidden md:block">{user?.username}</span>
          </div>
        </div>
      </div>
      <div className="p-3 max-w-7xl m-auto">{children}</div>
    </div>
  );
}
