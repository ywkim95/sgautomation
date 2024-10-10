import { Outlet } from "react-router-dom";
import RootErrorBoundary from "./RootErrorHandler";
import RootSuspense from "./RootSuspense";
import "../../App.scss";
import useAutoLoginHook from "../hooks/useAutoLoginHook.tsx";
import useCheckMobileHook from "../hooks/useCheckMobileHook.tsx";

export const CommonLayout = () => {
  useAutoLoginHook();
  useCheckMobileHook();

  return (
    <div className="page">
      <RootErrorBoundary>
        <RootSuspense>
          <Outlet />
        </RootSuspense>
      </RootErrorBoundary>
    </div>
  );
};
