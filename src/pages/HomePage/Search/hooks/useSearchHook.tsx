import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePaginationStore } from "../store/usePaginationStore.ts";
import { useListStore } from "../store/useListStore";
import QK from "../../../../common/constants/QueryKey.const.ts";
import { ResponseResult } from "../models/ResponseResult.model.ts";
import debounce from "lodash.debounce";
import { Result } from "../models/Result.model.ts";
import { postList } from "../../../../common/api/Http.ts";

export const useSearchHook = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { paginationBody } = usePaginationStore((state) => state);
  const listStore = useListStore((state) => state);

  const { mutateAsync, isError, isPending } = useMutation({
    mutationKey: [QK.list],
    mutationFn: () => postList(paginationBody),
    retry: false,
    onMutate: () => {
      setErrorMessage(null);
    },
    onError: (error) => {
      // TODO: 에러시 setMessage로 에러를 표기
      setErrorMessage(error.message);
    },
  });

  const debouncedSearch = useCallback(
    debounce(async (resolve) => {
      const result = await mutateAsync();
      const modifiedData: Result[] = result.analyzeItems.map(
        (item: ResponseResult) => ({
          ...item,
          selected: false,
          clickedDetail: false,
        }),
      );

      return resolve(modifiedData);
    }, 1000),

    [mutateAsync],
  );

  const search = useCallback(
    () => new Promise((resolve) => debouncedSearch(resolve)),
    [debouncedSearch],
  );

  const prevSearchFilterRef = useRef(paginationBody.filter);

  useEffect(() => {
    const isSearchConditionChanged =
      prevSearchFilterRef.current !== paginationBody.filter;
    // TODO: axios 요청
    search().then((data) => {
      const typedData = data as Result[];
      if (isSearchConditionChanged) {
        listStore.setList(typedData);
      } else {
        listStore.addList(typedData);
      }
    });
    prevSearchFilterRef.current = paginationBody.filter;
  }, [paginationBody]);

  return {
    search,
    isError,
    errorMessage,
    isPending,
  };
};
