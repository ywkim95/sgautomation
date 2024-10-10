import styles from "./PanelBtnList.module.scss";
import buttonStyles from "../../../../../../../../common/scss/Button/Button.module.scss";

import { ImageType } from "../../../../../../../../common/constants/Enum.ts";
import PanelButton from "./components/PanelButton.tsx";
import useDetailActionHook from "../../../../../hooks/useDetailActionHook.tsx";

const PanelBtnList = () => {
  const {
    onClickReanalysisDetail,
    onClickImgDownloadDetail,
    onClickExcelDownloadDetail,
    hasMessage,
  } = useDetailActionHook();

  return (
    <div className={styles.panelHeader__download}>
      {hasMessage && (
        <PanelButton
          onClick={onClickReanalysisDetail}
          className={`${styles.panelHeader__reAnalysis} ${buttonStyles.btn}`}
        >
          <span>재분석</span>
          <div className={styles.panelHeader__reAnalysisImgIcon}></div>
        </PanelButton>
      )}
      <PanelButton
        onClick={() => onClickImgDownloadDetail(ImageType.jpeg)}
        className={`${styles.panelHeader__downloadImg} ${buttonStyles.btn}`}
      >
        <span>이미지 다운로드</span>
        <div className={styles.panelHeader__downloadImgIcon}></div>
      </PanelButton>
      {!hasMessage && (
        <PanelButton
          onClick={onClickExcelDownloadDetail}
          className={`${styles.panelHeader__downloadCsv} ${buttonStyles.btn}`}
        >
          <span>엑셀/CSV 출력</span>
          <div className={styles.panelHeader__downloadCsvIcon}></div>
        </PanelButton>
      )}
    </div>
  );
};

export default PanelBtnList;
