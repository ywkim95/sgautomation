import { useListStore } from "../../../store/useListStore.ts";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Nothing } from "../../../../../../common/constants/Utils.ts";
import {
  downloadExcelsList,
  downloadImagesList,
} from "../../../../../../common/api/Http.ts";

const useDownloadListApiHook = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { list } = useListStore((state) => state);

  const queryFn = async (endPoint: "excel" | "image") => {
    const idList = list
      .filter((item) => item.selected)
      .map((item) => item.captureID);
    const data =
      endPoint === "excel"
        ? await downloadExcelsList(idList)
        : await downloadImagesList(idList);

    return {
      data,
      idList,
    };
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (endpoint: "excel" | "image") => queryFn(endpoint),
    retry: false,
    onMutate: Nothing,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onSettled: Nothing,
  });

  const downloadList = async (endPoint: "excel" | "image") => {
    if (list.every((item) => !item.selected)) return;
    return await mutateAsync(endPoint);
  };

  return { downloadList, isPending, errorMessage };
};

export default useDownloadListApiHook;
