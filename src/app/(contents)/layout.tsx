import Footer from '@/app/components/@shared/footer/Footer';
import S from './layout.module.scss';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={S.layout}>
      <div className={S.contents}>{children}</div>
      <Footer />
    </div>
  );
}
