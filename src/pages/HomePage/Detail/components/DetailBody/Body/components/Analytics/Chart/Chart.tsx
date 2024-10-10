import styles from "./Chart.module.scss";
import useFoldStateStore from "../../../../../../../Search/components/FoldButton/stores/useFoldStateStore.ts";
import ChartContent from "./Content/ChartContent.tsx";

const Chart = () => {
  const { isFold } = useFoldStateStore();
  const className = `${styles.panelBody__chart} ${styles.completedResult} ${isFold ? styles.folded : ""}`;

  return (
    <section className={className}>
      <figcaption className={styles.panelBody__chartTitle}>
        Image Analysis Chart
      </figcaption>
      <ChartContent />
    </section>
  );
};

export default Chart;
