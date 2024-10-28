import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReservationHistoryCard from './ReservationHistoryCard';
import Dropdown from '../../components/@shared/dropdown/Dropdown';
import S from './ReservationHistoryCardList.module.scss';
import { getMyReservations } from '@/fetches/reservationHistory';
import emptyImage from '@/images/empty.svg';
import Image from 'next/image';

interface Reservation {
  id: number;
  activity: {
    id: number;
    title: string;
    bannerImageUrl: string;
  };
  scheduleId: number;
  teamId: string;
  userId: number;
  status: 'pending' | 'completed' | 'declined' | 'canceled' | 'confirmed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

function ReservationHistoryCardList() {
  const [displayedReservations, setDisplayedReservations] = useState<Reservation[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [allFilteredReservations, setAllFilteredReservations] = useState<Reservation[]>([]);
  const loadingRef = useRef<HTMLDivElement>(null);
  const PAGE_SIZE = 10;

  const statusMapping: { [key: string]: string } = {
    전체: 'all',
    '예약 신청': 'pending',
    '예약 승인': 'confirmed',
    '체험 완료': 'completed',
    '예약 거절': 'declined',
    '예약 취소': 'canceled',
  };

  const fetchData = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);

      const params = {
        size: 100,
        status: statusMapping[selectedStatus] !== 'all' ? statusMapping[selectedStatus] : undefined,
      };

      const data = await getMyReservations(params);

      if (data.reservations) {
        setAllFilteredReservations(data.reservations);
        setDisplayedReservations(data.reservations.slice(0, PAGE_SIZE));
        setHasMore(data.totalCount > PAGE_SIZE);
      }
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedStatus]);

  const loadMore = () => {
    const nextReservations = allFilteredReservations.slice(
      displayedReservations.length,
      displayedReservations.length + PAGE_SIZE,
    );
    setDisplayedReservations(prev => [...prev, ...nextReservations]);
    setHasMore(nextReservations.length === PAGE_SIZE);
  };

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoading) {
        loadMore();
      }
    },
    [hasMore, isLoading, displayedReservations, allFilteredReservations],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1,
    });

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
      observer.disconnect();
    };
  }, [observerCallback]);

  const handleReviewSubmitted = async () => {
    await fetchData();
  };

  function toggleDropdown() {
    setIsDropdownOpen(prevState => !prevState);
  }

  return (
    <div className={S.container}>
      <div className={S.header}>
        <div className={S.title}>예약 내역</div>
        <Dropdown
          data={Object.keys(statusMapping)}
          onChange={value => setSelectedStatus(value)}
          toggleDropdown={toggleDropdown}
          isDropdownToggle={isDropdownOpen}
          type="category"
          selectedValue={selectedStatus}
        />
      </div>
      <div className={S.list}>
        {displayedReservations.length > 0 ? (
          <>
            {displayedReservations.map(reservation => (
              <ReservationHistoryCard
                key={reservation.id}
                reservation={reservation}
                onCancelSuccess={handleReviewSubmitted}
                onReviewSubmitted={handleReviewSubmitted}
              />
            ))}
            {hasMore && (
              <div ref={loadingRef} className={S.loadingContainer}>
                {isLoading && <div className={S.loading}>로딩 중...</div>}
              </div>
            )}
          </>
        ) : (
          <div className={S.emptyState}>
            <Image src={emptyImage} alt="빈 상태 이미지" width={240} height={240} />
            <p className={S.text}>해당하는 예약 내역이 없어요</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationHistoryCardList;
