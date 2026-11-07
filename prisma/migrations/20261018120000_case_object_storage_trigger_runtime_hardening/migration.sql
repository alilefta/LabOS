-- A1-I2-I1-T5-F3: preserve the installed cleanup state machine while fixing
-- trigger permission planning, deferred expiry reads, and allocation name lookup.
-- This migration is additive to migration 56 and intentionally changes no roles.
BEGIN;
SET LOCAL search_path = pg_catalog, pg_temp;

DO $preflight$
DECLARE
  expected_acl constant text := '{=X/postgres,postgres=X/postgres,anon=X/postgres,authenticated=X/postgres,service_role=X/postgres}';
  item record;
  proc_row pg_catalog.pg_proc%ROWTYPE;
  executor_oid oid;
BEGIN
  IF current_user <> 'postgres' OR session_user <> 'postgres'
    OR current_setting('server_version_num')::integer NOT BETWEEN 170000 AND 179999
  THEN RAISE EXCEPTION 'Unexpected migration runner or PostgreSQL major version'; END IF;

  FOR item IN SELECT * FROM (VALUES
    ('public."FileUploadGrant_case_identity_guard"()',
      '63ef65004002acc766b9f20ae0818b6a', 'FileUploadGrant_case_identity',
      'public."FileUploadGrant"',
      'CREATE TRIGGER "FileUploadGrant_case_identity" BEFORE INSERT OR UPDATE ON public."FileUploadGrant" FOR EACH ROW EXECUTE FUNCTION public."FileUploadGrant_case_identity_guard"()'),
    ('public."ObjectStorageKeyAllocation_guard"()',
      '6f79ecf447e9d4d2d83f67f6064bf4d9', 'ObjectStorageKeyAllocation_immutable_and_fenced',
      'public."ObjectStorageKeyAllocation"',
      'CREATE TRIGGER "ObjectStorageKeyAllocation_immutable_and_fenced" BEFORE INSERT OR DELETE OR UPDATE ON public."ObjectStorageKeyAllocation" FOR EACH ROW EXECUTE FUNCTION public."ObjectStorageKeyAllocation_guard"()'),
    ('public."FileUploadGrant_allocate_object_storage_key"()',
      'df48ab7b725e6bad1d3c8dce115968a3', 'FileUploadGrant_allocate_object_storage',
      'public."FileUploadGrant"',
      'CREATE TRIGGER "FileUploadGrant_allocate_object_storage" AFTER INSERT ON public."FileUploadGrant" FOR EACH ROW EXECUTE FUNCTION public."FileUploadGrant_allocate_object_storage_key"()')
  ) AS v(signature, body_md5, trigger_name, relation_name, trigger_definition)
  LOOP
    SELECT * INTO proc_row FROM pg_catalog.pg_proc
    WHERE oid = pg_catalog.to_regprocedure(item.signature);
    IF NOT FOUND OR pg_catalog.pg_get_userbyid(proc_row.proowner) <> 'postgres'
      OR proc_row.prosecdef OR proc_row.proconfig IS NOT NULL
      OR pg_catalog.md5(pg_catalog.pg_get_functiondef(proc_row.oid)) <> item.body_md5
      OR proc_row.proacl::text IS DISTINCT FROM expected_acl
      OR NOT EXISTS (
        SELECT 1 FROM pg_catalog.pg_trigger t
        WHERE t.tgname = item.trigger_name AND t.tgrelid = item.relation_name::pg_catalog.regclass
          AND t.tgfoid = proc_row.oid AND t.tgenabled = 'O' AND NOT t.tgisinternal
          AND pg_catalog.pg_get_triggerdef(t.oid) = item.trigger_definition)
    THEN RAISE EXCEPTION 'Unexpected trigger/function prerequisite: %', item.signature; END IF;
  END LOOP;

  SELECT oid INTO executor_oid FROM pg_catalog.pg_roles
  WHERE rolname = 'labos_case_expiry_executor' AND NOT rolcanlogin
    AND NOT rolsuper AND NOT rolcreaterole AND NOT rolinherit;
  IF executor_oid IS NULL
    OR pg_catalog.has_table_privilege(executor_oid, 'public."FileUploadGrant"', 'SELECT')
    OR pg_catalog.has_table_privilege(executor_oid, 'public."ObjectStorageKeyAllocation"', 'SELECT')
    OR pg_catalog.has_table_privilege(executor_oid, 'public."FileUploadGrant"', 'UPDATE')
    OR pg_catalog.has_table_privilege(executor_oid, 'public."ObjectStorageKeyAllocation"', 'UPDATE')
    OR EXISTS (
      SELECT 1 FROM pg_catalog.pg_attribute a
      WHERE a.attrelid IN ('public."FileUploadGrant"'::pg_catalog.regclass,
          'public."ObjectStorageKeyAllocation"'::pg_catalog.regclass)
        AND a.attnum > 0 AND NOT a.attisdropped
        AND (pg_catalog.has_column_privilege(executor_oid, a.attrelid, a.attnum, 'SELECT')
          OR pg_catalog.has_column_privilege(executor_oid, a.attrelid, a.attnum, 'UPDATE')))
  THEN RAISE EXCEPTION 'Unexpected expiry-executor privilege prerequisite'; END IF;

  IF EXISTS (
    SELECT 1 FROM pg_catalog.pg_roles r
    WHERE r.rolname IN ('labos_case_expiry_owner','labos_case_reject_owner',
      'labos_case_claim_owner','labos_case_renew_owner','labos_case_present_owner',
      'labos_case_failure_owner','labos_case_reopen_owner')
      AND (r.rolcanlogin OR pg_catalog.has_column_privilege(r.oid,'public.member','id','SELECT')
        OR pg_catalog.has_column_privilege(r.oid,'public.member','organizationId','SELECT')))
    OR (SELECT count(*) FROM pg_catalog.pg_roles WHERE rolname IN
      ('labos_case_expiry_owner','labos_case_reject_owner','labos_case_claim_owner',
       'labos_case_renew_owner','labos_case_present_owner','labos_case_failure_owner',
       'labos_case_reopen_owner','labos_verification_ack_owner')) <> 8
  THEN RAISE EXCEPTION 'Unexpected cleanup-owner prerequisite'; END IF;
END;
$preflight$;

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

      OR (TG_OP = 'INSERT' AND NOT EXISTS (
        SELECT 1 FROM public."Lab" l JOIN public."Case" c ON c."labId" = l."id"
        WHERE l."id" = NEW."labId" AND l."organizationId" = NEW."organizationId"
          AND c."id" = NEW."targetId"
      )) THEN
      RAISE EXCEPTION 'Invalid Case clinical grant target' USING ERRCODE = '23514';
    END IF;
    IF TG_OP = 'INSERT' THEN
      IF NEW."createdByMemberId" IS NULL OR NOT EXISTS (
        SELECT 1 FROM public."member" m
        WHERE m."id" = NEW."createdByMemberId"
          AND m."organizationId" = NEW."organizationId"
      ) THEN
        RAISE EXCEPTION 'Invalid Case clinical grant target' USING ERRCODE = '23514';
      END IF;
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


CREATE OR REPLACE FUNCTION public."ObjectStorageKeyAllocation_guard"()
RETURNS trigger LANGUAGE plpgsql SET search_path = pg_catalog, pg_temp AS $$
DECLARE
  grant_row public."FileUploadGrant"%ROWTYPE;
BEGIN
  IF TG_OP = 'DELETE' THEN
    RAISE EXCEPTION 'Object-storage key allocations cannot be deleted' USING ERRCODE = '23514';
  END IF;

  SELECT * INTO grant_row FROM public."FileUploadGrant"
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


CREATE OR REPLACE FUNCTION public."FileUploadGrant_allocate_object_storage_key"()
RETURNS trigger LANGUAGE plpgsql SET search_path = pg_catalog, pg_temp AS $$
BEGIN
  IF NEW."provider" = 'OBJECT_STORAGE' THEN
    INSERT INTO public."ObjectStorageKeyAllocation"("objectKey", "sourceUploadGrantId")
      VALUES (NEW."providerFileKey", NEW."id");
  END IF;
  RETURN NULL;
END;
$$;


GRANT SELECT ("id","boundaryId","purpose","status","organizationId","labId",
  "targetId","provider","providerFileKey","expiresAt")
  ON public."FileUploadGrant" TO labos_case_expiry_executor;
GRANT SELECT ("sourceUploadGrantId","objectKey","latestWriteCapabilityExpiresAt")
  ON public."ObjectStorageKeyAllocation" TO labos_case_expiry_executor;

DO $postflight$
DECLARE
  expected_acl constant text := '{=X/postgres,postgres=X/postgres,anon=X/postgres,authenticated=X/postgres,service_role=X/postgres}';
  item record;
  proc_row pg_catalog.pg_proc%ROWTYPE;
  executor_oid oid := 'labos_case_expiry_executor'::pg_catalog.regrole;
  direct_columns text[];
BEGIN
  FOR item IN SELECT * FROM (VALUES
    ('public."FileUploadGrant_case_identity_guard"()', NULL::text,
      '150bb48ffd9a338a2e5c965640042043'),
    ('public."ObjectStorageKeyAllocation_guard"()', 'search_path=pg_catalog, pg_temp'::text,
      '32d46ebfbec21006e53643cd01bc2412'),
    ('public."FileUploadGrant_allocate_object_storage_key"()', 'search_path=pg_catalog, pg_temp'::text,
      '7c97a198fbd6b7a9bb5a735915ca01eb')
  ) AS v(signature, settings, body_md5)
  LOOP
    SELECT * INTO proc_row FROM pg_catalog.pg_proc
    WHERE oid = pg_catalog.to_regprocedure(item.signature);
    IF NOT FOUND OR pg_catalog.pg_get_userbyid(proc_row.proowner) <> 'postgres'
      OR proc_row.prosecdef OR proc_row.proacl::text IS DISTINCT FROM expected_acl
      OR pg_catalog.md5(pg_catalog.pg_get_functiondef(proc_row.oid)) <> item.body_md5
      OR (item.settings IS NULL AND proc_row.proconfig IS NOT NULL)
      OR (item.settings IS NOT NULL AND proc_row.proconfig IS DISTINCT FROM ARRAY[item.settings])
    THEN RAISE EXCEPTION 'Trigger ownership, ACL, or search path changed: %', item.signature; END IF;
  END LOOP;

  SELECT pg_catalog.array_agg(c.relname || '.' || a.attname ORDER BY c.relname,a.attname)
  INTO direct_columns
  FROM pg_catalog.pg_class c JOIN pg_catalog.pg_attribute a ON a.attrelid = c.oid
  CROSS JOIN LATERAL pg_catalog.aclexplode(a.attacl) acl
  WHERE c.oid IN ('public."FileUploadGrant"'::pg_catalog.regclass,
      'public."ObjectStorageKeyAllocation"'::pg_catalog.regclass)
    AND a.attnum > 0 AND NOT a.attisdropped AND acl.grantee = executor_oid
    AND acl.privilege_type = 'SELECT' AND NOT acl.is_grantable
    AND pg_catalog.pg_get_userbyid(acl.grantor) = 'postgres';
  IF direct_columns IS DISTINCT FROM ARRAY[
    'FileUploadGrant.boundaryId','FileUploadGrant.expiresAt','FileUploadGrant.id',
    'FileUploadGrant.labId','FileUploadGrant.organizationId','FileUploadGrant.provider',
    'FileUploadGrant.providerFileKey','FileUploadGrant.purpose','FileUploadGrant.status',
    'FileUploadGrant.targetId','ObjectStorageKeyAllocation.latestWriteCapabilityExpiresAt',
    'ObjectStorageKeyAllocation.objectKey','ObjectStorageKeyAllocation.sourceUploadGrantId']::text[]
    OR pg_catalog.has_table_privilege(executor_oid,'public."FileUploadGrant"','SELECT')
    OR pg_catalog.has_table_privilege(executor_oid,'public."ObjectStorageKeyAllocation"','SELECT')
    OR pg_catalog.has_table_privilege(executor_oid,'public."FileUploadGrant"','UPDATE')
    OR pg_catalog.has_table_privilege(executor_oid,'public."ObjectStorageKeyAllocation"','UPDATE')
  THEN RAISE EXCEPTION 'Unexpected expiry-executor post-install privileges'; END IF;

  IF EXISTS (
    SELECT 1 FROM pg_catalog.pg_roles r
    WHERE r.rolname IN ('labos_case_expiry_owner','labos_case_reject_owner',
      'labos_case_claim_owner','labos_case_renew_owner','labos_case_present_owner',
      'labos_case_failure_owner','labos_case_reopen_owner')
      AND (pg_catalog.has_column_privilege(r.oid,'public.member','id','SELECT')
        OR pg_catalog.has_column_privilege(r.oid,'public.member','organizationId','SELECT')))
  THEN RAISE EXCEPTION 'Unexpected cleanup-owner member access'; END IF;
END;
$postflight$;

COMMIT;
