-- CreateEnum
CREATE TYPE "StoredFileProvider" AS ENUM ('UPLOADTHING');

-- CreateEnum
CREATE TYPE "StoredFilePurpose" AS ENUM ('CASE_CLINICAL_ASSET');

-- CreateEnum
CREATE TYPE "CaseAssetStorageMode" AS ENUM ('LEGACY_URL_UNVERIFIED', 'MANAGED_PRIVATE');

-- CreateEnum
CREATE TYPE "CaseFileAuthorizationOutcome" AS ENUM ('ALLOWED', 'DENIED');

-- CreateEnum
CREATE TYPE "CaseFileIssuanceOutcome" AS ENUM ('NOT_ATTEMPTED', 'ISSUED', 'FAILED');

-- CreateEnum
CREATE TYPE "CaseFileAccessReason" AS ENUM ('AUTHORIZED', 'ACCESS_DENIED', 'RESOURCE_UNAVAILABLE', 'PROVIDER_FAILURE');

-- DropForeignKey
ALTER TABLE "CaseAssetFile" DROP CONSTRAINT "CaseAssetFile_dentalCaseId_fkey";

-- DropForeignKey
ALTER TABLE "CaseAssetFile" DROP CONSTRAINT "CaseAssetFile_labId_fkey";

-- DropIndex
DROP INDEX "CaseAssetFile_dentalCaseId_idx";

-- DropIndex
DROP INDEX "CaseAssetFile_labId_idx";

-- AlterTable
ALTER TABLE "CaseAssetFile" ADD COLUMN     "currentVersionId" TEXT,
ADD COLUMN     "storageMode" "CaseAssetStorageMode" NOT NULL DEFAULT 'LEGACY_URL_UNVERIFIED',
ALTER COLUMN "documentUrl" DROP NOT NULL,
ALTER COLUMN "fileExtension" DROP NOT NULL;

-- CreateTable
CREATE TABLE "StoredFile" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "sourceUploadGrantId" TEXT NOT NULL,
    "provider" "StoredFileProvider" NOT NULL,
    "providerObjectKey" TEXT NOT NULL,
    "purpose" "StoredFilePurpose" NOT NULL,
    "detectedMimeType" VARCHAR(255) NOT NULL,
    "sizeBytes" BIGINT NOT NULL,
    "checksumAlgorithm" VARCHAR(32),
    "checksumValue" VARCHAR(256),
    "uploaderMemberId" TEXT,
    "uploaderMemberIdSnapshot" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoredFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseAssetFileVersion" (
    "id" TEXT NOT NULL,
    "caseAssetFileId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "storedFileId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "createdByMemberId" TEXT,
    "createdByMemberIdSnapshot" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaseAssetFileVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaseFileAccessAudit" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "actorMemberId" TEXT NOT NULL,
    "caseId" TEXT,
    "caseAssetFileId" TEXT,
    "authorizationOutcome" "CaseFileAuthorizationOutcome" NOT NULL,
    "issuanceOutcome" "CaseFileIssuanceOutcome" NOT NULL,
    "reason" "CaseFileAccessReason" NOT NULL,
    "correlationId" TEXT NOT NULL,
    "issuedAt" TIMESTAMPTZ(6),
    "expiresAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CaseFileAccessAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StoredFile_sourceUploadGrantId_key" ON "StoredFile"("sourceUploadGrantId");

-- CreateIndex
CREATE INDEX "StoredFile_organizationId_labId_createdAt_idx" ON "StoredFile"("organizationId", "labId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "StoredFile_provider_providerObjectKey_key" ON "StoredFile"("provider", "providerObjectKey");

-- CreateIndex
CREATE UNIQUE INDEX "StoredFile_sourceUploadGrantId_organizationId_labId_key" ON "StoredFile"("sourceUploadGrantId", "organizationId", "labId");

-- CreateIndex
CREATE UNIQUE INDEX "StoredFile_id_organizationId_labId_key" ON "StoredFile"("id", "organizationId", "labId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseAssetFileVersion_storedFileId_key" ON "CaseAssetFileVersion"("storedFileId");

-- CreateIndex
CREATE INDEX "CaseAssetFileVersion_organizationId_labId_createdAt_idx" ON "CaseAssetFileVersion"("organizationId", "labId", "createdAt");

-- CreateIndex
CREATE INDEX "CaseAssetFileVersion_caseAssetFileId_createdAt_idx" ON "CaseAssetFileVersion"("caseAssetFileId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CaseAssetFileVersion_caseAssetFileId_versionNumber_key" ON "CaseAssetFileVersion"("caseAssetFileId", "versionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "CaseAssetFileVersion_storedFileId_organizationId_labId_key" ON "CaseAssetFileVersion"("storedFileId", "organizationId", "labId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseAssetFileVersion_id_caseAssetFileId_labId_key" ON "CaseAssetFileVersion"("id", "caseAssetFileId", "labId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseFileAccessAudit_correlationId_key" ON "CaseFileAccessAudit"("correlationId");

-- CreateIndex
CREATE INDEX "CaseFileAccessAudit_organizationId_labId_createdAt_idx" ON "CaseFileAccessAudit"("organizationId", "labId", "createdAt");

-- CreateIndex
CREATE INDEX "CaseFileAccessAudit_caseId_createdAt_idx" ON "CaseFileAccessAudit"("caseId", "createdAt");

-- CreateIndex
CREATE INDEX "CaseFileAccessAudit_caseAssetFileId_createdAt_idx" ON "CaseFileAccessAudit"("caseAssetFileId", "createdAt");

-- CreateIndex
CREATE INDEX "CaseFileAccessAudit_actorMemberId_createdAt_idx" ON "CaseFileAccessAudit"("actorMemberId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Case_id_labId_key" ON "Case"("id", "labId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseAssetFile_currentVersionId_key" ON "CaseAssetFile"("currentVersionId");

-- CreateIndex
CREATE INDEX "CaseAssetFile_labId_dentalCaseId_idx" ON "CaseAssetFile"("labId", "dentalCaseId");

-- CreateIndex
CREATE INDEX "CaseAssetFile_labId_storageMode_idx" ON "CaseAssetFile"("labId", "storageMode");

-- CreateIndex
CREATE UNIQUE INDEX "CaseAssetFile_id_labId_key" ON "CaseAssetFile"("id", "labId");

-- CreateIndex
CREATE UNIQUE INDEX "CaseAssetFile_currentVersionId_id_labId_key" ON "CaseAssetFile"("currentVersionId", "id", "labId");

-- CreateIndex
CREATE UNIQUE INDEX "FileUploadGrant_id_organizationId_labId_key" ON "FileUploadGrant"("id", "organizationId", "labId");

-- CreateIndex
CREATE UNIQUE INDEX "Lab_id_organizationId_key" ON "Lab"("id", "organizationId");

-- AddForeignKey
ALTER TABLE "CaseAssetFile" ADD CONSTRAINT "CaseAssetFile_dentalCaseId_labId_fkey" FOREIGN KEY ("dentalCaseId", "labId") REFERENCES "Case"("id", "labId") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CaseAssetFile" ADD CONSTRAINT "CaseAssetFile_labId_fkey" FOREIGN KEY ("labId") REFERENCES "Lab"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CaseAssetFile" ADD CONSTRAINT "CaseAssetFile_currentVersionId_id_labId_fkey" FOREIGN KEY ("currentVersionId", "id", "labId") REFERENCES "CaseAssetFileVersion"("id", "caseAssetFileId", "labId") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_labId_organizationId_fkey" FOREIGN KEY ("labId", "organizationId") REFERENCES "Lab"("id", "organizationId") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_sourceUploadGrantId_organizationId_labId_fkey" FOREIGN KEY ("sourceUploadGrantId", "organizationId", "labId") REFERENCES "FileUploadGrant"("id", "organizationId", "labId") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "StoredFile" ADD CONSTRAINT "StoredFile_uploaderMemberId_fkey" FOREIGN KEY ("uploaderMemberId") REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CaseAssetFileVersion" ADD CONSTRAINT "CaseAssetFileVersion_caseAssetFileId_labId_fkey" FOREIGN KEY ("caseAssetFileId", "labId") REFERENCES "CaseAssetFile"("id", "labId") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CaseAssetFileVersion" ADD CONSTRAINT "CaseAssetFileVersion_storedFileId_organizationId_labId_fkey" FOREIGN KEY ("storedFileId", "organizationId", "labId") REFERENCES "StoredFile"("id", "organizationId", "labId") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CaseAssetFileVersion" ADD CONSTRAINT "CaseAssetFileVersion_createdByMemberId_fkey" FOREIGN KEY ("createdByMemberId") REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
