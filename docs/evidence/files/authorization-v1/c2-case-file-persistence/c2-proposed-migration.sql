-- C2 REVIEW-ONLY POSTGRESQL FORWARD SQL
--
-- This file is not an applied Prisma migration and must not be passed to
-- prisma migrate deploy, prisma migrate dev, prisma db execute, or psql without
-- separate migration-application authority and the fresh preflight in the
-- companion safety packet.
--
-- SECTION A is the Prisma-modelled relational expansion. It is written out for
-- review because Prisma 7.8 could validate the PSL but could not run an offline
-- schema-to-schema diff against Prisma-7 config-only schemas. Before approval
-- to apply, regenerate and compare this section from the approved migration
-- baseline. SECTION B is custom PostgreSQL SQL; Prisma PSL cannot model it.

BEGIN;

-- ============================================================================
-- SECTION A: PRISMA-MODELLED SQL (REGENERATE AND COMPARE BEFORE APPLICATION)
-- ============================================================================

CREATE TYPE "StoredFileProvider" AS ENUM ('UPLOADTHING');
CREATE TYPE "StoredFilePurpose" AS ENUM ('CASE_CLINICAL_ASSET');
CREATE TYPE "CaseAssetStorageMode" AS ENUM ('LEGACY_URL_UNVERIFIED', 'MANAGED_PRIVATE');
CREATE TYPE "CaseFileAuthorizationOutcome" AS ENUM ('ALLOWED', 'DENIED');
CREATE TYPE "CaseFileIssuanceOutcome" AS ENUM ('NOT_ATTEMPTED', 'ISSUED', 'FAILED');
CREATE TYPE "CaseFileAccessReason" AS ENUM ('AUTHORIZED', 'ACCESS_DENIED', 'RESOURCE_UNAVAILABLE', 'PROVIDER_FAILURE');

ALTER TABLE "CaseAssetFile"
  ADD COLUMN "storageMode" "CaseAssetStorageMode" NOT NULL DEFAULT 'LEGACY_URL_UNVERIFIED',
  ADD COLUMN "currentVersionId" TEXT;

ALTER TABLE "CaseAssetFile"
  ALTER COLUMN "documentUrl" DROP NOT NULL,
  ALTER COLUMN "fileExtension" DROP NOT NULL;

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

CREATE UNIQUE INDEX "Lab_id_organizationId_key" ON "Lab"("id", "organizationId");
CREATE UNIQUE INDEX "Case_id_labId_key" ON "Case"("id", "labId");
CREATE UNIQUE INDEX "FileUploadGrant_id_organizationId_labId_key" ON "FileUploadGrant"("id", "organizationId", "labId");
CREATE UNIQUE INDEX "CaseAssetFile_currentVersionId_key" ON "CaseAssetFile"("currentVersionId");
CREATE UNIQUE INDEX "CaseAssetFile_id_labId_key" ON "CaseAssetFile"("id", "labId");
CREATE UNIQUE INDEX "CaseAssetFile_currentVersionId_id_labId_key" ON "CaseAssetFile"("currentVersionId", "id", "labId");
CREATE INDEX "CaseAssetFile_labId_dentalCaseId_idx" ON "CaseAssetFile"("labId", "dentalCaseId");
CREATE INDEX "CaseAssetFile_labId_storageMode_idx" ON "CaseAssetFile"("labId", "storageMode");

CREATE UNIQUE INDEX "StoredFile_sourceUploadGrantId_key" ON "StoredFile"("sourceUploadGrantId");
CREATE UNIQUE INDEX "StoredFile_provider_providerObjectKey_key" ON "StoredFile"("provider", "providerObjectKey");
CREATE UNIQUE INDEX "StoredFile_sourceUploadGrantId_organizationId_labId_key" ON "StoredFile"("sourceUploadGrantId", "organizationId", "labId");
CREATE UNIQUE INDEX "StoredFile_id_organizationId_labId_key" ON "StoredFile"("id", "organizationId", "labId");
CREATE INDEX "StoredFile_organizationId_labId_createdAt_idx" ON "StoredFile"("organizationId", "labId", "createdAt");

CREATE UNIQUE INDEX "CaseAssetFileVersion_storedFileId_key" ON "CaseAssetFileVersion"("storedFileId");
CREATE UNIQUE INDEX "CaseAssetFileVersion_caseAssetFileId_versionNumber_key" ON "CaseAssetFileVersion"("caseAssetFileId", "versionNumber");
CREATE UNIQUE INDEX "CaseAssetFileVersion_storedFileId_organizationId_labId_key" ON "CaseAssetFileVersion"("storedFileId", "organizationId", "labId");
CREATE UNIQUE INDEX "CaseAssetFileVersion_id_caseAssetFileId_labId_key" ON "CaseAssetFileVersion"("id", "caseAssetFileId", "labId");
CREATE INDEX "CaseAssetFileVersion_organizationId_labId_createdAt_idx" ON "CaseAssetFileVersion"("organizationId", "labId", "createdAt");
CREATE INDEX "CaseAssetFileVersion_caseAssetFileId_createdAt_idx" ON "CaseAssetFileVersion"("caseAssetFileId", "createdAt");

CREATE UNIQUE INDEX "CaseFileAccessAudit_correlationId_key" ON "CaseFileAccessAudit"("correlationId");
CREATE INDEX "CaseFileAccessAudit_organizationId_labId_createdAt_idx" ON "CaseFileAccessAudit"("organizationId", "labId", "createdAt");
CREATE INDEX "CaseFileAccessAudit_caseId_createdAt_idx" ON "CaseFileAccessAudit"("caseId", "createdAt");
CREATE INDEX "CaseFileAccessAudit_caseAssetFileId_createdAt_idx" ON "CaseFileAccessAudit"("caseAssetFileId", "createdAt");
CREATE INDEX "CaseFileAccessAudit_actorMemberId_createdAt_idx" ON "CaseFileAccessAudit"("actorMemberId", "createdAt");

ALTER TABLE "CaseAssetFile" DROP CONSTRAINT "CaseAssetFile_dentalCaseId_fkey";
ALTER TABLE "CaseAssetFile" DROP CONSTRAINT "CaseAssetFile_labId_fkey";
DROP INDEX "CaseAssetFile_labId_idx";
DROP INDEX "CaseAssetFile_dentalCaseId_idx";

ALTER TABLE "CaseAssetFile"
  ADD CONSTRAINT "CaseAssetFile_dentalCaseId_labId_fkey"
    FOREIGN KEY ("dentalCaseId", "labId") REFERENCES "Case"("id", "labId")
    ON DELETE RESTRICT ON UPDATE NO ACTION,
  ADD CONSTRAINT "CaseAssetFile_labId_fkey"
    FOREIGN KEY ("labId") REFERENCES "Lab"("id")
    ON DELETE RESTRICT ON UPDATE NO ACTION;

ALTER TABLE "StoredFile"
  ADD CONSTRAINT "StoredFile_organizationId_fkey"
    FOREIGN KEY ("organizationId") REFERENCES "organization"("id")
    ON DELETE RESTRICT ON UPDATE NO ACTION,
  ADD CONSTRAINT "StoredFile_labId_organizationId_fkey"
    FOREIGN KEY ("labId", "organizationId") REFERENCES "Lab"("id", "organizationId")
    ON DELETE RESTRICT ON UPDATE NO ACTION,
  ADD CONSTRAINT "StoredFile_sourceUploadGrantId_organizationId_labId_fkey"
    FOREIGN KEY ("sourceUploadGrantId", "organizationId", "labId") REFERENCES "FileUploadGrant"("id", "organizationId", "labId")
    ON DELETE RESTRICT ON UPDATE NO ACTION,
  ADD CONSTRAINT "StoredFile_uploaderMemberId_fkey"
    FOREIGN KEY ("uploaderMemberId") REFERENCES "member"("id")
    ON DELETE SET NULL ON UPDATE NO ACTION;

ALTER TABLE "CaseAssetFileVersion"
  ADD CONSTRAINT "CaseAssetFileVersion_caseAssetFileId_labId_fkey"
    FOREIGN KEY ("caseAssetFileId", "labId") REFERENCES "CaseAssetFile"("id", "labId")
    ON DELETE RESTRICT ON UPDATE NO ACTION,
  ADD CONSTRAINT "CaseAssetFileVersion_storedFileId_organizationId_labId_fkey"
    FOREIGN KEY ("storedFileId", "organizationId", "labId") REFERENCES "StoredFile"("id", "organizationId", "labId")
    ON DELETE RESTRICT ON UPDATE NO ACTION,
  ADD CONSTRAINT "CaseAssetFileVersion_createdByMemberId_fkey"
    FOREIGN KEY ("createdByMemberId") REFERENCES "member"("id")
    ON DELETE SET NULL ON UPDATE NO ACTION;

ALTER TABLE "CaseAssetFile"
  ADD CONSTRAINT "CaseAssetFile_currentVersionId_id_labId_fkey"
    FOREIGN KEY ("currentVersionId", "id", "labId") REFERENCES "CaseAssetFileVersion"("id", "caseAssetFileId", "labId")
    ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ============================================================================
-- SECTION B: CUSTOM POSTGRESQL SQL (NOT REPRESENTABLE IN PRISMA PSL)
-- ============================================================================

ALTER TABLE "StoredFile"
  ADD CONSTRAINT "StoredFile_sizeBytes_positive"
    CHECK ("sizeBytes" > 0),
  ADD CONSTRAINT "StoredFile_checksum_pair"
    CHECK (("checksumAlgorithm" IS NULL) = ("checksumValue" IS NULL));

ALTER TABLE "CaseAssetFileVersion"
  ADD CONSTRAINT "CaseAssetFileVersion_versionNumber_positive"
    CHECK ("versionNumber" > 0);

ALTER TABLE "CaseFileAccessAudit"
  ADD CONSTRAINT "CaseFileAccessAudit_issuance_timestamps"
    CHECK (
      (
        "issuanceOutcome" = 'ISSUED'
        AND "authorizationOutcome" = 'ALLOWED'
        AND "issuedAt" IS NOT NULL
        AND "expiresAt" IS NOT NULL
        AND "expiresAt" > "issuedAt"
        AND "expiresAt" <= "issuedAt" + INTERVAL '300 seconds'
      )
      OR (
        "issuanceOutcome" IN ('NOT_ATTEMPTED', 'FAILED')
        AND "issuedAt" IS NULL
        AND "expiresAt" IS NULL
      )
    );

CREATE FUNCTION "CaseAssetFile_validate_final_storage_mode"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  final_asset "CaseAssetFile"%ROWTYPE;
BEGIN
  -- Constraint triggers execute at commit. Re-read by ID so an insert with a
  -- null pointer can be followed by version creation and a pointer update.
  SELECT * INTO final_asset
  FROM "CaseAssetFile"
  WHERE "id" = NEW."id";

  IF NOT FOUND THEN
    RETURN NULL;
  END IF;

  IF final_asset."storageMode" = 'MANAGED_PRIVATE' THEN
    IF final_asset."currentVersionId" IS NULL
       OR final_asset."documentUrl" IS NOT NULL
       OR final_asset."fileExtension" IS NOT NULL THEN
      RAISE EXCEPTION 'managed CaseAssetFile % requires a current version and no legacy URL fields', final_asset."id";
    END IF;
  ELSIF final_asset."storageMode" = 'LEGACY_URL_UNVERIFIED' THEN
    IF final_asset."currentVersionId" IS NOT NULL
       OR final_asset."documentUrl" IS NULL
       OR final_asset."fileExtension" IS NULL THEN
      RAISE EXCEPTION 'legacy CaseAssetFile % requires legacy URL fields and no current version', final_asset."id";
    END IF;
  ELSE
    RAISE EXCEPTION 'unknown CaseAssetFile storage mode for %', final_asset."id";
  END IF;

  RETURN NULL;
END;
$$;

CREATE CONSTRAINT TRIGGER "CaseAssetFile_final_storage_mode"
AFTER INSERT OR UPDATE OF "storageMode", "currentVersionId", "documentUrl", "fileExtension"
ON "CaseAssetFile"
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW
EXECUTE FUNCTION "CaseAssetFile_validate_final_storage_mode"();

CREATE FUNCTION "StoredFile_allow_live_member_null_transition_only"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF OLD."uploaderMemberId" IS NOT NULL
       AND NEW."uploaderMemberId" IS NULL
       AND NEW."id" IS NOT DISTINCT FROM OLD."id"
       AND NEW."organizationId" IS NOT DISTINCT FROM OLD."organizationId"
       AND NEW."labId" IS NOT DISTINCT FROM OLD."labId"
       AND NEW."sourceUploadGrantId" IS NOT DISTINCT FROM OLD."sourceUploadGrantId"
       AND NEW."provider" IS NOT DISTINCT FROM OLD."provider"
       AND NEW."providerObjectKey" IS NOT DISTINCT FROM OLD."providerObjectKey"
       AND NEW."purpose" IS NOT DISTINCT FROM OLD."purpose"
       AND NEW."detectedMimeType" IS NOT DISTINCT FROM OLD."detectedMimeType"
       AND NEW."sizeBytes" IS NOT DISTINCT FROM OLD."sizeBytes"
       AND NEW."checksumAlgorithm" IS NOT DISTINCT FROM OLD."checksumAlgorithm"
       AND NEW."checksumValue" IS NOT DISTINCT FROM OLD."checksumValue"
       AND NEW."uploaderMemberIdSnapshot" IS NOT DISTINCT FROM OLD."uploaderMemberIdSnapshot"
       AND NEW."createdAt" IS NOT DISTINCT FROM OLD."createdAt" THEN
      RETURN NEW;
    END IF;
  END IF;

  RAISE EXCEPTION 'StoredFile allows only a non-null to null uploaderMemberId transition with every other column unchanged';
END;
$$;

CREATE FUNCTION "CaseAssetFileVersion_allow_live_member_null_transition_only"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'UPDATE' THEN
    IF OLD."createdByMemberId" IS NOT NULL
       AND NEW."createdByMemberId" IS NULL
       AND NEW."id" IS NOT DISTINCT FROM OLD."id"
       AND NEW."caseAssetFileId" IS NOT DISTINCT FROM OLD."caseAssetFileId"
       AND NEW."organizationId" IS NOT DISTINCT FROM OLD."organizationId"
       AND NEW."labId" IS NOT DISTINCT FROM OLD."labId"
       AND NEW."storedFileId" IS NOT DISTINCT FROM OLD."storedFileId"
       AND NEW."versionNumber" IS NOT DISTINCT FROM OLD."versionNumber"
       AND NEW."createdByMemberIdSnapshot" IS NOT DISTINCT FROM OLD."createdByMemberIdSnapshot"
       AND NEW."createdAt" IS NOT DISTINCT FROM OLD."createdAt" THEN
      RETURN NEW;
    END IF;
  END IF;

  RAISE EXCEPTION 'CaseAssetFileVersion allows only a non-null to null createdByMemberId transition with every other column unchanged';
END;
$$;

CREATE FUNCTION "CaseFileAccessAudit_reject_mutation"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'CaseFileAccessAudit history is append-only';
END;
$$;

CREATE TRIGGER "StoredFile_allow_live_member_null_transition_only"
BEFORE UPDATE OR DELETE ON "StoredFile"
FOR EACH ROW EXECUTE FUNCTION "StoredFile_allow_live_member_null_transition_only"();

CREATE TRIGGER "CaseAssetFileVersion_allow_live_member_null_transition_only"
BEFORE UPDATE OR DELETE ON "CaseAssetFileVersion"
FOR EACH ROW EXECUTE FUNCTION "CaseAssetFileVersion_allow_live_member_null_transition_only"();

CREATE TRIGGER "CaseFileAccessAudit_reject_mutation"
BEFORE UPDATE OR DELETE ON "CaseFileAccessAudit"
FOR EACH ROW EXECUTE FUNCTION "CaseFileAccessAudit_reject_mutation"();

COMMIT;
