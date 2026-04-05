/*
  Warnings:

  - You are about to drop the column `role` on the `CaseStaffAssignment` table. All the data in the column will be lost.
  - Added the required column `roleCategory` to the `CaseStaffAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleCategory` to the `LabStaff` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StaffRoleCategory" AS ENUM ('TECHNICIAN', 'SENIOR_TECHNICIAN', 'QC_INSPECTOR', 'COURIER', 'SALES_REP', 'ACCOUNT_MANAGER', 'RECEPTIONIST', 'MANAGER', 'ACCOUNTANT');

-- AlterTable
ALTER TABLE "CaseStaffAssignment" DROP COLUMN "role",
ADD COLUMN     "roleCategory" "StaffRoleCategory" NOT NULL;

-- AlterTable
ALTER TABLE "LabStaff" ADD COLUMN     "roleCategory" "StaffRoleCategory" NOT NULL;

-- CreateIndex
CREATE INDEX "LabStaff_labId_roleCategory_idx" ON "LabStaff"("labId", "roleCategory");

-- CreateIndex
CREATE INDEX "LabStaff_labId_isActive_idx" ON "LabStaff"("labId", "isActive");
