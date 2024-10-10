import styles from "./SearchResult.module.scss";
import { Result } from "../../../../models/Result.model.ts";
import { useEffect, useState } from "react";
import useSearchResultHook from "./hooks/useSearchResultHook.tsx";
import useSearchHandlerStore from "../../../../store/useSearchHandlerStore.ts";
import useFoldStateStore from "../../../FoldButton/stores/useFoldStateStore.ts";
import { Status } from "../../../../../../../common/constants/Enum.ts";
interface ResultProps {
  data: Result;
}

const SearchResult = ({ data }: ResultProps) => {
  const [StatusType, setStatusType] = useState("");
  const [date, setDate] = useState("");
  const [analysisType, setAnalysisType] = useState<
    "analysisCompleted" | "notAnalyzed" | "analysisFailed"
  >("analysisCompleted");
  const { onClickDetail, checkHandler } = useSearchResultHook(data);

  const { show } = useSearchHandlerStore();
  const { isFold } = useFoldStateStore();

  useEffect(() => {
    switch (data.analyzeStatus) {
      case Status.analyzed:
        setStatusType("분석완료");
        setAnalysisType("analysisCompleted");
        break;
      case Status.failed:
        setStatusType("분석실패");
        setAnalysisType("analysisFailed");
        break;
      case Status.notAnalyzed:
        setStatusType("미분석");
        setAnalysisType("notAnalyzed");
        break;
    }
  }, [data.analyzeStatus]);

  useEffect(() => {
    setDate(data.captureDate.split("T")[0]);
  }, [data.captureDate]);

  return (
    <div
      key={data.captureID}
      onClick={onClickDetail}
      className={`${styles.search__row} ${data.clickedDetail ? styles.selectRow : ""} ${isFold ? styles.folded : ""}`}
    >
      <label className={`${styles.search__rowStatus} ${styles[analysisType]}`}>
        {show ? (
          <input
            type="checkbox"
            checked={data.selected}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => checkHandler(e)}
          />
        ) : (
          <div className={styles.search__rowStatusIcon}></div>
        )}
        <div className={styles.search__rowStatusName}>{StatusType}</div>
      </label>
      <div className={styles.search__rowBreed}>
        <span className={styles.search__rowName}>{data.crop}</span>
      </div>
      <div className={styles.search__rowDate}>
        <span className={styles.search__rowName}>{date}</span>
      </div>
    </div>
  );
};

export default SearchResult;
