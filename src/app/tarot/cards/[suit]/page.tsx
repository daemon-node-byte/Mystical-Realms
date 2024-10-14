import { Suspense } from 'react';
import {Card, CardBody, CardHeader, CardFooter, Button } from '@nextui-org/react'
import NextLink from 'next/link';
import clsx from 'clsx';
import  { themeFont1, themeFont2 } from '@/styles/fonts';
import PageWrapper from "@/app/_components/common/PageWrapper";
import { HydrateClient, api } from "@/trpc/server";
import CardCatalogBodyTabs from '@/app/_components/common/CardCatalogBodyTabs.component';

interface Props {
  params: {
    suit: string;
  };
	searchParams: {
		rank: number;
	}
}
const getTarotCard = async (suit: string, rank: number) => { 
	return await api.cards.getCardBySuitAndRank({ suit, rank })
}

export default async function Page({ params, searchParams }: Props) {
	const { suit } = params;
	const { rank } = searchParams;

	const tarotCardObject = await getTarotCard(suit, +rank) ?? null;

  if (!tarotCardObject) {
    return <div>Card not found</div>;
  }
  const btnStyle = clsx('p-2', 'm-2', 'w-1/2', 'text-center');
  return (
    <HydrateClient>
      <PageWrapper>
        <main className={clsx('max-w-[1000px] mx-auto')}>

					<Card className={clsx('w-full sm:w-3/4 md:w-1/2 lg:w-1/2', 'mx-auto')}>
							<CardHeader className={clsx('w-full relative')}>
								<h2 className={clsx(themeFont1.className, 'text-3xl')}>{tarotCardObject?.title}</h2>
								<span className={clsx('absolute right-4', themeFont2.className)}>{tarotCardObject?.card_extra?.roman_numeral}</span>
								</CardHeader>
								<CardBody>
									<Suspense fallback={<div>Loading...</div>}>
										<CardCatalogBodyTabs tarotCard={tarotCardObject} keywords={tarotCardObject.keywords} />
									</Suspense>
								</CardBody>
								<CardFooter>
									<div className='flex w-full space-x-2'>
											<Button as={NextLink} variant='ghost' className={btnStyle} href={`/tarot/cards/${suit.toUpperCase()}?rank=${+rank + 1}`} >Previous Card</Button>
											<Button as={NextLink} variant='ghost' className={btnStyle} href={`/tarot.cards/${suit.toUpperCase()}?rank=${+rank + 1}`} >Next Card</Button>
									</div>
								</CardFooter>
					</Card>
				</main>
      </PageWrapper>
    </HydrateClient>
  );
}
