import SearchResultListHeader from "./Header/SearchResultListHeader.tsx";
import SearchResultList from "./ResultList/SearchResultList.tsx";
import ListCount from "./ListCount/ListCount.tsx";

const SearchListArea = () => {
  return (
    <>
      {/* TODO: 불러온 리스트의 결과 수 및 전체 결과 수 입력필요 */}
      <ListCount />
      <SearchResultListHeader />
      <SearchResultList />
    </>
  );
};

export default SearchListArea;
