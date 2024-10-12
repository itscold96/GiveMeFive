import S from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={S.footerContainer}>
      <div>©codeit - 2023</div>
      <div className={S.footerMiddleSection}>
        <div>Privacy Policy</div>
        <div>FAQ</div>
      </div>
      <div className={S.footerSocialSection}>
        <div>페이스북</div>
        <div>트위터</div>
        <div>인스타그램</div>
        <div>유튜브</div>
      </div>
    </div>
  );
}
