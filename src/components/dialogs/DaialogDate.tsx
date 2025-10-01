import { Dialog } from "radix-ui";
import React from "react";
import { DayPicker } from "react-day-picker";
import Btn from "../Buttons";
import { FaCheck } from "react-icons/fa";

interface DialogDateProps {
  children: React.ReactNode;
  setSelectedDate: (date: Date) => void;
}

const DialogDate = ({ children, setSelectedDate }: DialogDateProps) => {
  const [date, setDate] = React.useState<Date>();
  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-full">{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black/40 h-screen w-screen inset-0  data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed" />
        <Dialog.Content className="fixed space-y-4 bg-white left-1/2 top-1/2   -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray1 p-4  shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed">
          <Dialog.Title />
          <div className="">
            <DayPicker
              animate
              captionLayout="dropdown"
              defaultMonth={new Date(2024, 6)}
              startMonth={new Date(2024, 6)}
              endMonth={new Date(2025, 9)}
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </div>
          <Dialog.Close asChild>
            {/* <button className="flex items-center justify-center gap-2 w-full p-2.5 px-7 border font-semibold rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
                <span>valider</span>
                <FaCheck />
              </button> */}
            <Btn
              className="w-full"
              title="valider"
              onClick={() => {
                setSelectedDate(date);
              }}
            />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogDate;
