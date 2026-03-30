/*
  Warnings:

  - You are about to drop the column `bulkPriceThreshold` on the `CasePricingPlan` table. All the data in the column will be lost.
  - You are about to drop the column `bulkPriceThreshold` on the `CaseWorkItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CasePricingPlan" DROP COLUMN "bulkPriceThreshold",
ADD COLUMN     "TeethCountToApplyBulkPrice" DECIMAL(65,30),
ADD COLUMN     "toothPrice" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "CaseWorkItem" DROP COLUMN "bulkPriceThreshold",
ADD COLUMN     "TeethCountToApplyBulkPrice" DECIMAL(65,30),
ADD COLUMN     "toothPrice" DECIMAL(65,30);
