/*
  Warnings:

  - You are about to drop the column `reversed_keywords` on the `tarot_cards` table. All the data in the column will be lost.
  - You are about to drop the column `upright_keywords` on the `tarot_cards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tarot_cards" DROP COLUMN "reversed_keywords",
DROP COLUMN "upright_keywords";

-- CreateTable
CREATE TABLE "tarot_card_extras" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "roman_numeral" "RomanNumeral" NOT NULL,
    "summary" TEXT NOT NULL,
    "visual_desc" TEXT NOT NULL,
    "fools_journey" TEXT NOT NULL,
    "element" TEXT NOT NULL,
    "astrological_sign" TEXT NOT NULL,
    "symbolism" JSONB[],

    CONSTRAINT "tarot_card_extras_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tarot_card_extras_card_id_key" ON "tarot_card_extras"("card_id");

-- AddForeignKey
ALTER TABLE "tarot_card_extras" ADD CONSTRAINT "tarot_card_extras_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "tarot_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
