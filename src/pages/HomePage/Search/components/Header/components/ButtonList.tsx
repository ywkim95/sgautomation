import styles from "./ButtonList.module.scss";
import useFoldStateStore from "../../FoldButton/stores/useFoldStateStore";
import useSearchHandlerStore from "../../../store/useSearchHandlerStore.ts";
import useDownloadListHook from "../hooks/useDownloadListHook.tsx";
import useCheckMobileStore from "../../../../../../common/stores/useCheckMobileStore.ts";
import MobileReAnalysisButton from "./MobileReAnalysisButton/MobileReAnalysisButton.tsx";
import {ButtonType} from "../../../../../../common/constants/Enum.ts";
import ReAnalysisActiveButton from "./ReAnalysisActiveButton/ReAnalysisActiveButton.tsx";
import DownloadActiveButton from "./DownloadActiveButton/DownloadActiveButton.tsx";
import {ReactNode} from "react";

interface ButtonConfig {
  show: boolean;
  component: ReactNode;
}

const ButtonList = () => {
  const { isFold } = useFoldStateStore();
  const { type } = useSearchHandlerStore();
  const { onClickImageDownload, onClickExcelDownload } = useDownloadListHook();
  const { isMobile } = useCheckMobileStore();
  
  const className = `${styles.search__headerBtn} ${isFold ? styles.folded : null}`;
  
  const buttonConfigs: ButtonConfig[] = [
    {
      show: isMobile,
      component: (
        <MobileReAnalysisButton key={`${ButtonType.reanalysis}Mobile`} />
      ),
    },
    {
      show:
        !isMobile &&
        !isFold &&
        (type === ButtonType.none || type === ButtonType.reanalysis),
      component: <ReAnalysisActiveButton key={ButtonType.reanalysis} />,
    },
    {
      show:
        !isMobile &&
        (type === ButtonType.none || type === ButtonType.image || isFold),
      component: (
        <DownloadActiveButton
          key={ButtonType.image}
          props={{
            name: "이미지 다운로드",
            type: ButtonType.image,
            onClick: onClickImageDownload,
          }}
          className={styles.search__imageBtn}
        />
      ),
    },
    {
      show:
        !isMobile &&
        (type === ButtonType.none || type === ButtonType.excel || isFold),
      component: (
        <DownloadActiveButton
          key={ButtonType.excel}
          props={{
            name: "엑셀 다운로드",
            type: ButtonType.excel,
            onClick: onClickExcelDownload,
          }}
          className={styles.search__tableBtn}
        />
      ),
    },
  ];
  
  return (
    <section
      className={className}
    >
      {buttonConfigs.map(
        ({show, component}) => show && component
      )}
    </section>
  );
};

export default ButtonList;
