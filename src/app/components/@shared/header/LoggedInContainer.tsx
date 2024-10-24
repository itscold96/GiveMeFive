import Image from 'next/image';
import S from './LoggedInContainer.module.scss';
import defaultProfileImg from '@/images/profiles/default-profile.svg';
import notificationIcon from '@/images/icons/Icon-notification.svg';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '../dropdown/Dropdown';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';

interface LoggedInContainerProps {
  profileImageUrl: string | null;
  nickname: string;
  logout: () => void;
}

const dropdownList = ['마이 페이지', '로그아웃'];

export default function LoggedInContainer({ profileImageUrl, nickname }: LoggedInContainerProps) {
  const { logout } = useUserStore();
  const { data, isDropdownToggle, toggleDropdown } = useDropdown(dropdownList);
  const router = useRouter();

  const handleDropdownChange = (value: string) => {
    switch (value) {
      case '마이 페이지':
        router.push('/mypage');
        break;
      case '로그아웃':
        logout();
        router.push('/');
        break;
    }
  };

  return (
    <div className={S.loggedInContainer}>
      <button className={S.notification}>
        <Image src={notificationIcon} alt="프로필 이미지" width={20} height={20} />
      </button>
      <article className={S.verticalSeparator} />
      <div className={S.profileContainer} onClick={toggleDropdown}>
        <Image src={profileImageUrl || defaultProfileImg} alt="프로필 이미지" width={32} height={32} priority />
        <p className={S.nickname}>{nickname}</p>
      </div>
      <Dropdown
        type="hide"
        data={data}
        onChange={value => handleDropdownChange(value)}
        isDropdownToggle={isDropdownToggle}
        toggleDropdown={toggleDropdown}
      />
    </div>
  );
}
