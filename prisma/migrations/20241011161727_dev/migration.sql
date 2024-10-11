/*
  Warnings:

  - You are about to drop the column `extra_id` on the `Archtype` table. All the data in the column will be lost.
  - You are about to drop the column `astro_id` on the `tarot_card_extras` table. All the data in the column will be lost.
  - Added the required column `card_title` to the `Archtype` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Archtype" DROP CONSTRAINT "Archtype_extra_id_fkey";

-- DropForeignKey
ALTER TABLE "tarot_card_extras" DROP CONSTRAINT "tarot_card_extras_astro_id_fkey";

-- DropIndex
DROP INDEX "Archtype_extra_id_key";

-- DropIndex
DROP INDEX "tarot_card_extras_astro_id_key";

-- AlterTable
ALTER TABLE "Archtype" DROP COLUMN "extra_id",
ADD COLUMN     "card_title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Zodiac" ADD COLUMN     "cards" TEXT[];

-- AlterTable
ALTER TABLE "tarot_card_extras" DROP COLUMN "astro_id",
ADD COLUMN     "planet" TEXT,
ADD COLUMN     "zodiac_sign" TEXT;
