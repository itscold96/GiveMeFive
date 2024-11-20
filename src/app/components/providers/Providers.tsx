import { ReactNode } from 'react';
import QueryProvider from './QueryProvider';
import MantineProviders from './MantineProviders';
import ToastProvider from './ToastProvider';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ToastProvider>
        <MantineProviders>{children}</MantineProviders>
      </ToastProvider>
    </QueryProvider>
  );
}
