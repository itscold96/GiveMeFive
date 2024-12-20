import S from './Footer.module.scss';
import Image from 'next/image';
import facebook from '@/images/footerIcon/facebook-Icon.svg';
import twitter from '@/images/footerIcon/twitter-Icon.svg';
import instagram from '@/images/footerIcon/instagram-Icon.svg';
import youtube from '@/images/footerIcon/youtube-Icon.svg';

export default function Footer() {
  return (
    <div className={S.footer}>
      <div className={S.footerContents}>
        <div>©codeit - 2023</div>

        <div className={S.footerMiddleSection}>
          <div>Privacy Policy</div>
          <div>FAQ</div>
        </div>

        <div className={S.footerSocialSection}>
          <Image src={facebook} alt="페이스북" className={S.footerIcon} />
          <Image src={twitter} alt="트위터" className={S.footerIcon} />
          <Image src={instagram} alt="인스타그램" className={S.footerIcon} />
          <Image src={youtube} alt="유튜브" className={S.footerIcon} />
        </div>
      </div>
    </div>
  );
}
