
import { HydrateClient, api } from "@/trpc/server";
import PageWrapper from '@/app/_components/_common/PageWrapper'
interface Props {
	params: {
		id: string;
	};
}

export default async function Page({ params }: Props) {
	const data = await api.cards.getCardsBySuit({ text: 'wands' })
	console.log("🚀 ~ Page ~ data:", JSON.stringify(data))
	const { id } = params;

	return (
<HydrateClient>
<PageWrapper>

			<h1>Page { id }</h1>
			<p>Page content</p>
</PageWrapper>
</HydrateClient>

	);
}
