'use client';
import { useState } from 'react';

export default function useDropdown(dropdownData: string[]) {
  const data = dropdownData;
  const [selectedValue, setSelectedValue] = useState(data[0]);
  const [isDropdownToggle, isSetDropdownToggle] = useState(false);

  const onDropdownChange = (value: string) => {
    setSelectedValue(value);
  };
  const toggleDropdown = () => {
    isSetDropdownToggle(prev => !prev);
  };

  return { data, onDropdownChange, toggleDropdown, isDropdownToggle, selectedValue };
}
