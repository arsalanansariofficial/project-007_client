import { ReactNode } from 'react';

type T_ReactChildren = { children: ReactNode };

export default function RootLayout({ children }: T_ReactChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
