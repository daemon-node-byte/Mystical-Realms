'use client'
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { cardImgPath } from "@/lib/utils/cardImgPath";

type Props = {
  deck: string;
  fileName: string;
  alt: string;
  height: number;
  width: number;
}

export default function TarotCardImg({ deck, fileName, alt, height, width }: Props) {
  return <Image as={NextImage} src={cardImgPath(deck, fileName)} alt={alt} height={height} width={width} />;
}