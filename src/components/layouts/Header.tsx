import React from "react";
import MaintContainer from "./MainContainer";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="shadow-lg">
      <MaintContainer className="py-1!">
        <div className="py-2 flex justify-between">
          {/* Logo */}
          <div className="">
            <Image
              src="/assets/images/logos/logo_mobile.png"
              alt="logo"
              quality={100}
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
          <div className="text-sm space-x-2.5">
            <button className=" p-2.5 px-7 border font-semibold rounded-md bg-primary text-white ">
              Se connecter
            </button>
            <button className=" p-2.5 px-7 border font-semibold rounded-md border-primary text-primary  ">
              S'inscrire
            </button>
          </div>
        </div>
      </MaintContainer>
    </div>
  );
};

export default Header;
