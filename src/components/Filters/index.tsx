import SortingCheckboxGroup from "../SortingCheckBox";
import Filter from "./Filter"

const Filters: React.FC<{
  categories: string[], authors: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedAuthors: React.Dispatch<React.SetStateAction<string[]>>;
  onSort: CallableFunction;
}> = ({ categories, authors, setSelectedCategories, setSelectedAuthors, onSort }) => {
  return (
    <div>
      <Filter title='Category' options={categories} onSelect={setSelectedCategories} />
      <Filter title='Author' options={authors} onSelect={setSelectedAuthors} />
      <div className="filter-title" style={{ marginBottom: '10px' }}>Sort By</div>
      <SortingCheckboxGroup onSort={onSort} />
    </div>
  )
}
export default Filters