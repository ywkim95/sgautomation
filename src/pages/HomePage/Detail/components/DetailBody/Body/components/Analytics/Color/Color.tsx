import styles from "./Color.module.scss";
import ColorContent from "./Content/ColorContent.tsx";

const Color = () => {
  return (
    <section className={styles.panelBody__color}>
      <figcaption className={styles.panelBody__colorTitle}>
        Color Comparison
      </figcaption>
      <ColorContent />
    </section>
  );
};

export default Color;
