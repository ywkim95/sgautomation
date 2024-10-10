import { useMutation } from "@tanstack/react-query";
import QK from "../../../../common/constants/QueryKey.const.ts";
import useSetNewListHook from "../../Search/hooks/useSetNewListHook.tsx";
import useDetailStore from "../store/useDetailStore.ts";
import { postAnalyzeDetail } from "../../../../common/api/Http.ts";
import Detail from "../models/Detail.model.ts";
import { Result } from "../../Search/models/Result.model.ts";
import { Status } from "../../../../common/constants/Enum.ts";

const useDetailAnalysisHook = () => {
  const {
    detail,
    result,
    setDetail,
    setResult,
    setErrorMessage,
    setIsPending,
    reset,
  } = useDetailStore((state) => state);
  const { setNewList } = useSetNewListHook();

  const fetchAnalyzeDetail = useMutation({
    mutationKey: [QK.analyzeDetail],
    mutationFn: (id: number) => postAnalyzeDetail(id),
    retry: 1,
    onMutate: () => {
      setIsPending(true);
      setErrorMessage(null);
    },
    onError: (error) => {
      setDetail(null);
      setErrorMessage(error.message);
    },
    onSettled: () => {
      setIsPending(false);
    },
  });

  const getAnalyzeDetail = async (id: number) => {
    if (!detail || !result) return;

    const response = await fetchAnalyzeDetail.mutateAsync(id);

    await reset();
    const newDetail: Detail = {
      ...detail,
      ...response,
    };
    const newResult: Result = {
      ...result,
      analyzeStatus: Status.analyzed,
    };
    setDetail(newDetail);
    setResult(newResult);
    setNewList(newResult);
  };

  return {
    getAnalyzeDetail,
  };
};

export default useDetailAnalysisHook;
