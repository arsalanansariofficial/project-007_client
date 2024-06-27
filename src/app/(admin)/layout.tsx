import { ReactNode } from 'react';
import Header from '@/components/header-admin';

export type App_Children = { children: ReactNode };

export default function AdminRootLayout({ children }: App_Children) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
