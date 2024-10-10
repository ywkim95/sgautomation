import { useMutation } from "@tanstack/react-query";
import useDetailStore from "../store/useDetailStore";
import QK from "../../../../common/constants/QueryKey.const.ts";
import { postDetail } from "../../../../common/api/Http.ts";
// import { useListStore } from "../../Search/store/useListStore.ts";

export const useDetailHook = () => {
  // const { list } = useListStore();
  const { setDetail, setErrorMessage, setIsPending } = useDetailStore(
    (state) => state,
  );

  const { mutateAsync } = useMutation({
    mutationKey: [QK.detail],
    mutationFn: (id: number) => postDetail(id),
    retry: 1,
    onMutate: () => {
      setIsPending(true);
      setErrorMessage(null);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
    onSettled: () => {
      setIsPending(false);
    },
  });

  const getDetail = async (id: number) => {
    const data = await mutateAsync(id);
    // await reset();

    setDetail(data);
  };

  return {
    getDetail,
  };
};
