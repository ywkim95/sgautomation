import styles from "./ColorContent.module.scss";
import useDetailStore from "../../../../../../../store/useDetailStore.ts";

const ColorComponent = () => {
  const { detail } = useDetailStore();
  const className = `${styles.panelBody__colorResult} ${detail?.leafColorAnalysis ? styles.completedResult : styles.failedResult}`;
  const leafBackgroundColor = detail?.leafColorAnalysis ?? "transparent";

  return (
    <div className={className}>
      <div className={styles.panelBody__colorMeasurement}>
        <figure
          className={styles.panelBody__colorMeasurementColor}
          style={{ backgroundColor: detail?.leafColorReal }}
        ></figure>
        <figcaption className={styles.panelBody__colorMeasurementText}>
          실제 측정
        </figcaption>
      </div>
      <div className={styles.panelBody__colorAnalysis}>
        <figure
          className={styles.panelBody__colorAnalysisColor}
          style={{ backgroundColor: leafBackgroundColor }}
        >
          {detail?.leafColorAnalysis ? null : "Error"}
        </figure>
        <figcaption className={styles.panelBody__colorAnalysisText}>
          영상 측정
        </figcaption>
      </div>
    </div>
  );
};

export default ColorComponent;
