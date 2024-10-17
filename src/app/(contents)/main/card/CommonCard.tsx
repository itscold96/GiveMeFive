import S from './Card.module.scss';

export default function CommonCard({ children }: { children: React.ReactNode }) {
  return <div className={`${S.card} ${S.cardLarge}`}>{children}</div>;
}
