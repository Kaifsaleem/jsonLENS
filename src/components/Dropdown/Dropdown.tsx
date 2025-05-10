import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  maxHeight?: number; // in pixels, defaults to 300
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  className = '',
  maxHeight = 300
}) => {
  // We don't need to use isDarkMode explicitly as our theming is handled by Tailwind dark: classes
  useTheme(); // Keep this to ensure we are inside the ThemeProvider
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Find the selected option for display
  const selectedOption = options.find(option => option.value === value);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Determine if options need scrolling
  const needsScrolling = options.length > 10;

  return (
    <div 
      ref={dropdownRef}
      className={`relative w-full ${className}`}
    >
      <button
        type="button"
        className={`flex justify-between items-center w-full px-4 py-2 text-left border rounded-md focus:outline-none focus:ring-2 transition-colors ${
          disabled 
            ? 'cursor-not-allowed opacity-60 bg-gray-100 dark:bg-gray-800' 
            : 'cursor-pointer hover:bg-light-border dark:hover:bg-dark-border'
        } ${
          isOpen
            ? 'ring-light-accent dark:ring-dark-accent border-light-accent dark:border-dark-accent'
            : 'border-light-border dark:border-dark-border'
        } bg-light-background dark:bg-dark-background text-light-primary dark:text-dark-primary`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        disabled={disabled}
      >
        <span className="block truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="ml-2 pointer-events-none">
          <svg 
            className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </span>
      </button>

      {isOpen && (
          <div 
            ref={optionsRef}
            className={`absolute backdrop-blur-sm z-1 w-full mt-1 bg-light-background/90 dark:bg-dark-background/90 border border-light-border dark:border-dark-border rounded-md shadow-lg ${
              needsScrolling ? 'overflow-auto' : ''
            }`}
            style={{ maxHeight: needsScrolling ? `${maxHeight}px` : 'auto' }}
            role="listbox"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-light-border dark:hover:bg-dark-border transition-colors ${
                  option.value === value
                    ? 'bg-light-border dark:bg-dark-border text-light-accent dark:text-dark-accent'
                    : 'text-light-primary dark:text-dark-primary'
                }`}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={option.value === value}
              >
                {option.label}
              </div>
            ))}
          </div>
        // </>
      )}
    </div>
  );
};
