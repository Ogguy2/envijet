import { motion } from "motion/react";
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
      <div className="grid lg:grid-cols-3 bg-primary/10 rounded-lg relative overflow-hidden">
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
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-0 h-16 hidden lg:block w-1/3 bg-primary rounded-lg"
          animate={{
            left:
              optionSelected.value === "One-way"
                ? "0%"
                : optionSelected.value === "Round-trip"
                ? "33.333%"
                : "66.666%",
          }}
        />
        <motion.div
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute top-0 lg:hidden h-16 w-full bg-primary rounded-lg"
          animate={{
            top:
              optionSelected.value === "One-way"
                ? "0%"
                : optionSelected.value === "Round-trip"
                ? "33.333%"
                : "66.666%",
          }}
        />
      </div>
    </div>
  );
};

export default FlightOptions;
