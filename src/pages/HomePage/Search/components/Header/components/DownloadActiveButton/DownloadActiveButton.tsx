import { ButtonProps } from "../../models/Button.model.ts";
import useDownloadActiveButtonHook from "./hooks/useDownloadActiveButtonHook.tsx";
import buttonStyles from "../../../../../../../common/scss/Button/Button.module.scss";
interface DownloadActiveButtonProps {
  props: ButtonProps;
  className: string;
}

const DownloadActiveButton = ({
  props,
  className,
}: DownloadActiveButtonProps) => {
  const { handleClick } = useDownloadActiveButtonHook(props);
  return (
    <button
      className={`${className} ${buttonStyles.btn}`}
      onClick={handleClick}
    ></button>
  );
};

export default DownloadActiveButton;
