<!-- 미리보기 열기:
.md 파일을 열고, Ctrl + Shift + V (Mac에서는 Cmd + Shift + V)를 누르면 바로 미리보기를 열 수 있습니다.
또는 우측 상단의 아이콘 메뉴에서 "Open Preview" 버튼을 클릭할 수 있습니다. -->

# Dropdown 컴포넌트:

이 컴포넌트는 사용자가 클릭할 수 있는 드롭다운 버튼을 제공합니다.

## Dropdown 컴포넌트 Props

<!-- 물음표가 없으면 필수값, 있으면 선택값이고, [default = 기본값]으로 기본값이 있다면 작성해주세요. -->

- data: string[]; : string 타입의 배열을 전달해야 합니다.
- kebabType?: boolean; : 속성값으로 kebaType={true}를 넘기면 케밥 아이콘 드롭다운이 됩니다 이 속성은 생략 가능합니다.
- onChange: (value: string) => void; : 사용하는 컴포넌트에서 선택된 값을 처리할 state와 onChange 함수를 정의해 사용하면 됩니다.

## 사용 예시

```tsx
import Dropdown from '@/component/Dropdown/Dropdown';
import { useState } from 'react';

export default function Home() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownChange = (value: string) => {
    setSelectedValue(value);
  };
  console.log(selectedValue);
  return (
    <div>
      <Dropdown data={['리액트', '앵귤러', '뷰']} kebabType={true} onChange={handleDropdownChange} />
    </div>
  );
}
```
