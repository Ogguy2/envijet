import clsx from "clsx";
interface BtnProps {
  iconBefore?: React.JSX.Element;
  iconAfter?: React.JSX.Element;
  title: string;
  className?: string;
  onClick?: () => void;
}
const Btn = ({
  className,
  iconBefore,
  iconAfter,
  title,
  onClick,
}: BtnProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        className,
        "flex items-center justify-center gap-2 p-2.5 px-7 border font-semibold rounded-md bg-primary text-white hover:bg-primary/90  transition-colors"
      )}>
      {iconBefore && <span>{iconBefore}</span>}
      <span>{title}</span>
      {iconAfter && <span>{iconAfter}</span>}
    </button>
  );
};


export default Btn;