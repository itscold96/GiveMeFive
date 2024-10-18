import S from './CommonCard.module.scss';

export default function CommonCard({ children }: { children: React.ReactNode }) {
  return <div className={S.card}>{children}</div>;
}
