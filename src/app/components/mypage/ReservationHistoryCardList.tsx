import React, { useEffect, useState } from 'react';
import ReservationHistoryCard from './ReservationHistoryCard';
import Dropdown from '../../components/@shared/dropdown/Dropdown';
import S from './ReservationHistoryCardList.module.scss';

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
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  totalCount: number;
  reservations: Reservation[];
  cursorId: number | null;
}

function ReservationHistoryCardList() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    try {
      // 임시 가짜 데이터
      const data: ApiResponse = {
        totalCount: 2,
        reservations: [
          {
            activity: {
              id: 2956,
              title: '테스트테스트',
              bannerImageUrl:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/8-3_1146_1729490563029.jpeg',
            },
            scheduleId: 11417,
            id: 4906,
            teamId: '8-3',
            userId: 1150,
            status: 'completed',
            reviewSubmitted: false,
            totalPrice: 200000,
            headCount: 1,
            date: '2024-10-31',
            startTime: '05:02',
            endTime: '22:02',
            createdAt: '2024-10-22T18:33:59.956Z',
            updatedAt: '2024-10-22T18:33:59.956Z',
          },
          {
            activity: {
              id: 2962,
              title: '예약 가능 날짜 받아오기 테스트용',
              bannerImageUrl:
                'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
            },
            scheduleId: 11433,
            id: 4905,
            teamId: '8-3',
            userId: 1150,
            status: 'pending',
            reviewSubmitted: false,
            totalPrice: 10000,
            headCount: 1,
            date: '2024-11-24',
            startTime: '14:00',
            endTime: '15:00',
            createdAt: '2024-10-22T18:27:01.125Z',
            updatedAt: '2024-10-22T18:27:01.125Z',
          },
        ],
        cursorId: null,
      };

      setReservations(data.reservations);
    } catch (error) {
      console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
  }

  const statusMapping: { [key: string]: string } = {
    전체: 'all',
    '예약 신청': 'pending',
    '예약 승인': 'approved',
    '체험 완료': 'completed',
    '예약 거절': 'rejected',
    '예약 취소': 'canceled',
  };

  function toggleDropdown() {
    setIsDropdownOpen(function (prevState) {
      return !prevState;
    });
  }

  const filteredReservations =
    selectedStatus === '전체'
      ? reservations
      : reservations.filter(function (reservation) {
          return reservation.status === statusMapping[selectedStatus];
        });

  return (
    <div className={S.container}>
      <div className={S.header}>
        <div className={S.title}>예약 내역</div>
        <Dropdown
          data={Object.keys(statusMapping)}
          onChange={function (value) {
            setSelectedStatus(value);
          }}
          toggleDropdown={toggleDropdown}
          isDropdownToggle={isDropdownOpen}
          type="category"
          selectedValue={selectedStatus}
        />
      </div>
      <div className={S.list}>
        {filteredReservations.map(function (reservation) {
          return <ReservationHistoryCard key={reservation.id} reservation={reservation} />;
        })}
      </div>
    </div>
  );
}

export default ReservationHistoryCardList;
