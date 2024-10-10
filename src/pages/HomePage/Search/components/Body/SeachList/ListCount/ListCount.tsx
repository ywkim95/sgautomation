import styles from "./ListCount.module.scss";
import { useUserStore } from "../../../../../../LoginPage/store/useUserStore.ts";
import { useListStore } from "../../../../store/useListStore.ts";
// TODO: 불러온 리스트의 결과 수 및 전체 결과 수 입력필요
const ListCount = () => {
  const user = useUserStore((state) => state.user);
  const list = useListStore((state) => state.list);

  if (!user) return null;

  if (list.length === 0) return null;
  console.log(user.captureDataCount);

  return (
    <span className={styles.search__count}>
      1-{list.length} of {user.captureDataCount} items
    </span>
  );
};

export default ListCount;
