import Image from "next/image";
import { Card, CardBody } from "@nextui-org/card";
export default function TCImageDisplay({
  imgUrl,
  title,
}: {
  imgUrl: string;
  title: string;
}) {
  return (
    <Card className='flex justify-center items-center w-full h-full'>
      <CardBody className="flex justify-center items-center w-full h-full">
        <Image
          className="mx-auto"
          src={imgUrl}
          alt={title}
          width={350}
          height={150}
        />
      </CardBody>
    </Card>
  );
};
