import { Suit } from '@prisma/client'
import { prisma as db } from "@/lib/prisma"

export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  try {
    if (searchParams.get("suit") !== null) {
      const suit = searchParams.get("suit")
      const cards = await db.tarotCard.findMany({
        where: {
          suit: suit?.toUpperCase() as Suit,
        },
      })
      return Response.json(cards)
    }
    const cards = await db.tarotCard.findMany()
    return Response.json(cards)
    
  } catch (error) {
    console.error(error)
    return Response.json({ error }, { status: 500 })
  }
}