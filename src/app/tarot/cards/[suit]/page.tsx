'use client'
import { useState, useEffect } from 'react'
import PageWrapper from "@/app/_components/common/PageWrapper";
import { api } from '@/trpc/server';
import { type TarotCard } from '@/types/TarotCard';
interface Props {
	params: {
		suit: string;
	};
}

export default function Page({ params }: Props) {
	const { suit } = params;
	const [cards, setCards] = useState<TarotCard[] | null>(null);
	useEffect(() => {
		const fetchCards = async () => {
			const results = await api.cards.getCardsBySuit({ text: suit });
			if (!results) {
				throw new Error("No cards found");
			} else {
			  // setCards();
			}
		};
	}, []);
	return (
		<PageWrapper>
			<h1>Page { suit }</h1>
			<p>Page content</p>
		</PageWrapper>
	);
}
