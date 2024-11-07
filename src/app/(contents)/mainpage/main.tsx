import { Suspense } from 'react';
import S from './main.module.scss';
import BestZoneCard from './bestzonecard/BestZoneCard';
import AllZoneCard from './allzonecard/AllZoneCard';
import Banner from './banner/Banner';
import Search from './search/Search';
import { getActivities } from '@/fetches/activities';
import Loading from '@/app/loading';

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
        <Suspense fallback={<Loading />}>
          <Search />
          <BestZoneCard initialBestActivitiesData={bestActivitiesData} />
          <AllZoneCard initialActivitiesData={activitiesData} />
        </Suspense>
      </div>
    </div>
  );
}
