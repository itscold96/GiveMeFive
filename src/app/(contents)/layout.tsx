import Footer from '@/app/components/@shared/footer/Footer';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
