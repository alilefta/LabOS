/*
  Warnings:

  - A unique constraint covering the columns `[memberId]` on the table `LabStaff` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "LabStaff" ADD COLUMN     "memberId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "LabStaff_memberId_key" ON "LabStaff"("memberId");

-- AddForeignKey
ALTER TABLE "LabStaff" ADD CONSTRAINT "LabStaff_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
