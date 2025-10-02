"use client";
import clsx from "clsx";
import React from "react";
import {
  FaCalendarCheck,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import DialogDepartureAirpot from "./dialogs/DialogAirport";
import DialogPassenger from "./dialogs/DialogPassengers";
import { IoPeopleSharp } from "react-icons/io5";
import FlightOptions from "./FlyOptions";
import { FaRightLeft, FaRightLong } from "react-icons/fa6";
import { TiArrowLoop } from "react-icons/ti";
import { Fly } from "@/types";
import DialogDate from "./dialogs/DialogDate";
import Btn from "./Buttons";

export default function FlightRequestForm() {
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
    <div id="request-form">
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
            {flyOption.value === "Vols multiples" && <MultiLegFormRequest />}
          </div>
        </div>
        <div className="">
          <div className="my-20"></div>
        </div>
      </div>
    </div>
  );
}

const OneWayFormRequest = () => {
  // Aeroport de depart
  const [fly, setFly] = React.useState<Fly>({
    id: 0,
    departureAirport: null,
    arrivalAirport: null,
    date: new Date(),
  });

  // Nombre de passagers
  const [passengerNumber, setPassengerNumber] = React.useState(1);
  return (
    <div className="py-10 space-y-6">
      <div className="grid relative  lg:grid-cols-4 gap-6">
        <SegmentFly className="lg:col-span-3" fly={fly} setFly={setFly} />
        {/* Nombre de passagers */}
        <div className="space-y-2">
          <div className="font-semibold">
            <label htmlFor="departure-date">Nombre de passagers</label>
          </div>
          <div>
            <div className="relative  w-full">
              <span className="text-primary absolute top-1/2 -translate-y-1/2 left-3">
                <IoPeopleSharp />
              </span>
              <DialogPassenger setData={setPassengerNumber}>
                <input
                  value={passengerNumber}
                  onChange={() => {}}
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
    id: 0,
    departureAirport: null,
    arrivalAirport: null,
    date: new Date(),
  });
  // Date du départ
  const [selectedDateReturn, setSelectedDateReturn] = React.useState<Date>(
    new Date()
  );
  // Nombre de passagers
  const [passengerNumber, setPassengerNumber] = React.useState(1);

  React.useEffect(() => {
    setSelectedDateReturn(fly.date);
  }, [fly.date]);
  return (
    <div className=" py-10 space-y-6">
      <div className="grid relative  lg:grid-cols-4 gap-6">
        <SegmentFly className="lg:col-span-3" fly={fly} setFly={setFly} />
        {/* Date du retour */}
        <div className=" space-y-2">
          <div className="font-semibold">
            <label htmlFor="departure-date">Date du retour</label>
          </div>
          <div className="relative">
            <span className="text-primary absolute top-1/2 -translate-y-1/2 left-3">
              <FaCalendarCheck />
            </span>
            <DialogDate
              minDate={fly.date}
              setSelectedDate={setSelectedDateReturn}>
              <div>
                <input
                  id="date"
                  type="text"
                  onChange={() => {}}
                  value={
                    selectedDateReturn
                      ? selectedDateReturn.toLocaleDateString("fr-FR")
                      : ""
                  }
                  className="p-2.5 ps-[40px] shadow text-primary border border-primary/30 rounded-md w-full"
                  placeholder="Date du retour..."
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
                  value={passengerNumber}
                  onChange={() => {}}
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
  const [flys, setFlys] = React.useState<Fly[]>([
    {
      id: 0,
      departureAirport: null,
      arrivalAirport: null,
      date: new Date(),
    },
  ]);

  const handleAddFly = () => {
    setFlys([
      ...flys,
      {
        id: flys.length,
        departureAirport: null,
        arrivalAirport: null,
        date: new Date(),
      },
    ]);
  };
  const handleRemoveFly = (fly: Fly) => {
    setFlys(flys.filter(f => f.id !== fly.id));
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
            prevFly={index > 0 ? flys[index - 1] : undefined}
            nextFly={index < flys.length - 1 ? flys[index + 1] : undefined}
            setFly={value =>
              setFlys(flys.map((fly, i) => (i === index ? value : fly)))
            }
            handleRemoveFly={handleRemoveFly}
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
                  value={passengerNumber}
                  onChange={() => {}}
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
  prevFly,
  nextFly,
  setFly,
  className,
  handleRemoveFly,
}: {
  fly: Fly;
  prevFly?: Fly;
  nextFly?: Fly;
  className?: string;
  setFly: (fly: Fly) => void;
  handleRemoveFly?: (fly: Fly) => void;
}) => {
  return (
    <div
      className={clsx("gap-6 grid md:grid-cols-2 lg:grid-cols-3", className)}>
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
            data={fly.departureAirport}
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
            data={fly.arrivalAirport}
            setSelectedAirport={value => {
              setFly({ ...fly, arrivalAirport: value });
            }}>
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
        <div className=" flex gap-3">
          <div className="relative flex-1">
            <span className="text-primary absolute top-1/2 -translate-y-1/2 left-3">
              <FaCalendarCheck />
            </span>
            <DialogDate
              setSelectedDate={value => setFly({ ...fly, date: value })}>
              <div>
                <input
                  id="date"
                  type="text"
                  onChange={() => {}}
                  value={fly.date ? fly.date.toLocaleDateString("fr-FR") : ""}
                  className="p-2.5 ps-[40px] shadow text-primary border border-primary/30 rounded-md w-full"
                  placeholder="Date du départ..."
                />
              </div>
            </DialogDate>
          </div>
          {handleRemoveFly && (
            <Btn
              className="px-4!"
              title={null}
              iconAfter={<FaTrash />}
              onClick={() => handleRemoveFly(fly)}
            />
          )}
        </div>
      </div>
      {fly.departureAirport &&
        fly.arrivalAirport &&
        fly.departureAirport.id === fly.arrivalAirport.id && (
          <div className="text-red-500 text-sm">
            The start and finish cannot be the same.
          </div>
        )}
      {/* Comprend previon date fly et next date fly */}
      {prevFly && fly.date <= prevFly.date && (
        <div className="text-red-500 text-sm">
          The start date cannot be before the previous date.
        </div>
      )}
      {nextFly && fly.date >= nextFly.date && (
        <div className="text-red-500 text-sm">
          The start date cannot be after the next date.
        </div>
      )}
    </div>
  );
};
