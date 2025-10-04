import React, { useMemo } from 'react';
import { GlobeIcon } from '../shared/icons/GlobeIcon';
import './phone-input.scss';
import type { CountryIso2 } from '../types/countryDataTypes';
import { FlagIcon } from '../shared/icons/FlagIcon';

export type CountryOption = {
  iso2: CountryIso2; // e.g., 'us', 'in'
  dialCode: string; // e.g., '1', '91'
  name: string; // e.g., 'United States'
};

export type PhoneInputProps = {
  value?: string | null | undefined;
  onChange?: (value: string) => void;
  placeholder?: string;
  countries?: CountryOption[];
  defaultCountry?: string; // iso2
  className?: string;
  inputClassName?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  autoFocus?: boolean;
  ariaLabel?: string;
};

const defaultCountries: CountryOption[] = [
  { iso2: 'us', dialCode: '1', name: 'United States' },
  { iso2: 'gb', dialCode: '44', name: 'United Kingdom' },
  { iso2: 'in', dialCode: '91', name: 'India' }
];

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  placeholder = 'Enter phone number',
  countries = defaultCountries,
  defaultCountry,
  className,
  inputClassName,
  disabled,
  id,
  name,
  autoFocus,
  ariaLabel
}) => {
  const normalizedValue = value || '';

  const activeCountry = useMemo(() => {
    // If there's a value, try to match by dial code
    if (normalizedValue) {
      const match = countries.find((c) => normalizedValue.startsWith(`+${c.dialCode}`));
      if (match) return match;
    }
    
    // If no match found or empty input, use defaultCountry if provided
    if (defaultCountry) {
      return countries.find((c) => c.iso2 === defaultCountry);
    }
    
    return undefined;
  }, [countries, defaultCountry, normalizedValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;
    onChange?.(next);
  };

  return (
    <div className={['rpl-phone', className].filter(Boolean).join(' ')}>
      <div className="rpl-flag">
        {activeCountry ? <FlagIcon iso2={activeCountry.iso2} /> : <GlobeIcon />}
      </div>
      <input
        id={id}
        name={name}
        disabled={disabled}
        autoFocus={autoFocus}
        aria-label={ariaLabel || 'Phone number'}
        className={['rpl-input', inputClassName].filter(Boolean).join(' ')}
        type="tel"
        inputMode="tel"
        placeholder={placeholder}
        value={normalizedValue}
        onChange={handleChange}
      />
    </div>
  );
};


