import styles from "./PanelHeader.module.scss";
import BackButton from "./components/BackButton/BackButton.tsx";
import useCheckMobileStore from "../../../../../../common/stores/useCheckMobileStore.ts";
import PanelBtnList from "./components/ButtonList/PanelBtnList.tsx";

const PanelHeader = () => {
  const { isMobile } = useCheckMobileStore();
  return (
    <header className={styles.panelHeader__title}>
      {isMobile ? <BackButton /> : null}
      <span className={styles.panelHeader__mainTitle}>상세 정보</span>
      <PanelBtnList />
    </header>
  );
};

export default PanelHeader;
