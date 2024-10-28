import React, { useEffect, useRef, useState } from 'react';
import MyExperienceManagementCard from './MyExperienceManagementCard';
import S from './MyExperienceManagementList.module.scss';
import { useMyActivitiesQuery } from '@/queries/useMyActivitiesQuery';
import emptyImage from '@/images/empty.svg';
import Image from 'next/image';

function MyExperienceManagementList() {
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: initialData,
    error,
    isLoading,
  } = useMyActivitiesQuery({
    cursorId: null,
    size: 10,
  });

  const { data: nextPageData, refetch: fetchNextPage } = useMyActivitiesQuery({
    cursorId,
    size: 10,
    enabled: false,
  });

  useEffect(() => {
    if (initialData?.activities) {
      setActivities(initialData.activities);
      setCursorId(initialData.cursorId ?? null);
    }
  }, [initialData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting && !isFetchingNextPage && cursorId !== null && activities.length > 0) {
          setIsFetchingNextPage(true);
        }
      },
      {
        root: null,
        rootMargin: '100px',
        threshold: 0.1,
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isFetchingNextPage, cursorId, activities.length]);

  useEffect(() => {
    async function loadNextPage() {
      if (!isFetchingNextPage || cursorId === null) return;

      try {
        const result = await fetchNextPage();

        if (result.data?.activities?.length) {
          setActivities(prev => [
            ...prev,
            ...result.data.activities.filter(newActivity => !prev.some(existing => existing.id === newActivity.id)),
          ]);
          setCursorId(result.data.cursorId ?? null);
        } else {
          setCursorId(null);
        }
      } catch (error) {
        console.error('Error loading next page:', error);
      } finally {
        setIsFetchingNextPage(false);
      }
    }

    loadNextPage();
  }, [isFetchingNextPage, cursorId, fetchNextPage]);

  if (isLoading) {
    return <p>로딩 중입니다...</p>;
  }

  if (error) {
    return <p>데이터를 가져오는 중 오류가 발생했습니다: {error.message}</p>;
  }

  if (!activities.length) {
    return (
      <div className={S.emptyState}>
        <div className={S.imageContainer}>
          <Image src={emptyImage} alt="빈 상태 이미지" width={240} height={240} />
        </div>
        <p className={S.text}>아직 등록한 체험이 없어요</p>
      </div>
    );
  }

  return (
    <div className={S.list}>
      {activities.map(activity => (
        <MyExperienceManagementCard key={activity.id} experience={activity} />
      ))}
      <div ref={observerRef} className={S.loading}>
        {isFetchingNextPage && <p>더 불러오는 중...</p>}
      </div>
    </div>
  );
}

export default MyExperienceManagementList;
