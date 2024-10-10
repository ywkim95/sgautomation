import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../../routes.ts";
import { useEffect } from "react";
import QK from "../constants/QueryKey.const.ts";
import { useUserStore } from "../../pages/LoginPage/store/useUserStore.ts";
import { postAutoLogin } from "../api/Http.ts";

const useAutoLoginHook = () => {
  const setUser = useUserStore((state) => state.setUser);

  const navigate = useNavigate();

  const { data, error } = useQuery({
    queryKey: [QK.autoLogin],
    queryFn: postAutoLogin,
    retry: false,
  });

  useEffect(() => {
    if (error) {
      navigate(pageRoutes.login);
    } else if (data) {
      setUser(data.data);
      navigate(pageRoutes.main);
    }
  }, [data, error, navigate]);
};

export default useAutoLoginHook;
