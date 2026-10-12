-- REVIEW-ONLY CANDIDATE. Do not apply without a separate runtime/application gate.
-- Historical evidence remains unclassified in the new nullable fields.
BEGIN;
CREATE TYPE "CaseClinicalCodecBackend" AS ENUM ('JULUSIAN_TURBOJPEG');

ALTER TABLE "CaseClinicalUploadEvidence"
  ADD COLUMN "validatorVersion" VARCHAR(48),
  ADD COLUMN "codecBackend" "CaseClinicalCodecBackend",
  ADD COLUMN "codecPackageVersion" VARCHAR(24),
  ADD COLUMN "codecLibraryVersion" VARCHAR(24),
  ADD COLUMN "codecRuntimeSha256" VARCHAR(64),
  ADD COLUMN "sourceComponents" INTEGER,
  ADD COLUMN "isProgressive" BOOLEAN;

-- Existing R001 and historical rows retain NULL in every new field. A future
-- S001 success must carry the complete, pinned V1 implementation identity.
-- The runtime digest is measured from the deployed adjacent codec library;
-- its exact value is pinned and verified by the later production CODE gate.
ALTER TABLE "CaseClinicalUploadEvidence"
  ADD CONSTRAINT "CaseClinicalUploadEvidence_s001_identity" CHECK (
    (
      "validationProfile" = 'JPEG_CLINICAL_V1_S001'
      AND "validatorVersion" IS NOT DISTINCT FROM 'LABOS_S001_JULUSIAN_V1'
      AND "codecBackend" IS NOT DISTINCT FROM 'JULUSIAN_TURBOJPEG'
      AND "codecPackageVersion" IS NOT DISTINCT FROM '3.0.1'
      AND "codecLibraryVersion" IS NOT DISTINCT FROM '3.1.3'
      AND COALESCE("codecRuntimeSha256" ~ '^[0-9a-f]{64}$', false)
      AND COALESCE("sourceComponents" IN (1, 3), false)
      AND "isProgressive" IS NOT NULL
    )
    OR
    (
      "validationProfile" <> 'JPEG_CLINICAL_V1_S001'
      AND "validatorVersion" IS NULL
      AND "codecBackend" IS NULL
      AND "codecPackageVersion" IS NULL
      AND "codecLibraryVersion" IS NULL
      AND "codecRuntimeSha256" IS NULL
      AND "sourceComponents" IS NULL
      AND "isProgressive" IS NULL
    )
  );
COMMIT;
