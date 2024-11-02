'use client';
import { useState } from 'react';

export default function useDropdown(dropdownData: string[], dropdownKey: number[] = []) {
  const data = dropdownData;
  const key = dropdownKey;

  // selectedIndex는 기본값으로 0을 반환합니다.
  // 사용자가 선택할 경우 1 이상의 truthy 값을 반환하게 됩니다.
  // 따라서 실제로 사용할 때는 selectedIndex 값에서 -1을 해야 원하는 인덱스를 찾을 수 있습니다.
  // 이는 초기 렌더링 시 아무것도 선택되지 않은 드롭다운의 반환값이 truthy한 상태가 되는 것을 방지하기 위한 것입니다.
  const [selectedValue, setSelectedValue] = useState(data[0]);
  const [selectedKey, setSelectedKey] = useState(key.length > 0 ? key[0] : 0);
  const [isDropdownToggle, isSetDropdownToggle] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const onDropdownChange = (value: string, id?: number) => {
    const newIndex = data.indexOf(value);
    setSelectedIndex(newIndex + 1);
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
