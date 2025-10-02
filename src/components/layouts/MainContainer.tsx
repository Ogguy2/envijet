import clsx from "clsx";

interface MaintContainerProps {
  children: React.ReactNode;
  className?: string;
}

const MaintContainer = ({ children, className }: MaintContainerProps) => {
  return (
    <div className={clsx(className,"px-4 [1280px]:px-0 my-20")}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
};

export default MaintContainer;
