import { HydrateClient } from "@/trpc/server";
import PageWrapper from "./_components/common/PageWrapper";
import { themeFont1, themeFont2 } from "@/styles/fonts";
import NextImage from "next/image";
import * as logo from '@/app/_components/ui/CustomIcon/svg/tree.svg';
import clsx from "clsx";

export default async function Home() {

  return (
    <HydrateClient>

      <PageWrapper>
        <div className="flex justify-center items-center h-screen">
          <NextImage src={logo} alt="Mystical Realms Logo" width={100} height={100} className="absolute w-full" />
          <div className="z-10 text-center">
            
            <h1 className={clsx(themeFont1.className, 'text-5xl')}>Mystical Realms</h1>
            <h2 className={clsx(themeFont2.className, 'text-xl')}>Explore the Mystical Realm within you.</h2>
          </div>
    
          </div>
        
      </PageWrapper>
    </HydrateClient>
  );
}

