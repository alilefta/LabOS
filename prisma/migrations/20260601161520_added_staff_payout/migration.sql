-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING_APPROVAL', 'PROCESSING', 'SETTLED', 'VOIDED');

-- AlterTable
ALTER TABLE "CaseStaffAssignment" ADD COLUMN     "payoutId" TEXT;

-- CreateTable
CREATE TABLE "StaffPayout" (
    "id" TEXT NOT NULL,
    "payoutNumber" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "method" "PaymentMethod" NOT NULL DEFAULT 'CASH',
    "status" "PayoutStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
    "reference" TEXT,
    "notes" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffPayout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StaffPayout_labId_idx" ON "StaffPayout"("labId");

-- CreateIndex
CREATE INDEX "StaffPayout_staffId_idx" ON "StaffPayout"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "StaffPayout_labId_payoutNumber_key" ON "StaffPayout"("labId", "payoutNumber");

-- AddForeignKey
ALTER TABLE "CaseStaffAssignment" ADD CONSTRAINT "CaseStaffAssignment_payoutId_fkey" FOREIGN KEY ("payoutId") REFERENCES "StaffPayout"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffPayout" ADD CONSTRAINT "StaffPayout_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffPayout" ADD CONSTRAINT "StaffPayout_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "LabStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
