-- Disposable local catalog assertions after successor migration.
\set ON_ERROR_STOP on
DO $$
DECLARE r text; owner_name text; f record;
BEGIN
 IF NOT has_function_privilege('labos_case_expiry_executor','labos_cleanup_private.expire_case_object_storage_and_enroll(integer)','EXECUTE')
 OR has_function_privilege('labos_verification_cleanup','labos_cleanup_private.expire_case_object_storage_and_enroll(integer)','EXECUTE')
 OR has_function_privilege('labos_verification_app','labos_cleanup_private.expire_case_object_storage_and_enroll(integer)','EXECUTE')
 OR NOT has_function_privilege('labos_verification_app','labos_cleanup_private.reject_case_s001(text)','EXECUTE')
 OR has_function_privilege('labos_verification_cleanup','labos_cleanup_private.reject_case_s001(text)','EXECUTE')
 OR NOT has_function_privilege('labos_verification_cleanup','labos_cleanup_private.claim_object_storage_cleanup(text)','EXECUTE')
 OR NOT has_function_privilege('labos_verification_cleanup','labos_cleanup_private.renew_object_storage_cleanup(text,integer)','EXECUTE')
 OR NOT has_function_privilege('labos_verification_cleanup','labos_cleanup_private.note_present(text,integer)','EXECUTE')
 OR NOT has_function_privilege('labos_verification_cleanup','labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text,text)','EXECUTE')
 OR NOT has_function_privilege('labos_verification_cleanup','labos_cleanup_private.ack_object_storage_cleanup(text,integer)','EXECUTE')
 OR has_function_privilege('labos_verification_app','labos_cleanup_private.ack_object_storage_cleanup(text,integer)','EXECUTE')
 OR has_function_privilege('labos_verification_cleanup','labos_cleanup_private.reopen_retired_object_storage_cleanup(text)','EXECUTE')
 OR NOT has_function_privilege('labos_case_reopen_executor','labos_cleanup_private.reopen_retired_object_storage_cleanup(text)','EXECUTE')
 OR has_column_privilege('labos_verification_cleanup','public."FileUploadGrant"','status','UPDATE')
 OR has_column_privilege('labos_verification_cleanup','public."FileUploadGrant"','expiredAt','UPDATE')
 OR to_regprocedure('labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text)') IS NOT NULL
 THEN RAISE EXCEPTION 'successor ACL/signature mismatch'; END IF;
 FOR f IN SELECT * FROM (VALUES
  ('expire_case_object_storage_and_enroll(integer)','labos_case_expiry_owner','labos_case_expiry_executor'),
  ('reject_case_s001(text)','labos_case_reject_owner','labos_verification_app'),
  ('claim_object_storage_cleanup(text)','labos_case_claim_owner','labos_verification_cleanup'),
  ('renew_object_storage_cleanup(text,integer)','labos_case_renew_owner','labos_verification_cleanup'),
  ('note_present(text,integer)','labos_case_present_owner','labos_verification_cleanup'),
  ('record_object_storage_cleanup_failure(text,integer,text,text)','labos_case_failure_owner','labos_verification_cleanup'),
  ('ack_object_storage_cleanup(text,integer)','labos_verification_ack_owner','labos_verification_cleanup'),
  ('reopen_retired_object_storage_cleanup(text)','labos_case_reopen_owner','labos_case_reopen_executor')
 ) AS x(signature,expected_owner,expected_executor) LOOP
  SELECT pg_get_userbyid(p.proowner) INTO owner_name FROM pg_proc p
  WHERE p.oid=to_regprocedure('labos_cleanup_private.'||f.signature);
  IF owner_name IS DISTINCT FROM f.expected_owner THEN RAISE EXCEPTION 'owner mismatch: %',f.signature; END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p
    CROSS JOIN LATERAL aclexplode(coalesce(p.proacl,acldefault('f',p.proowner))) x
    JOIN pg_roles grantee ON grantee.oid=x.grantee
    WHERE p.oid=to_regprocedure('labos_cleanup_private.'||f.signature)
      AND grantee.rolname=f.expected_executor AND x.privilege_type='EXECUTE'
      AND NOT x.is_grantable)
  OR EXISTS (SELECT 1 FROM pg_proc p
    CROSS JOIN LATERAL aclexplode(coalesce(p.proacl,acldefault('f',p.proowner))) x
    LEFT JOIN pg_roles grantee ON grantee.oid=x.grantee
    WHERE p.oid=to_regprocedure('labos_cleanup_private.'||f.signature)
      AND x.grantee<>p.proowner
      AND (grantee.rolname IS DISTINCT FROM f.expected_executor
        OR x.privilege_type<>'EXECUTE' OR x.is_grantable))
  THEN RAISE EXCEPTION 'function ACL mismatch: %',f.signature; END IF;
 END LOOP;
 FOREACH r IN ARRAY ARRAY['labos_case_expiry_owner','labos_case_reject_owner',
  'labos_case_claim_owner','labos_case_renew_owner','labos_case_present_owner',
  'labos_case_failure_owner','labos_case_reopen_owner','labos_verification_ack_owner'] LOOP
  IF pg_has_role('labos_verification_app',r,'SET') OR pg_has_role('labos_verification_app',r,'USAGE')
   OR pg_has_role('labos_verification_cleanup',r,'SET') OR pg_has_role('labos_verification_cleanup',r,'USAGE')
   OR has_schema_privilege(r,'labos_cleanup_private','CREATE')
  THEN RAISE EXCEPTION 'runtime role inherits owner: %',r; END IF;
 END LOOP;
 IF EXISTS (SELECT 1 FROM pg_auth_members m
   JOIN pg_roles granted ON granted.oid=m.roleid
   JOIN pg_roles member ON member.oid=m.member
   JOIN pg_roles grantor ON grantor.oid=m.grantor
   WHERE granted.rolname IN ('labos_case_expiry_owner','labos_case_reject_owner',
     'labos_case_claim_owner','labos_case_renew_owner','labos_case_present_owner',
     'labos_case_failure_owner','labos_case_reopen_owner','labos_verification_ack_owner')
     AND member.rolname='postgres' AND grantor.rolname='postgres')
 THEN RAISE EXCEPTION 'temporary postgres membership remains'; END IF;
 IF (SELECT count(*) FROM pg_auth_members m
   JOIN pg_roles granted ON granted.oid=m.roleid
   JOIN pg_roles member ON member.oid=m.member
   JOIN pg_roles grantor ON grantor.oid=m.grantor
   WHERE granted.rolname IN ('labos_case_expiry_owner','labos_case_reject_owner',
     'labos_case_claim_owner','labos_case_renew_owner','labos_case_present_owner',
     'labos_case_failure_owner','labos_case_reopen_owner')
     AND member.rolname='postgres' AND grantor.rolname='supabase_admin'
     AND m.admin_option AND NOT m.inherit_option AND NOT m.set_option) <> 7
 THEN RAISE EXCEPTION 'automatic creator membership mismatch'; END IF;
END $$;

SET ROLE labos_verification_app;
DO $$ BEGIN
 BEGIN PERFORM labos_cleanup_private.claim_object_storage_cleanup('not-a-grant'); RAISE EXCEPTION 'app claim accepted'; EXCEPTION WHEN insufficient_privilege THEN NULL; END;
 BEGIN PERFORM labos_cleanup_private.expire_case_object_storage_and_enroll(1); RAISE EXCEPTION 'app expiry accepted'; EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
RESET ROLE;
SET ROLE labos_verification_cleanup;
DO $$ BEGIN
 BEGIN PERFORM labos_cleanup_private.reject_case_s001('not-a-grant'); RAISE EXCEPTION 'worker rejection accepted'; EXCEPTION WHEN insufficient_privilege THEN NULL; END;
 BEGIN PERFORM labos_cleanup_private.reopen_retired_object_storage_cleanup('not-a-grant'); RAISE EXCEPTION 'worker reopen accepted'; EXCEPTION WHEN insufficient_privilege THEN NULL; END;
END $$;
RESET ROLE;

