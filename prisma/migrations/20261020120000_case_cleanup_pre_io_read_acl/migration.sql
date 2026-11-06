-- A1-I2: allow the restricted cleanup caller to complete the grant-first
-- pre-provider-I/O recheck after renewal has locked the grant row. This does
-- not grant direct mutation or change any private function or trigger.
BEGIN;
SET LOCAL search_path = pg_catalog, pg_temp;

DO $preflight$
DECLARE
  worker_oid oid;
  grant_oid oid := pg_catalog.to_regclass('public."FileUploadGrant"');
  lab_oid oid := pg_catalog.to_regclass('public."Lab"');
  renewal_oid oid := pg_catalog.to_regprocedure(
    'labos_cleanup_private.renew_object_storage_cleanup(text,integer)');
  owner_name text;
BEGIN
  IF session_user <> 'postgres' OR current_user <> 'postgres'
    OR current_setting('server_version_num')::integer NOT BETWEEN 170000 AND 179999
  THEN RAISE EXCEPTION 'Unexpected cleanup ACL migration runner or PostgreSQL major version'; END IF;

  SELECT oid INTO worker_oid FROM pg_catalog.pg_roles
  WHERE rolname = 'labos_verification_cleanup'
    AND NOT rolinherit AND NOT rolsuper
    AND NOT rolcreaterole AND NOT rolcreatedb AND NOT rolbypassrls
    AND NOT rolreplication;
  IF worker_oid IS NULL OR grant_oid IS NULL OR lab_oid IS NULL OR renewal_oid IS NULL
    OR pg_catalog.pg_get_userbyid((SELECT relowner FROM pg_catalog.pg_class WHERE oid = grant_oid)) <> 'postgres'
    OR pg_catalog.pg_get_userbyid((SELECT relowner FROM pg_catalog.pg_class WHERE oid = lab_oid)) <> 'postgres'
    OR (SELECT count(*) FROM pg_catalog.pg_auth_members WHERE member = worker_oid) <> 0
  THEN RAISE EXCEPTION 'Unexpected cleanup ACL role or relation prerequisite'; END IF;

  -- The approved renewal body takes the grant row FOR UPDATE and keeps that
  -- lock until its caller transaction ends. Reject a different body/owner.
  IF NOT EXISTS (
    SELECT 1 FROM pg_catalog.pg_proc p
    WHERE p.oid = renewal_oid AND p.prosecdef
      AND pg_catalog.pg_get_userbyid(p.proowner) = 'labos_case_renew_owner'
      AND p.proconfig = ARRAY['search_path=pg_catalog, labos_cleanup_private, pg_temp']::text[]
      AND pg_catalog.md5(pg_catalog.pg_get_functiondef(p.oid)) =
        '9820e320f6b84c8572e481160d768099')
    OR NOT pg_catalog.has_function_privilege(worker_oid, renewal_oid, 'EXECUTE')
    OR pg_catalog.has_table_privilege(worker_oid, grant_oid, 'SELECT')
    OR pg_catalog.has_table_privilege(worker_oid, lab_oid, 'SELECT')
    OR pg_catalog.has_any_column_privilege(worker_oid, grant_oid, 'UPDATE')
    OR pg_catalog.has_any_column_privilege(worker_oid, lab_oid, 'UPDATE')
  THEN RAISE EXCEPTION 'Unexpected cleanup ACL function or privilege prerequisite'; END IF;

  -- Fail rather than silently incorporating prior broad or partial grants.
  IF EXISTS (
    SELECT 1 FROM pg_catalog.pg_attribute a
    WHERE (a.attrelid = grant_oid AND a.attname IN
        ('cleanupReconcileStage','cleanupNextCheckAt','cleanupLastCheckOutcome')
      OR a.attrelid = lab_oid AND a.attname IN ('id','organizationId'))
      AND a.attnum > 0 AND NOT a.attisdropped
      AND pg_catalog.has_column_privilege(worker_oid, a.attrelid, a.attnum, 'SELECT'))
    OR (SELECT count(*) FROM pg_catalog.pg_attribute a
      WHERE a.attrelid = grant_oid AND a.attname IN
        ('cleanupReconcileStage','cleanupNextCheckAt','cleanupLastCheckOutcome')
        AND a.attnum > 0 AND NOT a.attisdropped) <> 3
    OR (SELECT count(*) FROM pg_catalog.pg_attribute a
      WHERE a.attrelid = lab_oid AND a.attname IN ('id','organizationId')
        AND a.attnum > 0 AND NOT a.attisdropped) <> 2
  THEN RAISE EXCEPTION 'Unexpected cleanup ACL column prerequisite'; END IF;

  FOREACH owner_name IN ARRAY ARRAY[
    'labos_case_claim_owner','labos_case_renew_owner',
    'labos_case_present_owner','labos_case_failure_owner',
    'labos_verification_ack_owner'] LOOP
    IF pg_catalog.pg_has_role(worker_oid, owner_name::pg_catalog.regrole, 'SET')
      OR pg_catalog.pg_has_role(worker_oid, owner_name::pg_catalog.regrole, 'USAGE')
    THEN RAISE EXCEPTION 'Cleanup caller has owner-role access'; END IF;
  END LOOP;
END;
$preflight$;

GRANT SELECT ("cleanupReconcileStage", "cleanupNextCheckAt", "cleanupLastCheckOutcome")
  ON public."FileUploadGrant" TO labos_verification_cleanup;
GRANT SELECT ("id", "organizationId")
  ON public."Lab" TO labos_verification_cleanup;

DO $postflight$
DECLARE
  worker_oid oid := 'labos_verification_cleanup'::pg_catalog.regrole;
  grant_oid oid := 'public."FileUploadGrant"'::pg_catalog.regclass;
  lab_oid oid := 'public."Lab"'::pg_catalog.regclass;
  grant_columns text[];
  lab_columns text[];
BEGIN
  SELECT pg_catalog.array_agg(a.attname ORDER BY a.attname)
  INTO grant_columns
  FROM pg_catalog.pg_attribute a
  CROSS JOIN LATERAL pg_catalog.aclexplode(a.attacl) acl
  WHERE a.attrelid = grant_oid AND a.attnum > 0 AND NOT a.attisdropped
    AND acl.grantee = worker_oid AND acl.privilege_type = 'SELECT'
    AND a.attname IN ('cleanupReconcileStage','cleanupNextCheckAt','cleanupLastCheckOutcome')
    AND NOT acl.is_grantable
    AND pg_catalog.pg_get_userbyid(acl.grantor) = 'postgres';
  SELECT pg_catalog.array_agg(a.attname ORDER BY a.attname)
  INTO lab_columns
  FROM pg_catalog.pg_attribute a
  CROSS JOIN LATERAL pg_catalog.aclexplode(a.attacl) acl
  WHERE a.attrelid = lab_oid AND a.attnum > 0 AND NOT a.attisdropped
    AND acl.grantee = worker_oid AND acl.privilege_type = 'SELECT'
    AND NOT acl.is_grantable
    AND pg_catalog.pg_get_userbyid(acl.grantor) = 'postgres';

  IF grant_columns IS DISTINCT FROM ARRAY[
      'cleanupLastCheckOutcome','cleanupNextCheckAt','cleanupReconcileStage']
    OR lab_columns IS DISTINCT FROM ARRAY['id','organizationId']
    OR pg_catalog.has_table_privilege(worker_oid, grant_oid, 'SELECT')
    OR pg_catalog.has_table_privilege(worker_oid, lab_oid, 'SELECT')
    OR pg_catalog.has_any_column_privilege(worker_oid, grant_oid, 'UPDATE')
    OR pg_catalog.has_any_column_privilege(worker_oid, lab_oid, 'UPDATE')
    OR (SELECT count(*) FROM pg_catalog.pg_auth_members WHERE member = worker_oid) <> 0
    OR EXISTS (
      SELECT 1 FROM pg_catalog.pg_attribute a
      CROSS JOIN LATERAL pg_catalog.aclexplode(a.attacl) acl
      WHERE a.attrelid IN (grant_oid,lab_oid) AND a.attnum > 0
        AND acl.grantee = worker_oid
        AND (acl.is_grantable OR acl.privilege_type <> 'SELECT')
        AND a.attname IN ('cleanupReconcileStage','cleanupNextCheckAt',
          'cleanupLastCheckOutcome','id','organizationId'))
  THEN RAISE EXCEPTION 'Unexpected cleanup pre-I/O ACL result'; END IF;
END;
$postflight$;

COMMIT;
