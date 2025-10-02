import React from "react";
import MaintContainer from "./MainContainer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { raleway } from "@/constants/fonts";
import { Dialog } from "radix-ui";
import clsx from "clsx";
import { IoClose, IoMenu } from "react-icons/io5";
const Header = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={clsx(
        raleway.className,
        "fixed z-50 bg-white top-0 left-0 w-full shadow-lg"
      )}>
      <MaintContainer className="my-0! py-1!">
        <div className="py-2 flex items-center justify-between">
          {/* Logo */}
          <div className="">
            <Image
              src="/assets/images/logos/logo_mobile.png"
              alt="logo"
              sizes="(max-width: 1023px) 60px, 100px"
              layout="responsive"
              style={{ objectFit: "contain" }}
              width={100}
              height={100}
            />
          </div>
          <Menu />
          {/* Sign up */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="p-2.5 px-7 border font-semibold rounded-md bg-primary text-white">
              Sign In
            </button>
            <button className="p-2.5 px-7 border font-semibold rounded-md border-primary text-primary">
              Sign Up
            </button>
          </div>
          <SideBar />
        </div>
      </MaintContainer>
    </motion.div>
  );
};

const Menu = ({ sideBar }: { sideBar?: boolean }) => {
  return (
    <div
      className={clsx(
        !sideBar && "hidden lg:flex items-center gap-2",
        sideBar && "flex flex-col gap-4"
      )}>
      <Link className="navigation-header-link" href={"#"}>
        Why ENVYJET?
      </Link>
      <Link className="navigation-header-link" href={"#"}>
        Nectar
      </Link>
      <Link className="navigation-header-link" href={"#"}>
        Shared Flights
      </Link>
      <Link className="navigation-header-link" href={"#"}>
        Empty Leg Flights
      </Link>
      <Link href={"#"} className="navigation-header-link">
        Contact Us
      </Link>
    </div>
  );
};

const SideBar = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="lg:hidden p-2 hover:bg-primary/10 transition-all cursor-pointer rounded-lg">
          <IoMenu size={30} />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black/50 inset-0  data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed" />
        <Dialog.Content className="fixed bg-white   h-full sm:w-[400px] min-w-[350px]  top-0  bg-gray1 p-5  shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed">
          <Dialog.Title />
          {/* content */}
          <div className="space-y-6">
            <div className={"flex items-center justify-between "}>
              <Link className="" href={"/"}>
                <Image
                  sizes="(max-width: 1023px) 60px, 100px"
                  layout="responsive"
                  style={{ objectFit: "contain" }}
                  alt="logo"
                  width={100}
                  height={100}
                  src="/assets/images/logos/logo_mobile.png"
                />
              </Link>
              <Dialog.Close asChild>
                <button
                  title="dd"
                  className=" p-2 hover:bg-primary/10 transition-all cursor-pointer rounded-lg outline-none outline-offset-1 hover:bg-mauve3 focus-visible:outline-2 focus-visible:outline-violet6 select-none">
                  <IoClose size={20} className="text-primary" />
                </button>
              </Dialog.Close>
            </div>
            <hr className="text-[#adadad]" />
            <Menu sideBar />
            {/* CONNEXION */}
            <hr className="text-[#adadad]" />
            <div className=" flex gap-4">
              <div className="flex items-center gap-2">
                <button className="p-2.5 px-7 border font-semibold rounded-md bg-primary text-white">
                  Sign In
                </button>
                <button className="p-2.5 px-7 border font-semibold rounded-md border-primary text-primary">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Header;
