'use client';

import S from './Dropdown.module.scss';
import dropdownArrow from '@/images/dropdown-arrow.svg';
import kebabIcon from '@/images/kebab-icon.svg';
import dropdownThinArrow from '@/images/dropdown-thin-arrow.svg';
import Image from 'next/image';
interface DropdownProps {
  data: string[];
  onChange: (value: string) => void;
  toggleDropdown: () => void;
  isDropdownToggle: boolean;
  selectedValue?: string;
  type?: 'hide' | 'kebab' | 'category' | 'default';
}

export default function Dropdown({
  data,
  onChange,
  toggleDropdown,
  isDropdownToggle,
  selectedValue,
  type,
}: DropdownProps) {
  // 항목 클릭 시 선택된 값 설정 및 useDropdown훅의 selectedValue로 전달
  const handleSelectValue = (value: string) => {
    onChange(value);
    toggleDropdown();
  };

  return (
    <>
      <div className={S.dropdownContainer}>
        {type === 'hide' ? (
          <></>
        ) : type === 'kebab' ? (
          <div className={S.KebabIconWrapper}>
            <Image src={kebabIcon} alt="케밥 아이콘" width={40} height={40} onClick={toggleDropdown} />
          </div>
        ) : type === 'category' ? (
          <div className={S.categoryWrapper} onClick={toggleDropdown}>
            <div className={S.categoryValue}>{selectedValue ? selectedValue : data[0]}</div>
            <Image src={dropdownThinArrow} alt="카테고리 아이콘" width={24} height={24} />
          </div>
        ) : (
          <div className={S.dropdownButton} onClick={toggleDropdown}>
            <div>{selectedValue ? selectedValue : data[0]}</div>
            <Image src={dropdownArrow} alt="드롭다운 화살표" width={22} height={22} />
          </div>
        )}

        {isDropdownToggle && (
          <div
            className={
              type === 'category'
                ? S.categoryDropdownInfo
                : type === 'kebab'
                  ? S.kebabDropdownInfo
                  : type === 'hide'
                    ? S.hideDropdownInfo
                    : S.categoryDropdownInfo // 나머지 타입에 대한 클래스
            }
          >
            {data.map((item, index) => (
              <div
                className={S.DropdownInfo}
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
