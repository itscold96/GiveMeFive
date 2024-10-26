import { ReactNode } from 'react';
import QueryProvider from './QueryProvider';
import MantineProviders from './MantineProviders';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <MantineProviders>{children}</MantineProviders>
    </QueryProvider>
  );
}
