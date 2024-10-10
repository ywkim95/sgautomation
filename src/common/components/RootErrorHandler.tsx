import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "../../pages/ErrorPage/Error/ErrorPage.tsx";

const RootErrorBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
  );
};

export default RootErrorBoundary;
