-- REVIEW-ONLY CANDIDATE. Separate authorization is required before application.
-- Additive to installed C2 and Case clinical evidence migrations; do not edit them.
-- PostgreSQL cannot use a newly added enum label until its transaction ends.
-- This statement commits separately; a later DDL failure leaves the label
-- installed and requires migration repair, without creating any public row.
ALTER TYPE "CaseAssetStorageMode" ADD VALUE 'MANAGED_PUBLIC';

BEGIN;
CREATE TYPE "StoredFileProviderAccess" AS ENUM ('PUBLIC_READ', 'PRIVATE');
ALTER TABLE "StoredFile" ADD COLUMN "providerAccess" "StoredFileProviderAccess";

-- Null means historical/unclassified. It is never inferred to be private.
-- Require classification for new physical objects without backfilling old rows.
CREATE FUNCTION "StoredFile_require_provider_access_on_insert"()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."providerAccess" IS NULL THEN
    RAISE EXCEPTION 'New StoredFile requires provider access classification' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER "StoredFile_require_provider_access_on_insert"
BEFORE INSERT ON "StoredFile"
FOR EACH ROW EXECUTE FUNCTION "StoredFile_require_provider_access_on_insert"();

-- Preserve the C2 live-Member null transition, and freeze the new access fact.
CREATE OR REPLACE FUNCTION "StoredFile_allow_live_member_null_transition_only"()
RETURNS trigger LANGUAGE plpgsql AS $$
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
       AND NEW."providerAccess" IS NOT DISTINCT FROM OLD."providerAccess"
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

-- C2's constraint trigger re-reads the final asset state at commit. Extend it
-- with a current-object classification check; historical private/null rows are
-- preserved only while their current version pointer remains unchanged.
CREATE OR REPLACE FUNCTION "CaseAssetFile_validate_final_storage_mode"()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  final_asset "CaseAssetFile"%ROWTYPE;
  current_file "StoredFile"%ROWTYPE;
  historical_private_unchanged boolean := false;
BEGIN
  SELECT * INTO final_asset FROM "CaseAssetFile" WHERE "id" = NEW."id";
  IF NOT FOUND THEN RETURN NULL; END IF;

  -- A managed asset cannot be relabeled as legacy to expose a raw URL.
  -- The sole current-mode transition is an established public asset moving
  -- to a different, independently classified private version.
  IF TG_OP = 'UPDATE' AND OLD."storageMode" IS DISTINCT FROM final_asset."storageMode" THEN
    IF NOT (OLD."storageMode" = 'MANAGED_PUBLIC'
            AND final_asset."storageMode" = 'MANAGED_PRIVATE'
            AND OLD."currentVersionId" IS NOT NULL
            AND OLD."currentVersionId" IS DISTINCT FROM final_asset."currentVersionId") THEN
      RAISE EXCEPTION 'Case asset storage-mode transition is not allowed' USING ERRCODE = '23514';
    END IF;
  END IF;

  IF final_asset."storageMode" IN ('MANAGED_PRIVATE', 'MANAGED_PUBLIC') THEN
    IF final_asset."currentVersionId" IS NULL
       OR final_asset."documentUrl" IS NOT NULL
       OR final_asset."fileExtension" IS NOT NULL THEN
      RAISE EXCEPTION 'managed CaseAssetFile % requires a current version and no legacy URL fields', final_asset."id" USING ERRCODE = '23514';
    END IF;

    SELECT sf.* INTO current_file
    FROM "CaseAssetFileVersion" v
    JOIN "StoredFile" sf ON sf."id" = v."storedFileId"
    WHERE v."id" = final_asset."currentVersionId"
      AND v."caseAssetFileId" = final_asset."id"
      AND v."labId" = final_asset."labId"
      AND sf."organizationId" = v."organizationId"
      AND sf."labId" = v."labId";
    IF NOT FOUND THEN
      RAISE EXCEPTION 'managed CaseAssetFile % has no matching current StoredFile', final_asset."id" USING ERRCODE = '23514';
    END IF;

    IF final_asset."storageMode" = 'MANAGED_PUBLIC' AND current_file."providerAccess" IS DISTINCT FROM 'PUBLIC_READ' THEN
      RAISE EXCEPTION 'public managed CaseAssetFile % requires PUBLIC_READ current StoredFile', final_asset."id" USING ERRCODE = '23514';
    END IF;
    IF final_asset."storageMode" = 'MANAGED_PRIVATE' AND current_file."providerAccess" IS DISTINCT FROM 'PRIVATE' THEN
      IF current_file."providerAccess" IS NOT NULL OR TG_OP = 'INSERT' THEN
        RAISE EXCEPTION 'private managed CaseAssetFile % requires PRIVATE current StoredFile', final_asset."id" USING ERRCODE = '23514';
      END IF;
      -- OLD is defined only for UPDATE events. Preserve an untouched
      -- historical private/null pointer, but never allow a new pointer to it.
      IF OLD."storageMode" IS DISTINCT FROM 'MANAGED_PRIVATE'
         OR OLD."currentVersionId" IS DISTINCT FROM final_asset."currentVersionId" THEN
        RAISE EXCEPTION 'private managed CaseAssetFile % requires PRIVATE current StoredFile', final_asset."id" USING ERRCODE = '23514';
      END IF;
      historical_private_unchanged := true;
    END IF;

    -- New managed pointers must have immutable successful evidence bound to
    -- this Case and to the exact physical provider object. Existing untouched
    -- MANAGED_PRIVATE/null history is preserved without claiming validation.
    IF NOT historical_private_unchanged AND NOT EXISTS (
      SELECT 1 FROM "CaseClinicalUploadEvidence" e
      WHERE e."uploadGrantId" = current_file."sourceUploadGrantId"
        AND e."organizationId" = current_file."organizationId"
        AND e."labId" = current_file."labId"
        AND e."labId" = final_asset."labId"
        AND e."caseId" = final_asset."dentalCaseId"
        AND e."provider" = current_file."provider"
        AND e."providerObjectKey" = current_file."providerObjectKey"
        AND e."clinicalPurpose" = final_asset."clinicalPurpose"
    ) THEN
      RAISE EXCEPTION 'managed CaseAssetFile % requires matching clinical validation evidence', final_asset."id" USING ERRCODE = '23514';
    END IF;
  ELSIF final_asset."storageMode" = 'LEGACY_URL_UNVERIFIED' THEN
    IF final_asset."currentVersionId" IS NOT NULL
       OR final_asset."documentUrl" IS NULL
       OR final_asset."fileExtension" IS NULL THEN
      RAISE EXCEPTION 'legacy CaseAssetFile % requires legacy URL fields and no current version', final_asset."id" USING ERRCODE = '23514';
    END IF;
  ELSE
    RAISE EXCEPTION 'unknown CaseAssetFile storage mode for %', final_asset."id" USING ERRCODE = '23514';
  END IF;
  RETURN NULL;
END;
$$;

-- The installed evidence guard requires a clinical purpose for every managed
-- Case asset, regardless of provider confidentiality.
CREATE OR REPLACE FUNCTION "CaseAssetFile_clinical_purpose_final_state"()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  final_asset "CaseAssetFile"%ROWTYPE;
BEGIN
  SELECT * INTO final_asset FROM "CaseAssetFile" WHERE "id" = NEW."id";
  IF NOT FOUND THEN RETURN NULL; END IF;
  IF (final_asset."storageMode" IN ('MANAGED_PRIVATE', 'MANAGED_PUBLIC') AND final_asset."clinicalPurpose" IS NULL)
    OR (final_asset."storageMode" = 'LEGACY_URL_UNVERIFIED' AND final_asset."clinicalPurpose" IS NOT NULL) THEN
    RAISE EXCEPTION 'Case asset clinical purpose does not match storage mode' USING ERRCODE = '23514';
  END IF;
  RETURN NULL;
END;
$$;

COMMIT;
