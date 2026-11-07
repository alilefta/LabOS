-- Add static PNG/WebP identities without rewriting historical JPEG evidence.
BEGIN;
ALTER TYPE "CaseClinicalVerifiedFormat" ADD VALUE IF NOT EXISTS 'PNG';
ALTER TYPE "CaseClinicalVerifiedFormat" ADD VALUE IF NOT EXISTS 'WEBP';
ALTER TYPE "CaseClinicalValidatedSuffix" ADD VALUE IF NOT EXISTS 'PNG';
ALTER TYPE "CaseClinicalValidatedSuffix" ADD VALUE IF NOT EXISTS 'WEBP';
ALTER TYPE "CaseClinicalCodecBackend" ADD VALUE IF NOT EXISTS 'SHARP_LIBVIPS';
COMMIT;

BEGIN;
ALTER TABLE "CaseClinicalUploadEvidence"
  DROP CONSTRAINT "CaseClinicalUploadEvidence_s001_identity";

ALTER TABLE "CaseClinicalUploadEvidence"
  ADD CONSTRAINT "CaseClinicalUploadEvidence_format_identity" CHECK (
    (
      "verifiedFormat" = 'JPEG' AND "validatedSuffix" IN ('JPG', 'JPEG') AND
      (
        (
          "validationProfile" = 'JPEG_CLINICAL_V1_S001'
          AND "validatorVersion" IS NOT DISTINCT FROM 'LABOS_S001_JULUSIAN_V1'
          AND "codecBackend" IS NOT DISTINCT FROM 'JULUSIAN_TURBOJPEG'
          AND "codecPackageVersion" IS NOT DISTINCT FROM '3.0.1'
          AND "codecLibraryVersion" IS NOT DISTINCT FROM '3.1.3'
          AND COALESCE("codecRuntimeSha256" ~ '^[0-9a-f]{64}$', false)
          AND COALESCE("sourceComponents" IN (1, 3), false)
          AND "isProgressive" IS NOT NULL
        ) OR (
          "validationProfile" <> 'JPEG_CLINICAL_V1_S001'
          AND "validatorVersion" IS NULL AND "codecBackend" IS NULL
          AND "codecPackageVersion" IS NULL AND "codecLibraryVersion" IS NULL
          AND "codecRuntimeSha256" IS NULL AND "sourceComponents" IS NULL
          AND "isProgressive" IS NULL
        )
      )
    ) OR (
      "verifiedFormat" = 'PNG' AND "validatedSuffix" = 'PNG'
      AND "validationProfile" = 'CASE_PNG_V1_SHARP_1'
      AND "validatorVersion" IS NOT DISTINCT FROM 'CASE_PNG_V1_SHARP_1'
      AND "codecBackend" IS NOT DISTINCT FROM 'SHARP_LIBVIPS'
      AND "codecPackageVersion" IS NOT DISTINCT FROM '0.35.4'
      AND "codecLibraryVersion" IS NOT DISTINCT FROM '8.18.6'
      AND "codecRuntimeSha256" IS NULL AND "sourceComponents" IS NULL
      AND "isProgressive" IS NULL
    ) OR (
      "verifiedFormat" = 'WEBP' AND "validatedSuffix" = 'WEBP'
      AND "validationProfile" = 'CASE_WEBP_V1_SHARP_1'
      AND "validatorVersion" IS NOT DISTINCT FROM 'CASE_WEBP_V1_SHARP_1'
      AND "codecBackend" IS NOT DISTINCT FROM 'SHARP_LIBVIPS'
      AND "codecPackageVersion" IS NOT DISTINCT FROM '0.35.4'
      AND "codecLibraryVersion" IS NOT DISTINCT FROM '8.18.6'
      AND "codecRuntimeSha256" IS NULL AND "sourceComponents" IS NULL
      AND "isProgressive" IS NULL
    )
  );

-- Keep the existing object-storage attachment guard and require MIME from
-- immutable evidence format rather than accepting caller-supplied MIME.
CREATE OR REPLACE FUNCTION public."StoredFile_object_cleanup_insert_guard"()
RETURNS trigger LANGUAGE plpgsql SET search_path = pg_catalog, public, pg_temp AS $guard$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
BEGIN
  IF NEW."provider" <> 'OBJECT_STORAGE' THEN RETURN NEW; END IF;
  SELECT * INTO g FROM public."FileUploadGrant"
  WHERE "id" = NEW."sourceUploadGrantId" FOR UPDATE;
  IF NOT FOUND THEN RETURN NEW; END IF;
  IF g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage'
    OR g."targetType" <> 'case' THEN RETURN NEW; END IF;
  IF g."provider" <> 'OBJECT_STORAGE'
    OR g."status" <> 'UPLOADED'
    OR g."providerFileKey" IS DISTINCT FROM NEW."providerObjectKey"
    OR g."organizationId" IS DISTINCT FROM NEW."organizationId"
    OR g."labId" IS DISTINCT FROM NEW."labId"
    OR g."expiredAt" IS NOT NULL OR g."failedAt" IS NOT NULL
    OR g."cleanupLeaseExpiresAt" IS NOT NULL
    OR g."providerCleanupConfirmedAt" IS NOT NULL
    OR g."cleanupAttemptCount" <> 0
    OR NEW."providerAccess" <> 'PRIVATE'
    OR NEW."purpose" <> 'CASE_CLINICAL_ASSET'
    OR NEW."checksumAlgorithm" <> 'SHA-256'
    OR NOT EXISTS (
      SELECT 1 FROM public."CaseClinicalUploadEvidence" e
      WHERE e."uploadGrantId" = g."id"
        AND e."organizationId" = g."organizationId"
        AND e."labId" = g."labId"
        AND e."caseId" = g."targetId"
        AND e."provider" = g."provider"
        AND e."providerObjectKey" = g."providerFileKey"
        AND e."measuredSizeBytes" = NEW."sizeBytes"
        AND e."contentSha256" = NEW."checksumValue"
        AND NEW."detectedMimeType" = CASE e."verifiedFormat"
          WHEN 'JPEG' THEN 'image/jpeg'
          WHEN 'PNG' THEN 'image/png'
          WHEN 'WEBP' THEN 'image/webp'
          ELSE NULL END
    ) THEN
    RAISE EXCEPTION 'Case StoredFile is not backed by an attachable grant' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END;
$guard$;
COMMIT;
