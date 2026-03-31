/*
  Warnings:

  - You are about to drop the column `TeethCountToApplyBulkPrice` on the `CasePricingPlan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CasePricingPlan" DROP COLUMN "TeethCountToApplyBulkPrice",
ADD COLUMN     "teethCountToApplyBulkPrice" DECIMAL(65,30);
