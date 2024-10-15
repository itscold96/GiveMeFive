# AlertModal 컴포넌트

이 컴포넌트는 경고 메시지를 표시하고 사용자가 확인하거나 취소할 수 있는 모달을 제공합니다. 아이콘을 포함하고 있으며, 확인 버튼의 텍스트를 사용자 정의할 수 있습니다.

## Props

- isOpen (boolean): 모달이 열려 있는지 여부
- onClose (function): 모달을 닫는 함수
- onAlert (function): 확인 버튼 클릭 시 실행될 함수
- message (string): 모달에 표시할 메시지
- alertButtonText (string, default = '확인')?: 확인 버튼에 표시될 텍스트

## 사용 예시

```tsx
import AlertModal from 'components/AlertModal';

return (
  <AlertModal
    isOpen={true}
    onClose={() => console.log('모달 닫힘')}
    onAlert={() => console.log('확인 버튼 클릭')}
    message="정말로 이 작업을 수행하시겠습니까?"
    alertButtonText="확인"
  />
);
```

# ConfirmModal 컴포넌트

이 컴포넌트는 사용자가 확인을 요구하는 메시지를 표시하고, 확인 버튼을 제공하는 모달입니다.

## Props

- isOpen (boolean): 모달이 열려 있는지 여부
- onClose (function): 모달을 닫는 함수
- onConfirm (function): 확인 버튼 클릭 시 실행될 함수
- message (string): 모달에 표시할 메시지
- confirmButtonText (string, default = '확인')?: 확인 버튼에 표시될 텍스트

## 사용 예시

```tsx
import ConfirmModal from 'components/ConfirmModal';

return (
  <ConfirmModal
    isOpen={true}
    onClose={() => console.log('모달 닫힘')}
    onConfirm={() => console.log('확인 버튼 클릭')}
    message="이 작업을 진행하시겠습니까?"
    confirmButtonText="확인"
  />
);
```
