'use client';

import S from './Dropdown.module.scss';
import { useState } from 'react';
import dropdownArrow from '@/images/dropdown-arrow.svg';
import kebabIcon from '@/images/kebab-icon.svg';
import dropdownThinArrow from '@/images/dropdown-thin-arrow.svg';
import Image from 'next/image';
interface DropdownProps {
  data: string[];
  type?: 'kebab' | 'category' | 'default';
  onChange: (value: string) => void;
  selectedValue?: string;
}

export default function Dropdown({ data, type, onChange, selectedValue }: DropdownProps) {
  const [isDropdownToggle, isSetDropdownToggle] = useState(false);

  // 드롭다운 열기/닫기 토글
  const toggleDropdown = () => {
    isSetDropdownToggle(prev => !prev);
  };

  // 항목 클릭 시 선택된 값 설정 및 상위 컴포넌트로 전달
  const handleSelectValue = (value: string) => {
    onChange(value);
    isSetDropdownToggle(false);
  };

  return (
    <>
      <div className={S.dropdownContainer}>
        {type === 'kebab' ? (
          <div className={S.KebabIconWrapper}>
            <Image src={kebabIcon} alt="케밥 아이콘" width={40} height={40} onClick={toggleDropdown} />
          </div>
        ) : type === 'category' ? (
          <div className={S.categoryWrapper} onClick={toggleDropdown}>
            <div className={S.categoryValue}>{selectedValue}</div>
            <Image src={dropdownThinArrow} alt="카테고리 아이콘" width={24} height={24} />
          </div>
        ) : (
          <div className={S.dropdownButton} onClick={toggleDropdown}>
            <div>{selectedValue}</div>
            <Image src={dropdownArrow} alt="드롭다운 화살표" width={22} height={22} />
          </div>
        )}

        {isDropdownToggle && (
          <div className={type === 'category' ? S.categoryDropdownInfo : S.dropdownInfo}>
            {data.map((item, index) => (
              <div
                className={S.dropdownInfo}
                key={item}
                onClick={() => handleSelectValue(item)}
                style={{ borderBottom: index === data.length - 1 ? 'none' : '1px solid #gray300' }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
