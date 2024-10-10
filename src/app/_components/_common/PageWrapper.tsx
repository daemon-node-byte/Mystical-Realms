import {type ReactNode, Suspense } from 'react'
import NavigationBar from './NavigationBar'
import clsx from 'clsx'
import { getServerAuthSession } from "@/server/auth";
import { LoadingDotsCSS } from '@/app/_components/_ui/LoadingDots.component'

export default async function PageWrapper({ children }: { readonly children: ReactNode }) {
  const session = await getServerAuthSession();
  return (
    <main className={clsx('min-h-screen')}>
      <Suspense fallback={<LoadingDotsCSS />}>
          <NavigationBar session={session} />
      </Suspense>
      {children}
    </main>
  );
}