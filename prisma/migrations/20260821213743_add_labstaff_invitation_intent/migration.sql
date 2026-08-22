/*
  Warnings:

  - A unique constraint covering the columns `[id,labId]` on the table `LabStaff` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "LabStaffInvitationIntent" (
    "id" TEXT NOT NULL,
    "invitationId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "labStaffId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabStaffInvitationIntent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LabStaffInvitationIntent_invitationId_key" ON "LabStaffInvitationIntent"("invitationId");

-- CreateIndex
CREATE INDEX "LabStaffInvitationIntent_labId_idx" ON "LabStaffInvitationIntent"("labId");

-- CreateIndex
CREATE UNIQUE INDEX "LabStaffInvitationIntent_labStaffId_labId_key" ON "LabStaffInvitationIntent"("labStaffId", "labId");

-- CreateIndex
CREATE UNIQUE INDEX "LabStaff_id_labId_key" ON "LabStaff"("id", "labId");

-- AddForeignKey
ALTER TABLE "LabStaffInvitationIntent" ADD CONSTRAINT "LabStaffInvitationIntent_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabStaffInvitationIntent" ADD CONSTRAINT "LabStaffInvitationIntent_labStaffId_labId_fkey" FOREIGN KEY ("labStaffId", "labId") REFERENCES "LabStaff"("id", "labId") ON DELETE CASCADE ON UPDATE CASCADE;
