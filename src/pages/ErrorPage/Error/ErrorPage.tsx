import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.scss";
const ErrorPage = () => {
  const navigate = useNavigate();

  const handleClickBackButton = () => {
    navigate(-1);
  };

  return (
    <div id="error-page" className={styles.errorPage}>
      <h1>Error</h1>
      <h3>페이지를 찾을 수 없습니다.</h3>
      <button onClick={handleClickBackButton}>뒤로가기</button>
    </div>
  );
};

export default ErrorPage;
