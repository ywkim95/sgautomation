import { useEffect } from "react";
import useFoldStateStore from "../../pages/HomePage/Search/components/FoldButton/stores/useFoldStateStore.ts";
import useSearchHandlerStore from "../../pages/HomePage/Search/store/useSearchHandlerStore.ts";
import useCheckMobileStore from "../stores/useCheckMobileStore.ts";

const useCheckMobileHook = () => {
  const { setMobile } = useCheckMobileStore();
  const { setFold } = useFoldStateStore();
  const { reset } = useSearchHandlerStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobile(true);
        setFold(false);
        reset();
      } else {
        setMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setFold, reset]);
};

export default useCheckMobileHook;
