/*
  Warnings:

  - You are about to drop the `Archtype` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Zodiac` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `card_keywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `interpretations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tarot_card_extras` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tarot_cards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "card_keywords" DROP CONSTRAINT "card_keywords_card_id_fkey";

-- DropForeignKey
ALTER TABLE "interpretations" DROP CONSTRAINT "interpretations_card_title_fkey";

-- DropForeignKey
ALTER TABLE "tarot_card_extras" DROP CONSTRAINT "tarot_card_extras_card_id_fkey";

-- DropTable
DROP TABLE "Archtype";

-- DropTable
DROP TABLE "Zodiac";

-- DropTable
DROP TABLE "card_keywords";

-- DropTable
DROP TABLE "interpretations";

-- DropTable
DROP TABLE "tarot_card_extras";

-- DropTable
DROP TABLE "tarot_cards";

-- DropEnum
DROP TYPE "ReadingType";

-- CreateTable
CREATE TABLE "Symbolism" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "tarotCardId" TEXT NOT NULL,

    CONSTRAINT "Symbolism_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TarotCard" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "arcana" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "uprightKeywords" TEXT[],
    "reversedKeywords" TEXT[],
    "uprightDescription" TEXT NOT NULL,
    "reversedDescription" TEXT NOT NULL,
    "element" "Element" NOT NULL,
    "astrologicalRulership" TEXT NOT NULL,
    "themes" TEXT[],
    "numerology" INTEGER NOT NULL,
    "coreEmotions" TEXT[],
    "reflectionPrompts" TEXT[],
    "practicalAdvice" TEXT NOT NULL,
    "foolsJourney" TEXT NOT NULL,

    CONSTRAINT "TarotCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TarotCard_cardId_key" ON "TarotCard"("cardId");

-- AddForeignKey
ALTER TABLE "Symbolism" ADD CONSTRAINT "Symbolism_tarotCardId_fkey" FOREIGN KEY ("tarotCardId") REFERENCES "TarotCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
