-- CreateEnum
CREATE TYPE "Suit" AS ENUM ('WANDS', 'PENTACLES', 'CUPS', 'SWORDS', 'MAJOR');

-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('ACE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'PAGE', 'KNIGHT', 'QUEEN', 'KING');

-- CreateEnum
CREATE TYPE "RomanNumeral" AS ENUM ('Zero', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI');

-- CreateEnum
CREATE TYPE "ReadingType" AS ENUM ('GENERAL', 'LOVE', 'CAREER', 'FINANCE', 'HEALTH', 'TRAVEL', 'SPIRITUAL');

-- CreateTable
CREATE TABLE "tarot_cards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "suit" "Suit" NOT NULL,
    "rank" "Rank",
    "rank_int" INTEGER NOT NULL,
    "image_file_name" TEXT NOT NULL,

    CONSTRAINT "tarot_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_keywords" (
    "id" SERIAL NOT NULL,
    "card_id" INTEGER NOT NULL,
    "upright" TEXT[],
    "reversed" TEXT[],

    CONSTRAINT "card_keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interpretations" (
    "id" SERIAL NOT NULL,
    "reading_type" "ReadingType" NOT NULL,
    "upright" TEXT NOT NULL,
    "reversed" TEXT NOT NULL,
    "card_title" TEXT NOT NULL,

    CONSTRAINT "interpretations_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "tarot_cards_title_key" ON "tarot_cards"("title");

-- CreateIndex
CREATE INDEX "tarot_cards_suit_rank_int_idx" ON "tarot_cards"("suit", "rank_int");

-- CreateIndex
CREATE UNIQUE INDEX "card_keywords_card_id_key" ON "card_keywords"("card_id");

-- CreateIndex
CREATE INDEX "card_keywords_card_id_idx" ON "card_keywords"("card_id");

-- CreateIndex
CREATE INDEX "interpretations_card_title_idx" ON "interpretations"("card_title");

-- CreateIndex
CREATE UNIQUE INDEX "tarot_card_extras_card_id_key" ON "tarot_card_extras"("card_id");

-- AddForeignKey
ALTER TABLE "card_keywords" ADD CONSTRAINT "card_keywords_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "tarot_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interpretations" ADD CONSTRAINT "interpretations_card_title_fkey" FOREIGN KEY ("card_title") REFERENCES "tarot_cards"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarot_card_extras" ADD CONSTRAINT "tarot_card_extras_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "tarot_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
