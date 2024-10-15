import React, { useState } from 'react';
import './ToggleSwitch.css';

interface ToggleSwitchProps {
  initialState?: boolean;
  onToggle?: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ initialState = false, onToggle }) => {
  const [isChecked, setIsChecked] = useState(initialState);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (onToggle) {
      onToggle(!isChecked);
    }
  };

  return (
    <div className="switch-container">
      <span className="label">Nee</span>
      <label className="switch">
        <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        <span className="slider"></span>
      </label>
      <span className="label">Ja</span>
    </div>
  );
};

export default ToggleSwitch;
