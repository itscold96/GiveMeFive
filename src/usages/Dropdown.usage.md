<!-- 미리보기 열기:
.md 파일을 열고, Ctrl + Shift + V (Mac에서는 Cmd + Shift + V)를 누르면 바로 미리보기를 열 수 있습니다.
또는 우측 상단의 아이콘 메뉴에서 "Open Preview" 버튼을 클릭할 수 있습니다. -->

# Dropdown 컴포넌트:

이 컴포넌트는 사용자가 클릭할 수 있는 드롭다운 버튼을 제공합니다.

<!-- 물음표가 없으면 필수값, 있으면 선택값이고, [default = 기본값]으로 기본값이 있다면 작성해주세요. -->

- dropdownData:
  드롭다운에 표시될 데이터를 string[] 타입의 배열로 생성합니다.
  예시: const dropdownData = ['리액트', '앵귤러', '뷰', '넥스트'];

## useDropdown 커스텀 훅

만들어둔 dropdownData를 인자로 전달하여 Dropdown가 필요한 컴포넌트에서 useDropdown을 호출합니다.
useDropdown훅은 이 다섯 가지를 반환합니다:

- data: string[]: 문자열 형식의 배열을 받습니다 드롭 다운을 클릭했을 때 나올 내용입니다.
- onDropdownChange: 드롭다운 값이 변경될 때 호출되는 핸들러 함수입니다. ((event: React.ChangeEvent<HTMLSelectElement>) => void)
- toggleDropdown: () => void; 형식의 아래의 예시처럼 특정 div나 이미지에 드롭다운을 여닫을 수 있는 함수입니다.
- isDropdownToggle: 드롭다운의 토글 상태를 boolean 값으로 전달합니다.
- selectedValue: 현재 선택된 값 기본적으로 data[0]이 들어가 있습니다.

## Dropdown 컴포넌트 Props

- data: string[]: 문자열 형식의 배열을 받습니다 드롭 다운을 클릭했을 때 나올 내용입니다.(필수)
- onChange: (value: string) => void; : useDropdown 훅 내부에서 클릭한 항목의 state로 selectedValue를 변경합니다(필수)
- toggleDropdown: () => void: 아래의 예시처럼 특정 div나 이미지에 드롭다운을 여닫을 수 있는 함수입니다.(필수)
- isDropdownToggle: boolean: 드롭다운의 토글 상태를 boolean 값으로 전달합니다.(필수)
- selectedValue?: string;: 현재 선택된 값이 화면에 보여야 하는 type이라면 Props로 내려줄 수 있습니다(선택)
- type?: 'hide' | 'kebab' | 'category' | 'default'; : 드롭다운 타입을 지정할 수 있습니다.

## 사용 예시

```tsx
'use client';
import Dropdown from '../components/@shared/dropdown/Dropdown';
import useDropdown from './../../hooks/useDropdown';

export default function Home() {
  // 만약 처음 렌더링 시 selectedValue에 아무 값이 없어야 한다면 'string'같은 더미 데이터를 배열 첫 번째에 추가해야 정상 작동함
  const dropdownList = ['string', '마이 페이지', '로그아웃'];
  const categoryList = ['식음료', '스포츠'];
  // 일반적인 경우
  const { onDropdownChange, data, toggleDropdown, isDropdownToggle } = useDropdown(dropdownList);
  // 컴포넌트에 드롭다운이 2개 이상인 경우 구조분해 할당하여 사용 useDropdown훅의 리턴문 순서를 안다면 선언문 생략 가능
  const categoryDropdown = useDropdown(categoryList);
  const {
    categoryData = categoryDropdown.data,
    categoryOnDropdownChange = categoryDropdown.onDropdownChange,
    categoryToggle = categoryDropdown.toggleDropdown,
    categoryIsDropdownToggle = categoryDropdown.isDropdownToggle,
    categorySelectedValue = categoryDropdown.selectedValue,
  } = categoryDropdown;

  const onProfileDropdownToggle = () => {
    toggleDropdown();
  };

  const onCategoryDropdownToggle = () => {
    categoryToggle();
  };
  return (
    <div>
      <div onClick={onProfileDropdownToggle}>프로필 이미지</div>
      <Dropdown
        type="hide"
        data={data}
        onChange={onDropdownChange}
        isDropdownToggle={isDropdownToggle}
        toggleDropdown={toggleDropdown}
      />
      <Dropdown
        onClick={onCategoryDropdownToggle}
        type="category"
        data={categoryData}
        onChange={categoryOnDropdownChange}
        isDropdownToggle={categoryIsDropdownToggle}
        toggleDropdown={categoryToggle}
        selectedValue={categorySelectedValue}
      />
    </div>
  );
}
```
