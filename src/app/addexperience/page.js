'use client';
import AddExperienceForm from '../components/addExperienceForm/AddExperienceForm';
import Dropdown from '../components/@shared/dropdown/Dropdown';
import useDropdown from './../../hooks/useDropdown';

export default function AddExperience() {
  const dropdownList = ['마이 페이지', '로그아웃'];
  const categoryList = ['식음료식음료', '스포츠'];
  const { onDropdownChange, selectedValue, data, toggleDropdown, isDropdownToggle } = useDropdown(dropdownList);

  const onClickProfile = () => {
    toggleDropdown();
  };

  return (
    <div>
      <div onClick={onClickProfile}>프로필이미지</div>
      <Dropdown
        onClick={onClickProfile}
        type="category"
        data={data}
        onChange={onDropdownChange}
        isDropdownToggle={isDropdownToggle}
        toggleDropdown={toggleDropdown}
        selectedValue={selectedValue}
      />
      <AddExperienceForm />
    </div>
  );
}
