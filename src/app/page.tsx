"use client";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import MaintContainer from "@/components/layouts/MainContainer";
import React from "react";
import bg from "../../public/assets/images/hero-1.jpg";
import FlightRequestForm from "@/components/FlightRequestForm";
import { motion } from "motion/react";
import clsx from "clsx";
import { playfair_display, raleway } from "@/constants/fonts";
import Btn from "@/components/Buttons";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="relative">
      <Header />
      <div className="">
        <Hero />
        <MaintContainer className=" ">
          <FlightRequestForm />
        </MaintContainer>
        <MaintContainer className="my-0! ">
          <Services />
        </MaintContainer>
        <MaintContainer className="my-!">
          <About />
        </MaintContainer>
      </div>
      <Footer />
    </div>
  );
}

const Hero = () => {
  return (
    <div>
      <div className="relative w-full h-screen">
        {/* <div className="absolute w-full h-full bg-black/30"></div> */}
        <div className="relative w-full h-screen overflow-hidden">
          {/* Vidéo en background */}
          <video
            suppressHydrationWarning
            preload="auto"
            autoPlay
            loop
            crossOrigin="anonymous"
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0">
            <source src="/assets/videos/hero-video.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo en background.
          </video>
        </div>
        <div className="bg-black/20 absolute top-0 left-0 w-full h-full z-10"></div>
        <div className="bg-black/20 absolute top-0 left-0 w-full h-full z-20">
          <div className="flex items-center justify-center h-full">
            <motion.div
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.8 }}>
              <div className=" space-y-4 font-bold text-white text-center ">
                <div className="space-y-4">
                  <div
                    className={clsx(playfair_display.className, "text-5xl ")}>
                    At the heart of your travels
                  </div>

                  <div className={clsx(raleway.className, "text-3xl")}>
                    PREMIUM PRIVATE JET SERVICE
                  </div>
                </div>
                <div className="flex justify-center">
                  <a href="#request-form">
                    <Btn
                      className="border-transparent bg-[#D99923]!"
                      title="Book a flight"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
const About = () => {
  return (
    <div className="py-20">
      <div className="w-full flex flex-col gap-12  md:flex-row-reverse items-center justify-between">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 100 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="md:max-w-1/2 space-y-10">
          <div className="space-y-6">
            <div
              className={clsx(
                playfair_display.className,
                "text-6xl text-secondary"
              )}>
              About us
            </div>
            <div>
              <div className="text-lg font-semibold">
                We save you time and provide you with flight comfort
              </div>
              <div>
                Our dedicated team ensures that our business partners, guests
                and their families enjoy an exceptional trip. Whether for a
                pressing business trip or a personal getaway, our services are
                designed to be fast, efficient and economical.
              </div>
            </div>
          </div>
          <div>
            <div>
              <a href="#request-form">
                <Btn
                  className="border-transparent bg-secondary!"
                  title="FIND OUT MORE"
                />
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -100 }}
          viewport={{ once: true }}
          className="md:max-w-1/2"
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}>
          <Image
            alt="about-1"
            width={500}
            height={100}
            src="/assets/images/about.jpg"
          />
        </motion.div>
      </div>
    </div>
  );
};
const Services = () => {
  interface ServiceProps {
    title: string;
    desctiption: string;
    image: string | null;
  }
  const services: ServiceProps[] = [
    {
      title: "Exclusive private jet charter",
      desctiption:
        "From your starting point to your final destination, relax with complete peace of mind.",
      image: "/assets/images/about.jpg",
    },
    {
      title: "Shared Flights",
      desctiption:
        "Discover the exclusive EnvyJet experience with our shared jet flights.",
      image: "/assets/images/about.jpg",
    },
    {
      title: "Empty Legs",
      desctiption: "EnvyJet offers you a unique opportunity to save money.",
      image: "/assets/images/about.jpg",
    },
  ];
  return (
    <div className="">
      <div
        className={clsx(
          playfair_display.className,
          "md:sticky top-[75px] py-4 bg-white z-20 text-6xl text-secondary"
        )}>
        Our Services
      </div>
      <div className="space-y-10">
        {services.map((element, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "w-full  md:sticky md:top-[180px]  md:flex  justify-between"
              )}>
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                initial={{ opacity: 0, x: 100 }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="lg:max-w-1/2 bg-white  space-y-10">
                <div className="max-w-md">
                  <div className="space-y-10">
                    <div className="text-2xl font-semibold">
                      {element.title}
                    </div>
                    <div className="text-lg">{element.desctiption}</div>
                    <div>
                      <div>
                        <a href="#request-form">
                          <Btn
                            className="border-transparent bg-secondary!"
                            title="FIND OUT MORE"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                initial={{ opacity: 0, x: 100 }}
                className="lg:max-w-1/2 "
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}>
                <div className="">
                  <Image
                    className="lg:rounded-tl-[200px] py-[50px] lg:rounded-br-[200px]"
                    alt="about-1"
                    width={900}
                    height={100}
                    src="/assets/images/about.jpg"
                  />
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
