-- A1-I2-I1: additive, scoped Case OBJECT_STORAGE reconciliation successor.
-- Requires the accepted A1-I1 private functions and their NOLOGIN owner.
-- No runtime credential, provider operation, or target-specific role binding.
BEGIN;

ALTER TABLE public."FileUploadGrant"
  ADD COLUMN "cleanupNextCheckAt" timestamptz(6),
  ADD COLUMN "cleanupReconcileStage" smallint,
  ADD COLUMN "cleanupLastCheckOutcome" text;

ALTER TABLE public."FileUploadGrant"
  ADD CONSTRAINT "FileUploadGrant_case_reconcile_shape" CHECK (
    "cleanupReconcileStage" IS NULL OR "cleanupReconcileStage" BETWEEN 0 AND 4
  ),
  ADD CONSTRAINT "FileUploadGrant_case_reconcile_outcome" CHECK (
    "cleanupLastCheckOutcome" IS NULL OR
    "cleanupLastCheckOutcome" IN ('ABSENT','PRESENT','UNKNOWN')
  ),
  ADD CONSTRAINT "FileUploadGrant_case_reconcile_due" CHECK (
    ("cleanupReconcileStage" IS NULL AND "cleanupNextCheckAt" IS NULL)
    OR ("cleanupReconcileStage" BETWEEN 0 AND 3 AND "cleanupNextCheckAt" IS NOT NULL)
    OR ("cleanupReconcileStage" = 4 AND "cleanupNextCheckAt" IS NULL
      AND "cleanupLastCheckOutcome" = 'ABSENT')
  ),
  ADD CONSTRAINT "FileUploadGrant_case_reconcile_scope" CHECK (
    ("cleanupReconcileStage" IS NULL AND "cleanupLastCheckOutcome" IS NULL)
    OR ("boundaryId" = 'N-FILE-110' AND "purpose" = 'case.asset.add.stage'
      AND "provider" = 'OBJECT_STORAGE' AND "status" IN ('FAILED','EXPIRED','CLEANED'))
  );

CREATE INDEX "FileUploadGrant_case_cleanup_due_idx"
  ON public."FileUploadGrant" ("cleanupNextCheckAt", "id")
  WHERE "boundaryId" = 'N-FILE-110' AND "purpose" = 'case.asset.add.stage'
    AND "provider" = 'OBJECT_STORAGE'
    AND "status" IN ('FAILED','EXPIRED','CLEANED')
    AND "cleanupNextCheckAt" IS NOT NULL;
CREATE INDEX "FileUploadGrant_case_expiry_sweep_idx"
  ON public."FileUploadGrant" ("expiresAt", "id")
  WHERE "boundaryId" = 'N-FILE-110' AND "purpose" = 'case.asset.add.stage'
    AND "provider" = 'OBJECT_STORAGE' AND "status" IN ('PENDING','UPLOADED');

-- The role creator may have a managed ADMIN/NOSET membership. Temporary SET
-- membership for ownership transfer is granted and revoked within this transaction.
DO $roles$
DECLARE
  role_name text;
  ack_owner text;
BEGIN
  SELECT pg_catalog.pg_get_userbyid(p.proowner) INTO ack_owner
  FROM pg_catalog.pg_proc p
  WHERE p.oid = pg_catalog.to_regprocedure(
    'labos_cleanup_private.ack_object_storage_cleanup(text,integer)');
  IF ack_owner IS NULL OR NOT EXISTS (
    SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = ack_owner AND NOT rolcanlogin
      AND NOT rolsuper AND NOT rolcreaterole AND NOT rolcreatedb AND NOT rolbypassrls
  ) THEN
    RAISE EXCEPTION 'A1-I1 NOLOGIN ACK owner is required';
  END IF;
  -- Preserve any earlier runner membership; the later grantor-specific
  -- revoke may remove only a row this transaction itself introduced.
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_auth_members m
    JOIN pg_catalog.pg_roles granted ON granted.oid = m.roleid
    JOIN pg_catalog.pg_roles member ON member.oid = m.member
    JOIN pg_catalog.pg_roles grantor ON grantor.oid = m.grantor
    WHERE granted.rolname = ack_owner AND member.rolname = current_user
      AND grantor.rolname = current_user)
  THEN RAISE EXCEPTION 'Pre-existing runner ACK membership conflicts with temporary SET grant'; END IF;
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
    WHERE p.oid IN (
      pg_catalog.to_regprocedure('labos_cleanup_private.reject_case_s001(text)'),
      pg_catalog.to_regprocedure('labos_cleanup_private.claim_object_storage_cleanup(text)'),
      pg_catalog.to_regprocedure('labos_cleanup_private.renew_object_storage_cleanup(text,integer)'),
      pg_catalog.to_regprocedure('labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text)'))
      AND pg_catalog.pg_get_userbyid(p.proowner) <> ack_owner)
  THEN RAISE EXCEPTION 'A1-I1 function ownership mismatch'; END IF;
  FOREACH role_name IN ARRAY ARRAY[
    'labos_case_expiry_owner','labos_case_reject_owner',
    'labos_case_claim_owner','labos_case_renew_owner',
    'labos_case_present_owner','labos_case_failure_owner',
    'labos_case_reopen_owner',
    'labos_case_expiry_executor','labos_case_reopen_executor'
  ] LOOP
    IF EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = role_name) THEN
      RAISE EXCEPTION 'Successor role already exists: %', role_name;
    END IF;
    EXECUTE pg_catalog.format('CREATE ROLE %I NOLOGIN NOINHERIT NOCREATEROLE NOCREATEDB NOBYPASSRLS NOREPLICATION', role_name);
  END LOOP;
  -- The accepted A1-I1 runtime identities are the exact existing callers.
  -- A target missing either identity must stop before replacing their grants.
  IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles
      WHERE rolname = 'labos_verification_app' AND NOT rolsuper
        AND NOT rolcreaterole AND NOT rolbypassrls)
    OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles
      WHERE rolname = 'labos_verification_cleanup' AND NOT rolsuper
        AND NOT rolcreaterole AND NOT rolbypassrls)
    OR pg_catalog.pg_has_role('labos_verification_app', ack_owner, 'SET')
    OR pg_catalog.pg_has_role('labos_verification_app', ack_owner, 'USAGE')
    OR pg_catalog.pg_has_role('labos_verification_cleanup', ack_owner, 'SET')
    OR pg_catalog.pg_has_role('labos_verification_cleanup', ack_owner, 'USAGE')
  THEN RAISE EXCEPTION 'Accepted A1-I1 caller binding is unavailable or unsafe'; END IF;
END;
$roles$;

-- The five installed A1-I1 functions may have only their accepted direct
-- executor grant. Inventory each stored ACL (including default PUBLIC) before replacing or
-- dropping any signature. An unexpected grant (including a managed-role
-- grant or PUBLIC) is a target conflict, not authority to revoke it.
DO $predecessor_function_acl$
DECLARE f record; grant_row record; grantee_name text;
BEGIN
  FOR f IN SELECT * FROM (VALUES
    ('reject_case_s001(text)', 'labos_verification_app'),
    ('claim_object_storage_cleanup(text)', 'labos_verification_cleanup'),
    ('renew_object_storage_cleanup(text,integer)', 'labos_verification_cleanup'),
    ('record_object_storage_cleanup_failure(text,integer,text)', 'labos_verification_cleanup'),
    ('ack_object_storage_cleanup(text,integer)', 'labos_verification_cleanup')
  ) AS expected(signature, executor_name)
  LOOP
    IF pg_catalog.to_regprocedure('labos_cleanup_private.' || f.signature) IS NULL
    THEN RAISE EXCEPTION 'A1-I1 function missing: %', f.signature; END IF;
    IF NOT EXISTS (
      SELECT 1 FROM pg_catalog.pg_proc p
      CROSS JOIN LATERAL pg_catalog.aclexplode(coalesce(
        p.proacl, pg_catalog.acldefault('f', p.proowner))) x
      JOIN pg_catalog.pg_roles r ON r.oid = x.grantee
      WHERE p.oid = pg_catalog.to_regprocedure('labos_cleanup_private.' || f.signature)
        AND r.rolname = f.executor_name AND x.privilege_type = 'EXECUTE'
        AND NOT x.is_grantable
    ) THEN RAISE EXCEPTION 'A1-I1 executor grant missing: %', f.signature; END IF;
    FOR grant_row IN
      SELECT x.grantee, x.privilege_type, x.is_grantable, p.proowner
      FROM pg_catalog.pg_proc p
      CROSS JOIN LATERAL pg_catalog.aclexplode(coalesce(
        p.proacl, pg_catalog.acldefault('f', p.proowner))) x
      WHERE p.oid = pg_catalog.to_regprocedure('labos_cleanup_private.' || f.signature)
        AND x.grantee <> p.proowner
    LOOP
      SELECT r.rolname INTO grantee_name FROM pg_catalog.pg_roles r
        WHERE r.oid = grant_row.grantee;
      IF grantee_name IS DISTINCT FROM f.executor_name
        OR grant_row.privilege_type <> 'EXECUTE' OR grant_row.is_grantable
      THEN RAISE EXCEPTION 'Unexpected A1-I1 function grant on % to %',
        f.signature, coalesce(grantee_name, 'PUBLIC'); END IF;
    END LOOP;
  END LOOP;
END;
$predecessor_function_acl$;

-- Distinct owners are the trigger's operation identity. No runtime role is
-- granted owner membership. Migration-owner SET membership is temporary.
DO $temporary_owner_membership$
DECLARE role_name text; ack_owner text;
BEGIN
  FOREACH role_name IN ARRAY ARRAY[
    'labos_case_expiry_owner','labos_case_reject_owner',
    'labos_case_claim_owner','labos_case_renew_owner',
    'labos_case_present_owner','labos_case_failure_owner',
    'labos_case_reopen_owner'
  ] LOOP
    EXECUTE pg_catalog.format('GRANT USAGE, CREATE ON SCHEMA labos_cleanup_private TO %I', role_name);
    EXECUTE pg_catalog.format(
      'GRANT %I TO %I WITH ADMIN FALSE, INHERIT FALSE, SET TRUE GRANTED BY %I',
      role_name, current_user, current_user);
  END LOOP;
  SELECT pg_catalog.pg_get_userbyid(p.proowner) INTO ack_owner
  FROM pg_catalog.pg_proc p WHERE p.oid = pg_catalog.to_regprocedure(
    'labos_cleanup_private.ack_object_storage_cleanup(text,integer)');
  EXECUTE pg_catalog.format('GRANT USAGE, CREATE ON SCHEMA labos_cleanup_private TO %I', ack_owner);
  EXECUTE pg_catalog.format(
    'GRANT %I TO %I WITH ADMIN FALSE, INHERIT FALSE, SET TRUE GRANTED BY %I',
    ack_owner, current_user, current_user);
  -- The installed functions must be replaced as their existing owner.
  -- That owner can transfer each replacement only while it can SET ROLE
  -- to the corresponding new owner; both grants are transaction-local.
  FOREACH role_name IN ARRAY ARRAY[
    'labos_case_reject_owner','labos_case_claim_owner','labos_case_renew_owner'
  ] LOOP
    EXECUTE pg_catalog.format(
      'GRANT %I TO %I WITH ADMIN FALSE, INHERIT FALSE, SET TRUE GRANTED BY %I',
      role_name, ack_owner, current_user);
  END LOOP;
END;
$temporary_owner_membership$;

-- The installed ACK owner is retained for ACK only. Its other four functions
-- are transferred after their successor bodies have replaced the old bodies.

CREATE OR REPLACE FUNCTION public."FileUploadGrant_object_cleanup_guard"()
RETURNS trigger LANGUAGE plpgsql SECURITY INVOKER
SET search_path = pg_catalog, public, pg_temp AS $guard$
DECLARE
  scoped boolean;
  now_instant timestamptz := pg_catalog.clock_timestamp();
  now_wall timestamp := pg_catalog.clock_timestamp() AT TIME ZONE 'UTC';
  fence timestamptz;
  ack_owner text;
  canonical_exists boolean;
  case_exists boolean;
  same_except_allowed boolean;
BEGIN
  SELECT pg_catalog.pg_get_userbyid(p.proowner) INTO ack_owner
  FROM pg_catalog.pg_proc p WHERE p.oid = pg_catalog.to_regprocedure(
    'labos_cleanup_private.ack_object_storage_cleanup(text,integer)');
  IF TG_OP = 'INSERT' THEN
    IF NEW."provider" = 'OBJECT_STORAGE' AND NEW."boundaryId" = 'N-FILE-110'
      AND NEW."purpose" = 'case.asset.add.stage' AND
      (NEW."cleanupAttemptCount" <> 0 OR NEW."lastCleanupAttemptAt" IS NOT NULL
        OR NEW."cleanupLeaseExpiresAt" IS NOT NULL
        OR NEW."providerCleanupConfirmedAt" IS NOT NULL
        OR NEW."cleanupFailureCode" IS NOT NULL
        OR NEW."cleanupReconcileStage" IS NOT NULL
        OR NEW."cleanupNextCheckAt" IS NOT NULL
        OR NEW."cleanupLastCheckOutcome" IS NOT NULL)
    THEN RAISE EXCEPTION 'Case cleanup state on new grant' USING ERRCODE='23514'; END IF;
    RETURN NEW;
  END IF;
  scoped := OLD."provider" = 'OBJECT_STORAGE' AND OLD."boundaryId" = 'N-FILE-110'
    AND OLD."purpose" = 'case.asset.add.stage';
  IF TG_OP = 'DELETE' THEN
    IF scoped THEN RAISE EXCEPTION 'Case object key grant is retained' USING ERRCODE='23514'; END IF;
    RETURN OLD;
  END IF;
  scoped := scoped OR (NEW."provider" = 'OBJECT_STORAGE'
    AND NEW."boundaryId" = 'N-FILE-110' AND NEW."purpose" = 'case.asset.add.stage');
  IF NOT scoped THEN RETURN NEW; END IF;

  IF NEW."provider" IS DISTINCT FROM OLD."provider"
    OR NEW."boundaryId" IS DISTINCT FROM OLD."boundaryId"
    OR NEW."purpose" IS DISTINCT FROM OLD."purpose"
    OR NEW."targetType" IS DISTINCT FROM OLD."targetType"
    OR NEW."targetId" IS DISTINCT FROM OLD."targetId"
    OR NEW."organizationId" IS DISTINCT FROM OLD."organizationId"
    OR NEW."labId" IS DISTINCT FROM OLD."labId"
    OR (NEW."createdByMemberId" IS DISTINCT FROM OLD."createdByMemberId"
      AND NOT (OLD."createdByMemberId" IS NOT NULL AND NEW."createdByMemberId" IS NULL))
    OR NEW."caseClinicalValidatedSuffix" IS DISTINCT FROM OLD."caseClinicalValidatedSuffix"
    OR NEW."expiresAt" IS DISTINCT FROM OLD."expiresAt"
    OR NEW."createdAt" IS DISTINCT FROM OLD."createdAt"
    OR NEW."providerDeletedAt" IS DISTINCT FROM OLD."providerDeletedAt"
    OR NEW."providerFileUrl" IS DISTINCT FROM OLD."providerFileUrl"
  THEN RAISE EXCEPTION 'Case cleanup identity is immutable' USING ERRCODE='23514'; END IF;
  -- FK SET NULL for a removed Member is independent of cleanup state.
  IF NEW."createdByMemberId" IS DISTINCT FROM OLD."createdByMemberId" THEN
    IF to_jsonb(NEW) - ARRAY['createdByMemberId']::text[]
      IS DISTINCT FROM to_jsonb(OLD) - ARRAY['createdByMemberId']::text[]
    THEN RAISE EXCEPTION 'Member unlink cannot mutate cleanup' USING ERRCODE='23514'; END IF;
    RETURN NEW;
  END IF;
  -- Initial key reservation is an accepted PENDING-only R2-02 operation.
  IF NEW."providerFileKey" IS DISTINCT FROM OLD."providerFileKey" THEN
    IF OLD."status" <> 'PENDING' OR NEW."status" <> 'PENDING'
      OR OLD."providerFileKey" IS NOT NULL OR NEW."providerFileKey" IS NULL
      OR to_jsonb(NEW) - ARRAY['providerFileKey','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['providerFileKey','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Invalid Case key reservation' USING ERRCODE='23514'; END IF;
    RETURN NEW;
  END IF;

  SELECT a."latestWriteCapabilityExpiresAt" INTO fence
  FROM public."ObjectStorageKeyAllocation" a
  WHERE a."sourceUploadGrantId" = OLD."id"
    AND a."objectKey" = OLD."providerFileKey";
  SELECT EXISTS (SELECT 1 FROM public."StoredFile" s
    WHERE s."sourceUploadGrantId" = OLD."id"
      OR (s."provider" = OLD."provider"
        AND s."providerObjectKey" = OLD."providerFileKey")) INTO canonical_exists;
  SELECT EXISTS (SELECT 1 FROM public."Case" c
    JOIN public."Lab" l ON l."id" = c."labId"
    WHERE c."id" = OLD."targetId" AND c."labId" = OLD."labId"
      AND l."organizationId" = OLD."organizationId") INTO case_exists;

  IF OLD."status" = 'PENDING' AND NEW."status" = 'UPLOADED' THEN
    IF canonical_exists OR NOT case_exists OR fence IS NULL
      OR now_instant >= OLD."expiresAt" AT TIME ZONE 'UTC'
      OR NEW."uploadedAt" IS NULL
      OR to_jsonb(NEW) - ARRAY['status','uploadedAt','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['status','uploadedAt','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Invalid Case completion' USING ERRCODE='23514'; END IF;
    RETURN NEW;
  END IF;
  IF OLD."status" = 'UPLOADED' AND NEW."status" = 'CONSUMED' THEN
    IF NOT canonical_exists OR NEW."consumedAt" IS NULL
      OR to_jsonb(NEW) - ARRAY['status','consumedAt','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['status','consumedAt','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Invalid Case attachment' USING ERRCODE='23514'; END IF;
    RETURN NEW;
  END IF;

  -- Quarantine is same-status, stage/due/outcome-null and function-owned.
  IF OLD."status" = NEW."status" AND OLD."status" IN ('PENDING','UPLOADED')
    AND NEW."cleanupFailureCode" IS DISTINCT FROM OLD."cleanupFailureCode" THEN
    IF current_user NOT IN ('labos_case_expiry_owner','labos_case_reject_owner')
      OR (current_user = 'labos_case_reject_owner' AND OLD."status" <> 'PENDING')
      OR NEW."cleanupFailureCode" NOT IN
        ('QUARANTINE_IDENTITY','QUARANTINE_ALLOCATION','QUARANTINE_CANONICAL')
      OR NEW."cleanupReconcileStage" IS NOT NULL
      OR NEW."cleanupNextCheckAt" IS NOT NULL
      OR NEW."cleanupLastCheckOutcome" IS NOT NULL
      OR to_jsonb(NEW) - ARRAY['cleanupFailureCode','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['cleanupFailureCode','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Untrusted Case quarantine' USING ERRCODE='23514'; END IF;
    RETURN NEW;
  END IF;

  IF NEW."status" = 'EXPIRED' AND OLD."status" IN ('PENDING','UPLOADED') THEN
    IF current_user <> 'labos_case_expiry_owner' OR canonical_exists OR NOT case_exists
      OR fence IS NULL OR now_instant < OLD."expiresAt" AT TIME ZONE 'UTC'
      OR NEW."expiredAt" IS NULL
      OR NEW."expiredAt" < now_wall - interval '2 seconds'
      OR NEW."expiredAt" > now_wall + interval '2 seconds'
      OR NEW."cleanupReconcileStage" IS DISTINCT FROM 0
      OR NEW."cleanupLastCheckOutcome" IS NOT NULL
      OR NEW."cleanupFailureCode" IS NOT NULL
      OR NEW."cleanupNextCheckAt" < fence + interval '60 minutes'
      OR NEW."cleanupNextCheckAt" < now_instant - interval '2 seconds'
      OR NEW."cleanupNextCheckAt" >
        greatest(now_instant + interval '2 seconds', fence + interval '60 minutes')
      OR to_jsonb(NEW) - ARRAY['status','expiredAt','cleanupReconcileStage',
          'cleanupNextCheckAt','cleanupFailureCode','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['status','expiredAt',
          'cleanupReconcileStage','cleanupNextCheckAt','cleanupFailureCode','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Untrusted Case expiry' USING ERRCODE='23514'; END IF;
    RETURN NEW;
  END IF;
  IF NEW."status" = 'FAILED' AND OLD."status" = 'PENDING' THEN
    IF current_user <> 'labos_case_reject_owner' OR canonical_exists OR NOT case_exists
      OR fence IS NULL OR now_instant >= OLD."expiresAt" AT TIME ZONE 'UTC'
      OR NEW."failureCode" NOT IN ('CASE_OBJECT_SIZE_REJECTED','CASE_S001_REJECTED')
      OR NEW."failedAt" IS NULL
      OR NEW."failedAt" < now_wall - interval '2 seconds'
      OR NEW."failedAt" > now_wall + interval '2 seconds'
      OR NEW."cleanupReconcileStage" IS DISTINCT FROM 0
      OR NEW."cleanupLastCheckOutcome" IS NOT NULL
      OR NEW."cleanupFailureCode" IS NOT NULL
      OR NEW."cleanupNextCheckAt" < fence + interval '60 minutes'
      OR NEW."cleanupNextCheckAt" < now_instant - interval '2 seconds'
      OR NEW."cleanupNextCheckAt" >
        greatest(now_instant + interval '2 seconds', fence + interval '60 minutes')
      OR to_jsonb(NEW) - ARRAY['status','failureCode','failedAt',
          'cleanupReconcileStage','cleanupNextCheckAt','cleanupFailureCode','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['status','failureCode','failedAt',
          'cleanupReconcileStage','cleanupNextCheckAt','cleanupFailureCode','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Untrusted Case rejection' USING ERRCODE='23514'; END IF;
    RETURN NEW;
  END IF;

  IF current_user = 'labos_case_reopen_owner' THEN
    IF OLD."status" <> 'CLEANED' OR NEW."status" <> 'CLEANED'
      OR OLD."cleanupReconcileStage" IS DISTINCT FROM 4
      OR NEW."cleanupReconcileStage" IS DISTINCT FROM 0
      OR NEW."cleanupLastCheckOutcome" IS DISTINCT FROM 'PRESENT'
      OR NEW."cleanupNextCheckAt" < now_instant - interval '2 seconds'
      OR NEW."cleanupNextCheckAt" > now_instant + interval '2 seconds'
      OR NOT case_exists OR canonical_exists OR fence IS NULL
      OR to_jsonb(NEW) - ARRAY['cleanupReconcileStage',
          'cleanupLastCheckOutcome','cleanupNextCheckAt','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['cleanupReconcileStage',
          'cleanupLastCheckOutcome','cleanupNextCheckAt','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Invalid Case reopen' USING ERRCODE='23514'; END IF;
    RETURN NEW;
  END IF;
  IF OLD."status" NOT IN ('FAILED','EXPIRED','CLEANED')
    OR OLD."cleanupReconcileStage" IS NULL OR OLD."cleanupReconcileStage" = 4
    OR NOT case_exists OR canonical_exists OR fence IS NULL
    OR now_instant < fence + interval '60 minutes'
  THEN RAISE EXCEPTION 'Case cleanup is ineligible' USING ERRCODE='23514'; END IF;
  IF OLD."status" = 'EXPIRED' AND now_instant < OLD."expiresAt" AT TIME ZONE 'UTC'
  THEN RAISE EXCEPTION 'Case grant has not expired' USING ERRCODE='23514'; END IF;

  IF current_user = 'labos_case_claim_owner' THEN
    IF NEW."status" <> OLD."status" OR NEW."cleanupAttemptCount" <> OLD."cleanupAttemptCount" + 1
      OR OLD."cleanupAttemptCount" >= 2147483647
      OR OLD."cleanupNextCheckAt" > now_instant
      OR (OLD."cleanupLeaseExpiresAt" IS NOT NULL AND OLD."cleanupLeaseExpiresAt" > now_instant)
      OR NEW."cleanupLeaseExpiresAt" <= now_instant
      OR NEW."cleanupLeaseExpiresAt" > now_instant + interval '5 minutes'
      OR NEW."lastCleanupAttemptAt" IS NULL
      OR NEW."lastCleanupAttemptAt" < now_wall - interval '2 seconds'
      OR NEW."lastCleanupAttemptAt" > now_wall + interval '2 seconds'
      OR NEW."cleanupFailureCode" IS NOT NULL
      OR to_jsonb(NEW) - ARRAY['cleanupAttemptCount','lastCleanupAttemptAt',
          'cleanupLeaseExpiresAt','cleanupFailureCode','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['cleanupAttemptCount',
          'lastCleanupAttemptAt','cleanupLeaseExpiresAt','cleanupFailureCode','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Invalid Case claim' USING ERRCODE='23514'; END IF;
  ELSIF current_user = 'labos_case_renew_owner' THEN
    IF NEW."status" <> OLD."status" OR OLD."cleanupLeaseExpiresAt" IS NULL
      OR OLD."cleanupLeaseExpiresAt" <= now_instant
      OR NEW."cleanupLeaseExpiresAt" <= OLD."cleanupLeaseExpiresAt"
      OR NEW."cleanupLeaseExpiresAt" > now_instant + interval '5 minutes'
      OR to_jsonb(NEW) - ARRAY['cleanupLeaseExpiresAt','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['cleanupLeaseExpiresAt','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Invalid Case renewal' USING ERRCODE='23514'; END IF;
  ELSIF current_user = 'labos_case_present_owner' THEN
    IF OLD."status" <> 'CLEANED' OR NEW."status" <> OLD."status"
      OR OLD."cleanupReconcileStage" NOT BETWEEN 0 AND 3
      OR NEW."cleanupReconcileStage" <> 0
      OR NEW."cleanupLastCheckOutcome" <> 'PRESENT'
      OR to_jsonb(NEW) - ARRAY['cleanupReconcileStage',
          'cleanupLastCheckOutcome','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['cleanupReconcileStage',
          'cleanupLastCheckOutcome','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Invalid Case presence reset' USING ERRCODE='23514'; END IF;
  ELSIF current_user = 'labos_case_failure_owner' THEN
    IF NEW."status" <> OLD."status" OR OLD."cleanupLeaseExpiresAt" IS NULL
      OR OLD."cleanupLeaseExpiresAt" <= now_instant
      OR (NEW."cleanupLastCheckOutcome" = 'PRESENT' AND OLD."status" = 'CLEANED'
        AND (OLD."cleanupReconcileStage" IS DISTINCT FROM 0
          OR OLD."cleanupLastCheckOutcome" IS DISTINCT FROM 'PRESENT'))
      OR NEW."cleanupLeaseExpiresAt" IS NOT NULL
      OR NEW."cleanupLastCheckOutcome" NOT IN ('PRESENT','UNKNOWN')
      OR NEW."cleanupFailureCode" NOT IN
        ('PROVIDER_UNAVAILABLE','PROVIDER_AMBIGUOUS','PRESENCE_UNCONFIRMED')
      OR NEW."cleanupNextCheckAt" <= now_instant
      OR to_jsonb(NEW) - ARRAY['cleanupLeaseExpiresAt','cleanupFailureCode',
          'cleanupLastCheckOutcome','cleanupNextCheckAt','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['cleanupLeaseExpiresAt',
          'cleanupFailureCode','cleanupLastCheckOutcome','cleanupNextCheckAt','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Invalid Case failure' USING ERRCODE='23514'; END IF;
  ELSIF current_user = ack_owner THEN
    IF NEW."status" <> 'CLEANED' OR OLD."cleanupLeaseExpiresAt" IS NULL
      OR OLD."cleanupLeaseExpiresAt" <= now_instant
      OR NEW."cleanupLeaseExpiresAt" IS NOT NULL
      OR NEW."cleanupFailureCode" IS NOT NULL
      OR NEW."providerCleanupConfirmedAt" IS NULL
      OR NEW."providerCleanupConfirmedAt" < now_instant - interval '2 seconds'
      OR NEW."providerCleanupConfirmedAt" > now_instant + interval '2 seconds'
      OR NEW."cleanupLastCheckOutcome" <> 'ABSENT'
      OR NEW."cleanupReconcileStage" <> OLD."cleanupReconcileStage" + 1
      OR (NEW."cleanupReconcileStage" = 4 AND NEW."cleanupNextCheckAt" IS NOT NULL)
      OR (NEW."cleanupReconcileStage" < 4 AND NEW."cleanupNextCheckAt" IS NULL)
      OR to_jsonb(NEW) - ARRAY['status','providerCleanupConfirmedAt',
          'cleanupLeaseExpiresAt','cleanupFailureCode','cleanupReconcileStage',
          'cleanupLastCheckOutcome','cleanupNextCheckAt','updatedAt']::text[]
        IS DISTINCT FROM to_jsonb(OLD) - ARRAY['status','providerCleanupConfirmedAt',
          'cleanupLeaseExpiresAt','cleanupFailureCode','cleanupReconcileStage',
          'cleanupLastCheckOutcome','cleanupNextCheckAt','updatedAt']::text[]
    THEN RAISE EXCEPTION 'Invalid Case absence ACK' USING ERRCODE='23514'; END IF;
  ELSE
    RAISE EXCEPTION 'Direct Case cleanup mutation denied' USING ERRCODE='23514';
  END IF;
  RETURN NEW;
END;
$guard$;

CREATE FUNCTION labos_cleanup_private.expire_case_object_storage_and_enroll(
  batch_limit integer DEFAULT 100)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $expire$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  fence timestamptz;
  now_instant timestamptz;
  now_wall timestamp;
  quarantine_code text;
  processed integer := 0;
BEGIN
  IF batch_limit IS NULL OR batch_limit < 1 OR batch_limit > 500 THEN
    RAISE EXCEPTION 'Invalid Case expiry batch size' USING ERRCODE='23514';
  END IF;
  FOR g IN
    SELECT * FROM public."FileUploadGrant"
    WHERE "boundaryId" = 'N-FILE-110' AND "purpose" = 'case.asset.add.stage'
      AND "provider" = 'OBJECT_STORAGE' AND "status" IN ('PENDING','UPLOADED')
      AND "expiresAt" <= pg_catalog.clock_timestamp() AT TIME ZONE 'UTC'
    ORDER BY CASE WHEN "cleanupFailureCode" LIKE 'QUARANTINE_%' THEN 1 ELSE 0 END,
      "expiresAt", "id" FOR UPDATE SKIP LOCKED LIMIT batch_limit
  LOOP
    now_instant := pg_catalog.clock_timestamp();
    now_wall := now_instant AT TIME ZONE 'UTC';
    IF now_instant < g."expiresAt" AT TIME ZONE 'UTC' THEN CONTINUE; END IF;
    SELECT a."latestWriteCapabilityExpiresAt" INTO fence
    FROM public."ObjectStorageKeyAllocation" a
    WHERE a."sourceUploadGrantId" = g."id"
      AND a."objectKey" = g."providerFileKey";
    quarantine_code := NULL;
    IF g."targetType" <> 'case' OR g."targetId" IS NULL
      OR NOT EXISTS (SELECT 1 FROM public."Case" c
        JOIN public."Lab" l ON l."id" = c."labId"
        WHERE c."id" = g."targetId" AND c."labId" = g."labId"
          AND l."organizationId" = g."organizationId")
    THEN quarantine_code := 'QUARANTINE_IDENTITY';
    ELSIF g."providerFileKey" IS NULL OR fence IS NULL
    THEN quarantine_code := 'QUARANTINE_ALLOCATION';
    ELSIF EXISTS (SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id" OR
        (s."provider" = g."provider" AND s."providerObjectKey" = g."providerFileKey"))
    THEN quarantine_code := 'QUARANTINE_CANONICAL';
    END IF;
    IF quarantine_code IS NOT NULL THEN
      IF g."cleanupFailureCode" IS DISTINCT FROM quarantine_code THEN
        UPDATE public."FileUploadGrant" SET
          "cleanupFailureCode" = quarantine_code, "updatedAt" = now_wall
        WHERE "id" = g."id";
      END IF;
    ELSE
      UPDATE public."FileUploadGrant" SET
        "status" = 'EXPIRED', "expiredAt" = now_wall,
        "cleanupReconcileStage" = 0,
        "cleanupNextCheckAt" = greatest(now_instant, fence + interval '60 minutes'),
        "cleanupFailureCode" = NULL, "updatedAt" = now_wall
      WHERE "id" = g."id";
    END IF;
    processed := processed + 1;
  END LOOP;
  RETURN processed;
END;
$expire$;

-- PostgreSQL 17 requires the effective role, not merely a SET-capable
-- membership, to own an existing function during CREATE OR REPLACE.
SET LOCAL ROLE labos_verification_ack_owner;

CREATE OR REPLACE FUNCTION labos_cleanup_private.reject_case_s001(grant_id text)
RETURNS TABLE(id text) LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $reject$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  fence timestamptz;
  now_instant timestamptz := pg_catalog.clock_timestamp();
  now_wall timestamp := now_instant AT TIME ZONE 'UTC';
  quarantine_code text;
BEGIN
  SELECT * INTO g FROM public."FileUploadGrant" f
  WHERE f."id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage'
    OR g."provider" <> 'OBJECT_STORAGE' OR g."status" <> 'PENDING'
    OR now_instant >= g."expiresAt" AT TIME ZONE 'UTC'
    OR g."providerFileUrl" IS NOT NULL OR g."uploadedAt" IS NOT NULL
    OR g."consumedAt" IS NOT NULL OR g."failedAt" IS NOT NULL
    OR g."expiredAt" IS NOT NULL
  THEN RAISE EXCEPTION 'Case S001 rejection denied' USING ERRCODE='23514'; END IF;
  SELECT a."latestWriteCapabilityExpiresAt" INTO fence
  FROM public."ObjectStorageKeyAllocation" a
  WHERE a."sourceUploadGrantId" = g."id"
    AND a."objectKey" = g."providerFileKey";
  quarantine_code := NULL;
  IF g."targetType" <> 'case' OR g."targetId" IS NULL
    OR NOT EXISTS (SELECT 1 FROM public."Case" c
      JOIN public."Lab" l ON l."id" = c."labId"
      WHERE c."id" = g."targetId" AND c."labId" = g."labId"
        AND c."status" = 'DRAFT' AND l."organizationId" = g."organizationId")
  THEN quarantine_code := 'QUARANTINE_IDENTITY';
  ELSIF g."providerFileKey" IS NULL OR fence IS NULL
  THEN quarantine_code := 'QUARANTINE_ALLOCATION';
  ELSIF EXISTS (SELECT 1 FROM public."StoredFile" s
    WHERE s."sourceUploadGrantId" = g."id" OR
      (s."provider" = g."provider" AND s."providerObjectKey" = g."providerFileKey"))
  THEN quarantine_code := 'QUARANTINE_CANONICAL';
  END IF;
  IF quarantine_code IS NOT NULL THEN
    IF g."cleanupFailureCode" IS DISTINCT FROM quarantine_code THEN
      UPDATE public."FileUploadGrant" f SET
        "cleanupFailureCode" = quarantine_code, "updatedAt" = now_wall
      WHERE f."id" = g."id";
    END IF;
    RETURN;
  END IF;
  RETURN QUERY UPDATE public."FileUploadGrant" f SET
    "status" = 'FAILED', "failureCode" = 'CASE_S001_REJECTED',
    "failedAt" = now_wall, "cleanupReconcileStage" = 0,
    "cleanupNextCheckAt" = greatest(now_instant, fence + interval '60 minutes'),
    "cleanupFailureCode" = NULL, "updatedAt" = now_wall
  WHERE f."id" = g."id" RETURNING f."id";
END;
$reject$;
ALTER FUNCTION labos_cleanup_private.reject_case_s001(text)
  OWNER TO labos_case_reject_owner;

CREATE OR REPLACE FUNCTION labos_cleanup_private.claim_object_storage_cleanup(grant_id text)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $claim$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  fence timestamptz;
  now_instant timestamptz := pg_catalog.clock_timestamp();
  retry_delay interval;
  next_generation integer;
BEGIN
  SELECT * INTO g FROM public."FileUploadGrant" f WHERE f."id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage' OR g."provider" <> 'OBJECT_STORAGE'
    OR g."targetType" <> 'case' OR g."targetId" IS NULL
    OR g."providerFileKey" IS NULL
    OR g."status" NOT IN ('FAILED','EXPIRED','CLEANED')
    OR g."cleanupReconcileStage" NOT BETWEEN 0 AND 3
    OR g."cleanupNextCheckAt" IS NULL OR g."cleanupNextCheckAt" > now_instant
    OR g."cleanupAttemptCount" >= 2147483647
    OR (g."cleanupLeaseExpiresAt" IS NOT NULL AND g."cleanupLeaseExpiresAt" > now_instant)
    OR (g."status" = 'CLEANED' AND g."providerCleanupConfirmedAt" IS NULL)
    OR (g."status" = 'EXPIRED' AND now_instant < g."expiresAt" AT TIME ZONE 'UTC')
    OR NOT EXISTS (SELECT 1 FROM public."Case" c
      JOIN public."Lab" l ON l."id" = c."labId"
      WHERE c."id" = g."targetId" AND c."labId" = g."labId"
        AND l."organizationId" = g."organizationId")
    OR EXISTS (SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id" OR
        (s."provider" = g."provider" AND s."providerObjectKey" = g."providerFileKey"))
  THEN RAISE EXCEPTION 'Case cleanup claim denied' USING ERRCODE='23514'; END IF;
  SELECT a."latestWriteCapabilityExpiresAt" INTO fence
  FROM public."ObjectStorageKeyAllocation" a
  WHERE a."sourceUploadGrantId" = g."id" AND a."objectKey" = g."providerFileKey";
  IF fence IS NULL OR now_instant < fence + interval '60 minutes'
  THEN RAISE EXCEPTION 'Case cleanup claim is delayed' USING ERRCODE='23514'; END IF;
  IF g."cleanupAttemptCount" > 0 THEN
    retry_delay := least(interval '24 hours',
      interval '5 minutes' * pg_catalog.power(2, least(g."cleanupAttemptCount" - 1, 8)));
    IF g."lastCleanupAttemptAt" IS NULL OR
      now_instant < g."lastCleanupAttemptAt" AT TIME ZONE 'UTC' + retry_delay
    THEN RAISE EXCEPTION 'Case cleanup retry is delayed' USING ERRCODE='23514'; END IF;
  END IF;
  UPDATE public."FileUploadGrant" SET
    "cleanupAttemptCount" = g."cleanupAttemptCount" + 1,
    "lastCleanupAttemptAt" = now_instant AT TIME ZONE 'UTC',
    "cleanupLeaseExpiresAt" = now_instant + interval '5 minutes',
    "cleanupFailureCode" = NULL, "updatedAt" = now_instant AT TIME ZONE 'UTC'
  WHERE "id" = g."id" RETURNING "cleanupAttemptCount" INTO next_generation;
  RETURN next_generation;
END;
$claim$;
ALTER FUNCTION labos_cleanup_private.claim_object_storage_cleanup(text)
  OWNER TO labos_case_claim_owner;

CREATE OR REPLACE FUNCTION labos_cleanup_private.renew_object_storage_cleanup(
  grant_id text, claim_generation integer)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $renew$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  now_instant timestamptz := pg_catalog.clock_timestamp();
  fence timestamptz;
BEGIN
  SELECT * INTO g FROM public."FileUploadGrant" f WHERE f."id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage' OR g."provider" <> 'OBJECT_STORAGE'
    OR g."status" NOT IN ('FAILED','EXPIRED','CLEANED')
    OR g."cleanupReconcileStage" NOT BETWEEN 0 AND 3
    OR claim_generation < 1 OR g."cleanupAttemptCount" IS DISTINCT FROM claim_generation
    OR g."cleanupLeaseExpiresAt" IS NULL OR g."cleanupLeaseExpiresAt" <= now_instant
    OR EXISTS (SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id" OR
        (s."provider" = g."provider" AND s."providerObjectKey" = g."providerFileKey"))
  THEN RAISE EXCEPTION 'Case cleanup renewal denied' USING ERRCODE='23514'; END IF;
  SELECT a."latestWriteCapabilityExpiresAt" INTO fence
  FROM public."ObjectStorageKeyAllocation" a
  WHERE a."sourceUploadGrantId" = g."id" AND a."objectKey" = g."providerFileKey";
  IF fence IS NULL OR now_instant < fence + interval '60 minutes'
  THEN RAISE EXCEPTION 'Case cleanup renewal is delayed' USING ERRCODE='23514'; END IF;
  UPDATE public."FileUploadGrant" SET
    "cleanupLeaseExpiresAt" = now_instant + interval '5 minutes',
    "updatedAt" = now_instant AT TIME ZONE 'UTC' WHERE "id" = g."id";
END;
$renew$;
ALTER FUNCTION labos_cleanup_private.renew_object_storage_cleanup(text,integer)
  OWNER TO labos_case_renew_owner;

-- The old signature is ACK-owned and must be retired under that owner.
DROP FUNCTION labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text);
SET LOCAL ROLE postgres;

CREATE FUNCTION labos_cleanup_private.note_present(
  grant_id text, claim_generation integer)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $present$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  now_instant timestamptz := pg_catalog.clock_timestamp();
BEGIN
  SELECT * INTO g FROM public."FileUploadGrant" f WHERE f."id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage' OR g."provider" <> 'OBJECT_STORAGE'
    OR g."status" <> 'CLEANED' OR g."cleanupReconcileStage" NOT BETWEEN 0 AND 3
    OR claim_generation < 1 OR g."cleanupAttemptCount" IS DISTINCT FROM claim_generation
    OR g."cleanupLeaseExpiresAt" IS NULL OR g."cleanupLeaseExpiresAt" <= now_instant
    OR g."providerCleanupConfirmedAt" IS NULL
    OR NOT EXISTS (SELECT 1 FROM public."ObjectStorageKeyAllocation" a
      WHERE a."sourceUploadGrantId" = g."id"
        AND a."objectKey" = g."providerFileKey"
        AND a."latestWriteCapabilityExpiresAt" + interval '60 minutes' <= now_instant)
    OR EXISTS (SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id" OR
        (s."provider" = g."provider" AND s."providerObjectKey" = g."providerFileKey"))
  THEN RAISE EXCEPTION 'Case presence reset denied' USING ERRCODE='23514'; END IF;
  IF g."cleanupReconcileStage" = 0 AND g."cleanupLastCheckOutcome" = 'PRESENT'
  THEN RETURN; END IF;
  UPDATE public."FileUploadGrant" SET
    "cleanupReconcileStage" = 0, "cleanupLastCheckOutcome" = 'PRESENT',
    "updatedAt" = now_instant AT TIME ZONE 'UTC' WHERE "id" = g."id";
END;
$present$;

CREATE FUNCTION labos_cleanup_private.record_object_storage_cleanup_failure(
  grant_id text, claim_generation integer, normalized_code text, check_outcome text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $failure$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  now_instant timestamptz := pg_catalog.clock_timestamp();
  retry_delay interval;
BEGIN
  IF normalized_code NOT IN ('PROVIDER_UNAVAILABLE','PROVIDER_AMBIGUOUS','PRESENCE_UNCONFIRMED')
    OR check_outcome NOT IN ('PRESENT','UNKNOWN')
  THEN RAISE EXCEPTION 'Invalid Case failure code or outcome' USING ERRCODE='23514'; END IF;
  SELECT * INTO g FROM public."FileUploadGrant" f WHERE f."id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage' OR g."provider" <> 'OBJECT_STORAGE'
    OR g."status" NOT IN ('FAILED','EXPIRED','CLEANED')
    OR g."cleanupReconcileStage" NOT BETWEEN 0 AND 3
    OR claim_generation < 1 OR g."cleanupAttemptCount" IS DISTINCT FROM claim_generation
    OR g."cleanupLeaseExpiresAt" IS NULL OR g."cleanupLeaseExpiresAt" <= now_instant
    OR (check_outcome = 'PRESENT' AND g."status" = 'CLEANED'
      AND (g."cleanupReconcileStage" IS DISTINCT FROM 0
        OR g."cleanupLastCheckOutcome" IS DISTINCT FROM 'PRESENT'))
    OR EXISTS (SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id" OR
        (s."provider" = g."provider" AND s."providerObjectKey" = g."providerFileKey"))
  THEN RAISE EXCEPTION 'Case failure recording denied' USING ERRCODE='23514'; END IF;
  retry_delay := least(interval '24 hours',
    interval '5 minutes' * pg_catalog.power(2, least(g."cleanupAttemptCount" - 1, 8)));
  UPDATE public."FileUploadGrant" SET
    "cleanupLeaseExpiresAt" = NULL, "cleanupFailureCode" = normalized_code,
    "cleanupLastCheckOutcome" = check_outcome,
    "cleanupNextCheckAt" = now_instant + retry_delay,
    "updatedAt" = now_instant AT TIME ZONE 'UTC' WHERE "id" = g."id";
END;
$failure$;

SET LOCAL ROLE labos_verification_ack_owner;
CREATE OR REPLACE FUNCTION labos_cleanup_private.ack_object_storage_cleanup(
  grant_id text, claim_generation integer)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $ack$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  now_instant timestamptz := pg_catalog.clock_timestamp();
  fence timestamptz;
  next_stage smallint;
  next_due timestamptz;
BEGIN
  SELECT * INTO g FROM public."FileUploadGrant" f WHERE f."id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage' OR g."provider" <> 'OBJECT_STORAGE'
    OR g."targetType" <> 'case' OR g."providerFileKey" IS NULL
    OR g."status" NOT IN ('FAILED','EXPIRED','CLEANED')
    OR g."cleanupReconcileStage" NOT BETWEEN 0 AND 3
    OR claim_generation < 1 OR g."cleanupAttemptCount" IS DISTINCT FROM claim_generation
    OR g."cleanupLeaseExpiresAt" IS NULL OR g."cleanupLeaseExpiresAt" <= now_instant
    OR (g."status" = 'EXPIRED' AND now_instant < g."expiresAt" AT TIME ZONE 'UTC')
    OR NOT EXISTS (SELECT 1 FROM public."Case" c
      JOIN public."Lab" l ON l."id" = c."labId"
      WHERE c."id" = g."targetId" AND c."labId" = g."labId"
        AND l."organizationId" = g."organizationId")
    OR EXISTS (SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id" OR
        (s."provider" = g."provider" AND s."providerObjectKey" = g."providerFileKey"))
  THEN RAISE EXCEPTION 'Case absence ACK denied' USING ERRCODE='23514'; END IF;
  SELECT a."latestWriteCapabilityExpiresAt" INTO fence
  FROM public."ObjectStorageKeyAllocation" a
  WHERE a."sourceUploadGrantId" = g."id" AND a."objectKey" = g."providerFileKey";
  IF fence IS NULL OR now_instant < fence + interval '60 minutes'
  THEN RAISE EXCEPTION 'Case absence ACK is delayed' USING ERRCODE='23514'; END IF;
  next_stage := g."cleanupReconcileStage" + 1;
  next_due := CASE next_stage
    WHEN 1 THEN now_instant + interval '24 hours'
    WHEN 2 THEN now_instant + interval '7 days'
    WHEN 3 THEN now_instant + interval '30 days'
    ELSE NULL END;
  UPDATE public."FileUploadGrant" SET
    "status" = 'CLEANED', "providerCleanupConfirmedAt" = now_instant,
    "cleanupLeaseExpiresAt" = NULL, "cleanupFailureCode" = NULL,
    "cleanupReconcileStage" = next_stage,
    "cleanupLastCheckOutcome" = 'ABSENT', "cleanupNextCheckAt" = next_due,
    "updatedAt" = now_instant AT TIME ZONE 'UTC' WHERE "id" = g."id";
END;
$ack$;
SET LOCAL ROLE postgres;

CREATE FUNCTION labos_cleanup_private.reopen_retired_object_storage_cleanup(grant_id text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp AS $reopen$
DECLARE
  g public."FileUploadGrant"%ROWTYPE;
  now_instant timestamptz := pg_catalog.clock_timestamp();
BEGIN
  SELECT * INTO g FROM public."FileUploadGrant" f WHERE f."id" = grant_id FOR UPDATE;
  IF NOT FOUND OR g."boundaryId" <> 'N-FILE-110'
    OR g."purpose" <> 'case.asset.add.stage' OR g."provider" <> 'OBJECT_STORAGE'
    OR g."status" <> 'CLEANED' OR g."cleanupReconcileStage" <> 4
    OR g."cleanupNextCheckAt" IS NOT NULL
    OR NOT EXISTS (SELECT 1 FROM public."ObjectStorageKeyAllocation" a
      WHERE a."sourceUploadGrantId" = g."id"
        AND a."objectKey" = g."providerFileKey"
        AND a."latestWriteCapabilityExpiresAt" IS NOT NULL)
    OR NOT EXISTS (SELECT 1 FROM public."Case" c
      JOIN public."Lab" l ON l."id" = c."labId"
      WHERE c."id" = g."targetId" AND c."labId" = g."labId"
        AND l."organizationId" = g."organizationId")
    OR EXISTS (SELECT 1 FROM public."StoredFile" s
      WHERE s."sourceUploadGrantId" = g."id" OR
        (s."provider" = g."provider" AND s."providerObjectKey" = g."providerFileKey"))
  THEN RAISE EXCEPTION 'Case reopen denied' USING ERRCODE='23514'; END IF;
  UPDATE public."FileUploadGrant" SET
    "cleanupReconcileStage" = 0, "cleanupLastCheckOutcome" = 'PRESENT',
    "cleanupNextCheckAt" = now_instant,
    "updatedAt" = now_instant AT TIME ZONE 'UTC' WHERE "id" = g."id";
END;
$reopen$;

ALTER FUNCTION labos_cleanup_private.expire_case_object_storage_and_enroll(integer)
  OWNER TO labos_case_expiry_owner;
ALTER FUNCTION labos_cleanup_private.note_present(text,integer)
  OWNER TO labos_case_present_owner;
ALTER FUNCTION labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text,text)
  OWNER TO labos_case_failure_owner;
ALTER FUNCTION labos_cleanup_private.reopen_retired_object_storage_cleanup(text)
  OWNER TO labos_case_reopen_owner;

-- New PostgreSQL functions default to PUBLIC EXECUTE. Remove only that
-- default from the four new successor signatures, in this transaction.
SET LOCAL ROLE labos_case_expiry_owner;
REVOKE ALL ON FUNCTION labos_cleanup_private.expire_case_object_storage_and_enroll(integer)
  FROM PUBLIC;
SET LOCAL ROLE labos_case_present_owner;
REVOKE ALL ON FUNCTION labos_cleanup_private.note_present(text,integer)
  FROM PUBLIC;
SET LOCAL ROLE labos_case_failure_owner;
REVOKE ALL ON FUNCTION labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text,text)
  FROM PUBLIC;
SET LOCAL ROLE labos_case_reopen_owner;
REVOKE ALL ON FUNCTION labos_cleanup_private.reopen_retired_object_storage_cleanup(text)
  FROM PUBLIC;
SET LOCAL ROLE postgres;

GRANT USAGE ON SCHEMA labos_cleanup_private TO
  labos_case_expiry_executor, labos_verification_app,
  labos_verification_cleanup, labos_case_reopen_executor;
-- A function's owner issues its one approved LabOS executor grant. The
-- migration runner's trusted, temporary SET memberships do not make runtime
-- callers members of any function owner.
SET LOCAL ROLE labos_case_expiry_owner;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.expire_case_object_storage_and_enroll(integer)
  TO labos_case_expiry_executor;
SET LOCAL ROLE labos_case_reject_owner;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.reject_case_s001(text)
  TO labos_verification_app;
SET LOCAL ROLE labos_case_claim_owner;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.claim_object_storage_cleanup(text)
  TO labos_verification_cleanup;
SET LOCAL ROLE labos_case_renew_owner;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.renew_object_storage_cleanup(text,integer)
  TO labos_verification_cleanup;
SET LOCAL ROLE labos_case_present_owner;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.note_present(text,integer)
  TO labos_verification_cleanup;
SET LOCAL ROLE labos_case_failure_owner;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text,text)
  TO labos_verification_cleanup;
SET LOCAL ROLE labos_verification_ack_owner;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.ack_object_storage_cleanup(text,integer)
  TO labos_verification_cleanup;
SET LOCAL ROLE labos_case_reopen_owner;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.reopen_retired_object_storage_cleanup(text)
  TO labos_case_reopen_executor;
SET LOCAL ROLE postgres;

-- Definer owners alone receive grant-table DML. The existing ACK owner loses
-- its old generic claim/reject/renew/failure column privileges.
DO $owner_privileges$
DECLARE role_name text; ack_owner text;
BEGIN
  SELECT pg_catalog.pg_get_userbyid(p.proowner) INTO ack_owner
  FROM pg_catalog.pg_proc p WHERE p.oid = pg_catalog.to_regprocedure(
    'labos_cleanup_private.ack_object_storage_cleanup(text,integer)');
  EXECUTE pg_catalog.format('REVOKE UPDATE ("cleanupAttemptCount","lastCleanupAttemptAt", "failedAt", "expiredAt", "failureCode") ON public."FileUploadGrant" FROM %I', ack_owner);
  EXECUTE pg_catalog.format('GRANT UPDATE ("status","providerCleanupConfirmedAt", "cleanupLeaseExpiresAt","cleanupFailureCode", "cleanupReconcileStage","cleanupLastCheckOutcome","cleanupNextCheckAt","updatedAt") ON public."FileUploadGrant" TO %I', ack_owner);
  FOR role_name IN SELECT unnest(ARRAY[
    'labos_case_expiry_owner','labos_case_reject_owner',
    'labos_case_claim_owner','labos_case_renew_owner',
    'labos_case_present_owner','labos_case_failure_owner',
    'labos_case_reopen_owner']) LOOP
    EXECUTE pg_catalog.format('GRANT USAGE ON SCHEMA public, labos_cleanup_private TO %I', role_name);
    EXECUTE pg_catalog.format('GRANT SELECT ON public."FileUploadGrant", public."ObjectStorageKeyAllocation", public."StoredFile", public."Case", public."Lab" TO %I', role_name);
  END LOOP;
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = 'labos_verification_cleanup') THEN
    REVOKE UPDATE ("status","expiredAt","updatedAt")
      ON public."FileUploadGrant" FROM labos_verification_cleanup;
  END IF;
END;
$owner_privileges$;
GRANT UPDATE ("status","expiredAt","cleanupReconcileStage","cleanupNextCheckAt","cleanupFailureCode","updatedAt")
  ON public."FileUploadGrant" TO labos_case_expiry_owner;
GRANT UPDATE ("status","failureCode","failedAt","cleanupReconcileStage","cleanupNextCheckAt","cleanupLastCheckOutcome","cleanupFailureCode","updatedAt")
  ON public."FileUploadGrant" TO labos_case_reject_owner;
GRANT UPDATE ("cleanupAttemptCount","lastCleanupAttemptAt","cleanupLeaseExpiresAt","cleanupFailureCode","updatedAt")
  ON public."FileUploadGrant" TO labos_case_claim_owner;
GRANT UPDATE ("cleanupLeaseExpiresAt","updatedAt")
  ON public."FileUploadGrant" TO labos_case_renew_owner;
GRANT UPDATE ("cleanupReconcileStage","cleanupLastCheckOutcome","updatedAt")
  ON public."FileUploadGrant" TO labos_case_present_owner;
GRANT UPDATE ("cleanupLeaseExpiresAt","cleanupFailureCode","cleanupLastCheckOutcome","cleanupNextCheckAt","updatedAt")
  ON public."FileUploadGrant" TO labos_case_failure_owner;
GRANT UPDATE ("cleanupReconcileStage","cleanupLastCheckOutcome","cleanupNextCheckAt","updatedAt")
  ON public."FileUploadGrant" TO labos_case_reopen_owner;

DO $restore_owner_isolation$
DECLARE role_name text; ack_owner text;
BEGIN
  SELECT pg_catalog.pg_get_userbyid(p.proowner) INTO ack_owner
  FROM pg_catalog.pg_proc p WHERE p.oid = pg_catalog.to_regprocedure(
    'labos_cleanup_private.ack_object_storage_cleanup(text,integer)');
  FOREACH role_name IN ARRAY ARRAY[
    'labos_case_expiry_owner','labos_case_reject_owner',
    'labos_case_claim_owner','labos_case_renew_owner',
    'labos_case_present_owner','labos_case_failure_owner',
    'labos_case_reopen_owner',ack_owner
  ] LOOP
    EXECUTE pg_catalog.format('REVOKE CREATE ON SCHEMA labos_cleanup_private FROM %I', role_name);
    EXECUTE pg_catalog.format('REVOKE %I FROM %I GRANTED BY %I',
      role_name, current_user, current_user);
  END LOOP;
  FOREACH role_name IN ARRAY ARRAY[
    'labos_case_reject_owner','labos_case_claim_owner','labos_case_renew_owner'
  ] LOOP
    EXECUTE pg_catalog.format('REVOKE %I FROM %I GRANTED BY %I',
      role_name, ack_owner, current_user);
  END LOOP;
END;
$restore_owner_isolation$;

-- The old ACK owner must own no private state writer other than ACK.
DO $post_install$
DECLARE ack_owner text; role_name text; grant_owner text; function_row record;
BEGIN
  SELECT pg_catalog.pg_get_userbyid(p.proowner) INTO ack_owner
  FROM pg_catalog.pg_proc p WHERE p.oid = pg_catalog.to_regprocedure(
    'labos_cleanup_private.ack_object_storage_cleanup(text,integer)');
  IF pg_catalog.to_regprocedure(
      'labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text)') IS NOT NULL
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
      JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
      WHERE n.nspname = 'labos_cleanup_private'
        AND pg_catalog.pg_get_userbyid(p.proowner) = ack_owner
        AND p.oid <> pg_catalog.to_regprocedure(
          'labos_cleanup_private.ack_object_storage_cleanup(text,integer)'))
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_roles r WHERE r.rolname IN
      ('labos_case_expiry_owner','labos_case_reject_owner','labos_case_claim_owner',
       'labos_case_renew_owner','labos_case_present_owner','labos_case_failure_owner',
       'labos_case_reopen_owner') AND
       (r.rolcanlogin OR r.rolcreaterole OR r.rolbypassrls))
  THEN RAISE EXCEPTION 'Successor owner or signature invariant failed'; END IF;
  IF pg_catalog.pg_has_role(ack_owner, 'labos_case_reject_owner', 'SET')
    OR pg_catalog.pg_has_role(ack_owner, 'labos_case_claim_owner', 'SET')
    OR pg_catalog.pg_has_role(ack_owner, 'labos_case_renew_owner', 'SET')
  THEN RAISE EXCEPTION 'Temporary ACK owner transfer membership remains'; END IF;
  IF EXISTS (SELECT 1 FROM pg_catalog.pg_auth_members m
    JOIN pg_catalog.pg_roles granted ON granted.oid = m.roleid
    JOIN pg_catalog.pg_roles member ON member.oid = m.member
    JOIN pg_catalog.pg_roles grantor ON grantor.oid = m.grantor
    WHERE granted.rolname IN (
      'labos_case_expiry_owner','labos_case_reject_owner',
      'labos_case_claim_owner','labos_case_renew_owner',
      'labos_case_present_owner','labos_case_failure_owner',
      'labos_case_reopen_owner',ack_owner)
      AND member.rolname = session_user AND grantor.rolname = session_user)
  THEN RAISE EXCEPTION 'Migration-issued owner membership remains'; END IF;

  SELECT pg_catalog.pg_get_userbyid(c.relowner) INTO grant_owner
  FROM pg_catalog.pg_class c
  WHERE c.oid = 'public."FileUploadGrant"'::pg_catalog.regclass;
  FOREACH role_name IN ARRAY ARRAY[
    'labos_case_expiry_owner','labos_case_reject_owner',
    'labos_case_claim_owner','labos_case_renew_owner',
    'labos_case_present_owner','labos_case_failure_owner',
    'labos_case_reopen_owner',ack_owner,grant_owner
  ] LOOP
    IF pg_catalog.pg_has_role('labos_verification_app', role_name, 'SET')
      OR pg_catalog.pg_has_role('labos_verification_app', role_name, 'USAGE')
      OR pg_catalog.pg_has_role('labos_verification_cleanup', role_name, 'SET')
      OR pg_catalog.pg_has_role('labos_verification_cleanup', role_name, 'USAGE')
    THEN RAISE EXCEPTION 'Runtime caller inherits protected owner'; END IF;
  END LOOP;
  IF pg_catalog.has_schema_privilege('labos_verification_app',
      'labos_cleanup_private', 'CREATE')
    OR pg_catalog.has_schema_privilege('labos_verification_cleanup',
      'labos_cleanup_private', 'CREATE')
    OR pg_catalog.has_column_privilege('labos_verification_cleanup',
      'public."FileUploadGrant"', 'status', 'UPDATE')
    OR pg_catalog.has_column_privilege('labos_verification_cleanup',
      'public."FileUploadGrant"', 'expiredAt', 'UPDATE')
  THEN RAISE EXCEPTION 'Runtime caller has direct protected DML or DDL'; END IF;

  FOR function_row IN
    SELECT * FROM (VALUES
      ('expire_case_object_storage_and_enroll(integer)',
        'labos_case_expiry_owner','labos_case_expiry_executor',false,false,true,false),
      ('reject_case_s001(text)',
        'labos_case_reject_owner','labos_verification_app',true,false,false,false),
      ('claim_object_storage_cleanup(text)',
        'labos_case_claim_owner','labos_verification_cleanup',false,true,false,false),
      ('renew_object_storage_cleanup(text,integer)',
        'labos_case_renew_owner','labos_verification_cleanup',false,true,false,false),
      ('note_present(text,integer)',
        'labos_case_present_owner','labos_verification_cleanup',false,true,false,false),
      ('record_object_storage_cleanup_failure(text,integer,text,text)',
        'labos_case_failure_owner','labos_verification_cleanup',false,true,false,false),
      ('ack_object_storage_cleanup(text,integer)',
        ack_owner,'labos_verification_cleanup',false,true,false,false),
      ('reopen_retired_object_storage_cleanup(text)',
        'labos_case_reopen_owner','labos_case_reopen_executor',false,false,false,true)
    ) AS expected(signature,owner_name,executor_name,app_execute,worker_execute,
      expiry_execute,reopen_execute)
  LOOP
    IF (SELECT pg_catalog.pg_get_userbyid(p.proowner) FROM pg_catalog.pg_proc p
        WHERE p.oid = pg_catalog.to_regprocedure(
          'labos_cleanup_private.' || function_row.signature))
          IS DISTINCT FROM function_row.owner_name
      OR pg_catalog.has_function_privilege('labos_verification_app',
          'labos_cleanup_private.' || function_row.signature, 'EXECUTE')
          IS DISTINCT FROM function_row.app_execute
      OR pg_catalog.has_function_privilege('labos_verification_cleanup',
          'labos_cleanup_private.' || function_row.signature, 'EXECUTE')
          IS DISTINCT FROM function_row.worker_execute
      OR pg_catalog.has_function_privilege('labos_case_expiry_executor',
          'labos_cleanup_private.' || function_row.signature, 'EXECUTE')
          IS DISTINCT FROM function_row.expiry_execute
      OR pg_catalog.has_function_privilege('labos_case_reopen_executor',
          'labos_cleanup_private.' || function_row.signature, 'EXECUTE')
          IS DISTINCT FROM function_row.reopen_execute
      OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
          CROSS JOIN LATERAL pg_catalog.aclexplode(coalesce(
            p.proacl, pg_catalog.acldefault('f', p.proowner))) x
          JOIN pg_catalog.pg_roles r ON r.oid = x.grantee
          WHERE p.oid = pg_catalog.to_regprocedure(
            'labos_cleanup_private.' || function_row.signature)
            AND r.rolname = function_row.executor_name
            AND x.privilege_type = 'EXECUTE' AND NOT x.is_grantable)
      OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
          CROSS JOIN LATERAL pg_catalog.aclexplode(coalesce(
            p.proacl, pg_catalog.acldefault('f', p.proowner))) x
          LEFT JOIN pg_catalog.pg_roles r ON r.oid = x.grantee
          WHERE p.oid = pg_catalog.to_regprocedure(
            'labos_cleanup_private.' || function_row.signature)
            AND x.grantee <> p.proowner
            AND (r.rolname IS DISTINCT FROM function_row.executor_name
              OR x.privilege_type <> 'EXECUTE' OR x.is_grantable))
    THEN RAISE EXCEPTION 'Successor function owner or effective caller ACL mismatch: %',
      function_row.signature; END IF;
  END LOOP;
END;
$post_install$;

COMMIT;
