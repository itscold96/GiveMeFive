import S from './Auth.module.scss';
import Input from '../@shared/input/Input';
import Button from '../button/Button';

export default function SignupForm() {
  return (
    <form className={S.authForm}>
      <Input label="이메일" placeholder="이메일을 입력해주세요" />
      <Input label="닉네임" placeholder="닉네임을 입력해주세요" />
      <Input label="비밀번호" placeholder="8자 이상 입력해 주세요" />
      <Input label="비밀번호 확인" placeholder="비밀번호를 한번 더 입력해주세요" />
      <Button buttonColor="gray" borderRadius="radius6" textSize="md" padding="padding8">
        로그인 하기
      </Button>
    </form>
  );
}
