import styles from "./LoginHeader.module.scss";

export const LoginHeader = () => {
  return (
    <header className={styles.loginHeader}>
      <div className={styles.header__left}>
        <div className={styles.header__mainLogo}></div>
        <div className={styles.header__title}>
          <span className={styles.header__mainTitle}>
            자동 생육 측정 웹 시스템
          </span>
          <span className={styles.header__subTitle}>
            채소작물별 모종 등급 기준 설정 및 표준화 체계 구축
          </span>
        </div>
      </div>
    </header>
  );
};
