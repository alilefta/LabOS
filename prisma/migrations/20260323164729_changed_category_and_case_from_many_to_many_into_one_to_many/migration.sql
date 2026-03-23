/*
  Warnings:

  - You are about to drop the `_CaseToCaseCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CaseToCaseCategory" DROP CONSTRAINT "_CaseToCaseCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_CaseToCaseCategory" DROP CONSTRAINT "_CaseToCaseCategory_B_fkey";

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "caseCategoryId" TEXT;

-- DropTable
DROP TABLE "_CaseToCaseCategory";

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_caseCategoryId_fkey" FOREIGN KEY ("caseCategoryId") REFERENCES "CaseCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
