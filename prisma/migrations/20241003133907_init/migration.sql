-- CreateEnum
CREATE TYPE "Suit" AS ENUM ('WANDS', 'PENTACLES', 'CUPS', 'SWORDS', 'MAJOR');

-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('ACE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'PAGE', 'KNIGHT', 'QUEEN', 'KING');

-- CreateEnum
CREATE TYPE "RomanNumeral" AS ENUM ('Zero', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI');

-- CreateEnum
CREATE TYPE "ReadingType" AS ENUM ('GENERAL', 'LOVE', 'CAREER', 'FINANCE', 'HEALTH', 'TRAVEL', 'SPIRITUAL');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarot_cards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "suit" "Suit" NOT NULL,
    "rank" "Rank" NOT NULL,
    "rank_int" INTEGER NOT NULL,
    "upright_keywords" TEXT[],
    "reversed_keywords" TEXT[],
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
CREATE TABLE "tarot_spreads" (
    "id" SERIAL NOT NULL,
    "number_of_cards" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "tarot_spreads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarot_readings" (
    "id" SERIAL NOT NULL,
    "reading_type" "ReadingType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "card_positions" JSONB[],
    "spead_id" TEXT NOT NULL,

    CONSTRAINT "tarot_readings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

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
CREATE UNIQUE INDEX "tarot_spreads_name_key" ON "tarot_spreads"("name");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_keywords" ADD CONSTRAINT "card_keywords_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "tarot_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interpretations" ADD CONSTRAINT "interpretations_card_title_fkey" FOREIGN KEY ("card_title") REFERENCES "tarot_cards"("title") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarot_readings" ADD CONSTRAINT "tarot_readings_spead_id_fkey" FOREIGN KEY ("spead_id") REFERENCES "tarot_spreads"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
