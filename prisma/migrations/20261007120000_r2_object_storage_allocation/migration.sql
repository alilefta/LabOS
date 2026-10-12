-- The new enum label and all DDL commit atomically. The label is referenced
-- only in stored trigger bodies, which execute after this migration commits.
BEGIN;
ALTER TYPE "StoredFileProvider" ADD VALUE 'OBJECT_STORAGE';

-- The allocation has no FK to FileUploadGrant: grant/tenant deletion must not
-- permit a physical key to be allocated again. Keys contain no tenant facts.
CREATE TABLE "ObjectStorageKeyAllocation" (
  "objectKey" TEXT NOT NULL,
  "sourceUploadGrantId" TEXT NOT NULL,
  "latestWriteCapabilityExpiresAt" TIMESTAMPTZ(6),
  "allocatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ObjectStorageKeyAllocation_pkey" PRIMARY KEY ("objectKey"),
  CONSTRAINT "ObjectStorageKeyAllocation_key_shape" CHECK (
    "objectKey" ~ '^objects/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
  ),
  CONSTRAINT "ObjectStorageKeyAllocation_allocated_at_finite" CHECK (
    isfinite("allocatedAt")
  )
);
CREATE UNIQUE INDEX "ObjectStorageKeyAllocation_sourceUploadGrantId_key"
  ON "ObjectStorageKeyAllocation"("sourceUploadGrantId");

-- An undisclosed signed capability must have its expiry covered by a committed
-- row before delivery. The issuer must recheck PENDING under the grant lock
-- when extending this fence; signing first is safe only while undisclosed.
-- The value is a conservative upper bound, distinct from grant expiry. It
-- can advance only while the exact grant remains PENDING; cleanup must later
-- wait until this value plus the separately approved skew allowance.
CREATE FUNCTION "ObjectStorageKeyAllocation_guard"()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  grant_row "FileUploadGrant"%ROWTYPE;
BEGIN
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'Object-storage key allocations cannot be deleted' USING ERRCODE = '23514';
  END IF;

  SELECT * INTO grant_row FROM "FileUploadGrant"
    WHERE "id" = NEW."sourceUploadGrantId" FOR UPDATE;
  IF NOT FOUND OR grant_row."provider" IS DISTINCT FROM 'OBJECT_STORAGE'
    OR grant_row."providerFileKey" IS DISTINCT FROM NEW."objectKey"
    OR grant_row."boundaryId" IS DISTINCT FROM 'N-FILE-110'
    OR grant_row."purpose" IS DISTINCT FROM 'case.asset.add.stage' THEN
    RAISE EXCEPTION 'Object-storage key allocation must match its Case grant' USING ERRCODE = '23514';
  END IF;

  IF TG_OP = 'INSERT' THEN
    IF NEW."latestWriteCapabilityExpiresAt" IS NOT NULL OR grant_row."status" <> 'PENDING' THEN
      RAISE EXCEPTION 'New allocation cannot claim an issued write capability' USING ERRCODE = '23514';
    END IF;
  ELSIF NEW."objectKey" IS DISTINCT FROM OLD."objectKey"
    OR NEW."sourceUploadGrantId" IS DISTINCT FROM OLD."sourceUploadGrantId"
    OR NEW."allocatedAt" IS DISTINCT FROM OLD."allocatedAt"
    OR NEW."latestWriteCapabilityExpiresAt" IS NULL
    OR (OLD."latestWriteCapabilityExpiresAt" IS NOT NULL
      AND NEW."latestWriteCapabilityExpiresAt" <= OLD."latestWriteCapabilityExpiresAt")
    OR NOT isfinite(NEW."latestWriteCapabilityExpiresAt")
    OR NEW."latestWriteCapabilityExpiresAt" <= clock_timestamp()
    OR grant_row."status" <> 'PENDING' THEN
    RAISE EXCEPTION 'Object-storage write-capability fence cannot be reduced or changed after PENDING' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER "ObjectStorageKeyAllocation_immutable_and_fenced"
BEFORE INSERT OR UPDATE OR DELETE ON "ObjectStorageKeyAllocation"
FOR EACH ROW EXECUTE FUNCTION "ObjectStorageKeyAllocation_guard"();

CREATE FUNCTION "ObjectStorageKeyAllocation_reject_truncate"()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'Object-storage key allocations cannot be truncated' USING ERRCODE = '23514';
END;
$$;
CREATE TRIGGER "ObjectStorageKeyAllocation_no_truncate"
BEFORE TRUNCATE ON "ObjectStorageKeyAllocation"
FOR EACH STATEMENT EXECUTE FUNCTION "ObjectStorageKeyAllocation_reject_truncate"();

-- Preserve the installed UploadThing Case behavior. Only new OBJECT_STORAGE
-- Case grants require the key at insert and prohibit persisted provider URL.
CREATE OR REPLACE FUNCTION "FileUploadGrant_case_identity_guard"()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  case_scope boolean;
BEGIN
  case_scope := NEW."boundaryId" = 'N-FILE-110' OR NEW."purpose" = 'case.asset.add.stage';
  IF TG_OP = 'UPDATE' THEN
    case_scope := case_scope OR OLD."boundaryId" = 'N-FILE-110'
      OR OLD."purpose" = 'case.asset.add.stage';
  END IF;
  IF NEW."provider" = 'OBJECT_STORAGE' AND NOT case_scope THEN
    RAISE EXCEPTION 'Object-storage ingestion is authorized only for Case grants' USING ERRCODE = '23514';
  END IF;
  IF case_scope THEN
    IF NEW."boundaryId" <> 'N-FILE-110' OR NEW."purpose" <> 'case.asset.add.stage'
      OR NEW."targetType" IS DISTINCT FROM 'case' OR NEW."targetId" IS NULL
      OR length(NEW."targetId") = 0 OR NEW."provider" IS NULL
      OR (NEW."providerFileKey" IS NOT NULL AND length(NEW."providerFileKey") = 0)
      OR (TG_OP = 'INSERT' AND NEW."caseClinicalValidatedSuffix" IS NULL)
      OR (NEW."provider" = 'OBJECT_STORAGE' AND (
        (TG_OP = 'INSERT' AND NEW."status" <> 'PENDING')
        OR NEW."providerFileKey" IS NULL
        OR NEW."providerFileKey" !~ '^objects/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
        OR NEW."providerFileUrl" IS NOT NULL))
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
        OR NEW."caseClinicalValidatedSuffix" IS DISTINCT FROM OLD."caseClinicalValidatedSuffix"
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

-- AFTER INSERT sees the exact grant row. Its own trigger checks the binding;
-- uniqueness prevents concurrent allocation and reuse even after grant delete.
CREATE FUNCTION "FileUploadGrant_allocate_object_storage_key"()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF NEW."provider" = 'OBJECT_STORAGE' THEN
    INSERT INTO "ObjectStorageKeyAllocation"("objectKey", "sourceUploadGrantId")
      VALUES (NEW."providerFileKey", NEW."id");
  END IF;
  RETURN NULL;
END;
$$;
CREATE TRIGGER "FileUploadGrant_allocate_object_storage"
AFTER INSERT ON "FileUploadGrant"
FOR EACH ROW EXECUTE FUNCTION "FileUploadGrant_allocate_object_storage_key"();

-- Existing evidence binding, S001 identity, StoredFile immutability and
-- CaseAssetFile mode checks already compare the stable provider/key. Add only
-- the missing object-storage fence condition to the deferred grant gate.
CREATE OR REPLACE FUNCTION "FileUploadGrant_case_uploaded_evidence_final_state"()
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
  IF final_grant."provider" = 'OBJECT_STORAGE'
    AND final_grant."status" IN ('UPLOADED', 'CONSUMED')
    AND NOT EXISTS (
      SELECT 1 FROM "ObjectStorageKeyAllocation" a
      WHERE a."sourceUploadGrantId" = final_grant."id"
        AND a."objectKey" = final_grant."providerFileKey"
        AND a."latestWriteCapabilityExpiresAt" IS NOT NULL
    ) THEN
    RAISE EXCEPTION 'Object-storage Case final state requires a durable write-capability fence' USING ERRCODE = '23514';
  END IF;
  IF final_grant."status" = 'UPLOADED'
    AND clock_timestamp() >= (final_grant."expiresAt" AT TIME ZONE 'UTC') THEN
    RAISE EXCEPTION 'Expired Case clinical grant cannot become UPLOADED' USING ERRCODE = '23514';
  END IF;
  RETURN NULL;
END;
$$;

COMMIT;
