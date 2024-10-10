import styles from "../../SearchFilter.module.scss";

interface SelectedFilterProps {
  filterResults: string[];
  setFilterResults: (newFilterResults: string[]) => void;
  selectedSubFilters: { [key: string]: string[] };
  setSelectedSubFilters: (newSelectedSubFilters: {
    [key: string]: string[];
  }) => void;
  resetFilters: () => void;
}

const SelectedFilterList = ({
  filterResults,
  setFilterResults,
  selectedSubFilters,
  setSelectedSubFilters,
  resetFilters,
}: SelectedFilterProps) => {
  // 선택된 하위메뉴 리스트에서 제외하는 로직
  const handleFilterResultClick = (index: number) => {
    const resultToRemove = filterResults[index];
    const newFilterResults = filterResults.filter((_, i) => i !== index);
    setFilterResults(newFilterResults);

    const filterKeys = Object.keys(selectedSubFilters);
    const newSelectedSubFilters = { ...selectedSubFilters };
    filterKeys.forEach((key) => {
      newSelectedSubFilters[key] = newSelectedSubFilters[key].filter(
        (subFilter) => subFilter !== resultToRemove,
      );
    });
    setSelectedSubFilters(newSelectedSubFilters);
  };

  return (
    <div className={styles.search__filterResult}>
      {filterResults.map((result, index) => (
        <div key={index} onClick={() => handleFilterResultClick(index)}>
          {result}
        </div>
      ))}
      <div className={styles.filter__reset} onClick={resetFilters}></div>
    </div>
  );
};

export default SelectedFilterList;
