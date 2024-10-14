import PageWrapper from "@/app/_components/common/PageWrapper";
import { HydrateClient } from "@/trpc/server";
import SpreadLayoutEditor from "../_components/SpreadLayoutEditor";
// import DraggableArea from "@/app/_components/common/Draggable";
// import SpreadPlacementArea from "@/app/_components/common/Draggable/SpreadPlacementArea";
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
        <SpreadLayoutEditor />
        {/* <SpreadPlacementArea /> */}
        {/* <DraggableArea /> */}
      </PageWrapper>
    </HydrateClient>
  );
}
