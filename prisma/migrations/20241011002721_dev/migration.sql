/*
  Warnings:

  - The values [Zero] on the enum `RomanNumeral` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `image_file_name` on the `tarot_cards` table. All the data in the column will be lost.
  - Added the required column `image_file` to the `tarot_cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RomanNumeral_new" AS ENUM ('ZERO', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI');
ALTER TABLE "tarot_card_extras" ALTER COLUMN "roman_numeral" TYPE "RomanNumeral_new" USING ("roman_numeral"::text::"RomanNumeral_new");
ALTER TYPE "RomanNumeral" RENAME TO "RomanNumeral_old";
ALTER TYPE "RomanNumeral_new" RENAME TO "RomanNumeral";
DROP TYPE "RomanNumeral_old";
COMMIT;

-- AlterTable
ALTER TABLE "tarot_cards" DROP COLUMN "image_file_name",
ADD COLUMN     "image_file" TEXT NOT NULL;
