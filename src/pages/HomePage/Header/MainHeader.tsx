import styles from "./MainHeader.module.scss";
import UnivLogo from "./components/UnivLogo.tsx";
import { useUserStore } from "../../LoginPage/store/useUserStore.ts";
import useZIndexStore from "../../../common/stores/useZIndexStore.ts";
import image from "../../../assets/icon/logo/logo-jnu.svg";
const MainHeader = () => {
  const user = useUserStore((state) => state.user);

  const { isZIndexZero } = useZIndexStore();
  
  const zIndex = isZIndexZero ? 0 : 200;

  return (
    <header
      className={styles.header}
      style={{ zIndex }}
    >
      <section className={styles.header__left}>
        <figure className={styles.header__mainLogo}></figure>
        <div className={styles.header__title}>
          <span className={styles.header__mainTitle}>
            자동 생육 측정 웹 시스템
          </span>
          <span className={styles.header__subTitle}>
            채소작물별 모종 등급 기준 설정 및 표준화 체계 구축
          </span>
        </div>
      </section>
      <UnivLogo img={user?.univ_logo ?? image} />
    </header>
  );
};

export default MainHeader;
