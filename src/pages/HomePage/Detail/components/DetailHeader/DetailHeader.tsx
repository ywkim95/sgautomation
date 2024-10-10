import useDetailStore from "../../store/useDetailStore.ts";
import styles from "./DetailHeader.module.scss";
import { Status } from "../../../../../common/constants/Enum.ts";
import DetailInformation from "./components/Information/DetailInformation.tsx";
import DetailError from "./components/Error/DetailError.tsx";
import { typeConverter } from "./functions/DetailUtils.ts";
const DetailHeader = () => {
  const { result } = useDetailStore((state) => state);
  const className = `${styles.detailHeader} ${result?.analyzeStatus === Status.analyzed ? styles.completedResult : styles.failedResult}`;
  const type = result?.analyzeStatus && typeConverter(result.analyzeStatus);

  return (
    <section className={className}>
      <div className={styles.detailHeader__emphasis}>{type}</div>
      <DetailInformation />
      <DetailError />
    </section>
  );
};

export default DetailHeader;
