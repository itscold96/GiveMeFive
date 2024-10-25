import { useEffect, useState } from 'react';
import S from './Alarm.module.scss';
import NotificationModal from '../modal/notification/NotificationModal';
import notificationIcon from '@/images/icons/Icon-notification.svg';
import { useToggle } from '@/hooks/useToggle';
import Portal from '../portal/Portal';
import Image from 'next/image';
import classNames from 'classnames';
import { useNotification } from '@/queries/useNotification';

export default function Alarm() {
  const [isRestNotification, setIsRestNotification] = useState(false);
  const { toggleValue, toggleDispatch } = useToggle();
  const [delay, setDelay] = useState(10 * 1000); // 초기 딜레이값 10초
  // useQuery의 refetchInterval은 데이터 요청 시간을 고려하지 않기 때문에, Polling 주기를 보장하기 위해
  // 직접 중첩 setTimeout으로 Polling 함수를 구현
  const { data, refetch, isSuccess, isError } = useNotification();
  const notificationList = data ? data.notifications : [];
  const totalCount = data ? data.totalCount : 0;

  let timer: NodeJS.Timeout;

  const startPolling = () => {
    timer = setTimeout(async function polling() {
      refetch();
      // setInterval과 달리 중첩 setTimeout은 api 요청 시간을 타이머 시간에 포함하지 않음 => 지연 간격을 보장
      timer = setTimeout(polling, delay);
    }, delay);
  };

  if (isSuccess) {
    if (totalCount > 0) {
      // notificationList  길이가 0보다 크면 삭제되지 않은 알림이 있다는 것
      setIsRestNotification(true);
    }
  }

  if (isError) {
    // 요청 실패가 서버 부하 문제일 수 있으므로 딜레이 2배 증가
    setDelay(delay => (delay *= 2));
  }

  useEffect(() => {
    startPolling();
    return () => {
      if (timer) {
        clearTimeout(timer); // 이전 렌더링의 타이머 제거
      }
    };
  }, []);

  return (
    <div className={S.alarmContainer}>
      <div className={classNames(S.notificationCircle, { [S.hidden]: !isRestNotification })} />
      <button className={S.notification} onClick={() => toggleDispatch({ type: 'switch' })}>
        <Image src={notificationIcon} alt="프로필 이미지" width={20} height={20} />
      </button>
      <Portal isOpen={toggleValue} onClose={() => toggleDispatch({ type: 'off' })}>
        <NotificationModal onClose={() => toggleDispatch({ type: 'off' })} notificationList={notificationList} />
      </Portal>
    </div>
  );
}
