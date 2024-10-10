import {ReactNode, Suspense} from "react";
import Loading from "../../pages/LoadingPage/Loading.tsx";

const RootSuspense = ({children}: {children: ReactNode}) => {
  return (
    <Suspense fallback={<Loading/>}>{children}</Suspense>
  );
};

export default RootSuspense;
