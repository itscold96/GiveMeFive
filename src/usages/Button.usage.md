<!-- 미리보기 열기:
.md 파일을 열고, Ctrl + Shift + V (Mac에서는 Cmd + Shift + V)를 누르면 바로 미리보기를 열 수 있습니다.
또는 우측 상단의 아이콘 메뉴에서 "Open Preview" 버튼을 클릭할 수 있습니다. -->

# Button

버튼 컴포넌트입니다.

## Props

- `buttonColor`(버튼색상): 'nomadBlack' | 'white' | 'gray'
- `textSize`(버튼텍스트크기): 'md' | 'lg'
- `borderRadius`(버튼모서리둥글기): 'radius6' | 'radius4'
- `padding`(버튼내부여백): 'padding8' | 'padding14'
- `className`: 추가적인 CSS 클래스
- `children`: 버튼 내부에 들어갈 내용

## 사용 예시

```tsx
import { Button } from 'components/Button';

return (
  <Button buttonColor="gray" borderRadius="radius6" textSize="md" padding="padding8" className={S.width}>
    로그인 하기
  </Button>
);
```

## 주의사항

- 버튼의 너비는 `className` prop을 통해 별도로 설정해야 합니다. (기본값: auto)
- 버튼 컴포넌트는 ButtonHTMLAttributes<HTMLButtonElement>의 모든 속성을 지원합니다.
