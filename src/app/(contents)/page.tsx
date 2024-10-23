import ResponsiveReservation from '../components/reservation/ResponsiveReservation';

export default function Home() {
  return (
    <div style={{ height: '2000px', position: 'relative' }}>
      <ResponsiveReservation activityId={2970} price={1000} />
    </div>
  );
}
