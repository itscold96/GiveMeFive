import Image from 'next/image';
import S from './Header.module.scss';
import logoImg from '@/images/logo/logo-md.svg';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={S.headerContainer}>
      <div className={S.headerContents}>
        <Link href="/" className={S.headerLogo}>
          <Image src={logoImg} alt="로고 이미지" width={172} height={30} priority />
        </Link>
        <div className={S.headerAuthContainer}>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div>
      </div>
    </header>
  );
}
