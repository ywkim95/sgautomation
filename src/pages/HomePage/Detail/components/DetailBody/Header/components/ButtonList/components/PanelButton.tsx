import { ReactNode } from "react";

const PanelButton = ({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick: () => void;
  className: string;
}) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export default PanelButton;
