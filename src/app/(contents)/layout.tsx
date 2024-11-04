import Footer from '@/app/components/@shared/footer/Footer';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 70px)' }}>
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
    </div>
  );
}
