-- A1-I1: provider-independent persistence and guards for N-FILE-110 OBJECT_STORAGE.
-- This migration contains no deployment-specific role name or provider operation.
BEGIN;

ALTER TABLE public."FileUploadGrant"
  ADD COLUMN "cleanupLeaseExpiresAt" TIMESTAMPTZ(6),
  ADD COLUMN "providerCleanupConfirmedAt" TIMESTAMPTZ(6);

CREATE SCHEMA labos_cleanup_private;
REVOKE ALL ON SCHEMA labos_cleanup_private FROM PUBLIC;

-- A grant row is the first serialization lock for attachment and cleanup.
-- A StoredFile is canonical even before its version/current pointer is written.
CREATE FUNCTION public."FileUploadGrant_object_cleanup_guard"()
RETURNS trigger LANGUAGE plpgsql SET search_path = pg_catalog, public, pg_temp AS $guard$
DECLARE
  scoped boolean;
  now_instant timestamptz := clock_timestamp();
  now_wall timestamp := clock_timestamp() AT TIME ZONE 'UTC';
  fence timestamptz;
  ack_owner text;
  worker_authorized boolean;
  cleanup_function_context boolean;
  canonical_exists boolean;
  retry_delay interval;
BEGIN
  SELECT p.rolname INTO ack_owner
  FROM pg_catalog.pg_proc f
  JOIN pg_catalog.pg_roles p ON p.oid = f.proowner
  WHERE f.oid = pg_catalog.to_regprocedure(
    'labos_cleanup_private.ack_object_storage_cleanup(text,integer)');
  worker_authorized := pg_catalog.has_function_privilege(
    current_user, 'labos_cleanup_private.ack_object_storage_cleanup(text,integer)', 'EXECUTE')
    AND current_user <> ack_owner;
  cleanup_function_context := current_user = ack_owner;
  IF TG_OP = 'INSERT' THEN
    IF worker_authorized THEN
      RAISE EXCEPTION 'Cleanup worker cannot insert upload grants' USING ERRCODE = '23514';
    END IF;
    IF NEW."provider" = 'OBJECT_STORAGE'
      AND NEW."boundaryId" = 'N-FILE-110'
      AND NEW."purpose" = 'case.asset.add.stage'
      AND (NEW."cleanupAttemptCount" <> 0
        OR NEW."lastCleanupAttemptAt" IS NOT NULL
        OR NEW."cleanupFailureCode" IS NOT NULL
        OR NEW."cleanupLeaseExpiresAt" IS NOT NULL
        OR NEW."providerCleanupConfirmedAt" IS NOT NULL) THEN
      RAISE EXCEPTION 'New Case grant cannot carry cleanup state' USING ERRCODE = '23514';
    END IF;
    RETURN NEW;
  END IF;
  scoped := OLD."provider" = 'OBJECT_STORAGE'
    AND OLD."boundaryId" = 'N-FILE-110'
    AND OLD."purpose" = 'case.asset.add.stage';
  IF TG_OP = 'DELETE' THEN
    IF scoped OR worker_authorized THEN
      RAISE EXCEPTION 'Case object-storage grant is retained' USING ERRCODE = '23514';
    END IF;
    RETURN OLD;
  END IF;
  scoped := scoped OR (NEW."provider" = 'OBJECT_STORAGE'
    AND NEW."boundaryId" = 'N-FILE-110'
    AND NEW."purpose" = 'case.asset.add.stage');
  IF NOT scoped THEN
    IF worker_authorized THEN
      RAISE EXCEPTION 'Cleanup worker cannot update other grants' USING ERRCODE = '23514';
    END IF;
    RETURN NEW;
  END IF;
  IF NEW."provider" IS DISTINCT FROM OLD."provider"
    OR NEW."boundaryId" IS DISTINCT FROM OLD."boundaryId"
    OR NEW."purpose" IS DISTINCT FROM OLD."purpose"
    OR NEW."targetType" IS DISTINCT FROM 'case'
    OR NEW."targetId" IS DISTINCT FROM OLD."targetId"
    OR NEW."organizationId" IS DISTINCT FROM OLD."organizationId"
    OR NEW."labId" IS DISTINCT FROM OLD."labId"
    OR NEW."providerFileKey" IS DISTINCT FROM OLD."providerFileKey"
    OR NEW."caseClinicalValidatedSuffix" IS DISTINCT FROM OLD."caseClinicalValidatedSuffix"
    OR NEW."expiresAt" IS DISTINCT FROM OLD."expiresAt"
    OR NEW."providerDeletedAt" IS DISTINCT FROM OLD."providerDeletedAt"
    OR NEW."providerFileUrl" IS NOT NULL
    OR NEW."createdAt" IS DISTINCT FROM OLD."createdAt"
    OR (NEW."failureCode" IS DISTINCT FROM OLD."failureCode"
      AND NOT (OLD."status" = 'PENDING' AND NEW."status" = 'FAILED'))
    OR NEW."uploadedAt" IS DISTINCT FROM OLD."uploadedAt"
      AND NOT (OLD."status" = 'PENDING' AND NEW."status" = 'UPLOADED')
    OR NEW."consumedAt" IS DISTINCT FROM OLD."consumedAt"
      AND NOT (OLD."status" = 'UPLOADED' AND NEW."status" = 'CONSUMED')
    OR NEW."failedAt" IS DISTINCT FROM OLD."failedAt"
      AND NOT (OLD."status" = 'PENDING' AND NEW."status" = 'FAILED')
    OR NEW."expiredAt" IS DISTINCT FROM OLD."expiredAt"
      AND NOT (OLD."status" IN ('PENDING','UPLOADED') AND NEW."status" = 'EXPIRED')
  THEN
    RAISE EXCEPTION 'Case cleanup identity or lifecycle timestamp changed' USING ERRCODE = '23514';
  END IF;

  SELECT a."latestWriteCapabilityExpiresAt" INTO fence
  FROM public."ObjectStorageKeyAllocation" a
  WHERE a."sourceUploadGrantId" = OLD."id"
    AND a."objectKey" = OLD."providerFileKey";
  IF NOT FOUND OR OLD."providerFileKey" IS NULL THEN
    RAISE EXCEPTION 'Case cleanup allocation mismatch' USING ERRCODE = '23514';
  END IF;
  SELECT EXISTS (
    SELECT 1 FROM public."StoredFile" s
    WHERE s."sourceUploadGrantId" = OLD."id"
      OR (s."provider" = OLD."provider"
        AND s."providerObjectKey" = OLD."providerFileKey")
  ) INTO canonical_exists;

  IF OLD."status" IS DISTINCT FROM NEW."status" THEN
    IF NEW."cleanupAttemptCount" IS DISTINCT FROM OLD."cleanupAttemptCount"
      OR NEW."lastCleanupAttemptAt" IS DISTINCT FROM OLD."lastCleanupAttemptAt"
      OR NEW."cleanupFailureCode" IS DISTINCT FROM OLD."cleanupFailureCode"
        AND NEW."status" <> 'CLEANED'
      OR NEW."cleanupLeaseExpiresAt" IS DISTINCT FROM OLD."cleanupLeaseExpiresAt"
        AND NEW."status" <> 'CLEANED'
      OR NEW."providerCleanupConfirmedAt" IS DISTINCT FROM OLD."providerCleanupConfirmedAt"
        AND NEW."status" <> 'CLEANED' THEN
      RAISE EXCEPTION 'Case cleanup claim cannot change with status' USING ERRCODE = '23514';
    END IF;
    IF (OLD."status" = 'PENDING' AND NEW."status" = 'UPLOADED') THEN
      IF NEW."uploadedAt" IS NULL OR NEW."consumedAt" IS NOT NULL
        OR NEW."failedAt" IS NOT NULL OR NEW."expiredAt" IS NOT NULL
        OR NEW."failureCode" IS DISTINCT FROM OLD."failureCode"
        OR NEW."cleanupAttemptCount" <> OLD."cleanupAttemptCount"
        OR NEW."cleanupLeaseExpiresAt" IS NOT NULL
        OR NEW."providerCleanupConfirmedAt" IS NOT NULL THEN
        RAISE EXCEPTION 'Invalid Case upload completion' USING ERRCODE = '23514';
      END IF;
    ELSIF OLD."status" = 'UPLOADED' AND NEW."status" = 'CONSUMED' THEN
      IF NEW."consumedAt" IS NULL OR NOT canonical_exists
        OR NEW."cleanupLeaseExpiresAt" IS NOT NULL
        OR NEW."providerCleanupConfirmedAt" IS NOT NULL
        OR NEW."cleanupAttemptCount" <> OLD."cleanupAttemptCount" THEN
        RAISE EXCEPTION 'Invalid Case attachment transition' USING ERRCODE = '23514';
      END IF;
    ELSIF OLD."status" = 'PENDING' AND NEW."status" = 'FAILED' THEN
      IF NOT cleanup_function_context
        OR canonical_exists OR NEW."failedAt" IS NULL
        OR NEW."failedAt" < now_wall - interval '2 seconds'
        OR NEW."failedAt" > now_wall + interval '2 seconds'
        OR NEW."failureCode" NOT IN ('CASE_OBJECT_SIZE_REJECTED','CASE_S001_REJECTED')
        OR NEW."cleanupAttemptCount" <> OLD."cleanupAttemptCount"
        OR NEW."cleanupLeaseExpiresAt" IS NOT NULL
        OR NEW."providerCleanupConfirmedAt" IS NOT NULL THEN
        RAISE EXCEPTION 'Invalid definitive Case rejection' USING ERRCODE = '23514';
      END IF;
    ELSIF OLD."status" IN ('PENDING','UPLOADED') AND NEW."status" = 'EXPIRED' THEN
      IF canonical_exists OR now_instant < (OLD."expiresAt" AT TIME ZONE 'UTC')
        OR NEW."expiredAt" IS NULL
        OR NEW."expiredAt" < now_wall - interval '2 seconds'
        OR NEW."expiredAt" > now_wall + interval '2 seconds'
        OR NEW."cleanupAttemptCount" <> OLD."cleanupAttemptCount"
        OR NEW."cleanupLeaseExpiresAt" IS NOT NULL
        OR NEW."providerCleanupConfirmedAt" IS NOT NULL THEN
        RAISE EXCEPTION 'Invalid Case expiry' USING ERRCODE = '23514';
      END IF;
    ELSIF OLD."status" IN ('FAILED','EXPIRED') AND NEW."status" = 'CLEANED' THEN
      IF current_user IS DISTINCT FROM ack_owner
        OR NEW."providerCleanupConfirmedAt" IS NULL
        OR NEW."providerCleanupConfirmedAt" < now_instant - interval '2 seconds'
        OR NEW."providerCleanupConfirmedAt" > now_instant + interval '2 seconds'
        OR NEW."cleanupLeaseExpiresAt" IS NOT NULL
        OR NEW."cleanupFailureCode" IS NOT NULL
        OR NEW."lastCleanupAttemptAt" IS DISTINCT FROM OLD."lastCleanupAttemptAt"
        OR NEW."cleanupAttemptCount" <> OLD."cleanupAttemptCount"
        OR canonical_exists THEN
        RAISE EXCEPTION 'Untrusted Case cleanup acknowledgement' USING ERRCODE = '23514';
      END IF;
    ELSE
      RAISE EXCEPTION 'Invalid Case cleanup state transition' USING ERRCODE = '23514';
    END IF;
  ELSE
    IF OLD."status" IN ('CONSUMED','CLEANED')
      AND (NEW."cleanupAttemptCount" IS DISTINCT FROM OLD."cleanupAttemptCount"
        OR NEW."cleanupLeaseExpiresAt" IS DISTINCT FROM OLD."cleanupLeaseExpiresAt"
        OR NEW."providerCleanupConfirmedAt" IS DISTINCT FROM OLD."providerCleanupConfirmedAt"
        OR NEW."cleanupFailureCode" IS DISTINCT FROM OLD."cleanupFailureCode") THEN
      RAISE EXCEPTION 'Terminal Case grant cannot be claimed' USING ERRCODE = '23514';
    END IF;
    IF NEW."providerCleanupConfirmedAt" IS DISTINCT FROM OLD."providerCleanupConfirmedAt" THEN
      RAISE EXCEPTION 'Case cleanup confirmation is function-owned' USING ERRCODE = '23514';
    END IF;
    IF NEW."cleanupAttemptCount" IS DISTINCT FROM OLD."cleanupAttemptCount" THEN
      IF NOT cleanup_function_context OR canonical_exists
        OR OLD."status" NOT IN ('FAILED','EXPIRED')
        OR fence IS NULL OR now_instant < fence + interval '60 seconds'
        OR (OLD."status" = 'EXPIRED'
          AND now_instant < (OLD."expiresAt" AT TIME ZONE 'UTC'))
        OR OLD."cleanupAttemptCount" >= 2147483647
        OR NEW."cleanupAttemptCount" <> OLD."cleanupAttemptCount" + 1
        OR (OLD."cleanupLeaseExpiresAt" IS NOT NULL
          AND OLD."cleanupLeaseExpiresAt" > now_instant)
        OR NEW."cleanupLeaseExpiresAt" IS NULL
        OR NEW."cleanupLeaseExpiresAt" <= now_instant
        OR NEW."cleanupLeaseExpiresAt" > now_instant + interval '5 minutes'
        OR NEW."lastCleanupAttemptAt" IS NULL
        OR NEW."lastCleanupAttemptAt" < now_wall - interval '2 seconds'
        OR NEW."lastCleanupAttemptAt" > now_wall + interval '2 seconds'
        OR NEW."cleanupFailureCode" IS NOT NULL THEN
        RAISE EXCEPTION 'Invalid Case cleanup claim' USING ERRCODE = '23514';
      END IF;
      IF OLD."cleanupAttemptCount" > 0 THEN
        retry_delay := least(interval '24 hours',
          interval '5 minutes' * power(2, least(OLD."cleanupAttemptCount" - 1, 8)));
        IF OLD."lastCleanupAttemptAt" IS NULL
          OR now_instant < (OLD."lastCleanupAttemptAt" AT TIME ZONE 'UTC') + retry_delay THEN
          RAISE EXCEPTION 'Case cleanup retry is delayed' USING ERRCODE = '23514';
        END IF;
      END IF;
    ELSIF NEW."cleanupLeaseExpiresAt" IS DISTINCT FROM OLD."cleanupLeaseExpiresAt"
      OR NEW."cleanupFailureCode" IS DISTINCT FROM OLD."cleanupFailureCode" THEN
      IF NOT cleanup_function_context OR canonical_exists
        OR OLD."status" NOT IN ('FAILED','EXPIRED')
        OR OLD."cleanupAttemptCount" < 1
        OR OLD."cleanupLeaseExpiresAt" IS NULL
        OR NEW."lastCleanupAttemptAt" IS DISTINCT FROM OLD."lastCleanupAttemptAt"
        OR (NEW."cleanupFailureCode" IS NOT NULL
          AND NEW."cleanupFailureCode" NOT IN
            ('PROVIDER_UNAVAILABLE','PROVIDER_AMBIGUOUS','PRESENCE_UNCONFIRMED')) THEN
        RAISE EXCEPTION 'Invalid Case cleanup lease update' USING ERRCODE = '23514';
      END IF;
      IF NEW."cleanupLeaseExpiresAt" IS NOT NULL
        AND (OLD."cleanupLeaseExpiresAt" <= now_instant
          OR NEW."cleanupLeaseExpiresAt" <= OLD."cleanupLeaseExpiresAt"
          OR NEW."cleanupLeaseExpiresAt" > now_instant + interval '5 minutes'
          OR NEW."cleanupFailureCode" IS NOT NULL) THEN
        RAISE EXCEPTION 'Invalid Case cleanup lease renewal' USING ERRCODE = '23514';
      END IF;
    ELSIF NEW."lastCleanupAttemptAt" IS DISTINCT FROM OLD."lastCleanupAttemptAt" THEN
      RAISE EXCEPTION 'Case cleanup attempt timestamp is claim-owned' USING ERRCODE = '23514';
    END IF;
  END IF;

  IF NEW."status" <> 'CLEANED'
    AND NEW."providerCleanupConfirmedAt" IS NOT NULL THEN
    RAISE EXCEPTION 'Uncleaned Case grant has cleanup confirmation' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END;
$guard$;

CREATE TRIGGER "FileUploadGrant_object_cleanup_lifecycle"
BEFORE INSERT OR UPDATE OR DELETE ON public."FileUploadGrant"
FOR EACH ROW EXECUTE FUNCTION public."FileUploadGrant_object_cleanup_guard"();

CREATE FUNCTION public."StoredFile_object_cleanup_insert_guard"()
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
    OR NEW."detectedMimeType" <> 'image/jpeg'
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
    ) THEN
    RAISE EXCEPTION 'Case StoredFile is not backed by an attachable grant' USING ERRCODE = '23514';
  END IF;
  RETURN NEW;
END;
$guard$;

CREATE TRIGGER "StoredFile_object_cleanup_insert"
BEFORE INSERT ON public."StoredFile"
FOR EACH ROW EXECUTE FUNCTION public."StoredFile_object_cleanup_insert_guard"();

-- The application role cannot set FAILED directly. The trusted Case completion
-- writer calls this private function only after exact-object retrieval and a
-- deterministic S001 structural rejection; provider and decoder uncertainty
-- remains PENDING. The function repeats the database eligibility checks.
CREATE FUNCTION labos_cleanup_private.reject_case_s001(grant_id text)
RETURNS TABLE(id text) LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $reject$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  now_instant timestamptz := clock_timestamp();
  now_wall timestamp := clock_timestamp() AT TIME ZONE 'UTC';
BEGIN
  SELECT * INTO g FROM public."FileUploadGrant"
  WHERE "FileUploadGrant"."id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage'
    OR g."targetType" <> 'case' OR g."targetId" IS NULL
    OR g."createdByMemberId" IS NULL
    OR g."provider" <> 'OBJECT_STORAGE' OR g."providerFileKey" IS NULL
    OR g."status" <> 'PENDING'
    OR g."providerFileUrl" IS NOT NULL
    OR g."uploadedAt" IS NOT NULL OR g."consumedAt" IS NOT NULL
    OR g."failedAt" IS NOT NULL OR g."expiredAt" IS NOT NULL
    OR g."providerDeletedAt" IS NOT NULL
    OR now_instant >= (g."expiresAt" AT TIME ZONE 'UTC')
    OR NOT EXISTS (
      SELECT 1 FROM public."Case" c
      JOIN public."Lab" l ON l."id" = c."labId"
      WHERE c."id" = g."targetId" AND c."labId" = g."labId"
        AND c."status" = 'DRAFT' AND l."organizationId" = g."organizationId")
    OR NOT EXISTS (
      SELECT 1 FROM public.member m
      WHERE m."id" = g."createdByMemberId"
        AND m."organizationId" = g."organizationId")
    OR NOT EXISTS (
      SELECT 1 FROM public."ObjectStorageKeyAllocation" a
      WHERE a."sourceUploadGrantId" = g."id"
        AND a."objectKey" = g."providerFileKey"
        AND a."latestWriteCapabilityExpiresAt" IS NOT NULL)
    OR EXISTS (
      SELECT 1 FROM public."CaseClinicalUploadEvidence" e
      WHERE e."uploadGrantId" = g."id")
    OR EXISTS (
      SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id"
        OR (s."provider" = g."provider"
          AND s."providerObjectKey" = g."providerFileKey"))
  THEN
    RAISE EXCEPTION 'Case S001 rejection denied' USING ERRCODE = '23514';
  END IF;
  RETURN QUERY UPDATE public."FileUploadGrant" f SET
    "status" = 'FAILED', "failureCode" = 'CASE_S001_REJECTED',
    "failedAt" = now_wall, "updatedAt" = now_wall
  WHERE f."id" = g."id" RETURNING f."id";
END;
$reject$;
REVOKE ALL ON FUNCTION labos_cleanup_private.reject_case_s001(text) FROM PUBLIC;

-- Each worker claim receives a new generation under the grant lock. Worker
-- table grants do not include lease/attempt columns, so a stale worker cannot
-- directly mutate a successor's claim.
CREATE FUNCTION labos_cleanup_private.claim_object_storage_cleanup(grant_id text)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $claim$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  fence timestamptz;
  now_instant timestamptz := clock_timestamp();
  retry_delay interval;
  next_generation integer;
BEGIN
  SELECT * INTO g FROM public."FileUploadGrant" WHERE "id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage'
    OR g."targetType" <> 'case' OR g."targetId" IS NULL
    OR g."provider" <> 'OBJECT_STORAGE' OR g."providerFileKey" IS NULL
    OR g."status" NOT IN ('FAILED','EXPIRED')
    OR g."providerCleanupConfirmedAt" IS NOT NULL
    OR g."cleanupAttemptCount" >= 2147483647
    OR (g."cleanupLeaseExpiresAt" IS NOT NULL
      AND g."cleanupLeaseExpiresAt" > now_instant)
    OR (g."status" = 'EXPIRED'
      AND now_instant < (g."expiresAt" AT TIME ZONE 'UTC'))
    OR NOT EXISTS (
      SELECT 1 FROM public."Case" c
      JOIN public."Lab" l ON l."id" = c."labId"
      WHERE c."id" = g."targetId" AND c."labId" = g."labId"
        AND l."organizationId" = g."organizationId")
    OR EXISTS (
      SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id"
        OR (s."provider" = g."provider"
          AND s."providerObjectKey" = g."providerFileKey"))
  THEN
    RAISE EXCEPTION 'Case cleanup claim denied' USING ERRCODE = '23514';
  END IF;
  SELECT a."latestWriteCapabilityExpiresAt" INTO fence
  FROM public."ObjectStorageKeyAllocation" a
  WHERE a."sourceUploadGrantId" = g."id"
    AND a."objectKey" = g."providerFileKey";
  IF NOT FOUND OR fence IS NULL OR now_instant < fence + interval '60 seconds' THEN
    RAISE EXCEPTION 'Case cleanup claim fenced' USING ERRCODE = '23514';
  END IF;
  IF g."cleanupAttemptCount" > 0 THEN
    retry_delay := least(interval '24 hours',
      interval '5 minutes' * power(2, least(g."cleanupAttemptCount" - 1, 8)));
    IF g."lastCleanupAttemptAt" IS NULL
      OR now_instant < (g."lastCleanupAttemptAt" AT TIME ZONE 'UTC') + retry_delay THEN
      RAISE EXCEPTION 'Case cleanup retry delayed' USING ERRCODE = '23514';
    END IF;
  END IF;
  UPDATE public."FileUploadGrant" SET
    "cleanupAttemptCount" = g."cleanupAttemptCount" + 1,
    "lastCleanupAttemptAt" = now_instant AT TIME ZONE 'UTC',
    "cleanupLeaseExpiresAt" = now_instant + interval '5 minutes',
    "cleanupFailureCode" = NULL,
    "updatedAt" = now_instant AT TIME ZONE 'UTC'
  WHERE "id" = g."id"
  RETURNING "cleanupAttemptCount" INTO next_generation;
  RETURN next_generation;
END;
$claim$;
REVOKE ALL ON FUNCTION labos_cleanup_private.claim_object_storage_cleanup(text)
  FROM PUBLIC;

CREATE FUNCTION labos_cleanup_private.renew_object_storage_cleanup(
  grant_id text, claim_generation integer)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $renew$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  now_instant timestamptz := clock_timestamp();
  fence timestamptz;
BEGIN
  SELECT * INTO g FROM public."FileUploadGrant" WHERE "id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage'
    OR g."provider" <> 'OBJECT_STORAGE'
    OR g."status" NOT IN ('FAILED','EXPIRED')
    OR g."cleanupAttemptCount" IS DISTINCT FROM claim_generation
    OR claim_generation < 1
    OR g."cleanupLeaseExpiresAt" IS NULL
    OR g."cleanupLeaseExpiresAt" <= now_instant
    OR g."providerCleanupConfirmedAt" IS NOT NULL
    OR EXISTS (
      SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id"
        OR (s."provider" = g."provider"
          AND s."providerObjectKey" = g."providerFileKey"))
  THEN
    RAISE EXCEPTION 'Case cleanup renewal denied' USING ERRCODE = '23514';
  END IF;
  SELECT a."latestWriteCapabilityExpiresAt" INTO fence
  FROM public."ObjectStorageKeyAllocation" a
  WHERE a."sourceUploadGrantId" = g."id"
    AND a."objectKey" = g."providerFileKey";
  IF NOT FOUND OR fence IS NULL
    OR now_instant < fence + interval '60 seconds'
    OR (g."status" = 'EXPIRED'
      AND now_instant < (g."expiresAt" AT TIME ZONE 'UTC')) THEN
    RAISE EXCEPTION 'Case cleanup renewal fenced' USING ERRCODE = '23514';
  END IF;
  UPDATE public."FileUploadGrant" SET
    "cleanupLeaseExpiresAt" = now_instant + interval '5 minutes',
    "updatedAt" = now_instant AT TIME ZONE 'UTC'
  WHERE "id" = g."id";
END;
$renew$;
REVOKE ALL ON FUNCTION labos_cleanup_private.renew_object_storage_cleanup(text, integer)
  FROM PUBLIC;

CREATE FUNCTION labos_cleanup_private.record_object_storage_cleanup_failure(
  grant_id text, claim_generation integer, normalized_code text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $failure$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  now_instant timestamptz := clock_timestamp();
BEGIN
  IF normalized_code IS NULL OR normalized_code NOT IN
    ('PROVIDER_UNAVAILABLE','PROVIDER_AMBIGUOUS','PRESENCE_UNCONFIRMED')
  THEN
    RAISE EXCEPTION 'Invalid Case cleanup failure code' USING ERRCODE = '23514';
  END IF;
  SELECT * INTO g FROM public."FileUploadGrant" WHERE "id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage'
    OR g."provider" <> 'OBJECT_STORAGE'
    OR g."status" NOT IN ('FAILED','EXPIRED')
    OR g."cleanupAttemptCount" IS DISTINCT FROM claim_generation
    OR claim_generation < 1
    OR g."cleanupLeaseExpiresAt" IS NULL
    OR g."cleanupLeaseExpiresAt" <= now_instant
    OR g."providerCleanupConfirmedAt" IS NOT NULL
    OR EXISTS (
      SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id"
        OR (s."provider" = g."provider"
          AND s."providerObjectKey" = g."providerFileKey"))
  THEN
    RAISE EXCEPTION 'Case cleanup failure record denied' USING ERRCODE = '23514';
  END IF;
  UPDATE public."FileUploadGrant" SET
    "cleanupLeaseExpiresAt" = NULL,
    "cleanupFailureCode" = normalized_code,
    "updatedAt" = now_instant AT TIME ZONE 'UTC'
  WHERE "id" = g."id";
END;
$failure$;
REVOKE ALL ON FUNCTION
  labos_cleanup_private.record_object_storage_cleanup_failure(text, integer, text)
  FROM PUBLIC;

-- The worker is the external ABSENT-attestation principal. PostgreSQL can
-- validate only the live claim, exact key, fence and canonical exclusions.
CREATE FUNCTION labos_cleanup_private.ack_object_storage_cleanup(
  grant_id text, claim_generation integer)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $ack$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  fence timestamptz;
  now_instant timestamptz := clock_timestamp();
BEGIN
  SELECT * INTO g FROM public."FileUploadGrant"
    WHERE "id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage'
    OR g."targetType" <> 'case'
    OR g."targetId" IS NULL
    OR g."provider" <> 'OBJECT_STORAGE'
    OR g."providerFileKey" IS NULL
    OR g."status" NOT IN ('FAILED','EXPIRED')
    OR g."cleanupAttemptCount" IS DISTINCT FROM claim_generation
    OR claim_generation < 1
    OR g."cleanupLeaseExpiresAt" IS NULL
    OR g."cleanupLeaseExpiresAt" <= now_instant
    OR g."providerCleanupConfirmedAt" IS NOT NULL
    OR (g."status" = 'EXPIRED'
      AND now_instant < (g."expiresAt" AT TIME ZONE 'UTC'))
    OR NOT EXISTS (
      SELECT 1 FROM public."Case" c
      JOIN public."Lab" l ON l."id" = c."labId"
      WHERE c."id" = g."targetId" AND c."labId" = g."labId"
        AND l."organizationId" = g."organizationId")
    OR EXISTS (
      SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id"
        OR (s."provider" = g."provider"
          AND s."providerObjectKey" = g."providerFileKey"))
  THEN
    RAISE EXCEPTION 'Case cleanup acknowledgement denied' USING ERRCODE = '23514';
  END IF;
  SELECT a."latestWriteCapabilityExpiresAt" INTO fence
  FROM public."ObjectStorageKeyAllocation" a
  WHERE a."sourceUploadGrantId" = g."id"
    AND a."objectKey" = g."providerFileKey";
  IF NOT FOUND OR fence IS NULL OR now_instant < fence + interval '60 seconds' THEN
    RAISE EXCEPTION 'Case cleanup acknowledgement fenced' USING ERRCODE = '23514';
  END IF;
  UPDATE public."FileUploadGrant" SET
    "status" = 'CLEANED',
    "providerCleanupConfirmedAt" = now_instant,
    "cleanupLeaseExpiresAt" = NULL,
    "cleanupFailureCode" = NULL,
    "updatedAt" = now_instant AT TIME ZONE 'UTC'
  WHERE "id" = g."id";
END;
$ack$;
REVOKE ALL ON FUNCTION labos_cleanup_private.ack_object_storage_cleanup(text, integer)
  FROM PUBLIC;

COMMIT;
