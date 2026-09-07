-- CreateEnum
CREATE TYPE "FileUploadGrantStatus" AS ENUM ('PENDING', 'UPLOADED', 'CONSUMED', 'EXPIRED', 'FAILED', 'CLEANED');

-- CreateTable
CREATE TABLE "FileUploadGrant" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "createdByMemberId" TEXT,
    "boundaryId" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "targetType" TEXT,
    "targetId" TEXT,
    "status" "FileUploadGrantStatus" NOT NULL DEFAULT 'PENDING',
    "providerFileKey" TEXT,
    "providerFileUrl" TEXT,
    "correlationId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "uploadedAt" TIMESTAMP(3),
    "consumedAt" TIMESTAMP(3),
    "expiredAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "failureCode" TEXT,
    "providerDeletedAt" TIMESTAMP(3),
    "cleanupAttemptCount" INTEGER NOT NULL DEFAULT 0,
    "lastCleanupAttemptAt" TIMESTAMP(3),
    "cleanupFailureCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FileUploadGrant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FileUploadGrant_providerFileKey_key" ON "FileUploadGrant"("providerFileKey");

-- CreateIndex
CREATE INDEX "FileUploadGrant_organizationId_labId_createdByMemberId_status_idx" ON "FileUploadGrant"("organizationId", "labId", "createdByMemberId", "status");

-- CreateIndex
CREATE INDEX "FileUploadGrant_status_expiresAt_idx" ON "FileUploadGrant"("status", "expiresAt");

-- CreateIndex
CREATE INDEX "FileUploadGrant_boundaryId_status_idx" ON "FileUploadGrant"("boundaryId", "status");

-- CreateIndex
CREATE INDEX "FileUploadGrant_targetType_targetId_status_idx" ON "FileUploadGrant"("targetType", "targetId", "status");

-- AddForeignKey
ALTER TABLE "FileUploadGrant" ADD CONSTRAINT "FileUploadGrant_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUploadGrant" ADD CONSTRAINT "FileUploadGrant_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileUploadGrant" ADD CONSTRAINT "FileUploadGrant_createdByMemberId_fkey" FOREIGN KEY ("createdByMemberId") REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE CASCADE;
