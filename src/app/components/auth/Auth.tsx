'use client';

import S from './Auth.module.scss';
import Image from 'next/image';
import logo from '@/images/logos/logo-big.png';
import Link from 'next/link';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import SocialAuth from './SocialAuth';

interface AuthProps {
  type: 'login' | 'signup';
}

export default function Auth({ type }: AuthProps) {
  return (
    <div className={S.authContainer}>
      <Link href="/">
        <Image src={logo} alt="로고 이미지" height={214} width={340} priority />
      </Link>

      {type === 'login' ? <LoginForm /> : <SignupForm />}

      <section className={S.memberCheck}>
        {type === 'login' ? (
          <span>
            회원이 아니신가요? <Link href="/signup">회원가입하기</Link>
          </span>
        ) : (
          <span>
            회원이신가요? <Link href="/login">로그인하기</Link>
          </span>
        )}
      </section>

      <SocialAuth type={type} />
    </div>
  );
}
