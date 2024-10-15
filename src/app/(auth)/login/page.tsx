import S from '../Auth.module.scss';
import Image from 'next/image';
import logo from '@/images/logo/logo-big.svg';
import google from '@/images/logo/logo-google.svg';
import kakao from '@/images/logo/logo-kakao.svg';
import Input from '@/app/components/@shared/input/Input';
import Link from 'next/link';
import Button from '@/app/components/button/Button';

export default function Login() {
  return (
    <div className={S.authContainer}>
      <Link href="/">
        <Image src={logo} alt="로고 이미지" height={192} width={340} />
      </Link>
      <form className={S.authForm}>
        <Input label="이메일" placeholder="이메일을 입력해주세요" />
        <Input label="비밀번호" placeholder="비밀번호를 입력해주세요" />
        <Button buttonColor="gray" borderRadius="radius6" textSize="md" padding="padding8">
          로그인 하기
        </Button>
      </form>
      <section className={S.memberCheck}>
        <span>
          회원이 아니신가요? <Link href="/signup">회원가입하기</Link>
        </span>
      </section>
      <section className={S.socialLogin}>
        <div className={S.separator} />
        <div className={S.text}>SNS 계정으로 로그인하기</div>
        <div className={S.separator} />
      </section>
      <section className={S.logoContainer}>
        <Image src={google} alt="로고 이미지" height={72} width={72} />
        <Image src={kakao} alt="로고 이미지" height={72} width={72} />
      </section>
    </div>
  );
}
