/*
  Warnings:

  - You are about to drop the column `archtype` on the `tarot_card_extras` table. All the data in the column will be lost.
  - You are about to drop the column `astrological_sign` on the `tarot_card_extras` table. All the data in the column will be lost.
  - You are about to drop the column `element` on the `tarot_card_extras` table. All the data in the column will be lost.
  - You are about to drop the column `ruleing_planet` on the `tarot_card_extras` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[astro_id]` on the table `tarot_card_extras` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RuleingPlanet" AS ENUM ('MERCURY', 'VENUS', 'MOON', 'MARS', 'JUPITER', 'SATURN', 'URANUS', 'NEPTUNE', 'PLUTO');

-- AlterTable
ALTER TABLE "tarot_card_extras" DROP COLUMN "archtype",
DROP COLUMN "astrological_sign",
DROP COLUMN "element",
DROP COLUMN "ruleing_planet",
ADD COLUMN     "astro_id" INTEGER;

-- DropEnum
DROP TYPE "RulingPlanet";

-- CreateTable
CREATE TABLE "Zodiac" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "ruleing_planet" "RuleingPlanet" NOT NULL,
    "date_range" TEXT NOT NULL,

    CONSTRAINT "Zodiac_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Archtype" (
    "id" SERIAL NOT NULL,
    "extra_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "element" "Element" NOT NULL,

    CONSTRAINT "Archtype_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Zodiac_name_key" ON "Zodiac"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Archtype_extra_id_key" ON "Archtype"("extra_id");

-- CreateIndex
CREATE UNIQUE INDEX "tarot_card_extras_astro_id_key" ON "tarot_card_extras"("astro_id");

-- AddForeignKey
ALTER TABLE "tarot_card_extras" ADD CONSTRAINT "tarot_card_extras_astro_id_fkey" FOREIGN KEY ("astro_id") REFERENCES "Zodiac"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Archtype" ADD CONSTRAINT "Archtype_extra_id_fkey" FOREIGN KEY ("extra_id") REFERENCES "tarot_card_extras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
