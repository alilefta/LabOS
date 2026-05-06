-- CreateEnum
CREATE TYPE "FaultParty" AS ENUM ('LAB', 'CLINIC');

-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "deliveredAt" TIMESTAMP(3),
ADD COLUMN     "failureFault" "FaultParty",
ADD COLUMN     "failureReason" TEXT,
ADD COLUMN     "isRemake" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originalCaseId" TEXT;

-- AddForeignKey
ALTER TABLE "Case" ADD CONSTRAINT "Case_originalCaseId_fkey" FOREIGN KEY ("originalCaseId") REFERENCES "Case"("id") ON DELETE SET NULL ON UPDATE CASCADE;
