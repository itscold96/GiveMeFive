import S from './CategoryAndDropdown.module.scss';
import Dropdown from '../../../components/@shared/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';

export type Category = '문화 · 예술' | '식음료' | '스포츠' | '투어' | '관광' | '웰빙';
const categoryList: Category[] = ['문화 · 예술', '식음료', '스포츠', '투어', '관광', '웰빙'];

interface CategoryProps {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
  selectedSort: string;
  handleSortChange: (value: string) => void;
}

export default function CategoryAndDropdown({ selectedCategory, setSelectedCategory }: CategoryProps) {
  const dropdownData = ['가격이 낮은 순', '가격이 높은 순'];
  const { data, selectedValue, onDropdownChange } = useDropdown(dropdownData);

  const displayValue = selectedValue || '가격';

  switch (selectedValue) {
    case '가격이 낮은 순':
      break;
    case '가격이 높은 순':
      break;
  }

  return (
    <div className={S.categoryDropdownContainer}>
      <div className={S.categoryContainer}>
        {categoryList.map(category => (
          <button
            key={category}
            className={`${S.category} ${selectedCategory === category ? S.selected : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className={S.dropdownContainer}>
        <Dropdown data={data} onChange={onDropdownChange} selectedValue={displayValue} />
      </div>
    </div>
  );
}
