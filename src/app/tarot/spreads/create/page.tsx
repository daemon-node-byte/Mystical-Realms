import PageWrapper from "@/app/_components/common/PageWrapper";
import { HydrateClient } from "@/trpc/server";
import DraggableArea from "@/app/_components/common/Draggable";
import SpreadPlacementArea from "@/app/_components/common/Draggable/SpreadPlacementArea";
interface Props {
  params: {
    id: string;
  };
}

export default function Page({ params }: Props) {
  const { id } = params;

  return (
    <HydrateClient>
      <PageWrapper>
        <SpreadPlacementArea />
        {/* <DraggableArea /> */}
      </PageWrapper>
    </HydrateClient>
  );
}
