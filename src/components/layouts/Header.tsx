import React from "react";
import MaintContainer from "./MainContainer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { raleway } from "@/constants/fonts";
import clsx from "clsx";
const Header = () => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={clsx(raleway.className, "fixed z-50 bg-white top-0 left-0 w-full shadow-lg")}>
      <MaintContainer className="my-0! py-1!">
        <div className="py-2 flex justify-between">
          {/* Logo */}
          <div className="">
            <Image
              src="/assets/images/logos/logo_mobile.png"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
          {/* Navigation */}
          <div className="flex items-center gap-2">
            <Link className="navigation-header-link" href={"#"}>
              Pourquoi ENVYJET ?
            </Link>
            <Link className="navigation-header-link" href={"#"}>
              Nectar
            </Link>
            <Link className="navigation-header-link" href={"#"}>
              Vols partager
            </Link>
            <Link className="navigation-header-link" href={"#"}>
              Vols à vide
            </Link>
            <Link href={"#"} className="navigation-header-link">
              Contactez-nous
            </Link>
          </div>
          {/* Sign up */}
          <div className="flex items-center gap-2">
            <button className=" p-2.5 px-7 border font-semibold rounded-md bg-primary text-white ">
              Se connecter
            </button>
            <button className=" p-2.5 px-7 border font-semibold rounded-md border-primary text-primary  ">
              S'inscrire
            </button>
          </div>
        </div>
      </MaintContainer>
    </motion.div>
  );
};

export default Header;
