'use client';

import S from '@/app/components/@shared/dropdown/Dropdown.module.scss';
import { useState } from 'react';
import dropdownArrow from '@/images/dropdown-arrow.svg';
import kebabIcon from '@/images/kebab-icon.svg';
import Image from 'next/image';
interface DropdownProps {
  data: string[];
  kebabType?: boolean;
  onChange: (value: string) => void;
  selectedValue?: string;
}

export default function Dropdown({ data, kebabType, onChange, selectedValue }: DropdownProps) {
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
        {kebabType ? (
          <div className={S.KebabIconWrapper}>
            <Image src={kebabIcon} alt="케밥 아이콘" width={40} height={40} onClick={toggleDropdown} />
          </div>
        ) : (
          <div className={S.dropdownButton} onClick={toggleDropdown}>
            <div>{selectedValue}</div>
            <Image src={dropdownArrow} alt="드롭다운 화살표" width={22} height={22} />
          </div>
        )}
        {isDropdownToggle && (
          <div className={S.doropdownInfoWrapper}>
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
