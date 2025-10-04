import React from 'react';
import type { CountryIso2 } from '../../types/countryDataTypes';

export interface FlagIconProps {
  iso2: CountryIso2;
  size?: number;
  className?: string;
  squared?: boolean;
}

export const FlagIcon: React.FC<FlagIconProps> = ({ 
  iso2, 
  size = 20, 
  className,
  squared = false 
}) => {
  const flagClassName = `flag-icon flag-icon-${iso2.toLowerCase()}${squared ? ' flag-icon-squared' : ''}`;
  const combinedClassName = className ? `${flagClassName} ${className}` : flagClassName;

  return (
    <span 
      className={combinedClassName}
      style={{
        fontSize: `${size}px`,
        borderRadius: '2px',
        display: 'inline-block',
        lineHeight: 1,
      }}
      title={`${iso2.toUpperCase()} flag`}
    />
  );
};
