import useSearchHandlerStore from "../../../../../store/useSearchHandlerStore.ts";
import { ButtonProps } from "../../../models/Button.model.ts";

const useDownloadActiveButtonHook = (props: ButtonProps) => {
  const { name, type, onClick } = props;
  const { type: btnType, show, setProps, reset } = useSearchHandlerStore();
  const handleClick = () => {
    if (btnType === type) {
      reset();
      return;
    }
    setProps({
      show: true,
      name,
      type,
      onClick,
    });
  };
  return {
    handleClick,
    show,
  };
};

export default useDownloadActiveButtonHook;
