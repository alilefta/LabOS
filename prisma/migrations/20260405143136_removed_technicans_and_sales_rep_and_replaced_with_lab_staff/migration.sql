/*
  Warnings:

  - You are about to drop the column `salesRepsId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the column `technicianId` on the `Case` table. All the data in the column will be lost.
  - You are about to drop the `SalesRepresentative` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Technician` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CommissionType" AS ENUM ('PERCENTAGE', 'FIXED');

-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_salesRepsId_fkey";

-- DropForeignKey
ALTER TABLE "Case" DROP CONSTRAINT "Case_technicianId_fkey";

-- DropForeignKey
ALTER TABLE "SalesRepresentative" DROP CONSTRAINT "SalesRepresentative_labId_fkey";

-- DropForeignKey
ALTER TABLE "Technician" DROP CONSTRAINT "Technician_labId_fkey";

-- DropIndex
DROP INDEX "Case_salesRepsId_idx";

-- DropIndex
DROP INDEX "Case_technicianId_idx";

-- AlterTable
ALTER TABLE "Case" DROP COLUMN "salesRepsId",
DROP COLUMN "technicianId";

-- DropTable
DROP TABLE "SalesRepresentative";

-- DropTable
DROP TABLE "Technician";

-- CreateTable
CREATE TABLE "LabStaff" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "jobTitle" TEXT,
    "specialization" TEXT,
    "commissionType" "CommissionType" NOT NULL DEFAULT 'PERCENTAGE',
    "commissionValue" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseStaffAssignment" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "commissionType" "CommissionType" NOT NULL,
    "commissionValue" DECIMAL(10,2) NOT NULL,
    "commissionTotal" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CaseStaffAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LabStaff_labId_idx" ON "LabStaff"("labId");

-- CreateIndex
CREATE INDEX "CaseStaffAssignment_labId_idx" ON "CaseStaffAssignment"("labId");

-- CreateIndex
CREATE INDEX "CaseStaffAssignment_caseId_idx" ON "CaseStaffAssignment"("caseId");

-- CreateIndex
CREATE INDEX "CaseStaffAssignment_staffId_idx" ON "CaseStaffAssignment"("staffId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseStaffAssignment_caseId_staffId_key" ON "CaseStaffAssignment"("caseId", "staffId");

-- AddForeignKey
ALTER TABLE "LabStaff" ADD CONSTRAINT "LabStaff_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStaffAssignment" ADD CONSTRAINT "CaseStaffAssignment_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStaffAssignment" ADD CONSTRAINT "CaseStaffAssignment_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "LabStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CaseStaffAssignment" ADD CONSTRAINT "CaseStaffAssignment_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;
