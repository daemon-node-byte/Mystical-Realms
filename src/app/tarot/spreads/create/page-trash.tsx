import PageWrapper from "@/app/_components/common/PageWrapper";
import { HydrateClient } from "@/trpc/server";
// import SpreadLayoutEditor from "../_components/SpreadLayoutEditor2.component";
import ClientSidePage from "./_components/ClientSidePage";


interface Props {
  readonly params: {
    readonly id: string;
  };
}

export default function Page({ params }: Props) {
  console.log("🚀 ~ Page ~ params:", params)
  return (
    <HydrateClient>
      <PageWrapper>
        <ClientSidePage />
      </PageWrapper>
    </HydrateClient>
  );
}