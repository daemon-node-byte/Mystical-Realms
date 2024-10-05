// import React, { Suspense } from "react";
import { Suspense } from "react";
import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { type TarotCard } from "@prisma/client";
import { whisper } from "@/global/fonts";
import clsx from "clsx";

export default function TarotCardComponent({ card }: { card: TarotCard }) {
  const imageUrl = `/assets/images/tarot/art/${card.suit.toLowerCase()}/${card.image_file_name}`
  return (
    <Card className="w-1/2">
      <CardHeader className={clsx(whisper.className, 'text-[1.75rem] w-full justify-center')}>{card.title}</CardHeader>
      <CardBody className="">
        <Suspense fallback={<Spinner color="default" />}>
        <Image 
        className="mx-auto"
        src={imageUrl} alt={card.title} width={300} height={200} />
        </Suspense>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};
