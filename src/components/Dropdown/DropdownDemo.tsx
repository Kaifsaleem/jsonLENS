import React, { useState } from 'react';
import { Dropdown } from './Dropdown';
import type { DropdownOption } from './Dropdown';

interface DropdownDemoProps {
  title?: string;
}

export const DropdownDemo: React.FC<DropdownDemoProps> = ({ title = 'Dropdown Demo' }) => {
  // Sample data for the dropdowns
  const colorOptions: DropdownOption[] = [
    { value: 'red', label: 'Red' },
    { value: 'blue', label: 'Blue' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'purple', label: 'Purple' },
  ];

  const countryOptions: DropdownOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' },
    { value: 'mx', label: 'Mexico' },
    { value: 'za', label: 'South Africa' },
    { value: 'ru', label: 'Russia' },
    { value: 'sg', label: 'Singapore' },
    { value: 'se', label: 'Sweden' },
  ];

  // State for each dropdown
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedDisabled, setSelectedDisabled] = useState<string>('');

  return (
    <div className="p-4 bg-light-background dark:bg-dark-background text-light-primary dark:text-dark-primary">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic dropdown example */}
        <div className="space-y-2">
          <h3 className="font-medium">Basic Dropdown</h3>
          <p className="text-light-secondary dark:text-dark-secondary text-sm">A simple dropdown with few options</p>
          <Dropdown 
            options={colorOptions} 
            value={selectedColor} 
            onChange={setSelectedColor} 
            placeholder="Select a color"
          />
          {selectedColor && (
            <p className="mt-2 text-sm">You selected: <span className="font-semibold">{
              colorOptions.find(option => option.value === selectedColor)?.label
            }</span></p>
          )}
        </div>
        
        {/* Scrollable dropdown example */}
        <div className="space-y-2">
          <h3 className="font-medium">Scrollable Dropdown</h3>
          <p className="text-light-secondary dark:text-dark-secondary text-sm">More than 10 options trigger a scrollable dropdown</p>
          <Dropdown 
            options={countryOptions} 
            value={selectedCountry} 
            onChange={setSelectedCountry} 
            placeholder="Select a country"
          />
          {selectedCountry && (
            <p className="mt-2 text-sm">You selected: <span className="font-semibold">{
              countryOptions.find(option => option.value === selectedCountry)?.label
            }</span></p>
          )}
        </div>

        {/* Disabled dropdown example */}
        <div className="space-y-2">
          <h3 className="font-medium">Disabled Dropdown</h3>
          <p className="text-light-secondary dark:text-dark-secondary text-sm">Example of a disabled dropdown</p>
          <Dropdown 
            options={colorOptions} 
            value={selectedDisabled} 
            onChange={setSelectedDisabled} 
            placeholder="This dropdown is disabled"
            disabled={true}
          />
        </div>

        {/* Custom styling example */}
        <div className="space-y-2">
          <h3 className="font-medium">Custom Styling</h3>
          <p className="text-light-secondary dark:text-dark-secondary text-sm">Custom max height and class names</p>
          <Dropdown 
            options={countryOptions} 
            value={selectedCountry} 
            onChange={setSelectedCountry} 
            placeholder="Custom height (200px)"
            maxHeight={200}
            className="border-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
