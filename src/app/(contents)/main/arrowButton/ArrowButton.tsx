import S from './ArrowButton.module.scss';
import ArrowLeftGray from '../../../../images/arrowleft-gray.svg';
import ArrowLeftBlack from '../../../../images/arrowleft-black.svg';
import ArrowRightGray from '../../../../images/arrowright-gray.svg';
import ArrowRightBlack from '../../../../images/arrowright-black.svg';
import Image from 'next/image';
import { useCallback, useEffect, useMemo } from 'react';
import { useActivityStore } from '@/stores/useActivityStore';

export default function ArrowButton() {
  const getBestActivities = useActivityStore(state => state.getBestActivities);
  const bestActivitiesResponse = useActivityStore(state => state.bestActivitiesResponse);

  useEffect(() => {
    getBestActivities(null);
  }, []);

  const onClickBtn = useCallback(
    (type: 'left' | 'right') => {
      if (type === 'left') {
        getBestActivities(bestActivitiesResponse.activities[0].id);
      } else {
        getBestActivities(bestActivitiesResponse.cursorId || null);
      }
    },
    [bestActivitiesResponse.activities, bestActivitiesResponse.cursorId],
  );

  const disabled = useMemo(() => {
    return bestActivitiesResponse.activities.length <= 3;
  }, [bestActivitiesResponse.activities]);

  return (
    <div className={S.arrowButtonContainer}>
      <button className={S.arrowButton} onClick={() => onClickBtn('left')}>
        <Image src={disabled ? ArrowLeftGray : ArrowLeftBlack} alt="left" />
      </button>
      <button className={S.arrowButton} onClick={() => onClickBtn('right')}>
        <Image src={disabled ? ArrowRightGray : ArrowRightBlack} alt="right" />
      </button>
    </div>
  );
}
