import S from './SocialAuth.module.scss';
import Image from 'next/image';
import google from '@/images/logos/logo-google.svg';
import kakao from '@/images/logos/logo-kakao.svg';
import Link from 'next/link';
import { KAKAO_OAUTH_URL } from '@/constants/oauth';

interface SocialAuthProps {
  type: 'login' | 'signup';
}

export default function SocialAuth({ type }: SocialAuthProps) {
  return (
    <section>
      <article className={S.socialLogin}>
        <div className={S.separator} />
        <div className={S.text}>SNS 계정으로 {type === 'login' ? '로그인' : '회원가입'}하기</div>
        <div className={S.separator} />
      </article>

      <article className={S.logoContainer}>
        <Link href="/">
          <Image src={google} alt="로고 이미지" height={72} width={72} />
        </Link>
        <Link href={KAKAO_OAUTH_URL}>
          <Image src={kakao} alt="로고 이미지" height={72} width={72} />
        </Link>
      </article>
    </section>
  );
}
