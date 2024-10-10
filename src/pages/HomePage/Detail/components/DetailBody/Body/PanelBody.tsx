import styles from "../DetailBody.module.scss";
import ImageList from "./components/ImageList/ImageList.tsx";
import Analytics from "./components/Analytics/Analytics.tsx";

const PanelBody = () => {
  return (
    <section className={styles.detailBody__wrap}>
      <ImageList />
      <Analytics />
    </section>
  );
};

export default PanelBody;
