import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../../routes.ts";
import styles from "./NotFoundPage.module.scss";
const NotFound = () => {
  const navigate = useNavigate();
  const handleClickNavigateHomeBtn = () => {
    navigate(pageRoutes.main, { replace: true });
  };
  return (
    <div id="error-page" className={styles.errorPage}>
      <h1>404</h1>
      <h3>페이지를 찾을 수 없습니다.</h3>
      <button onClick={handleClickNavigateHomeBtn}>홈으로</button>
    </div>
  );
};

export default NotFound;
