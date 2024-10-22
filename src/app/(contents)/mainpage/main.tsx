'use client';

import S from './main.module.scss';
import BestZoneCard from './bestzonecard/BestZoneCard';
import AllZoneCard from './allzonecard/AllZoneCard';
import Banner from './banner/Banner';
import { useActivitiesQuery } from '@/queries/useActivityQuery';
import Search from './search/Search';
import { useState } from 'react';

export default function Main() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: activitiesData, isLoading } = useActivitiesQuery({
    size: 8,
    method: 'offset',
    page: 1,
  });

  if (isLoading) return <div>로딩 중...</div>;

  const firstBestActivity = activitiesData?.activities[0] || null;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <Banner bestActivity={firstBestActivity} />
      <div className={S.mainContainer}>
        <Search onSearch={handleSearch} />
        {!searchTerm && <BestZoneCard />}
        <AllZoneCard searchTerm={searchTerm} />
      </div>
    </div>
  );
}
