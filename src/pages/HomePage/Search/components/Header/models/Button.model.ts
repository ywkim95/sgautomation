import { ButtonType } from "../../../../../../common/constants/Enum.ts";

export interface ButtonProps {
  name: string;
  type: ButtonType;
  onClick: () => void;
}
