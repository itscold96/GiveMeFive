import S from './Auth.module.scss';
import Input from '../@shared/input/Input';
import Button from '../button/Button';

export default function LoginForm() {
  return (
    <form className={S.authForm}>
      <Input label="이메일" placeholder="이메일을 입력해주세요" />
      <Input label="비밀번호" placeholder="비밀번호를 입력해주세요" />
      <Button buttonColor="gray" borderRadius="radius6" textSize="md" padding="padding8">
        로그인 하기
      </Button>
    </form>
  );
}
