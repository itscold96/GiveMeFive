import { useEffect } from 'react';
import S from './Alarm.module.scss';
import NotificationModal from '@/app/components/@shared/header/notification/NotificationModal';
import notificationIcon from '@/images/icons/Icon-notification.svg';
import { useToggle } from '@/hooks/useToggle';
import Portal from '../backdrop/Portal';
import Image from 'next/image';
import classNames from 'classnames';
import { useNotification } from '@/queries/useNotification';

export default function Alarm() {
  const { toggleValue, toggleDispatch } = useToggle();
  // useQuery의 refetchInterval은 데이터 요청 시간을 고려하지 않기 때문에, Polling 주기를 보장하기 위해
  // 직접 중첩 setTimeout으로 Polling 함수를 구현
  const { data, refetch, isError } = useNotification();
  const notificationList = data ? data.notifications : [];
  const totalCount = data ? data.totalCount : 0;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let delay = 10 * 1000; // 초기 딜레이값 10초

    if (isError) {
      // 요청 실패가 서버 부하 문제일 수 있으므로 딜레이 2배 증가
      delay *= 2;
    }

    const startPolling = () => {
      timer = setTimeout(async function polling() {
        refetch();
        // setInterval과 달리 중첩 setTimeout은 api 요청 시간을 타이머 시간에 포함하지 않음 => 지연 간격을 보장
        timer = setTimeout(polling, delay);
      }, delay);
    };

    startPolling();
    return () => {
      if (timer) {
        clearTimeout(timer); // 이전 렌더링의 타이머 제거
      }
    };
  }, [isError]);

  return (
    <div className={S.alarmContainer}>
      <div className={classNames(S.notificationBadge, { [S.hidden]: totalCount === 0 })} />
      <button className={S.notification} onClick={() => toggleDispatch({ type: 'switch' })}>
        <Image src={notificationIcon} alt="프로필 이미지" width={20} height={20} priority />
      </button>
      {toggleValue && (
        <NotificationModal onClose={() => toggleDispatch({ type: 'off' })} notificationList={notificationList} />
      )}
    </div>
  );
}
