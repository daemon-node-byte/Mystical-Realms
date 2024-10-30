import { api } from "@/trpc/server";
import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ slug: string }>}) => {
 const slug = (await params).slug;
 const cards = await api.cards.getCardsBySuit({ suit: slug })
 const reply = [...cards] as typeof cards;
 const data = { data: reply }
  return Response.json(data)

}