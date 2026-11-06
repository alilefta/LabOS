-- A1-I2-I1-T5: permit the scoped expiry executor to evaluate the existing
-- SECURITY INVOKER deferred Case evidence trigger. No trigger is replaced.
BEGIN;
SET LOCAL search_path = pg_catalog, pg_temp;

DO $preflight$
DECLARE
  executor_oid oid;
  evidence_oid oid := pg_catalog.to_regclass('public."CaseClinicalUploadEvidence"');
  grant_oid oid := pg_catalog.to_regclass('public."FileUploadGrant"');
  trigger_proc_oid oid := pg_catalog.to_regprocedure('public."FileUploadGrant_case_uploaded_evidence_final_state"()');
  trigger_proc pg_catalog.pg_proc%ROWTYPE;
BEGIN
  IF session_user <> 'postgres' OR current_user <> 'postgres'
    OR current_setting('server_version_num')::integer NOT BETWEEN 170000 AND 179999
  THEN RAISE EXCEPTION 'Unexpected migration runner or PostgreSQL major version'; END IF;

  SELECT oid INTO executor_oid FROM pg_catalog.pg_roles
  WHERE rolname = 'labos_case_expiry_executor'
    AND NOT rolcanlogin AND NOT rolsuper AND NOT rolinherit
    AND NOT rolcreaterole AND NOT rolcreatedb AND NOT rolbypassrls;
  IF executor_oid IS NULL OR evidence_oid IS NULL OR grant_oid IS NULL
    OR pg_catalog.pg_get_userbyid((SELECT relowner FROM pg_catalog.pg_class WHERE oid = evidence_oid)) <> 'postgres'
  THEN RAISE EXCEPTION 'Unexpected evidence relation or expiry-executor prerequisite'; END IF;
  IF (SELECT count(*) FROM pg_catalog.pg_auth_members
      WHERE roleid = executor_oid OR member = executor_oid) <> 1
    OR NOT EXISTS (
      SELECT 1 FROM pg_catalog.pg_auth_members m
      WHERE m.roleid = executor_oid AND m.member = 'postgres'::pg_catalog.regrole
        AND pg_catalog.pg_get_userbyid(m.grantor) = 'supabase_admin'
        AND m.admin_option AND NOT m.inherit_option AND NOT m.set_option)
  THEN RAISE EXCEPTION 'Unexpected expiry-executor membership prerequisite'; END IF;

  SELECT * INTO trigger_proc FROM pg_catalog.pg_proc WHERE oid = trigger_proc_oid;
  IF NOT FOUND OR pg_catalog.pg_get_userbyid(trigger_proc.proowner) <> 'postgres'
    OR trigger_proc.prosecdef OR trigger_proc.proconfig IS NOT NULL
    OR pg_catalog.md5(pg_catalog.pg_get_functiondef(trigger_proc.oid)) <> '83181a20bf2b7617ac688f80d0d41c62'
    OR NOT EXISTS (
      SELECT 1 FROM pg_catalog.pg_trigger t
      WHERE t.tgrelid = grant_oid AND t.tgfoid = trigger_proc_oid
        AND t.tgname = 'FileUploadGrant_case_uploaded_evidence'
        AND t.tgenabled = 'O' AND NOT t.tgisinternal
        AND t.tgdeferrable AND t.tginitdeferred
        AND pg_catalog.pg_get_triggerdef(t.oid) =
          'CREATE CONSTRAINT TRIGGER "FileUploadGrant_case_uploaded_evidence" AFTER INSERT OR UPDATE OF status ON public."FileUploadGrant" DEFERRABLE INITIALLY DEFERRED FOR EACH ROW EXECUTE FUNCTION public."FileUploadGrant_case_uploaded_evidence_final_state"()')
  THEN RAISE EXCEPTION 'Unexpected deferred evidence-trigger prerequisite'; END IF;

  -- No existing evidence privileges for this executor may be hidden by a
  -- previous partial installation or a broader table/column grant.
  IF pg_catalog.has_table_privilege(executor_oid, evidence_oid, 'SELECT')
    OR pg_catalog.has_table_privilege(executor_oid, evidence_oid, 'INSERT')
    OR pg_catalog.has_table_privilege(executor_oid, evidence_oid, 'UPDATE')
    OR pg_catalog.has_table_privilege(executor_oid, evidence_oid, 'DELETE')
    OR EXISTS (
      SELECT 1 FROM pg_catalog.pg_attribute a
      WHERE a.attrelid = evidence_oid AND a.attnum > 0 AND NOT a.attisdropped
        AND (pg_catalog.has_column_privilege(executor_oid, evidence_oid, a.attnum, 'SELECT')
          OR pg_catalog.has_column_privilege(executor_oid, evidence_oid, a.attnum, 'UPDATE')))
  THEN RAISE EXCEPTION 'Unexpected pre-existing expiry-executor evidence privileges'; END IF;
END;
$preflight$;

GRANT SELECT (
  "uploadGrantId", "organizationId", "labId", "caseId", "provider", "providerObjectKey"
) ON public."CaseClinicalUploadEvidence" TO labos_case_expiry_executor;

DO $postflight$
DECLARE
  executor_oid oid := 'labos_case_expiry_executor'::pg_catalog.regrole;
  evidence_oid oid := 'public."CaseClinicalUploadEvidence"'::pg_catalog.regclass;
  granted_columns text[];
BEGIN
  SELECT pg_catalog.array_agg(a.attname ORDER BY a.attname)
  INTO granted_columns
  FROM pg_catalog.pg_attribute a
  CROSS JOIN LATERAL pg_catalog.aclexplode(a.attacl) acl
  WHERE a.attrelid = evidence_oid AND a.attnum > 0 AND NOT a.attisdropped
    AND acl.grantee = executor_oid AND acl.privilege_type = 'SELECT'
    AND NOT acl.is_grantable AND pg_catalog.pg_get_userbyid(acl.grantor) = 'postgres';

  IF granted_columns IS DISTINCT FROM ARRAY[
      'caseId','labId','organizationId','provider','providerObjectKey','uploadGrantId']
    OR EXISTS (
      SELECT 1 FROM pg_catalog.pg_attribute a
      CROSS JOIN LATERAL pg_catalog.aclexplode(a.attacl) acl
      WHERE a.attrelid = evidence_oid AND a.attnum > 0 AND NOT a.attisdropped
        AND acl.grantee = executor_oid
        AND (acl.privilege_type <> 'SELECT' OR acl.is_grantable
          OR pg_catalog.pg_get_userbyid(acl.grantor) <> 'postgres'))
    OR EXISTS (
      SELECT 1 FROM pg_catalog.aclexplode(
        (SELECT relacl FROM pg_catalog.pg_class WHERE oid = evidence_oid)) acl
      WHERE acl.grantee = executor_oid)
    OR pg_catalog.has_table_privilege(executor_oid, evidence_oid, 'SELECT')
    OR pg_catalog.has_table_privilege(executor_oid, evidence_oid, 'INSERT')
    OR pg_catalog.has_table_privilege(executor_oid, evidence_oid, 'UPDATE')
    OR pg_catalog.has_table_privilege(executor_oid, evidence_oid, 'DELETE')
  THEN RAISE EXCEPTION 'Unexpected expiry-executor evidence privilege result'; END IF;

  IF (SELECT count(*) FROM pg_catalog.pg_auth_members
      WHERE roleid = executor_oid OR member = executor_oid) <> 1
    OR NOT EXISTS (
      SELECT 1 FROM pg_catalog.pg_auth_members m
      WHERE m.roleid = executor_oid AND m.member = 'postgres'::pg_catalog.regrole
        AND pg_catalog.pg_get_userbyid(m.grantor) = 'supabase_admin'
        AND m.admin_option AND NOT m.inherit_option AND NOT m.set_option)
  THEN RAISE EXCEPTION 'Expiry-executor membership changed'; END IF;
END;
$postflight$;

COMMIT;
