'use client';
import { useState } from 'react';

export default function useDropdown(dropdownData: string[], dropdownKey: number[] = []) {
  const data = dropdownData;
  const key = dropdownKey;
  const [selectedValue, setSelectedValue] = useState(data[0]);
  const [selectedKey, setSelectedKey] = useState(key.length > 0 ? key[0] : 0);
  const [isDropdownToggle, isSetDropdownToggle] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const onDropdownChange = (value: string, id?: number) => {
    const newIndex = data.indexOf(value);
    setSelectedIndex(newIndex);
    setSelectedValue(value);
    if (id !== undefined && key[id] !== undefined) {
      setSelectedKey(key[id]);
    }
  };
  const toggleDropdown = () => {
    isSetDropdownToggle(prev => !prev);
  };

  return { data, onDropdownChange, toggleDropdown, isDropdownToggle, selectedValue, selectedKey, selectedIndex };
}
