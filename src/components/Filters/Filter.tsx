import Checkbox from "../CheckBox";
import './Filter.scss'

const Filter: React.FC<{ options: string[], title: string, onSelect: React.Dispatch<React.SetStateAction<string[]>> }> =
  ({ title, options, onSelect }) => {

    const onSelectUpdated = (checked: boolean, label: string) => {
      if (checked) {
        onSelect((prev) => [...prev, label]);
      } else {
        onSelect((prev) => prev.filter((p) => p !== label))
      }
    };

    return (
      <>
        <div className="filter-title">{title}</div>
        <div className="options">
          {options.map((option, i) => <Checkbox key={i} label={option} onSelect={onSelectUpdated} />)}
        </div>
      </>
    )
  }
export default Filter;