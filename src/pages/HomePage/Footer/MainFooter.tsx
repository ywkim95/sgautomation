import styles from "./MainFooter.module.scss";

const MainFooter = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footer__information}>
        <div className={styles.footer__informationCompany}>
          <span>
            경기도 성남시 수정구 창업로 43, 판교글로벌비즈센터 B1001호 13449
            주식회사 포도
          </span>
          <span>COPYRIGHT © PODO Inc, ALL RIGHTS RESERVED</span>
        </div>
        <div className={styles.footer__informationManager}>
          <span>R&D Project Manager (송승욱) E-MAIL Example@ipodo.co.kr</span>
          <span>Program Inquiry (정인수) E-MAIL Example@ipodo.co.kr</span>
        </div>
      </section>
      <section className={styles.footer__logo}>
        <figure className={styles.footer__logoPodo}></figure>
        <figure className={styles.footer__logoImageLab}></figure>
      </section>
    </footer>
  );
};

export default MainFooter;
