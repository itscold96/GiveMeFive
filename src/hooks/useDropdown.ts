'use client';
import { useState } from 'react';

export default function useDropdown(dropdownData: string[]) {
  const data = dropdownData;
  const [selectedValue, setSelectedValue] = useState(data[0]);

  const onDropdownChange = (value: string) => {
    setSelectedValue(value);
  };

  return { onDropdownChange, selectedValue, data };
}
