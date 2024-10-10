import styles from "./ChartContent.module.scss";
import useDetailStore from "../../../../../../../store/useDetailStore.ts";
import { useEffect, useState } from "react";
import ChartProps from "./Chart.model.tsx";
import BarChart from "./BarChart.tsx";
import useFoldStateStore from "../../../../../../../../Search/components/FoldButton/stores/useFoldStateStore.ts";

const ChartContent = () => {
  const { detail } = useDetailStore((state) => state);
  const { isFold } = useFoldStateStore();

  const [chart, setChart] = useState<ChartProps[]>([]);

  const className = `${styles.panelBody__chartWrap} ${isFold ? styles.folded : ""}`;

  useEffect(() => {
    if (detail) {
      setChart([
        {
          title: "Plant Length",
          label_1: "실측 초장",
          label_2:
            detail.measurementAnalysis && detail.leafColorAnalysis
              ? "분석 초장"
              : "",
          data_1: detail.measurementReal,
          data_2: detail.measurementAnalysis,
          color_1: detail.leafColorReal,
          color_2: detail.leafColorAnalysis,
        },
        {
          title: "Leaf Area",
          label_1: "실측 엽면적",
          label_2:
            detail.leafAreaAnalysis && detail.leafColorAnalysis
              ? "분석 엽면적"
              : "",
          data_1: detail.leafAreaReal,
          data_2: detail.leafAreaAnalysis,
          color_1: detail.leafColorReal,
          color_2: detail.leafColorAnalysis,
        },
      ]);
    }
  }, [detail]);

  return (
    <div className={className}>
      <figure className={styles.panelBody__chartPlantHeight}>
        {chart.length > 0 && <BarChart chart={chart[0]} />}
      </figure>
      <figure className={styles.panelBody__chartLeafArea}>
        {chart.length > 0 && <BarChart chart={chart[1]} />}
      </figure>
    </div>
  );
};

export default ChartContent;
