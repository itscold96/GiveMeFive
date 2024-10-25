import styles from './NotificationModal.module.scss';
import NotificationCard from './NotificationCard';
import closeImg from '@/images/icons/icon-close-black.svg';
import Image from 'next/image';
import { Notification } from '@/types/notifications';

interface NotificationModalProps {
  onClose: () => void;
  notificationList: Notification[];
}

export default function NotificationModal({ notificationList, onClose }: NotificationModalProps) {
  return (
    <div className={styles.notificationModalContainer}>
      <div className={styles.modalTitle}>
        <p>알림 {notificationList.length}개</p>
        <button>
          <Image src={closeImg} alt="닫기 이미지" width={24} height={24} onClick={onClose} />
        </button>
      </div>
      {notificationList.length === 0 ? (
        <p className={styles.noResultText}>아직 도착한 알림이 없네요..</p>
      ) : (
        <div className={styles.cardContainer}>
          {notificationList.map(notification => (
            <NotificationCard
              key={notification.id}
              id={notification.id}
              createdAt={notification.createdAt}
              message={notification.content}
            />
          ))}
        </div>
      )}
    </div>
  );
}
