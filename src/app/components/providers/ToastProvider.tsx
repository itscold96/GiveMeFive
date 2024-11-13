'use client';

import { ReactNode } from 'react';

import Portal from '../@shared/portal/Portal';
import ToastList from '../toast/ToastList';

export default function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <Portal elementId="toast">
        <ToastList />
      </Portal>
      {children}
    </>
  );
}
