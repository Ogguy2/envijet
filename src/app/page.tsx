"use client";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";
import MaintContainer from "@/components/layouts/MainContainer";
import React from "react";
import bg from "../../public/assets/images/hero-1.jpg";
import { motion } from "motion/react";
import { FaRightLeft, FaRightLong } from "react-icons/fa6";
import "react-day-picker/style.css";
import { TiArrowLoop } from "react-icons/ti";
import {
  FaCalendarCheck,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaPlug,
  FaPlus,
} from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { Airport, Fly } from "@/types";
import Btn from "@/components/Buttons";
import DialogDate from "@/components/dialogs/DaialogDate";
import DialogPassenger from "@/components/dialogs/DialogPassengers";
import DialogDepartureAirpot from "@/components/dialogs/DialogAirport";
import FlightOptions from "@/components/FlyOptions";
import clsx from "clsx";

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
        <MaintContainer className="translate-y-[-300px] ">
          <div className="border border-black/15 shadow bg-white p-4  rounded-lg ">
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
              <div className="p-3">
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

const OneWayFormRequest = () => {
  // Aeroport de depart
  const [fly, setFly] = React.useState<Fly>({
    departureAirport: null,
    arrivalAirport: null,
    date: new Date(),
  });
  // Nombre de passagers
  const [passengerNumber, setPassengerNumber] = React.useState(1);
  return (
    <div className="py-10 space-y-6">
      <div className="grid relative grid-cols-4 gap-6">
        <SegmentFly className="col-span-3" fly={fly} setFly={setFly} />
        {/* Nombre de passagers */}
        <div className="space-y-2">
          <div className="font-semibold">
            <label htmlFor="departure-date">Nombre de passagers</label>
          </div>
          <div>
            <div className="relative">
              <span className="text-primary absolute top-1/2 -translate-y-1/2 left-3">
                <IoPeopleSharp />
              </span>
              <DialogPassenger setData={setPassengerNumber}>
                <input
                  defaultValue={passengerNumber}
                  type="text"
                  className="p-2.5 ps-[40px] shadow text-primary border border-primary/30 rounded-md w-full"
                  placeholder="Passager..."
                />
              </DialogPassenger>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <Btn className="inline-block!" title="Réserver" />
      </div>
    </div>
  );
};

const RoundTripFormRequest = () => {
  // Aeroport de depart
  const [fly, setFly] = React.useState<Fly>({
    departureAirport: null,
    arrivalAirport: null,
    date: new Date(),
  });
  // Date du départ
  const [selectedDateReturn, setSelectedDateReturn] = React.useState<Date>();
  // Nombre de passagers
  const [passengerNumber, setPassengerNumber] = React.useState(1);

  return (
    <div className=" py-10 space-y-6">
      <div className="grid relative grid-cols-4 gap-6">
        <SegmentFly className="col-span-3" fly={fly} setFly={setFly} />
        {/* Date du retour */}
        <div className="space-y-2">
          <div className="font-semibold">
            <label htmlFor="departure-date">Date du retour</label>
          </div>
          <div className="relative">
            <span className="text-primary absolute top-1/2 -translate-y-1/2 left-3">
              <FaCalendarCheck />
            </span>
            <DialogDate setSelectedDate={setSelectedDateReturn}>
              <div>
                <input
                  id="date"
                  type="text"
                  defaultValue={selectedDateReturn?.toLocaleDateString()}
                  className="p-2.5 ps-[40px] shadow text-primary border border-primary/30 rounded-md w-full"
                  placeholder="Date du départ..."
                />
              </div>
            </DialogDate>
          </div>
        </div>
        {/* Nombre de passagers */}
        <div className="space-y-2">
          <div className="font-semibold">
            <label htmlFor="departure-date">Nombre de passagers</label>
          </div>
          <div>
            <div className="relative">
              <span className="text-primary absolute top-1/2 -translate-y-1/2 left-3">
                <IoPeopleSharp />
              </span>
              <DialogPassenger setData={setPassengerNumber}>
                <input
                  defaultValue={passengerNumber}
                  type="text"
                  className="p-2.5 ps-[40px] shadow text-primary border border-primary/30 rounded-md w-full"
                  placeholder="Passager..."
                />
              </DialogPassenger>
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <Btn className="inline-block!" title="Réserver" />
      </div>
    </div>
  );
};

const MultiLegFormRequest = () => {
  // Aeroport de depart
  const [fly, setFly] = React.useState<Fly>({
    departureAirport: null,
    arrivalAirport: null,
    date: new Date(),
  });

  const [flys, setFlys] = React.useState<Fly[]>([
    {
      departureAirport: null,
      arrivalAirport: null,
      date: new Date(),
    },
  ]);

  const handleAddFly = () => {
    setFlys([
      ...flys,
      {
        departureAirport: null,
        arrivalAirport: null,
        date: new Date(),
      },
    ]);
  };
  // Nombre de passagers
  const [passengerNumber, setPassengerNumber] = React.useState(1);
  return (
    <div className="py-10 space-y-6">
      <div className="grid relative grid-cols-3 gap-6">
        {flys.map((fly, index) => (
          <SegmentFly
            key={index}
            className="col-span-3"
            fly={fly}
            setFly={value => setFlys(flys.map((fly, i) => (i === index ? value : fly)))}
          />
        ))}
      </div>
      <button
        onClick={handleAddFly}
        className="cursor-pointer w-full flex items-center gap-2 rounded-2xl justify-center p-2.5 border-2 border-dashed">
        <FaPlus />
        <span className="font-semibold">Ajouter un vol</span>
      </button>
      <div>
        {/* Nombre de passagers */}
        <div className="space-y-2">
          <div className="font-semibold">
            <label htmlFor="departure-date">Nombre de passagers</label>
          </div>
          <div>
            <div className="relative">
              <span className="text-primary absolute top-1/2 -translate-y-1/2 left-3">
                <IoPeopleSharp />
              </span>
              <DialogPassenger setData={setPassengerNumber}>
                <input
                  defaultValue={passengerNumber}
                  type="text"
                  className="p-2.5 ps-[40px] shadow text-primary border border-primary/30 rounded-md w-full"
                  placeholder="Passager..."
                />
              </DialogPassenger>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <Btn className="inline-block!" title="Réserver" />
      </div>
    </div>
  );
};

const SegmentFly = ({
  fly,
  setFly,
  className,
}: {
  fly: Fly;
  className?: string;
  setFly: (fly: Fly) => void;
}) => {
  return (
    <div className={clsx("gap-6 grid grid-cols-3", className)}>
      {/* Departure Airport */}
      <div className="space-y-2">
        <div className="font-semibold">
          <label htmlFor="departure-date">Aéroport de départ</label>
        </div>
        <div className="relative">
          <span className="text-primary absolute top-1/2 -translate-y-1/2 left-3">
            <FaPlaneDeparture size={20} />
          </span>
          <DialogDepartureAirpot
            setSelectedAirport={value =>
              setFly({ ...fly, departureAirport: value })
            }>
            <div>
              <input
                id={"departure-airport"}
                type="text"
                autoComplete="off"
                defaultValue={fly.departureAirport?.name}
                placeholder="Rechercher un aéroport..."
                className="p-2.5 ps-[40px] shadow text-primary border border-primary/30 rounded-md w-full"
              />
            </div>
          </DialogDepartureAirpot>
        </div>
      </div>
      {/* Arrival Airport */}
      <div className="space-y-2">
        <div className="font-semibold">
          <label htmlFor="departure-date">Aéroport d'arriver</label>
        </div>
        <div className="relative">
          <span className="text-primary absolute top-1/2 -translate-y-1/2 left-3">
            <FaPlaneArrival size={20} />
          </span>
          <DialogDepartureAirpot
            setSelectedAirport={value =>
              setFly({ ...fly, arrivalAirport: value })
            }>
            <div>
              <input
                id={"departure-airport"}
                type="text"
                defaultValue={fly.arrivalAirport?.name}
                placeholder="Rechercher un aéroport..."
                className="p-2.5 ps-[40px] shadow text-primary border border-primary/30 rounded-md w-full"
              />
            </div>
          </DialogDepartureAirpot>
        </div>
      </div>
      {/* Date du départ */}
      <div className="space-y-2">
        <div className="font-semibold">
          <label htmlFor="departure-date">Date du départ</label>
        </div>
        <div className="relative">
          <span className="text-primary absolute top-1/2 -translate-y-1/2 left-3">
            <FaCalendarCheck />
          </span>
          <DialogDate
            setSelectedDate={value => setFly({ ...fly, date: value })}>
            <div>
              <input
                id="date"
                type="text"
                defaultValue={fly.date?.toLocaleDateString()}
                className="p-2.5 ps-[40px] shadow text-primary border border-primary/30 rounded-md w-full"
                placeholder="Date du départ..."
              />
            </div>
          </DialogDate>
        </div>
      </div>
    </div>
  );
};
