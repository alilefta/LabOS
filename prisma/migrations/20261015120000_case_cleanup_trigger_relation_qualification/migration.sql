-- A1-I1: keep the installed Case grant predicates while resolving their
-- public relations under the private cleanup functions' fixed search path.
-- CREATE OR REPLACE preserves function ownership, ACLs, and trigger bindings.
BEGIN;

CREATE OR REPLACE FUNCTION public."FileUploadGrant_case_identity_guard"()
RETURNS trigger LANGUAGE plpgsql AS $identity$
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
        SELECT 1 FROM public."member" m
        WHERE m."id" = NEW."createdByMemberId"
          AND m."organizationId" = NEW."organizationId"
      )))
      OR (TG_OP = 'INSERT' AND NOT EXISTS (
        SELECT 1 FROM public."Lab" l JOIN public."Case" c ON c."labId" = l."id"
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
$identity$;

-- This deferred status trigger is reached by private-function updates too.
-- Project only the columns used below: the cleanup worker has approved
-- column-level SELECT, not full-table SELECT, when the deferred trigger fires.
CREATE OR REPLACE FUNCTION public."FileUploadGrant_case_uploaded_evidence_final_state"()
RETURNS trigger LANGUAGE plpgsql AS $final$
DECLARE
  final_grant record;
BEGIN
  SELECT f."id", f."boundaryId", f."purpose", f."status",
    f."organizationId", f."labId", f."targetId", f."provider",
    f."providerFileKey", f."expiresAt"
  INTO final_grant
  FROM public."FileUploadGrant" f WHERE f."id" = NEW."id";
  IF NOT FOUND OR (final_grant."boundaryId" <> 'N-FILE-110'
      AND final_grant."purpose" <> 'case.asset.add.stage') THEN
    RETURN NULL;
  END IF;
  IF final_grant."status" = 'UPLOADED' AND NOT EXISTS (
    SELECT 1 FROM public."CaseClinicalUploadEvidence" e
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
      SELECT 1 FROM public."ObjectStorageKeyAllocation" a
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
$final$;

COMMIT;
