import { Suspense } from 'react';
import S from './main.module.scss';
import BestZoneCard from './bestzonecard/BestZoneCard';
import AllZoneCard from './allzonecard/AllZoneCard';
import Banner from './banner/Banner';
import Search from './search/Search';
import { getActivities } from '@/fetches/activities';

export default async function Main() {
  const activitiesData = await getActivities({
    size: 8,
    method: 'offset',
    page: 1,
  });

  const bestActivitiesData = await getActivities({
    sort: 'most_reviewed',
    method: 'offset',
    page: 1,
    size: 3,
  });
  const firstBestActivity = bestActivitiesData?.activities[0] || null;

  return (
    <div>
      <Banner bestActivity={firstBestActivity} />
      <div className={S.mainContainer}>
        {/* Search는 독립적으로 동작하므로 별도 Suspense 유지 */}
        <Suspense fallback={<div className={S.searchLoading}>검색창 로딩중..</div>}>
          <Search />
        </Suspense>

        {/* BestZoneCard와 AllZoneCard는 활동 데이터를 표시하는 
            관련 컴포넌트이므로 하나의 Suspense로 묶음 */}
        <Suspense
          fallback={
            <div className={S.contentLoading}>
              <p>활동 정보를 불러오는 중입니다..</p>
            </div>
          }
        >
          <BestZoneCard initialBestActivitiesData={bestActivitiesData} />
          <AllZoneCard initialActivitiesData={activitiesData} />
        </Suspense>
      </div>
    </div>
  );
}
