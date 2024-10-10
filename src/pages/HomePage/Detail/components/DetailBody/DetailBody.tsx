import styles from "./DetailBody.module.scss";
import useDetailStore from "../../store/useDetailStore.ts";
import useFoldStateStore from "../../../Search/components/FoldButton/stores/useFoldStateStore.ts";
import PanelHeader from "./Header/PanelHeader.tsx";
import PanelBody from "./Body/PanelBody.tsx";

const DetailBody = () => {
  const { isFold } = useFoldStateStore();
  const detailStore = useDetailStore((state) => state);

  const className = `${styles.detailBody} ${isFold ? styles.folded : ""}`;

  if (detailStore.isPending) {
    return <div>Loading...</div>;
  }

  if (detailStore.errorMessage) {
    return <div>Error: {detailStore.errorMessage}</div>;
  }

  return (
    <section className={className}>
      <PanelHeader />
      <PanelBody />
    </section>
  );
};

export default DetailBody;
