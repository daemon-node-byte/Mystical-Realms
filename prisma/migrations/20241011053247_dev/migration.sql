/*
  Warnings:

  - You are about to drop the column `summary` on the `tarot_card_extras` table. All the data in the column will be lost.
  - The `element` column on the `tarot_card_extras` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `ruleing_planet` to the `tarot_card_extras` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `astrological_sign` on the `tarot_card_extras` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `summary` to the `tarot_cards` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Element" AS ENUM ('FIRE', 'EARTH', 'WATER', 'AIR');

-- CreateEnum
CREATE TYPE "AstrologicalSign" AS ENUM ('ARIES', 'TAURUS', 'GEMINI', 'CANCER', 'LEO', 'VIRGO', 'LIBRA', 'SCORPIO', 'SAGITTARIUS', 'CAPRICORN', 'AQUARIUS', 'PISCES');

-- CreateEnum
CREATE TYPE "RulingPlanet" AS ENUM ('MERCURY', 'VENUS', 'MOON', 'MARS', 'JUPITER', 'SATURN', 'URANUS', 'NEPTUNE', 'PLUTO');

-- AlterTable
ALTER TABLE "tarot_card_extras" DROP COLUMN "summary",
ADD COLUMN     "archtype" TEXT[],
ADD COLUMN     "ruleing_planet" "RulingPlanet" NOT NULL,
DROP COLUMN "element",
ADD COLUMN     "element" "Element",
DROP COLUMN "astrological_sign",
ADD COLUMN     "astrological_sign" "AstrologicalSign" NOT NULL;

-- AlterTable
ALTER TABLE "tarot_cards" ADD COLUMN     "summary" TEXT NOT NULL;
