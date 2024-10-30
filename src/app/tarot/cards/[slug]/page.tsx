import { Suspense } from "react";
import PageWrapper from "@/app/_components/common/PageWrapper";
import { HydrateClient, api } from "@/trpc/server";
import TarotCardDisplay from "@/app/_components/custom/TarotCardDisplay.component";
import { Spinner } from "@nextui-org/react";


type Props = {
  params: {
    slug: string;
  }
}

async function Page({ params: { slug }}: Props) {
 const cards = await api.cards.getCardsBySuit({ suit: slug })
 console.log("🚀 ~ Page ~ cards:", cards)
 
return (
  <HydrateClient>
    <PageWrapper>
      <main className='flex justify-center mt-[120px] h-[100vh]'>
        <Suspense fallback={<Spinner />}>
          {cards !== null && cards.length > 0 && <TarotCardDisplay cards={cards} />}
        </Suspense>
      </main>
    </PageWrapper>
  </HydrateClient>
)
}

export default Page;