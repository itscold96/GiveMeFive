import dayjs from 'dayjs';
import { Tabs } from '@mantine/core';
import { ReservationCount } from '../ReservationInfoModal/ReservationInfoModal';
import { getReservedSelectSchedule, Reservation } from '@/fetches/getReservationDashboard';
import { useEffect, useState } from 'react';
import ReservationCard from '../ReservationCard/ReservationCard';
import S from './ReservationInfoTabs.module.scss';
import Dropdown from '../../@shared/dropdown/Dropdown';
import useDropdown from '@/hooks/useDropdown';

interface ReservationInfoTabsProps {
  reservationCount?: ReservationCount;
  activityId: number;
  selectedDate: Date;
  setIsToggleTrigger: (value: boolean) => void;
  isToggleTrigger: boolean;
  scheduleData?: string[];
  scheduleKey?: number[];
  setSelectedIndex: (index: number) => void;
}

export default function ReservationInfoTabs({
  reservationCount,
  activityId,
  selectedDate,
  setIsToggleTrigger,
  isToggleTrigger,
  scheduleData,
  scheduleKey,
  setSelectedIndex,
}: ReservationInfoTabsProps) {
  const [selectStatus, setSelectStatus] = useState<'pending' | 'declined' | 'confirmed'>('pending');
  const [data, setData] = useState<Reservation[]>();
  const [dropdownScheduleData, setDropdownScheduleData] = useState<string[]>([]);
  const [dropdownScheduleKey, setDropdownScheduleKey] = useState<number[]>([]);
  const {
    data: dropdownItems,
    onDropdownChange,
    toggleDropdown,
    isDropdownToggle,
    selectedValue,
    selectedKey,
    selectedIndex,
  } = useDropdown(dropdownScheduleData, dropdownScheduleKey);

  const formattedDate = dayjs(new Date(selectedDate)).format('YYYY년MM월DD일');
  const onTabChange = (value: string | null) => {
    if (value === 'pending' || value === 'declined' || value === 'confirmed') {
      setSelectStatus(value as 'pending' | 'declined' | 'confirmed');
    }
  };

  const getSelectStatusInfo = async (selectStatus: 'pending' | 'declined' | 'confirmed') => {
    const response = await getReservedSelectSchedule({ activityId, selectScheduleId: selectedKey, selectStatus });
    setData(response.reservations);
  };

  useEffect(() => {
    getSelectStatusInfo(selectStatus);
  }, [selectStatus, selectedKey, isToggleTrigger, selectedDate]);

  useEffect(() => {
    if (scheduleData && scheduleKey) {
      setDropdownScheduleData(scheduleData);
      setDropdownScheduleKey(scheduleKey);
    }
  }, [scheduleData, scheduleKey]);

  useEffect(() => {
    setSelectedIndex(selectedIndex);
  }, [selectedIndex]);

  return (
    <div>
      {/* <BackDrop onClose={onClose} /> */}
      <Tabs color="#112211" defaultValue="pending" onChange={onTabChange}>
        <Tabs.List className={S.topText}>
          <Tabs.Tab value="pending">신청 {reservationCount?.pending}</Tabs.Tab>
          <Tabs.Tab value="confirmed">승인 {reservationCount?.confirmed}</Tabs.Tab>
          <Tabs.Tab value="declined">거절 {reservationCount?.declined}</Tabs.Tab>
        </Tabs.List>
        <div className={S.infoTitle}>예약 날짜</div>
        <div className={S.infoDate}>{formattedDate}</div>
        <div className={S.dropdown}>
          <Dropdown
            type="category"
            data={dropdownItems}
            onChange={onDropdownChange}
            isDropdownToggle={isDropdownToggle}
            toggleDropdown={toggleDropdown}
            selectedValue={selectedValue}
            placeholder="스케쥴을 선택해 주세요"
          />
        </div>
        <div className={S.infoTitle}>예약 내역</div>
        <Tabs.Panel value="pending">
          <div className={S.CardWrapper}>
            {data && data.length > 0 ? (
              data.map(reservation => (
                <ReservationCard
                  key={reservation.id}
                  reservation={reservation}
                  setIsToggleTrigger={setIsToggleTrigger}
                  isToggleTrigger={isToggleTrigger}
                />
              ))
            ) : (
              <div className={S.noInfoText}>예약 내역이 없습니다.</div>
            )}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="confirmed">
          <div className={S.CardWrapper}>
            {data && data.length > 0 ? (
              data.map(reservation => <ReservationCard key={reservation.id} reservation={reservation} />)
            ) : (
              <div>승인 내역이 없습니다.</div>
            )}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value="declined">
          {' '}
          <div className={S.CardWrapper}>
            {data && data.length > 0 ? (
              data.map(reservation => <ReservationCard key={reservation.id} reservation={reservation} />)
            ) : (
              <div>거절 내역이 없습니다.</div>
            )}
          </div>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
