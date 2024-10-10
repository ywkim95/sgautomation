import useZIndexStore from "../../../../../../../common/stores/useZIndexStore";
import useFoldStateStore from "../../../FoldButton/stores/useFoldStateStore";
import styles from "./MobileReAnalysisButton.module.scss";
import buttonStyles from "../../../../../../../common/scss/Button/Button.module.scss";
const MobileReAnalysisButton = () => {
  const { isFold } = useFoldStateStore();
  const { isZIndexZero } = useZIndexStore();
  const onClick = () => {
    //미분석, 분석실패 재분석 요청
  };
  return (
    <button
      className={`${styles.fileList__reanalysisBtn} ${buttonStyles.btn} ${isFold ? styles.folded : ""}`}
      onClick={onClick}
      style={{ zIndex: isZIndexZero ? 0 : 200 }}
    >
      <span>Re</span>
    </button>
  );
};

export default MobileReAnalysisButton;
