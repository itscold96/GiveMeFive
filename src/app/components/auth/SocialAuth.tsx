import S from './SocialAuth.module.scss';
import Image from 'next/image';
import google from '@/images/logo/logo-google.svg';
import kakao from '@/images/logo/logo-kakao.svg';

interface SocialAuthProps {
  type: 'login' | 'signup';
}

export default function SocialAuth({ type }: SocialAuthProps) {
  return (
    <section>
      <article className={S.socialLogin}>
        <div className={S.separator} />
        <div className={S.text}>SNS 계정으로 로그인하기</div>
        <div className={S.separator} />
      </article>

      <article className={S.logoContainer}>
        <Image src={google} alt="로고 이미지" height={72} width={72} />
        <Image src={kakao} alt="로고 이미지" height={72} width={72} />
      </article>
    </section>
  );
}
