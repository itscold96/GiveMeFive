'use client';

import { ReactNode } from 'react';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export default function MantineProviders({ children }: { children: ReactNode }) {
  return (
    <MantineProvider>
      {/* 새로 고침 시 백그라운드가 까맣게 변하는 현상 방지 */}
      <ColorSchemeScript defaultColorScheme="light" />
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
}
