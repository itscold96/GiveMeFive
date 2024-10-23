import S from './activity.module.scss';
import ActivityInfo from './activityinfo/ActivityInfo';
import ActivityReviews from './activityreviews/ActivityReviews';

export default function ActivityPage({ params }: { params: { id: string } }) {
  return (
    <div className={S.activityPage}>
      <ActivityInfo params={{ id: params.id }} />
      <ActivityReviews />
    </div>
  );
}
