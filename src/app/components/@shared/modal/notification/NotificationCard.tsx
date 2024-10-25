import S from './NotificationCard.module.scss';
import closeImg from '@/images/icons/icon-close-gray.svg';
import Image from 'next/image';
import getElapsedPeriod from '@/utils/getElapsedPeriod';
import { useNotificationDelete } from '@/queries/useNotificationDelete';

interface NotificationCardProps {
  id: number;
  message: string;
  createdAt: string;
}

export default function NotificationCard({ id, message, createdAt }: NotificationCardProps) {
  const { mutate } = useNotificationDelete(id);
  const handleDeleteClick = async () => {
    mutate();
  };

  return (
    <div className={S.notificationContainer}>
      <div className={S.closeButtonWrapper}>
        <div className={S.message}>{message}</div>
        <button className={S.closeButton} onClick={handleDeleteClick}>
          <Image src={closeImg} alt="닫기 이미지" width={24} height={24} />
        </button>
      </div>
      <div className={S.createdTime}>{getElapsedPeriod(createdAt.toString())}</div>
    </div>
  );
}
