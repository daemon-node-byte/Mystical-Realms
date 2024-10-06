"use client"
import React, { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import useSwr from "swr";
import NavigationBar from "@/components/custom/NavigationBar";
import CardCatalog from "@/components/common/CardCatalog";

import type { TarotCard  } from '@prisma/client'
type PageProps = {
	params: {
		slug: string;
	}
};



export default function Page({ params }: Readonly<PageProps>) {
	const [tarotCards, setTarotCards] = useState<TarotCard[]>([]);
	const { data, error, isLoading } = useSwr(`/api/tarot/cards?suit=${params.slug}`, fetcher);
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
			{tarotCards.length > 0 && <CardCatalog cards={tarotCards} />}
    </React.Fragment>
  );
}
