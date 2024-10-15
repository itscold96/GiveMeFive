<!-- 미리보기 열기:
.md 파일을 열고, Ctrl + Shift + V (Mac에서는 Cmd + Shift + V)를 누르면 바로 미리보기를 열 수 있습니다.
또는 우측 상단의 아이콘 메뉴에서 "Open Preview" 버튼을 클릭할 수 있습니다. -->

# Dropdown 컴포넌트:

이 컴포넌트는 사용자가 클릭할 수 있는 드롭다운 버튼을 제공합니다.

## Dropdown 컴포넌트 Props

<!-- 물음표가 없으면 필수값, 있으면 선택값이고, [default = 기본값]으로 기본값이 있다면 작성해주세요. -->

- dropdownData:
  드롭다운에 표시될 데이터를 string[] 타입의 배열로 생성합니다.
  예시: const dropdownData = ['리액트', '앵귤러', '뷰', '넥스트'];

- useDropdown 훅 사용:
  dropdownData를 인자로 전달하여 useDropdown을 호출합니다.
  useDropdown훅은 이 세 가지를 반환합니다:
  data: 드롭다운에 표시할 데이터 (string[])
  selectedValue: 현재 선택된 값 (string | null)
  onDropdownChange: 드롭다운 값이 변경될 때 호출되는 핸들러 함수 ((event: React.ChangeEvent<HTMLSelectElement>) => void)

- onChange: (value: string) => void; : 사용하는 컴포넌트에서 선택된 값을 처리할 state와 onChange 함수를 정의해 사용하면 됩니다(필수)
- selectedValue?: string; : 버튼 UI의 드롭다운이라면 data[0]을 기본값으로
  지정해 줍니다, 케밥 UI의 드롭다운인 경우 생략 가능합니다.(선택)
- kebabType?: boolean; : 속성값으로 kebaType={true}를 넘기면 케밥 아이콘 드롭다운이 됩니다 이 속성은 생략 가능합니다(선택)

## 사용 예시

```tsx
'use client';
import Dropdown from '@/component/Dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';

export default function Home() {
  const dropdownData = ['리액트', '앵귤러', '뷰', '넥스트'];
  const { data, selectedValue, onDropdownChange } = useDropdown(dropdownData);
  switch (selectedValue) {
    case '리액트':
      console.log('리액트콘솔');
      break;
    case '앵귤러':
      console.log('앵귤러콘솔');
      break;
    default:
      console.log('그외');
  }
  return (
    <div>
      <Dropdown kebabType={true} data={data} onChange={onDropdownChange} />
      <Dropdown data={data} onChange={onDropdownChange} selectedValue={selectedValue} />
    </div>
  );
}
```
