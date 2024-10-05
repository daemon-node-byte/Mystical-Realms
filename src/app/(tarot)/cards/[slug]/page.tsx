"use client";
import React, { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import useSwr from "swr";
import NavigationBar from "@/components/custom/NavigationBar";
import TarotCardComponent from "@/components/common/TarotCardComponent";
import { TarotCard } from '@prisma/client'
type PageProps = {
	params: {
		slug: string;
	}
};

export default function Page({ params }: Readonly<PageProps>) {
	const [tarotCards, setTarotCards] = useState<TarotCard[] | null>(null);
	const { data, error, isLoading } = useSwr(`/api/tarot/cards?suit=${params.slug}`, fetcher);
	console.log(data, error, isLoading);
	useEffect(() => {
		if (error) {
			throw new Error("Error fetching tarot cards:", error);
		}
		if (!isLoading && data) {
			setTarotCards(data);
		}
	}, [data, error, isLoading]);
  return (
    <React.Fragment>
      <NavigationBar />
			<section className="flex flex-wrap">
				{tarotCards?.sort((a,b) => a.rank_int - b.rank_int).map((card, index) => (
					<TarotCardComponent key={`${card.title}-${index}`} card={card} />
				))}
				</section>
    </React.Fragment>
  );
}
