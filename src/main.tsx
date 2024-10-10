import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./router.tsx";
import { RouterProvider } from "react-router-dom";

import "./index.scss";
import "./fonts/Font.scss";
import "./common/scss/ScrollBar/ScrollBar.module.scss";
import {CookiesProvider} from "react-cookie";

const queryClient = new QueryClient();
const isDevEnv = import.meta.env.DEV;
ReactDOM.createRoot(document.getElementById("root")!).render(
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {isDevEnv && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
      )}
    </QueryClientProvider>
  </CookiesProvider>
);
