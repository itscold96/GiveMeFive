'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AddActivitiesForm from '../../components/addActivities/addActivitiesForm/AddActivitiesForm';
import { getActivitiesDetail, GetActivitiesDetailResponse } from '@/fetches/getActivitiesDetail';

export default function EditActivities() {
  const [defaultData, setDefaultData] = useState<GetActivitiesDetailResponse>();
  const { id } = useParams();
  const activityId = Number(id);

  const fetchData = async () => {
    try {
      const data = await getActivitiesDetail({ activityId });
      setDefaultData(data);
    } catch (error) {
      console.error('Error fetching activity details:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <AddActivitiesForm defaultData={defaultData} />
    </div>
  );
}
