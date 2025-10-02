import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaRegEnvelope,
} from "react-icons/fa";
import clsx from "clsx";
import { playfair_display } from "@/constants/fonts";
import MaintContainer from "./MainContainer";
import { FaXTwitter } from "react-icons/fa6";

const NewLetterForm = () => {
  return (
    <div className=" text-black space-y-6 rounded-lg bg-white px-7 py-13">
      <div className={clsx(playfair_display.className, "font-bold text-3xl")}>
        Inscrivez-vous à notre newsletter
      </div>
      <div className="">
        <form action="">
          <div className="flex items-center gap-4">
            <div className="flex-1  relative">
              <FaRegEnvelope
                className="text-primary absolute top-1/2 -translate-y-1/2 left-4"
                size={20}
              />
              <input
                type="text"
                className="p-2.5 ps-[50px]  placeholder:font-semibold font-semibold text-primary  border border-primary rounded-md  w-full"
                placeholder="name@exemple.com"
              />
            </div>
            <div>
              <button className=" p-2.5 px-7 border font-semibold rounded-md bg-primary text-white ">
                S'inscrire
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className=" bg-primary   text-white">
      <div
        className={clsx(
          playfair_display.className,
          "text-center text-3xl py-4"
        )}>
        La véritable expresion du prestige
      </div>
      {/* NewLetter */}
      <MaintContainer className="my-5!">
        <NewLetterForm />
        <div className="flex w-full py-7 justify-between ">
          {/* Logo */}
          <div className="flex-1 space-y-4">
            <div>
              <Image
                src="/assets/images/logos/logo_footer.png"
                alt="logo"
                width={190}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <Link
                className="flex items-center gap-3 transition-all hover:underline hover:font-semibold"
                href={"mailto:sales@envyjet.com"}>
                <FaRegEnvelope />
                <span>sales@envyjet.com</span>
              </Link>
              <Link
                className="flex items-center gap-3  transition-all hover:underline hover:font-semibold"
                href={"tel:+2250759102503"}>
                <FaPhone />
                <span>+2250759102503 </span>
              </Link>
            </div>
          </div>
          <div className=" ">
            <div className="grid grid-cols-3 gap-15">
              {/* payment method */}
              <div className="space-y-5">
                <div className="font-bold">METHODES DE PAYMENT</div>
                <svg
                  height="30"
                  viewBox="0.5 0.5 999 323.684"
                  // width="200"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M651.185.5c-70.933 0-134.322 36.766-134.322 104.694 0 77.9 112.423 83.28 112.423 122.415 0 16.478-18.884 31.229-51.137 31.229-45.773 0-79.984-20.611-79.984-20.611l-14.638 68.547s39.41 17.41 91.734 17.41c77.552 0 138.576-38.572 138.576-107.66 0-82.316-112.89-87.537-112.89-123.86 0-12.91 15.501-27.053 47.662-27.053 36.286 0 65.892 14.99 65.892 14.99l14.326-66.204S696.614.5 651.185.5zM2.218 5.497L.5 15.49s29.842 5.461 56.719 16.356c34.606 12.492 37.072 19.765 42.9 42.353l63.51 244.832h85.138L379.927 5.497h-84.942L210.707 218.67l-34.39-180.696c-3.154-20.68-19.13-32.477-38.685-32.477H2.218zm411.865 0L347.449 319.03h80.999l66.4-313.534h-80.765zm451.759 0c-19.532 0-29.88 10.457-37.474 28.73L709.699 319.03h84.942l16.434-47.468h103.483l9.994 47.468H999.5L934.115 5.497h-68.273zm11.047 84.707l25.178 117.653h-67.454z"
                    fill="#FFF"
                  />
                </svg>
              </div>
              {/* Social média */}
              <div className="space-y-5">
                <div className="font-bold uppercase">Nos réseaux</div>
                <div className="flex flex-col gap-2">
                  <Link
                    href={
                      "https://www.facebook.com/profile.php?id=61560917589738"
                    }>
                    <FaInstagram size={40} />
                  </Link>
                  <Link
                    href={
                      "https://www.facebook.com/profile.php?id=61560917589738"
                    }>
                    <FaFacebookSquare size={40} />
                  </Link>
                  <Link
                    href={
                      "https://www.facebook.com/profile.php?id=61560917589738"
                    }>
                    <FaLinkedin size={40} />
                  </Link>
                  <Link
                    href={
                      "https://www.facebook.com/profile.php?id=61560917589738"
                    }>
                    <FaXTwitter size={40} />
                  
                  </Link>
                </div>
              </div>
              {/* Navigation */}
              <div className="space-y-5">
                <div className="font-bold">ENVYJET</div>
                <div className="flex  flex-col gap-2">
                  <Link
                    className="transition-all hover:underline hover:font-semibold"
                    href={"#"}>
                    Pourquoi ENVYJET ?
                  </Link>
                  <Link
                    className="transition-all hover:underline hover:font-semibold"
                    href={"#"}>
                    Nectar
                  </Link>
                  <Link
                    className="transition-all hover:underline hover:font-semibold"
                    href={"#"}>
                    Vols partager
                  </Link>
                  <Link
                    className="transition-all hover:underline hover:font-semibold"
                    href={"#"}>
                    Vols à vide
                  </Link>
                  <Link
                    href={"#"}
                    className="transition-all hover:underline hover:font-semibold">
                    Contactez-nous
                  </Link>
                </div>
              </div>
              <div className="space-y-5">
                <div className="font-bold"></div>
                <div className="flex text-sm flex-col gap-2">
                  <Link className="transition-all underline" href={"#"}>
                    Terms & Conditions
                  </Link>
                  <Link className="transition-all underline" href={"#"}>
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* NewLetter */}
        </div>
      </MaintContainer>

      <hr className="opacity-30" />
      <div className={clsx("text-center text-sm py-3")}>
        © 2025 Envy Jet all rights reserved
      </div>
    </div>
  );
};

export default Footer;
