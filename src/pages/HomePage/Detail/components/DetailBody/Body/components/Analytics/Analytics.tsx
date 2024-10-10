import styles from "../../../DetailBody.module.scss";
import Chart from "./Chart/Chart.tsx";
import Color from "./Color/Color.tsx";
import Table from "./Table/Table.tsx";
import useCheckMobileStore from "../../../../../../../../common/stores/useCheckMobileStore.ts";
import ReAnalysis from "./Button/ReAnalysis.tsx";
const Analytics = () => {
  const { isMobile } = useCheckMobileStore();
  return (
    <section className={styles.detailBody__more}>
      <Chart />
      <Color />
      <Table />
      {isMobile ? <ReAnalysis /> : null}
    </section>
  );
};

export default Analytics;
