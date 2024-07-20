import { useState } from 'react';
import './SortingCheckbox.scss';

const SortingCheckbox: React.FC<{ label: string, isSelected: boolean, onSort: CallableFunction }> = ({ label, isSelected = false, onSort }) => {
  const [sortDirection, setSortDirection] = useState(isSelected ? 'desc' : null);

  const handleClick = () => {
    if (!isSelected) {
      setSortDirection('desc');
      onSort(label, 'desc');
    } else {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
      onSort(label, sortDirection === 'desc' ? 'asc' : 'desc');
    }
  };


  return (
    <div className={`sorting-checkbox ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      <div className="checkbox-label-container" >
        <div className={`checkbox-container ${isSelected ? 'checked' : ''}`}>
          {isSelected && (
            <svg
              className="tick"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="checkbox-label">{label}</span>
      </div>
      {isSelected && (
        <span className={`sort-indicator ${sortDirection}`}>
          {sortDirection === 'desc' ? '▼' : '▲'}
        </span>
      )}
    </div>
  );
};

const SortingCheckboxGroup: React.FC<{ onSort: CallableFunction }> = ({ onSort }) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState('Date');

  const handleSort = (label: string, direction: 'asc' | 'desc') => {
    if (selectedCheckbox !== label) {
      setSelectedCheckbox(label);
    }
    onSort(label, direction);
  };

  return (
    <div className="sorting-checkbox-group">
      <SortingCheckbox
        label="Date"
        isSelected={selectedCheckbox === 'Date'}
        onSort={handleSort}
      />
      <SortingCheckbox
        label="Title"
        isSelected={selectedCheckbox === 'Title'}
        onSort={handleSort}
      />
    </div>
  );
};

export default SortingCheckboxGroup;