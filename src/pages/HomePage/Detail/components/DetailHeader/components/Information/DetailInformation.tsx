import styles from "./DetailInformation.module.scss";
import useDetailStore from "../../../../store/useDetailStore.ts";

const DetailInformation = () => {
  const { result } = useDetailStore();
  return (
    <section className={styles.detail__information}>
      <span className={styles.detail__informationBread}>품종: </span>
      <span className={styles.detail__informationBreadInf}>{result?.crop}</span>
      <span className={styles.detail__informationDate}> / 촬영 일시: </span>
      <span className={styles.detail__informationDateInf}>{result?.captureDate.split('T')[0]}</span>
      {/*<span className={styles.detail__informationRegion}> / 처리구: </span>*/}
      {/*<span className={styles.detail__informationRegionInf}>*/}
      {/*  {result?.processNumber}*/}
      {/*</span>*/}
    </section>
  );
};

export default DetailInformation;
