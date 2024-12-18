import PageWrapper from "@/app/_components/common/PageWrapper";
import { HydrateClient } from "@/trpc/server";
import SpreadLayoutEditor from "../_components/SpreadLayoutEditor";
interface Props {
  readonly params: {
    readonly id: string;
  };
}

export default function Page({ params }: Props) {
  console.log('params: ', params)
  return (
    <HydrateClient>
      <PageWrapper>
        <SpreadLayoutEditor />
      </PageWrapper>
    </HydrateClient>
  );
}
