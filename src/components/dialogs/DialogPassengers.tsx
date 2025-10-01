import { Dialog } from "radix-ui";
import Btn from "../Buttons";
import React from "react";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";

const DialogPassenger = ({
  children,
  setData,
}: {
  children: React.ReactNode;
  setData: (number: number) => void;
}) => {
  const [passengerNumber, setPassengerNumber] = React.useState(1);
  const handleAddPassenger = (type: "add" | "remove") => {
    if (type === "add") {
      setPassengerNumber(passengerNumber + 1);
    } else {
      if (passengerNumber <= 1) return;
      setPassengerNumber(passengerNumber - 1);
    }
  };
  
  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-full">{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black/40 h-screen w-screen inset-0  data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed" />
        <Dialog.Content className="fixed space-y-4 bg-white left-1/2 top-1/2 w-[500px]  -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray1 p-4  shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed">
          <Dialog.Title />
          <div className="">
            <div className="flex justify-between items-center">
              <span>Nombre de passager(s)</span>
              <div className="flex items-center gap-2">
                <Btn
                  className={clsx("py-1! px-4! text-3xl! font-normal!")}
                  title="+"
                  onClick={() => handleAddPassenger("add")}
                />
                <span className="w-10 text-center">{passengerNumber}</span>
                <Btn
                  className={clsx(passengerNumber == 1 && "bg-gray-200!", "py-1! px-4! text-3xl! font-normal!")}
                  title="-"
                  onClick={() => handleAddPassenger("remove")}
                />
              </div>
            </div>
          </div>
          <Dialog.Close asChild>
            {/* <button className="flex items-center justify-center gap-2 w-full p-2.5 px-7 border font-semibold rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
                <span>valider</span>
                <FaCheck />
              </button> */}
            <Btn
              title="valider"
              className="w-full"
              onClick={() => {
                setData(passengerNumber);
              }}
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogPassenger;
