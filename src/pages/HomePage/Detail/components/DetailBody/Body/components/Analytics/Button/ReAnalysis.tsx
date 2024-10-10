import styles from "./ReAnalysis.module.scss";
import buttonStyles from "../../../../../../../../../common/scss/Button/Button.module.scss";
import useDetailStore from "../../../../../../store/useDetailStore.ts";
import useDetailAnalysisHook from "../../../../../../hooks/useDetailAnalysisHook.tsx";

const ReAnalysis = () => {
  const { detail, result } = useDetailStore();
  const { getAnalyzeDetail } = useDetailAnalysisHook();

  const handleReAnalysis = async () => {
    // TODO: 재분석 요청 API 연결
    if (!result) return;

    await getAnalyzeDetail(result.captureID);
  };

  if (detail && result) {
    return null;
  }

  return (
    <div
      className={`${styles.selectRe} ${buttonStyles.btn}`}
      onClick={handleReAnalysis}
    >
      Re Analysis
    </div>
  );
};

export default ReAnalysis;
