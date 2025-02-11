import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const COUNTRIES = [
  "Australia", "Belgium", "Brazil", "Canada", "China", "Denmark", "Finland",
  "France", "Germany", "Greenland", "Hong Kong", "India", "Italy", "Japan",
  "Malaysia", "Mexico", "Netherlands", "Norway", "Poland", "Romania",
  "Saudi Arabia", "Singapore", "South Korea", "Spain and Portugal", "Sweden",
  "Switzerland", "United Arab Emirates", "United Kingdom", "United States"
];

interface CountryAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const CountryAutocomplete: React.FC<CountryAutocompleteProps> = ({
  value,
  onChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredCountries = COUNTRIES.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  const handleSelectCountry = (country: string) => {
    setSearchTerm(country);
    onChange(country);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-[#005776] focus:ring focus:ring-[#005776] focus:ring-opacity-50"
          placeholder="Select a country"
        />
      </div>
      
      {isOpen && filteredCountries.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredCountries.map((country) => (
            <div
              key={country}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectCountry(country)}
            >
              {country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryAutocomplete; 