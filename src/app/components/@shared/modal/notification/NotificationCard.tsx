import S from './NotificationCard.module.scss';
import closeImg from '@/images/icons/icon-close-gray.svg';
import Image from 'next/image';
import getElapsedPeriod from '@/utils/getElapsedPeriod';
import { useNotificationDelete } from '@/queries/useNotificationDelete';
import classNames from 'classnames';

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

  const isDeclined = message.includes('거절');
  const [before, after] = message.split(/거절|승인/);

  return (
    <div className={S.notificationContainer}>
      <div className={classNames(S.messageTypeIndicator, { [S.declined]: isDeclined })} />
      <div className={S.closeButtonWrapper}>
        <div className={S.message}>
          {before}
          {isDeclined ? <span className={S.declined}>거절</span> : <span className={S.confirmed}>승인</span>}
          {after}
        </div>
        <button className={S.closeButton} onClick={handleDeleteClick}>
          <Image src={closeImg} alt="닫기 이미지" width={24} height={24} />
        </button>
      </div>
      <div className={S.createdTime}>{getElapsedPeriod(createdAt.toString())}</div>
    </div>
  );
}
