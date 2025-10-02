import { Dialog } from "radix-ui";
import React from "react";
import { DayPicker, Matcher } from "react-day-picker";
import Btn from "../Buttons";

interface DialogDateProps {
  children: React.ReactNode;
  setSelectedDate: (date: Date) => void;
  minDate?: Date;
}

const DialogDate = ({
  children,
  setSelectedDate,
  minDate,
}: DialogDateProps) => {
  const [date, setDate] = React.useState<any>();


  return (
    <Dialog.Root>
      <Dialog.Trigger className="w-full">{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black/40 h-screen w-screen inset-0  data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed" />
        <Dialog.Content className="fixed space-y-4 bg-white left-1/2 top-1/2   -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray1 p-4  shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-dialogOpen data-[state=closed]:animate-dialogClosed">
          <Dialog.Title />
          <div className="">
            {JSON.stringify(minDate)}
            <DayPicker
              animate
              disabled={{
                before: minDate
                  ? minDate
                  : new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      new Date().getDate()
                    ),
              }}
              captionLayout="dropdown"
              startMonth={
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate()
                )
              }
              endMonth={
                new Date(
                  new Date().getFullYear(),
                  new Date().getMonth() + 1,
                  10
                )
              }
              defaultMonth={
                new Date(new Date().getFullYear(), new Date().getMonth())
              }
              mode="single"
              selected={date}
              onSelect={setDate}
            />
          </div>
          <Dialog.Close asChild>
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
