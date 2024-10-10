import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { pageRoutes } from "../../../routes.ts";
import QK from "../../../common/constants/QueryKey.const.ts";
import { useUserStore } from "../store/useUserStore.ts";
import { postLogin } from "../../../common/api/Http.ts";
import { RequestLoginType } from "../../../common/api/HttpType.ts";

export const useLoginHook = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [clientIdError, setClientIdError] = useState(false);
  const [clientPasswordError, setClientPasswordError] = useState(false);
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const { mutateAsync, error, isPending } = useMutation({
    mutationKey: [QK.login],
    mutationFn: ({ id, password, autoLogin }: RequestLoginType) =>
      postLogin({ id, password, autoLogin }),
    retry: false,
    onSuccess: (data) => {
      // TODO: 전역 변수에 로그인 상태를 저장하는 로직
      console.log(data);
      setUser(data);

      navigate(pageRoutes.main);
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setClientIdError(true);
      setClientPasswordError(true);
    },
  });

  const onFocusReset = () => {
    setClientIdError(false);
    setClientPasswordError(false);
    setErrorMessage(null);
  };

  const login = async (id: string, password: string, autoLogin: boolean) => {
    if (id === "" && password === "") {
      setClientIdError(true);
      setClientPasswordError(true);
      setErrorMessage("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    if (id === "") {
      setClientIdError(true);
      setErrorMessage("아이디를 입력해주세요.");
      return;
    }

    if (password === "") {
      setClientPasswordError(true);
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    await mutateAsync({ id, password, autoLogin });
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
    }
  }, [error]);

  return {
    isPending,
    errorMessage,
    clientIdError,
    clientPasswordError,
    login,
    onFocusReset,
  };
};
