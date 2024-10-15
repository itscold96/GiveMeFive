import Footer from '@/app/components/Footer/Footer';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
}
