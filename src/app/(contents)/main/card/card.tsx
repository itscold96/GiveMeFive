import S from './card.module.scss';

export default function Card() {
  return (
    <div className={S.cardContainer}>
      <div className={`${S.card} ${S.cardLarge}`}>card</div>
      <div className={`${S.card} ${S.cardLarge}`}>card</div>
      <div className={`${S.card} ${S.cardLarge}`}>card</div>
    </div>
  );
}
