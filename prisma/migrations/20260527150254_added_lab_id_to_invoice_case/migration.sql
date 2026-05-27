/*
  Warnings:

  - Added the required column `labId` to the `InvoiceCase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvoiceCase" ADD COLUMN     "labId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "InvoiceCase" ADD CONSTRAINT "InvoiceCase_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
