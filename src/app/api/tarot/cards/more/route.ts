import { prisma as db } from "@/lib/prisma"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  try {
    const id = searchParams.get("id")
    if(!id) {
      return Response.json({ error: "No id provided" }, { status: 400 })
    }
    const card = await db.tarotCard.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        keywords: true,
        card_extra: true,
        interpretations: true,
      }
    })
    return Response.json(card)
  } catch (error) {
    console.error(error)
    return Response.json({ error }, { status: 500 })
  }
}