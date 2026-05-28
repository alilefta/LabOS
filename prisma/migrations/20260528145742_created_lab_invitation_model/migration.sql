-- CreateTable
CREATE TABLE "LabInvitation" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "labStaffId" TEXT,
    "roleToGrant" "LabRole" NOT NULL DEFAULT 'STAFF',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LabInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LabInvitation_token_key" ON "LabInvitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "LabInvitation_labStaffId_key" ON "LabInvitation"("labStaffId");

-- CreateIndex
CREATE INDEX "LabInvitation_labId_idx" ON "LabInvitation"("labId");

-- CreateIndex
CREATE INDEX "LabInvitation_email_idx" ON "LabInvitation"("email");

-- AddForeignKey
ALTER TABLE "LabInvitation" ADD CONSTRAINT "LabInvitation_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabInvitation" ADD CONSTRAINT "LabInvitation_labStaffId_fkey" FOREIGN KEY ("labStaffId") REFERENCES "LabStaff"("id") ON DELETE CASCADE ON UPDATE CASCADE;
