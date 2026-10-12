-- Case-only checked upload filename suffix. Historical and non-Case grants
-- remain NULL; no filename or provider metadata is backfilled.
BEGIN;

ALTER TABLE "FileUploadGrant"
  ADD COLUMN "caseClinicalValidatedSuffix" "CaseClinicalValidatedSuffix";

ALTER TABLE "FileUploadGrant"
  ADD CONSTRAINT "FileUploadGrant_case_suffix_scope" CHECK (
    CASE WHEN "boundaryId" = 'N-FILE-110' AND "purpose" = 'case.asset.add.stage'
      THEN TRUE
      ELSE "caseClinicalValidatedSuffix" IS NULL
    END
  );

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
  IF case_scope THEN
    IF NEW."boundaryId" <> 'N-FILE-110' OR NEW."purpose" <> 'case.asset.add.stage'
      OR NEW."targetType" IS DISTINCT FROM 'case' OR NEW."targetId" IS NULL
      OR length(NEW."targetId") = 0 OR NEW."provider" IS NULL
      OR (NEW."providerFileKey" IS NOT NULL AND length(NEW."providerFileKey") = 0)
      OR (TG_OP = 'INSERT' AND NEW."caseClinicalValidatedSuffix" IS NULL)
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

CREATE OR REPLACE FUNCTION "CaseClinicalUploadEvidence_validate_grant"()
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
    OR grant_row."caseClinicalValidatedSuffix" IS NULL
    OR NEW."validatedSuffix" IS DISTINCT FROM grant_row."caseClinicalValidatedSuffix"
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

COMMIT;
