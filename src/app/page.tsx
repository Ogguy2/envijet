"use client";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import MaintContainer from "@/components/layouts/MainContainer";
import Image from "next/image";
import React from "react";
import bg from "../../public/assets/images/hero-1.jpg";
import clsx from "clsx";
import { motion } from "motion/react";
import { FaRightLeft, FaRightLong } from "react-icons/fa6";
import { TiArrowLoop } from "react-icons/ti";
export default function HomePage() {
  const optionFly = [
    {
      name: "Aller simple",
      value: "Aller simple",
      icon: <FaRightLong />,
    },
    {
      name: "Aller-retour",
      value: "Aller-retour",
      icon: <FaRightLeft />,
    },
    {
      name: "Vols multiples",
      value: "Vols multiples",
      icon: <TiArrowLoop />,
    },
  ];
  const [flyOption, setFlyOption] = React.useState(optionFly[0]);
  const handleActivateOption = (option: {
    name: string;
    value: string;
    icon: React.JSX.Element;
  }) => {
    setFlyOption(option);
  };
  return (
    <div>
      <Header />
      <div className="">
        <div className="relative">
          <div className="absolute w-full h-full bg-black/30"></div>
          <div
            style={{
              backgroundImage: `url(${bg.src})`,
            }}
            className="w-full h-[600px] bg-cover bg-center bg-fixed"></div>
        </div>
        <MaintContainer>
          <div className="border border-black/15 shadow rounded-lg ">
            <div className="">
              {/* Fly option */}
              <div className="">
                <FlightOptions
                  options={optionFly}
                  handleActivateOption={handleActivateOption}
                  optionSelected={flyOption}
                />
              </div>
              {/* Fly form */}
              <div className="">
                {flyOption.value === "Aller simple" && <OneWayFormRequest />}
                {flyOption.value === "Aller-retour" && <RoundTripFormRequest />}
                {flyOption.value === "Vols multiples" && (
                  <MultiLegFormRequest />
                )}
              </div>
            </div>
            <div className="">
              {/* Plane Option swith fly option */}
              <div className="my-20"></div>
            </div>
          </div>
        </MaintContainer>
      </div>
      <Footer />
    </div>
  );
}

interface FlyOptionProps {
  optionSelected: { name: string; value: string };
  options: { name: string; value: string; icon: React.JSX.Element }[];
  handleActivateOption: (option: {
    name: string;
    value: string;
    icon: React.JSX.Element;
  }) => void;
}
const FlightOptions = ({
  options,
  handleActivateOption,
  optionSelected,
}: FlyOptionProps) => {
  return (
    <div className="relative w-full">
      {/* Container */}
      <div className="grid grid-cols-3 bg-primary/10 rounded-lg relative overflow-hidden">
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => handleActivateOption(option)}
            className={`h-16 flex items-center justify-center gap-2 relative z-10 ${
              optionSelected.value === option.value
                ? "text-white font-semibold"
                : "text-gray-700"
            }`}>
            <span>{option.icon}</span>
            <span>{option.name}</span>
          </button>
        ))}

        {/* Barre animée */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-0 h-16 w-1/3 bg-primary rounded-lg"
          animate={{
            left:
              optionSelected.value === "Aller simple"
                ? "0%"
                : optionSelected.value === "Aller-retour"
                ? "33.333%"
                : "66.666%",
          }}
        />
      </div>
    </div>
  );
};

interface InputFormRequestProps {
  label: string;
  type: string;
  placeholder: string;
}

const InputFormRequest = ({
  label,
  type,
  placeholder,
}: InputFormRequestProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="">{label}</label>
      <input type="text" placeholder={placeholder} handleChange={handleChange} type={type} />
    </div>
  );
};

const OneWayFormRequest = () => {
  return (
    <div className="py-10">
      <div className="grid grid-cols-4">
        <div className="space-y-2">
          <div>
            <label htmlFor="">Départ</label>
          </div>
          <div>
            <input
              type="text"
              className="p-3 ps-[50px]  placeholder:font-semibold font-semibold text-primary  border border-primary rounded-md  w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Arrivée</label>
          <input type="text" />
        </div>
      </div>
    </div>
  );
};

const RoundTripFormRequest = () => {
  return <div>BBBBBBBBBBBBBBBBBBBBBBBBBB</div>;
};

const MultiLegFormRequest = () => {
  return <div>CCCCCCCCCCCCCCCCCCCCCCC</div>;
};
