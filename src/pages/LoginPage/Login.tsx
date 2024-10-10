import {FormEvent, useCallback, useState} from "react";
import Loading from "../LoadingPage/Loading.tsx";
import styles from "./Login.module.scss";
import LoginTextField from "./components/LoginTextField.tsx";
import useInputHook from "./hooks/useInputHook.tsx";
import { useLoginHook } from "./hooks/useLoginHook.tsx";
import { LoginHeader } from "./components/Header/LoginHeader.tsx";

const Login = () => {
  const [fetchOnLoginButtonClick, setFetchOnLoginButtonClick] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const {
    clientPasswordError,
    clientIdError,
    errorMessage,
    onFocusReset,
    login,
    isPending,
  } = useLoginHook();

  const id = useInputHook("", onFocusReset);
  const password = useInputHook("", onFocusReset);

  const onAutoLoginChange = () => {
    setAutoLogin(!autoLogin);
  };

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFetchOnLoginButtonClick(true);
    await login(id.value, password.value, autoLogin).finally(() => {
      setFetchOnLoginButtonClick(false);
    });
  }, [id.value, password.value, autoLogin, login]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className={`${styles.login}`}>
      <div className={styles.loginScreen}>
        <LoginHeader />
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <LoginTextField
            id="id"
            name="아이디"
            type="text"
            value={id.value}
            onChange={id.onChange}
            onFocus={id.onFocus}
            placeholder="아이디를 입력해주세요."
            className={`${styles.userTextField} ${clientIdError ? styles.error : ""} ${styles.id}`}
          />
          <LoginTextField
            id="password"
            name="비밀번호"
            type="password"
            value={password.value}
            onChange={password.onChange}
            onFocus={password.onFocus}
            placeholder="비밀번호를 입력해주세요."
            className={`${styles.userTextField}  ${clientPasswordError ? styles.error : ""} ${styles.password}`}
          />
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="autoLogin"
              checked={autoLogin}
              onChange={onAutoLoginChange}
            />
            <label htmlFor="autoLogin">자동로그인</label>
            {errorMessage && <span>{errorMessage}</span>}
          </div>

          <div className={styles.loginWrap}>
            <button
              type="submit"
              disabled={fetchOnLoginButtonClick}
              className={styles.login__btn}
            >
              로그인
            </button>
            <div className={styles.loginArrow}>→</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
