import { useSearchHook } from "../../../../../hooks/useSearchHook.tsx";
import { Result } from "../../../../../models/Result.model.ts";
import { useListStore } from "../../../../../store/useListStore.ts";

const useSearchResultListHook = () => {
  const { setList } = useListStore();
  // 검색 관련 훅
  const { search, isError, errorMessage, isPending } = useSearchHook();

  const onClickRefresh = async () => {
    await search().then((data) => {
      setList(data as Result[]);
    });
  };

  return {
    onClickRefresh,
    isError,
    errorMessage,
    isPending,
  };
};

export default useSearchResultListHook;
