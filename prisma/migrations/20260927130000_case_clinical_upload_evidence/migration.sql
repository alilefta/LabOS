-- Prisma-modelled structural diff from the accepted C2 schema.
CREATE TYPE "CaseClinicalPurpose" AS ENUM ('CLINICAL_REFERENCE_PHOTOGRAPH');
CREATE TYPE "CaseClinicalVerifiedFormat" AS ENUM ('JPEG');
CREATE TYPE "CaseClinicalValidatedSuffix" AS ENUM ('JPG', 'JPEG');

ALTER TABLE "CaseAssetFile" ADD COLUMN "clinicalPurpose" "CaseClinicalPurpose";
ALTER TABLE "FileUploadGrant" ADD COLUMN "provider" "StoredFileProvider";

CREATE TABLE "CaseClinicalUploadEvidence" (
    "uploadGrantId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "labId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "provider" "StoredFileProvider" NOT NULL,
    "providerObjectKey" TEXT NOT NULL,
    "clinicalPurpose" "CaseClinicalPurpose" NOT NULL,
    "verifiedFormat" "CaseClinicalVerifiedFormat" NOT NULL,
    "validatedSuffix" "CaseClinicalValidatedSuffix" NOT NULL,
    "measuredSizeBytes" BIGINT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "contentSha256" VARCHAR(64) NOT NULL,
    "validationProfile" VARCHAR(64) NOT NULL,
    "validatedAt" TIMESTAMPTZ(6) NOT NULL,
    CONSTRAINT "CaseClinicalUploadEvidence_pkey" PRIMARY KEY ("uploadGrantId")
);

CREATE INDEX "CaseClinicalUploadEvidence_organizationId_labId_caseId_idx" ON "CaseClinicalUploadEvidence"("organizationId", "labId", "caseId");
CREATE UNIQUE INDEX "CaseClinicalUploadEvidence_provider_providerObjectKey_key" ON "CaseClinicalUploadEvidence"("provider", "providerObjectKey");
CREATE UNIQUE INDEX "CaseClinicalUploadEvidence_uploadGrantId_organizationId_lab_key" ON "CaseClinicalUploadEvidence"("uploadGrantId", "organizationId", "labId", "provider", "providerObjectKey");
CREATE UNIQUE INDEX "FileUploadGrant_id_organizationId_labId_provider_providerFi_key" ON "FileUploadGrant"("id", "organizationId", "labId", "provider", "providerFileKey");

ALTER TABLE "CaseClinicalUploadEvidence" ADD CONSTRAINT "CaseClinicalUploadEvidence_uploadGrantId_organizationId_la_fkey" FOREIGN KEY ("uploadGrantId", "organizationId", "labId", "provider", "providerObjectKey") REFERENCES "FileUploadGrant"("id", "organizationId", "labId", "provider", "providerFileKey") ON DELETE RESTRICT ON UPDATE NO ACTION;
ALTER TABLE "CaseClinicalUploadEvidence" ADD CONSTRAINT "CaseClinicalUploadEvidence_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
ALTER TABLE "CaseClinicalUploadEvidence" ADD CONSTRAINT "CaseClinicalUploadEvidence_labId_organizationId_fkey" FOREIGN KEY ("labId", "organizationId") REFERENCES "Lab"("id", "organizationId") ON DELETE RESTRICT ON UPDATE NO ACTION;
ALTER TABLE "CaseClinicalUploadEvidence" ADD CONSTRAINT "CaseClinicalUploadEvidence_caseId_labId_fkey" FOREIGN KEY ("caseId", "labId") REFERENCES "Case"("id", "labId") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- Custom PostgreSQL invariants. Mutable JPEG resource ceilings live in the
-- versioned application validation release, not in database CHECKs.
ALTER TABLE "CaseClinicalUploadEvidence"
  ADD CONSTRAINT "CaseClinicalUploadEvidence_positive_measurements" CHECK (
    "measuredSizeBytes" > 0 AND "width" > 0 AND "height" > 0
  ),
  ADD CONSTRAINT "CaseClinicalUploadEvidence_sha256_shape" CHECK (
    "contentSha256" ~ '^[0-9a-f]{64}$'
  ),
  ADD CONSTRAINT "CaseClinicalUploadEvidence_profile_shape" CHECK (
    "validationProfile" ~ '^[A-Z][A-Z0-9_]*$'
  ),
  ADD CONSTRAINT "CaseClinicalUploadEvidence_object_key_nonempty" CHECK (
    length("providerObjectKey") > 0
  );

CREATE FUNCTION "CaseClinicalUploadEvidence_reject_mutation"()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'Case clinical upload evidence is immutable' USING ERRCODE = '23514';
END;
$$;

CREATE TRIGGER "CaseClinicalUploadEvidence_immutable"
BEFORE UPDATE OR DELETE ON "CaseClinicalUploadEvidence"
FOR EACH ROW EXECUTE FUNCTION "CaseClinicalUploadEvidence_reject_mutation"();

CREATE FUNCTION "CaseClinicalUploadEvidence_validate_grant"()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  grant_row "FileUploadGrant"%ROWTYPE;
BEGIN
  SELECT * INTO grant_row FROM "FileUploadGrant" WHERE "id" = NEW."uploadGrantId" FOR UPDATE;
  IF NOT FOUND OR grant_row."boundaryId" <> 'N-FILE-110'
    OR grant_row."purpose" <> 'case.asset.add.stage'
    OR grant_row."targetType" IS DISTINCT FROM 'case'
    OR grant_row."targetId" IS DISTINCT FROM NEW."caseId"
    OR grant_row."organizationId" IS DISTINCT FROM NEW."organizationId"
    OR grant_row."labId" IS DISTINCT FROM NEW."labId"
    OR grant_row."provider" IS DISTINCT FROM NEW."provider"
    OR grant_row."providerFileKey" IS DISTINCT FROM NEW."providerObjectKey"
    OR grant_row."status" <> 'PENDING'
    OR grant_row."createdByMemberId" IS NULL
    OR NOT EXISTS (
      SELECT 1 FROM "member" m
      WHERE m."id" = grant_row."createdByMemberId"
        AND m."organizationId" = grant_row."organizationId"
    )
    OR clock_timestamp() >= (grant_row."expiresAt" AT TIME ZONE 'UTC')
    OR NEW."validatedAt" >= (grant_row."expiresAt" AT TIME ZONE 'UTC')
    OR NEW."validatedAt" < (grant_row."createdAt" AT TIME ZONE 'UTC') THEN
    RAISE EXCEPTION 'Case clinical evidence does not match a live reserved grant' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER "CaseClinicalUploadEvidence_grant_binding"
BEFORE INSERT ON "CaseClinicalUploadEvidence"
FOR EACH ROW EXECUTE FUNCTION "CaseClinicalUploadEvidence_validate_grant"();

CREATE FUNCTION "FileUploadGrant_case_identity_guard"()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  case_scope boolean;
BEGIN
  case_scope := NEW."boundaryId" = 'N-FILE-110' OR NEW."purpose" = 'case.asset.add.stage';
  IF TG_OP = 'UPDATE' THEN
    case_scope := case_scope OR OLD."boundaryId" = 'N-FILE-110'
      OR OLD."purpose" = 'case.asset.add.stage';
  END IF;
  IF case_scope THEN
    IF NEW."boundaryId" <> 'N-FILE-110' OR NEW."purpose" <> 'case.asset.add.stage'
      OR NEW."targetType" IS DISTINCT FROM 'case' OR NEW."targetId" IS NULL
      OR length(NEW."targetId") = 0 OR NEW."provider" IS NULL
      OR (NEW."providerFileKey" IS NOT NULL AND length(NEW."providerFileKey") = 0)
      OR (TG_OP = 'INSERT' AND (NEW."createdByMemberId" IS NULL OR NOT EXISTS (
        SELECT 1 FROM "member" m
        WHERE m."id" = NEW."createdByMemberId"
          AND m."organizationId" = NEW."organizationId"
      )))
      OR (TG_OP = 'INSERT' AND NOT EXISTS (
        SELECT 1 FROM "Lab" l JOIN "Case" c ON c."labId" = l."id"
        WHERE l."id" = NEW."labId" AND l."organizationId" = NEW."organizationId"
          AND c."id" = NEW."targetId"
      )) THEN
      RAISE EXCEPTION 'Invalid Case clinical grant target' USING ERRCODE = '23514';
    END IF;
    IF TG_OP = 'UPDATE' THEN
      IF NEW."organizationId" IS DISTINCT FROM OLD."organizationId"
        OR NEW."labId" IS DISTINCT FROM OLD."labId"
        OR (NEW."createdByMemberId" IS DISTINCT FROM OLD."createdByMemberId"
          AND NOT (OLD."createdByMemberId" IS NOT NULL AND NEW."createdByMemberId" IS NULL))
        OR NEW."boundaryId" IS DISTINCT FROM OLD."boundaryId"
        OR NEW."purpose" IS DISTINCT FROM OLD."purpose"
        OR NEW."targetType" IS DISTINCT FROM OLD."targetType"
        OR NEW."targetId" IS DISTINCT FROM OLD."targetId"
        OR NEW."provider" IS DISTINCT FROM OLD."provider"
        OR NEW."expiresAt" IS DISTINCT FROM OLD."expiresAt"
        OR NEW."createdAt" IS DISTINCT FROM OLD."createdAt"
        OR (OLD."providerFileKey" IS NOT NULL AND NEW."providerFileKey" IS DISTINCT FROM OLD."providerFileKey")
        OR (OLD."providerFileKey" IS NULL AND NEW."providerFileKey" IS NOT NULL
          AND (OLD."status" <> 'PENDING' OR NEW."status" <> 'PENDING')) THEN
        RAISE EXCEPTION 'Case clinical grant identity is immutable' USING ERRCODE = '23514';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER "FileUploadGrant_case_identity"
BEFORE INSERT OR UPDATE ON "FileUploadGrant"
FOR EACH ROW EXECUTE FUNCTION "FileUploadGrant_case_identity_guard"();

CREATE FUNCTION "FileUploadGrant_case_uploaded_evidence_final_state"()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  final_grant "FileUploadGrant"%ROWTYPE;
BEGIN
  SELECT * INTO final_grant FROM "FileUploadGrant" WHERE "id" = NEW."id";
  IF NOT FOUND OR (final_grant."boundaryId" <> 'N-FILE-110'
      AND final_grant."purpose" <> 'case.asset.add.stage') THEN
    RETURN NULL;
  END IF;
  IF final_grant."status" = 'UPLOADED' AND NOT EXISTS (
    SELECT 1 FROM "CaseClinicalUploadEvidence" e
    WHERE e."uploadGrantId" = final_grant."id"
      AND e."organizationId" = final_grant."organizationId"
      AND e."labId" = final_grant."labId"
      AND e."caseId" = final_grant."targetId"
      AND e."provider" = final_grant."provider"
      AND e."providerObjectKey" = final_grant."providerFileKey"
  ) THEN
    RAISE EXCEPTION 'Case clinical UPLOADED grant requires verified evidence' USING ERRCODE = '23514';
  END IF;
  IF final_grant."status" = 'UPLOADED'
    AND clock_timestamp() >= (final_grant."expiresAt" AT TIME ZONE 'UTC') THEN
    RAISE EXCEPTION 'Expired Case clinical grant cannot become UPLOADED' USING ERRCODE = '23514';
  END IF;
  RETURN NULL;
END;
$$;

CREATE CONSTRAINT TRIGGER "FileUploadGrant_case_uploaded_evidence"
AFTER INSERT OR UPDATE OF "status" ON "FileUploadGrant"
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION "FileUploadGrant_case_uploaded_evidence_final_state"();

CREATE FUNCTION "CaseClinicalUploadEvidence_uploaded_final_state"()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM "FileUploadGrant" g
    WHERE g."id" = NEW."uploadGrantId" AND g."status" = 'UPLOADED'
  ) THEN
    RAISE EXCEPTION 'Case clinical evidence must finalize with UPLOADED grant' USING ERRCODE = '23514';
  END IF;
  RETURN NULL;
END;
$$;

CREATE CONSTRAINT TRIGGER "CaseClinicalUploadEvidence_uploaded"
AFTER INSERT ON "CaseClinicalUploadEvidence"
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION "CaseClinicalUploadEvidence_uploaded_final_state"();

CREATE FUNCTION "CaseAssetFile_clinical_purpose_final_state"()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  final_asset "CaseAssetFile"%ROWTYPE;
BEGIN
  SELECT * INTO final_asset FROM "CaseAssetFile" WHERE "id" = NEW."id";
  IF NOT FOUND THEN RETURN NULL; END IF;
  IF (final_asset."storageMode" = 'MANAGED_PRIVATE' AND final_asset."clinicalPurpose" IS NULL)
    OR (final_asset."storageMode" = 'LEGACY_URL_UNVERIFIED' AND final_asset."clinicalPurpose" IS NOT NULL) THEN
    RAISE EXCEPTION 'Case asset clinical purpose does not match storage mode' USING ERRCODE = '23514';
  END IF;
  RETURN NULL;
END;
$$;

CREATE CONSTRAINT TRIGGER "CaseAssetFile_clinical_purpose"
AFTER INSERT OR UPDATE OF "storageMode", "clinicalPurpose" ON "CaseAssetFile"
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION "CaseAssetFile_clinical_purpose_final_state"();
