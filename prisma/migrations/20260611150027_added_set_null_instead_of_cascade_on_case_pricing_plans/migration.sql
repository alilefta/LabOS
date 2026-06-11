-- DropForeignKey
ALTER TABLE "CaseWorkItem" DROP CONSTRAINT "CaseWorkItem_casePricingPlanId_fkey";

-- AlterTable
ALTER TABLE "CaseWorkItem" ALTER COLUMN "casePricingPlanId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CaseWorkItem" ADD CONSTRAINT "CaseWorkItem_casePricingPlanId_fkey" FOREIGN KEY ("casePricingPlanId") REFERENCES "CasePricingPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
