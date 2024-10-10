import styles from "./Table.module.scss";
import useFoldStateStore from "../../../../../../../Search/components/FoldButton/stores/useFoldStateStore.ts";
import useDetailStore from "../../../../../../store/useDetailStore.ts";
import { absToFixed } from "../../../../../DetailHeader/functions/DetailUtils.ts";

const Table = () => {
  const { isFold } = useFoldStateStore();
  const { detail } = useDetailStore();
  const error = `${detail?.leafColorAnalysis && detail?.measurementAnalysis && detail?.leafAreaAnalysis ? styles.completedResult : styles.failedResult}`;
  const className = `${styles.panelBody__table} ${error} ${isFold ? styles.folded : ""}`;

  const measurement = detail?.measurementAnalysis
    ? absToFixed(detail.measurementReal, detail.measurementAnalysis)
    : "";
  const leafArea = detail?.leafAreaAnalysis
    ? absToFixed(detail.leafAreaReal, detail.leafAreaAnalysis)
    : "";
  const uniformity = detail?.uniformityAnalysis
    ? absToFixed(detail.uniformityReal, detail.uniformityAnalysis)
    : "";

  return (
    <section className={className}>
      <table>
        <thead>
          <tr>
            <th>구분</th>
            <th>실측값</th>
            <th>분석값</th>
            <th>오차</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>초장 (mm)</th>
            <td>{detail?.measurementReal}</td>
            <td>{detail?.measurementAnalysis ?? ""}</td>
            <td>{measurement}</td>
          </tr>
          <tr>
            <th>엽면적 (mm²)</th>
            <td>{detail?.leafAreaReal}</td>
            <td>{detail?.leafAreaAnalysis ?? ""}</td>
            <td>{leafArea}</td>
          </tr>
          <tr>
            <th>균일도</th>
            <td>{detail?.uniformityReal}</td>
            <td>{detail?.uniformityAnalysis ?? ""}</td>
            <td>{uniformity}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Table;
