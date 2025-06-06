import React, { useState, useRef, useEffect } from 'react';
import './SortSelect.css';

const SortSelect = ({ onSort, currentSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'population-asc', label: 'Population (Asc)' },
    { value: 'population-desc', label: 'Population (Desc)' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    onSort(optionValue);
    setIsOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const displayLabel = sortOptions.find(option => option.value === currentSort)?.label || 'Sort by';

  return (
    <div className="sort-select-container" ref={selectRef}>
      <div
        className="select-selected"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {displayLabel}
        <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
      </div>

      {isOpen && (
        <ul className="select-items">
          {sortOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={option.value === currentSort ? 'same-as-selected' : ''}
              tabIndex="0"
              role="option"
              aria-selected={option.value === currentSort}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortSelect;