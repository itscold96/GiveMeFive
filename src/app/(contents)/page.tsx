import Reservation from '../components/reservation/Reservation';

export default function Home() {
  return (
    <div>
      {/* TODO: 컴포넌트 테스트용이므로 PR 올리기 전에 삭제해야 함 */}
      <Reservation activityId={2962} price={1000} />
    </div>
  );
}
