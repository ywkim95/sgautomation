import styles from "./ReAnalysisActiveButton.module.scss";
import buttonStyles from "../../../../../../../common/scss/Button/Button.module.scss";
import useReAnalysisActiveButtonHook from "./hooks/useReAnalysisActiveButtonHook.tsx";
import { ReAnalyzeStatus } from "../../../../../../../common/constants/Enum.ts";
import Options from "./Options/Options.tsx";

const ReAnalysisActiveButton = () => {
  const { onClickBtn, onClickOption, options, selectedText, isShow } =
    useReAnalysisActiveButtonHook();

  return (
    <div>
      <button
        className={`${styles.search__reanalysisBtn} ${buttonStyles.btn} ${selectedText !== ReAnalyzeStatus.ReAnalysis && styles.selected}`}
        onClick={onClickBtn}
      >
        {selectedText}
      </button>
      {isShow && <Options options={options} onClick={onClickOption} />}
    </div>
  );
};

export default ReAnalysisActiveButton;
