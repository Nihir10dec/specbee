import { useState } from 'react';
import './Checkbox.scss';

const Checkbox: React.FC<{ label: string; onSelect: CallableFunction; }> = ({ label, onSelect }) => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxClick = () => {
    setChecked((prev) => !prev);
    onSelect(!checked, label);
  };

  return (
    <div className="checkbox-label-container" onClick={handleCheckboxClick}>
      <div className={`checkbox-container ${checked ? 'checked' : ''}`}>
        {checked && (
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
  );
};

export default Checkbox;
