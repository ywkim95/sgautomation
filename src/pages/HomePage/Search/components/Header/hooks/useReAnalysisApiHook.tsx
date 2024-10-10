import { useListStore } from "../../../store/useListStore.ts";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import useSetNewListHook from "../../../hooks/useSetNewListHook.tsx";
import { postAnalyzeList } from "../../../../../../common/api/Http.ts";
import { Nothing } from "../../../../../../common/constants/Utils.ts";

const useReAnalysisApiHook = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { list } = useListStore((state) => state);
  const { updateList } = useSetNewListHook();
  const queryFn = async () => {
    const filteredListIds = list
      .filter((item) => item.selected)
      .map((item) => item.captureID);

    return await postAnalyzeList(filteredListIds);
  };

  const { mutateAsync, isError } = useMutation({
    mutationFn: queryFn,
    onMutate: Nothing,
    onSuccess: (data) => {
      updateList(data);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onSettled: Nothing,
  });

  const reAnalysisList = async () => {
    await mutateAsync();
  };

  return {
    reAnalysisList,
    isReAnalysisError: isError,
    analysisErrorMessage: errorMessage,
  };
};

export default useReAnalysisApiHook;
