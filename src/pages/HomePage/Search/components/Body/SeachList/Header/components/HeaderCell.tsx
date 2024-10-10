import styles from "../SearchResultListHeader.module.scss";

const HeaderCell = ({ name, sort }: { name: string; sort: string }) => {
  const onClickSort = (sort: string) => {
    // 2024-04-12
    // 정렬 관련 로직 추가 필요 (paginationStore에 타입 추가 필요)
    // 예상 필요 arguments: (key: string, order: useState와 같은 변수 선언하여 사용)
    console.log(sort);
  };
  return (
    <>
      <span className={styles.search__name}>{name}</span>
      <div
        className={styles.search__down}
        onClick={() => onClickSort(sort)}
      ></div>
    </>
  );
};

export default HeaderCell;
