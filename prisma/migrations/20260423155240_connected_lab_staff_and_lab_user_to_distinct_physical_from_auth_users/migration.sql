/*
  Warnings:

  - You are about to drop the column `email` on the `LabStaff` table. All the data in the column will be lost.
  - You are about to drop the column `address1` on the `LabUser` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `LabUser` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `LabUser` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `LabUser` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `LabUser` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `LabUser` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryEmail` on the `LabUser` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `LabUser` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[labStaffId]` on the table `LabUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "CaseStaffAssignment_caseId_idx";

-- DropIndex
DROP INDEX "CaseStaffAssignment_staffId_idx";

-- AlterTable
ALTER TABLE "LabStaff" DROP COLUMN "email",
ADD COLUMN     "address1" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "address2" TEXT,
ADD COLUMN     "city" TEXT NOT NULL DEFAULT 'N/A',
ADD COLUMN     "zipcode" TEXT;

-- AlterTable
ALTER TABLE "LabUser" DROP COLUMN "address1",
DROP COLUMN "address2",
DROP COLUMN "avatarUrl",
DROP COLUMN "city",
DROP COLUMN "name",
DROP COLUMN "phoneNumber",
DROP COLUMN "secondaryEmail",
DROP COLUMN "zipcode",
ADD COLUMN     "labStaffId" TEXT,
ALTER COLUMN "role" SET DEFAULT 'STAFF';

-- CreateIndex
CREATE UNIQUE INDEX "LabUser_labStaffId_key" ON "LabUser"("labStaffId");

-- AddForeignKey
ALTER TABLE "CaseActivityLog" ADD CONSTRAINT "CaseActivityLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "LabUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabUser" ADD CONSTRAINT "LabUser_labStaffId_fkey" FOREIGN KEY ("labStaffId") REFERENCES "LabStaff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
