import React, { useState, useRef, useEffect } from 'react';
import './RegionFilter.css';

const RegionFilter = ({ onSelectRegion, currentRegion }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSelectedOption, setHasSelectedOption] = useState(false);
  const selectRef = useRef(null);

  const regions = [
    'All',
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
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

  const handleOptionClick = (region) => {
    onSelectRegion(region === 'All' ? '' : region);
    setHasSelectedOption(true);
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

  const displayRegion = currentRegion === ''
    ? (hasSelectedOption ? 'All' : 'Filter by Region') 
    : currentRegion;

  return (
    <div className="region-filter-container" ref={selectRef}>
      <div
        className="select-selected"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {displayRegion}
        <span className={`arrow ${isOpen ? 'open' : ''}`}></span>
      </div>

      {isOpen && (
        <ul className="select-items">
          {regions.map((region) => (
            <li
              key={region}
              onClick={() => handleOptionClick(region)}
              className={((region === 'All' && currentRegion === '') || region === currentRegion) ? 'same-as-selected' : ''}
              tabIndex="0"
              role="option"
              aria-selected={((region === 'All' && currentRegion === '') || region === currentRegion)}
            >
              {region}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RegionFilter;