import useFoldStateStore from "../../FoldButton/stores/useFoldStateStore.ts";
import styles from "./SearchFilter.module.scss";
import { FilterType } from "../../../../../../common/constants/Enum.ts";
import SelectDate from "./components/Date/SelectDate.tsx";
import SelectedFilterList from "./components/SelectedFilterList/SelectedFilterList.tsx";
import SelectSubFilter from "./components/SelectSubFilter/SelectSubFilter.tsx";
import SelectMainFilter from "./components/SelectMainFilter/SelectMainFilter.tsx";
import useSearchFilterHook from "./hooks/useSearchFilterHook.tsx";

const SearchFilter = () => {
  const { isFold } = useFoldStateStore();
  const {
    filterRef,
    selectedFilter,
    setSelectedFilter,
    selectedSubFilters,
    setSelectedSubFilters,
    filterResults,
    setFilterResults,
    resetFilters,
    subFiltersContent,
    handleSubFilterClick,
  } = useSearchFilterHook();
  
  const className = `${styles.search__filter} ${isFold ? styles.folded : ""}`;

  return (
    <div ref={filterRef}>
      <div
        className={className}
      >
        <SelectMainFilter
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        {selectedFilter && (
          <div className={styles.search__subFilter}>
            {selectedFilter === FilterType.Status ||
            selectedFilter === FilterType.Crop ? (
              <SelectSubFilter
                selectedSubFilters={selectedSubFilters}
                selectedFilter={selectedFilter}
                subFiltersContent={subFiltersContent}
                handleSubFilterClick={handleSubFilterClick}
              />
            ) : (
              <SelectDate
                filterResults={filterResults}
                setFilterResults={setFilterResults}
              />
            )}
          </div>
        )}
        {filterResults.length > 0 && (
          <SelectedFilterList
            filterResults={filterResults}
            setFilterResults={setFilterResults}
            selectedSubFilters={selectedSubFilters}
            setSelectedSubFilters={setSelectedSubFilters}
            resetFilters={resetFilters}
          />
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
