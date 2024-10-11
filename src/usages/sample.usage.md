<!-- 파일명은 [컴포넌트 이름].usage.md 만들어 주세요.-->
<!-- 버튼을 예로 든 sample 입니다. -->
<!-- 미리보기 열기:
.md 파일을 열고, Ctrl + Shift + V (Mac에서는 Cmd + Shift + V)를 누르면 바로 미리보기를 열 수 있습니다.
또는 우측 상단의 아이콘 메뉴에서 "Open Preview" 버튼을 클릭할 수 있습니다. -->

# (컴포넌트 이름) 컴포넌트미리보기 열기:

이 컴포넌트는 사용자가 클릭할 수 있는 버튼을 제공합니다. 다양한 스타일링 옵션과 함께 클릭 이벤트를 처리할 수 있습니다.

## Props

<!-- 물음표가 없으면 필수값, 있으면 선택값이고, [default = 기본값]으로 기본값이 있다면 작성해주세요. -->

- label(string): 버튼에 표시될 텍스트
- onClick(function): 버튼 클릭 시 실행될 함수
- variant(string, default = 'primary')?: 버튼 스타일
  - 'primary': 기본 파란 버튼
  - 'secondary': 회색 버튼
- className(string)?: 추가 스타일 적용 시 사용

## 사용 예시

```tsx
import { Button } from 'components/Button';

return (
  <Button
    label="Custom Styled Button"
    className="my-custom-style"
    onClick={callbackFunction}
  />;
)
```
