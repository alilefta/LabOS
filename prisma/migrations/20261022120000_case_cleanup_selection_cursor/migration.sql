-- A1-I2: durable, scope-fixed candidate rotation. Claim and provider authority
-- remain in the installed operation-specific functions.
BEGIN;
SET LOCAL search_path = pg_catalog, pg_temp;

DO $preflight$
DECLARE
  worker_oid oid := (SELECT oid FROM pg_catalog.pg_roles WHERE rolname = 'labos_verification_cleanup');
  grant_oid oid := pg_catalog.to_regclass('public."FileUploadGrant"');
BEGIN
  IF session_user <> 'postgres' OR current_user <> 'postgres'
    OR current_setting('server_version_num')::integer NOT BETWEEN 170000 AND 179999
    OR worker_oid IS NULL OR grant_oid IS NULL
    OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE oid = worker_oid
      AND rolcanlogin AND NOT rolinherit AND NOT rolsuper
      AND NOT rolcreaterole AND NOT rolcreatedb AND NOT rolbypassrls
      AND NOT rolreplication)
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_auth_members WHERE member = worker_oid)
    OR pg_catalog.to_regclass('labos_cleanup_private.case_object_storage_selection_cursor') IS NOT NULL
    OR pg_catalog.to_regprocedure('labos_cleanup_private.next_case_object_storage_cleanup_candidate()') IS NOT NULL
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE rolname = 'labos_case_select_owner')
    OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_indexes WHERE schemaname = 'public'
      AND tablename = 'FileUploadGrant' AND indexname = 'FileUploadGrant_case_cleanup_due_idx')
    OR NOT pg_catalog.has_function_privilege(worker_oid,
      'labos_cleanup_private.claim_object_storage_cleanup(text)', 'EXECUTE')
    OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
      WHERE p.oid = pg_catalog.to_regprocedure(
        'labos_cleanup_private.claim_object_storage_cleanup(text)')
        AND p.prosecdef
        AND pg_catalog.pg_get_userbyid(p.proowner) = 'labos_case_claim_owner'
        AND p.proconfig = ARRAY[
          'search_path=pg_catalog, labos_cleanup_private, pg_temp']::text[]
        AND pg_catalog.md5(pg_catalog.pg_get_functiondef(p.oid)) =
          '6e06255d5ff79fdb79eaf4e5e5dc703d')
    OR pg_catalog.has_any_column_privilege(worker_oid, grant_oid, 'UPDATE')
    OR NOT pg_catalog.has_schema_privilege('postgres', 'labos_cleanup_private', 'CREATE')
  THEN RAISE EXCEPTION 'Unexpected cleanup selection predecessor or runner'; END IF;
END;
$preflight$;

CREATE TABLE labos_cleanup_private.case_object_storage_selection_cursor (
  scope text PRIMARY KEY DEFAULT 'N-FILE-110:case.asset.add.stage:OBJECT_STORAGE',
  last_due_at timestamptz(6),
  last_grant_id text,
  updated_at timestamptz(6) NOT NULL DEFAULT pg_catalog.clock_timestamp(),
  CONSTRAINT case_object_storage_selection_cursor_scope CHECK
    (scope = 'N-FILE-110:case.asset.add.stage:OBJECT_STORAGE'),
  CONSTRAINT case_object_storage_selection_cursor_tuple CHECK
    ((last_due_at IS NULL) = (last_grant_id IS NULL))
);
INSERT INTO labos_cleanup_private.case_object_storage_selection_cursor (scope)
VALUES ('N-FILE-110:case.asset.add.stage:OBJECT_STORAGE');
REVOKE ALL ON labos_cleanup_private.case_object_storage_selection_cursor FROM PUBLIC;

CREATE ROLE labos_case_select_owner NOLOGIN NOINHERIT NOSUPERUSER NOCREATEROLE
  NOCREATEDB NOBYPASSRLS NOREPLICATION;
GRANT USAGE, CREATE ON SCHEMA labos_cleanup_private TO labos_case_select_owner;
GRANT SELECT ("id", "boundaryId", "purpose", "provider", "status",
  "cleanupReconcileStage", "cleanupNextCheckAt", "cleanupLeaseExpiresAt")
  ON public."FileUploadGrant" TO labos_case_select_owner;
GRANT SELECT ON labos_cleanup_private.case_object_storage_selection_cursor
  TO labos_case_select_owner;
GRANT UPDATE (last_due_at, last_grant_id, updated_at)
  ON labos_cleanup_private.case_object_storage_selection_cursor
  TO labos_case_select_owner;
GRANT labos_case_select_owner TO postgres
  WITH ADMIN FALSE, INHERIT FALSE, SET TRUE GRANTED BY postgres;

CREATE FUNCTION labos_cleanup_private.next_case_object_storage_cleanup_candidate()
RETURNS TABLE(grant_id text, wrapped boolean, queue_empty boolean)
LANGUAGE plpgsql SECURITY DEFINER
SET search_path = pg_catalog, labos_cleanup_private, pg_temp
AS $selector$
DECLARE
  previous_due timestamptz;
  previous_id text;
  candidate_due timestamptz;
  candidate_id text;
  due_now timestamptz := pg_catalog.clock_timestamp();
BEGIN
  SELECT c.last_due_at, c.last_grant_id INTO previous_due, previous_id
  FROM labos_cleanup_private.case_object_storage_selection_cursor c
  WHERE c.scope = 'N-FILE-110:case.asset.add.stage:OBJECT_STORAGE'
  FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Scoped cleanup selection cursor is missing' USING ERRCODE = '23514';
  END IF;

  SELECT g."cleanupNextCheckAt", g."id" INTO candidate_due, candidate_id
  FROM public."FileUploadGrant" g
  WHERE g."boundaryId" = 'N-FILE-110'
    AND g."purpose" = 'case.asset.add.stage'
    AND g."provider" = 'OBJECT_STORAGE'
    AND g."status" IN ('FAILED','EXPIRED','CLEANED')
    AND g."cleanupReconcileStage" BETWEEN 0 AND 3
    AND g."cleanupNextCheckAt" <= due_now
    AND (g."cleanupLeaseExpiresAt" IS NULL OR g."cleanupLeaseExpiresAt" <= due_now)
    AND (previous_due IS NULL OR (g."cleanupNextCheckAt", g."id") >
      (previous_due, previous_id))
  ORDER BY g."cleanupNextCheckAt", g."id" LIMIT 1;

  wrapped := false;
  IF candidate_id IS NULL AND previous_due IS NOT NULL THEN
    wrapped := true;
    SELECT g."cleanupNextCheckAt", g."id" INTO candidate_due, candidate_id
    FROM public."FileUploadGrant" g
    WHERE g."boundaryId" = 'N-FILE-110'
      AND g."purpose" = 'case.asset.add.stage'
      AND g."provider" = 'OBJECT_STORAGE'
      AND g."status" IN ('FAILED','EXPIRED','CLEANED')
      AND g."cleanupReconcileStage" BETWEEN 0 AND 3
      AND g."cleanupNextCheckAt" <= due_now
      AND (g."cleanupLeaseExpiresAt" IS NULL OR g."cleanupLeaseExpiresAt" <= due_now)
    ORDER BY g."cleanupNextCheckAt", g."id" LIMIT 1;
  END IF;

  IF candidate_id IS NULL THEN
    grant_id := NULL;
    queue_empty := true;
    wrapped := false;
    RETURN NEXT;
    RETURN;
  END IF;

  UPDATE labos_cleanup_private.case_object_storage_selection_cursor c
    SET last_due_at = candidate_due, last_grant_id = candidate_id,
      updated_at = due_now
    WHERE c.scope = 'N-FILE-110:case.asset.add.stage:OBJECT_STORAGE';
  grant_id := candidate_id;
  queue_empty := false;
  RETURN NEXT;
END;
$selector$;

ALTER FUNCTION labos_cleanup_private.next_case_object_storage_cleanup_candidate()
  OWNER TO labos_case_select_owner;
SET LOCAL ROLE labos_case_select_owner;
REVOKE ALL ON FUNCTION labos_cleanup_private.next_case_object_storage_cleanup_candidate()
  FROM PUBLIC;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.next_case_object_storage_cleanup_candidate()
  TO labos_verification_cleanup;
SET LOCAL ROLE postgres;
REVOKE CREATE ON SCHEMA labos_cleanup_private FROM labos_case_select_owner;
REVOKE labos_case_select_owner FROM postgres GRANTED BY postgres;

DO $postflight$
DECLARE
  owner_oid oid := 'labos_case_select_owner'::pg_catalog.regrole;
  worker_oid oid := 'labos_verification_cleanup'::pg_catalog.regrole;
  cursor_oid oid := 'labos_cleanup_private.case_object_storage_selection_cursor'::pg_catalog.regclass;
  grant_oid oid := 'public."FileUploadGrant"'::pg_catalog.regclass;
  fn_oid oid := 'labos_cleanup_private.next_case_object_storage_cleanup_candidate()'::pg_catalog.regprocedure;
  grant_columns text[];
  cursor_update_columns text[];
BEGIN
  SELECT pg_catalog.array_agg(a.attname ORDER BY a.attname) INTO grant_columns
  FROM pg_catalog.pg_attribute a
  CROSS JOIN LATERAL pg_catalog.aclexplode(a.attacl) acl
  WHERE a.attrelid = grant_oid AND a.attnum > 0 AND NOT a.attisdropped
    AND acl.grantee = owner_oid AND acl.privilege_type = 'SELECT'
    AND NOT acl.is_grantable AND acl.grantor = 'postgres'::pg_catalog.regrole;
  SELECT pg_catalog.array_agg(a.attname ORDER BY a.attname) INTO cursor_update_columns
  FROM pg_catalog.pg_attribute a
  CROSS JOIN LATERAL pg_catalog.aclexplode(a.attacl) acl
  WHERE a.attrelid = cursor_oid AND a.attnum > 0 AND NOT a.attisdropped
    AND acl.grantee = owner_oid AND acl.privilege_type = 'UPDATE'
    AND NOT acl.is_grantable AND acl.grantor = 'postgres'::pg_catalog.regrole;
  IF (SELECT count(*) FROM labos_cleanup_private.case_object_storage_selection_cursor) <> 1
    OR (SELECT count(*) FROM labos_cleanup_private.case_object_storage_selection_cursor
      WHERE scope = 'N-FILE-110:case.asset.add.stage:OBJECT_STORAGE') <> 1
    OR (SELECT pg_catalog.pg_get_userbyid(proowner) FROM pg_catalog.pg_proc WHERE oid = fn_oid)
      <> 'labos_case_select_owner'
    OR (SELECT pg_catalog.pg_get_userbyid(relowner) FROM pg_catalog.pg_class WHERE oid = cursor_oid)
      <> 'postgres'
    OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE oid = owner_oid
      AND NOT rolcanlogin AND NOT rolinherit AND NOT rolsuper AND NOT rolcreaterole
      AND NOT rolcreatedb AND NOT rolbypassrls AND NOT rolreplication)
    OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_roles WHERE oid = worker_oid
      AND rolcanlogin AND NOT rolinherit AND NOT rolsuper AND NOT rolcreaterole
      AND NOT rolcreatedb AND NOT rolbypassrls AND NOT rolreplication)
    OR grant_columns IS DISTINCT FROM ARRAY['boundaryId','cleanupLeaseExpiresAt',
      'cleanupNextCheckAt','cleanupReconcileStage','id','provider','purpose','status']
    OR cursor_update_columns IS DISTINCT FROM ARRAY['last_due_at','last_grant_id','updated_at']
    OR NOT pg_catalog.has_table_privilege(owner_oid, cursor_oid, 'SELECT')
    OR pg_catalog.has_table_privilege(owner_oid, cursor_oid, 'INSERT,UPDATE,DELETE')
    OR pg_catalog.has_table_privilege(owner_oid, grant_oid, 'SELECT')
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_attribute a
      CROSS JOIN LATERAL pg_catalog.aclexplode(a.attacl) acl
      WHERE a.attrelid IN (grant_oid,cursor_oid) AND acl.grantee = owner_oid
        AND (acl.is_grantable OR acl.privilege_type NOT IN ('SELECT','UPDATE')
          OR (a.attrelid = grant_oid AND acl.privilege_type <> 'SELECT')
          OR (a.attrelid = cursor_oid AND acl.privilege_type = 'SELECT')))
    OR NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc WHERE oid = fn_oid AND prosecdef
      AND proconfig = ARRAY['search_path=pg_catalog, labos_cleanup_private, pg_temp']::text[])
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
      CROSS JOIN LATERAL pg_catalog.aclexplode(p.proacl) a
      WHERE p.oid = fn_oid AND a.grantee <> p.proowner
        AND (a.grantee <> worker_oid OR a.privilege_type <> 'EXECUTE'
          OR a.is_grantable))
    OR NOT pg_catalog.has_function_privilege(worker_oid, fn_oid, 'EXECUTE')
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_proc p
      CROSS JOIN LATERAL pg_catalog.aclexplode(p.proacl) a
      WHERE p.oid = fn_oid AND a.grantee = 0)
    OR pg_catalog.has_table_privilege(worker_oid, cursor_oid, 'SELECT,UPDATE,INSERT,DELETE')
    OR pg_catalog.has_any_column_privilege(worker_oid, cursor_oid, 'SELECT')
    OR pg_catalog.has_any_column_privilege(worker_oid, cursor_oid, 'UPDATE')
    OR pg_catalog.has_any_column_privilege(worker_oid, grant_oid, 'UPDATE')
    OR pg_catalog.has_table_privilege(owner_oid, grant_oid, 'UPDATE')
    OR pg_catalog.has_schema_privilege(owner_oid, 'labos_cleanup_private', 'CREATE')
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_auth_members WHERE member = worker_oid)
    OR EXISTS (SELECT 1 FROM pg_catalog.pg_auth_members m
      WHERE m.roleid = owner_oid AND m.member = 'postgres'::pg_catalog.regrole
        AND m.grantor = 'postgres'::pg_catalog.regrole)
    OR pg_catalog.pg_has_role(worker_oid, owner_oid, 'SET')
    OR pg_catalog.pg_has_role(worker_oid, owner_oid, 'USAGE')
  THEN RAISE EXCEPTION 'Unexpected cleanup selection postcondition'; END IF;
END;
$postflight$;
COMMIT;
