import styles from "../ReAnalysisActiveButton.module.scss";
import { ReAnalyzeStatus } from "../../../../../../../../common/constants/Enum.ts";

const Options = ({
  options,
  onClick,
}: {
  options: ReAnalyzeStatus[];
  onClick: (option: ReAnalyzeStatus) => void;
}) => {
  return (
    <div className={styles.dropDown}>
      {options.map((option, index) => (
        <div key={`${option}${index}`} onClick={() => onClick(option)}>
          {option}
        </div>
      ))}
    </div>
  );
};

export default Options;
