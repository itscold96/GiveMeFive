'use client';
import useDropdown from '@/hooks/useDropdown';
import { useMyActivitiesQuery } from '@/queries/useMyActivitiesQuery';
import Dropdown from '../../@shared/dropdown/Dropdown';
import { useEffect, useState } from 'react';
import {
  getReservationDashboard,
  GetReservationDashboardProps,
  GetReservationDashboardResponse,
} from '@/fetches/getReservationDashboard';
import dayjs from 'dayjs';
import ReservationCalendar from '../../@shared/reservationCalendar/ReservationCalendar';
import { useReservationStore } from '@/stores/useReservationStore';
import ReservationInfoModal from '../ReservationInfoModal/ReservationInfoModal';
import { useToggle } from '@/hooks/useToggle';
import S from './Reservations.module.scss';
import Image from 'next/image';
import emptySvg from '@/images/empty.svg';

export default function Reservations() {
  const [activityId, setActivityId] = useState<number>();
  const { selectedDate } = useReservationStore(state => state.reservation);
  const { setSelectedDate } = useReservationStore(state => state.action);
  const { toggleValue, toggleDispatch } = useToggle();
  const [dataTitles, setDataTitles] = useState<string[]>([]);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const { data: Mydata, error, isLoading } = useMyActivitiesQuery({ size: 50 });
  const {
    data: dropdownData,
    onDropdownChange,
    toggleDropdown,
    isDropdownToggle,
    selectedValue,
    selectedIndex,
  } = useDropdown(dataTitles);

  const fetchReservationData = async ({ activityId, year, month }: GetReservationDashboardProps) => {
    try {
      const reservationDataResponse: GetReservationDashboardResponse = await getReservationDashboard({
        activityId,
        year,
        month,
      });

      console.log('응답 데이터:', reservationDataResponse);
      if (Array.isArray(reservationDataResponse) && reservationDataResponse.length > 0) {
        const datesArray = reservationDataResponse.map(reservationData => reservationData.date);
        // 상태에 설정
        setAvailableDates(datesArray);
        console.log('예약 데이터 배열:', datesArray);
      } else {
        console.warn('예약 데이터가 없습니다', reservationDataResponse);
        setAvailableDates([]);
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };
  const selectDate = dayjs(selectedDate);
  const year = selectDate.get('year');
  const monthString = selectDate.format('MM');
  const month = parseInt(monthString, 10);
  useEffect(() => {
    if (!Mydata?.totalCount) {
      return;
    }
    if (Mydata?.activities) {
      const dataTitle = Mydata.activities.map(item => item.title);
      setDataTitles(dataTitle);
      if (selectedIndex) {
        const selectedActivityId = Mydata.activities[selectedIndex - 1].id;
        setActivityId(selectedActivityId);
        fetchReservationData({ activityId: selectedActivityId, year, month });
      }
      const selectedActivityId = Mydata.activities[0].id;
      setActivityId(selectedActivityId);
      fetchReservationData({ activityId: selectedActivityId, year, month });
    }
  }, [Mydata, selectedIndex, activityId, selectedDate]);

  useEffect(() => {
    console.log(availableDates);
  }, [availableDates]);

  const OnClickDate = () => {
    toggleDispatch({ type: 'on' });
  };

  if (!Mydata?.totalCount) {
    return (
      <div className={S.reservationsContainer}>
        <div className={S.title}>예약현황</div>
        <div className={S.emptyBox}>
          <Image src={emptySvg} alt="등록한 체험이 없습니다 이미지" />
          <div>아직 등록한 체험이 없어요</div>
        </div>
      </div>
    );
  }

  return (
    <div className={S.reservationsContainer}>
      <div className={S.title}>예약현황</div>
      <div className={S.reservationsBox}>
        <Dropdown
          type="category"
          data={dropdownData}
          onChange={onDropdownChange}
          toggleDropdown={toggleDropdown}
          isDropdownToggle={isDropdownToggle}
          selectedValue={selectedValue}
        />
        <ReservationCalendar
          selectedDate={selectedDate} // 선택된 날짜
          onClickDate={date => {
            setSelectedDate(date);
            OnClickDate();
          }} // 날짜 클릭 시 실행될 함수, 자동으로 매개변수로 클릭한 날짜 (date:Date)를 받도록 제작하였습니다.
          availableDates={availableDates} // 선택 가능한 날짜를 (YYYY-MM-DD) 포맷 배열로 넣어주면 됩니다.
          onNextMonth={date => setSelectedDate(date)}
          onPreviousMonth={date => setSelectedDate(date)}
          highlightToday
        />
      </div>
      {toggleValue && activityId && (
        <ReservationInfoModal
          activityId={activityId}
          selectedDate={selectedDate}
          onClose={() => toggleDispatch({ type: 'off' })}
        />
      )}
    </div>
  );
}
