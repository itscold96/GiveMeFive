import S from './card.module.scss';
import Image from 'next/image';
import { Activities } from '@/api/activities';

export default function Card({ activities }: { activities: Activities }) {
  return (
    <div className={S.cardContainer}>
      <div className={`${S.card} ${S.cardLarge}`}>
        {/* <Image src={activities.activities[0].bannerImageUrl} alt="card" /> */}
      </div>
      <div className={`${S.card} ${S.cardLarge}`}>card</div>
      <div className={`${S.card} ${S.cardLarge}`}>card</div>
    </div>
  );
}
