import useDetailStore from "./store/useDetailStore.ts";
import DetailHeader from "./components/DetailHeader/DetailHeader.tsx";
import DetailBody from "./components/DetailBody/DetailBody.tsx";
import Empty from "./Empty.tsx";

const Detail = () => {
  const { isPending, detail, result, errorMessage } = useDetailStore();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!result && !detail) {
    return <Empty />;
  }

  return (
    <>
      <DetailHeader />
      <DetailBody />
    </>
  );
};

export default Detail;
