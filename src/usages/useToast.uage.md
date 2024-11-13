# useToastStore 훅:

- 토스트를 관리하는 커스텀훅입니다.
- 토스트를 생성하는 addToast 메서드를 꺼낼 수 있습니다.

## useToastStore Params

- 예시와 같이 토스트를 생성하는 액션 메서드를 꺼내어 사용하시면 됩니다.

# addToast()

- 타입과 메시지를 인자로 넣어, 해당 타입에 맞게 메시지를 표출할 수 있습니다.
- 토스트 너비는 최대 뷰포트의 90%이며, 메시지가 이를 넘어갈 시 말줄임 스타일이 적용되도록 해두었습니다.

## addToast Params

- type('success' | 'warn' | 'error'): 성공, 경고, 에러 중 하나의 타입을 선정합니다.
- message(string): 토스트에 표출할 메시지를 작성합니다.

## 사용 예시

```tsx
'use client'; // 훅을 사용하기 때문에 'use client' 선언 필요

import { useToastStore } from '@/stores/useToastStore';

export default function Home() {
  const { addToast } = useToastStore(state => state.action);

  // 이와 같이 활용도 가능합니다.
  const handleSubmitClick = () => {
    try{
      // ...성공 시 로직
      addToast({ type: 'success', message: '성공입니다!' }
    }catch(error){
      // ...실패 시 로직
      addToast({ type: 'error', message: '에러 발생입니다!' })
    }
  }

  return (
    <div>
      <button onClick={() => addToast({ type: 'success', message: '성공!' })}>
        성공 버튼
      </button>
      <button onClick={() => addToast({ type: 'warn', message: '경고!' })}>
        경고 버튼
      </button>
      <button onClick={() => addToast({ type: 'error', message: '에러!' })}>
        에러 버튼
      </button>
      <button onClick={handleSubmitClick}>
        제출 버튼
      </button>
    </div>
  );
}
```
