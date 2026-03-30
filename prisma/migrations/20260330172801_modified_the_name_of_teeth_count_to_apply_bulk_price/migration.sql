/*
  Warnings:

  - You are about to drop the column `TeethCountToApplyBulkPrice` on the `CaseWorkItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CaseWorkItem" DROP COLUMN "TeethCountToApplyBulkPrice",
ADD COLUMN     "teethCountToApplyBulkPrice" DECIMAL(65,30);
