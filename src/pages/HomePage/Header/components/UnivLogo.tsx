import styles from "./UnivLogo.module.scss";
const UnivLogo = ({ img }: { img: string }) => {
  return (
    <div
      className={styles.univLogo}
      style={{ backgroundImage: `url(${img})` }}
    ></div>
  );
};

export default UnivLogo;
