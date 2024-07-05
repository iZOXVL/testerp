import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/../../css/satoshi.css";
import "@/../../css/style.css";
import React, { useEffect, useState } from "react";
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/../../auth'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  // const pathname = usePathname();
  console.log(session);

  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-ocho dark:text-uno bg-nueve">
          { children}
        </div>
      </body>
    </html>
    </SessionProvider>
  );
}
