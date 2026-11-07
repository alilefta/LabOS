-- A1-I1 verification target only. Apply as postgres after the reviewed
-- additive migration. No provider operation or credential is in this script.
BEGIN;
DO $guard$
BEGIN
  IF current_database() <> 'postgres' OR current_user <> 'postgres'
    OR to_regprocedure(
      'labos_cleanup_private.ack_object_storage_cleanup(text,integer)') IS NULL
    OR to_regprocedure(
      'labos_cleanup_private.reject_case_s001(text)') IS NULL
    OR NOT EXISTS (
      SELECT 1 FROM pg_catalog.pg_roles
      WHERE rolname = 'labos_verification_cleanup' AND NOT rolcanlogin)
    OR NOT EXISTS (
      SELECT 1 FROM pg_catalog.pg_roles
      WHERE rolname = 'labos_verification_ack_owner' AND NOT rolcanlogin)
    OR (SELECT count(*) FROM public."_prisma_migrations"
      WHERE finished_at IS NOT NULL AND rolled_back_at IS NULL) <> 54
  THEN
    RAISE EXCEPTION 'A1-I1 verification install target mismatch';
  END IF;
END;
$guard$;

GRANT CONNECT ON DATABASE postgres TO labos_verification_cleanup;
GRANT USAGE ON SCHEMA public
  TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT USAGE ON SCHEMA labos_cleanup_private
  TO labos_verification_cleanup, labos_verification_ack_owner,
    labos_verification_app;

GRANT SELECT ("id", "organizationId", "labId", "createdByMemberId",
  "boundaryId", "purpose", "targetType", "targetId", "status", "provider",
  "providerFileKey", "providerFileUrl", "expiresAt", "uploadedAt",
  "consumedAt", "providerDeletedAt", "failedAt", "expiredAt",
  "cleanupAttemptCount", "lastCleanupAttemptAt",
  "cleanupLeaseExpiresAt", "cleanupFailureCode", "providerCleanupConfirmedAt")
  ON TABLE public."FileUploadGrant"
  TO labos_verification_cleanup;
-- The NOLOGIN function owner uses SELECT * under the grant lock. Its only
-- external entrypoints are the individually granted private functions.
GRANT SELECT ON TABLE public."FileUploadGrant"
  TO labos_verification_ack_owner;
GRANT SELECT ("objectKey", "sourceUploadGrantId",
  "latestWriteCapabilityExpiresAt")
  ON TABLE public."ObjectStorageKeyAllocation"
  TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT SELECT ("id", "sourceUploadGrantId", "provider", "providerObjectKey",
  "organizationId", "labId")
  ON TABLE public."StoredFile"
  TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT SELECT ("id", "storedFileId", "caseAssetFileId", "organizationId", "labId")
  ON TABLE public."CaseAssetFileVersion"
  TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT SELECT ("id", "currentVersionId", "dentalCaseId", "labId")
  ON TABLE public."CaseAssetFile"
  TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT SELECT ("id", "labId", "status")
  ON TABLE public."Case"
  TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT SELECT ("id", "organizationId")
  ON TABLE public."Lab" TO labos_verification_ack_owner;
GRANT SELECT ("id", "organizationId")
  ON TABLE public.member TO labos_verification_ack_owner;
GRANT SELECT ("uploadGrantId", "organizationId", "labId", "caseId", "provider",
  "providerObjectKey", "measuredSizeBytes", "contentSha256")
  ON TABLE public."CaseClinicalUploadEvidence"
  TO labos_verification_cleanup, labos_verification_ack_owner;

GRANT UPDATE ("status", "expiredAt", "updatedAt")
  ON TABLE public."FileUploadGrant" TO labos_verification_cleanup;
GRANT UPDATE ("status", "cleanupAttemptCount", "lastCleanupAttemptAt",
  "providerCleanupConfirmedAt", "cleanupLeaseExpiresAt",
  "cleanupFailureCode", "failureCode", "failedAt", "updatedAt")
  ON TABLE public."FileUploadGrant" TO labos_verification_ack_owner;

REVOKE ALL ON FUNCTION labos_cleanup_private.reject_case_s001(text)
  FROM PUBLIC, anon, authenticated, service_role, labos_verification_cleanup;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.reject_case_s001(text)
  TO labos_verification_app;

REVOKE ALL ON FUNCTION
  labos_cleanup_private.claim_object_storage_cleanup(text)
  FROM PUBLIC, anon, authenticated, service_role, labos_verification_app;
REVOKE ALL ON FUNCTION
  labos_cleanup_private.renew_object_storage_cleanup(text, integer)
  FROM PUBLIC, anon, authenticated, service_role, labos_verification_app;
REVOKE ALL ON FUNCTION
  labos_cleanup_private.record_object_storage_cleanup_failure(text, integer, text)
  FROM PUBLIC, anon, authenticated, service_role, labos_verification_app;
REVOKE ALL ON FUNCTION
  labos_cleanup_private.ack_object_storage_cleanup(text, integer)
  FROM PUBLIC, anon, authenticated, service_role, labos_verification_app;
GRANT EXECUTE ON FUNCTION
  labos_cleanup_private.claim_object_storage_cleanup(text)
  TO labos_verification_cleanup;
GRANT EXECUTE ON FUNCTION
  labos_cleanup_private.renew_object_storage_cleanup(text, integer)
  TO labos_verification_cleanup;
GRANT EXECUTE ON FUNCTION
  labos_cleanup_private.record_object_storage_cleanup_failure(text, integer, text)
  TO labos_verification_cleanup;
GRANT EXECUTE ON FUNCTION
  labos_cleanup_private.ack_object_storage_cleanup(text, integer)
  TO labos_verification_cleanup;

-- PostgreSQL 17 owner transfer requires the new owner to have temporary
-- schema CREATE and postgres to have temporary SET ROLE membership. Both
-- privileges are revoked in this same transaction before commit.
GRANT CREATE ON SCHEMA labos_cleanup_private
  TO labos_verification_ack_owner;
GRANT labos_verification_ack_owner TO postgres
  WITH ADMIN TRUE, INHERIT FALSE, SET TRUE;
ALTER FUNCTION labos_cleanup_private.claim_object_storage_cleanup(text)
  OWNER TO labos_verification_ack_owner;
ALTER FUNCTION labos_cleanup_private.reject_case_s001(text)
  OWNER TO labos_verification_ack_owner;
ALTER FUNCTION labos_cleanup_private.renew_object_storage_cleanup(text, integer)
  OWNER TO labos_verification_ack_owner;
ALTER FUNCTION labos_cleanup_private.record_object_storage_cleanup_failure(text, integer, text)
  OWNER TO labos_verification_ack_owner;
ALTER FUNCTION labos_cleanup_private.ack_object_storage_cleanup(text, integer)
  OWNER TO labos_verification_ack_owner;
REVOKE CREATE ON SCHEMA labos_cleanup_private
  FROM labos_verification_ack_owner;
REVOKE labos_verification_ack_owner FROM postgres;

DO $verify$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_catalog.pg_proc p
    WHERE p.oid IN (
      to_regprocedure('labos_cleanup_private.claim_object_storage_cleanup(text)'),
      to_regprocedure('labos_cleanup_private.reject_case_s001(text)'),
      to_regprocedure('labos_cleanup_private.renew_object_storage_cleanup(text,integer)'),
      to_regprocedure('labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text)'),
      to_regprocedure('labos_cleanup_private.ack_object_storage_cleanup(text,integer)'))
      AND pg_catalog.pg_get_userbyid(p.proowner) <> 'labos_verification_ack_owner')
    OR (SELECT count(*) FROM pg_catalog.pg_proc p
      WHERE p.oid IN (
        to_regprocedure('labos_cleanup_private.claim_object_storage_cleanup(text)'),
        to_regprocedure('labos_cleanup_private.reject_case_s001(text)'),
        to_regprocedure('labos_cleanup_private.renew_object_storage_cleanup(text,integer)'),
        to_regprocedure('labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text)'),
        to_regprocedure('labos_cleanup_private.ack_object_storage_cleanup(text,integer)'))) <> 5
    OR pg_catalog.has_column_privilege('labos_verification_cleanup',
      'public."FileUploadGrant"', 'cleanupLeaseExpiresAt', 'UPDATE')
    OR pg_catalog.has_column_privilege('labos_verification_cleanup',
      'public."FileUploadGrant"', 'providerCleanupConfirmedAt', 'UPDATE')
    OR pg_catalog.has_function_privilege('labos_verification_app',
      'labos_cleanup_private.claim_object_storage_cleanup(text)', 'EXECUTE')
    OR pg_catalog.has_function_privilege('labos_verification_app',
      'labos_cleanup_private.renew_object_storage_cleanup(text,integer)', 'EXECUTE')
    OR pg_catalog.has_function_privilege('labos_verification_app',
      'labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text)', 'EXECUTE')
    OR pg_catalog.has_function_privilege('labos_verification_app',
      'labos_cleanup_private.ack_object_storage_cleanup(text,integer)', 'EXECUTE')
    OR NOT pg_catalog.has_function_privilege('labos_verification_app',
      'labos_cleanup_private.reject_case_s001(text)', 'EXECUTE')
    OR pg_catalog.has_function_privilege('labos_verification_cleanup',
      'labos_cleanup_private.reject_case_s001(text)', 'EXECUTE')
    OR NOT pg_catalog.has_schema_privilege('labos_verification_app',
      'labos_cleanup_private', 'USAGE')
    OR pg_catalog.has_schema_privilege('labos_verification_ack_owner',
      'labos_cleanup_private', 'CREATE')
    OR EXISTS (
      SELECT 1 FROM pg_catalog.pg_auth_members m
      JOIN pg_catalog.pg_roles r ON r.oid = m.roleid
      JOIN pg_catalog.pg_roles member ON member.oid = m.member
      WHERE r.rolname = 'labos_verification_ack_owner'
        AND member.rolname IN ('postgres', 'labos_verification_app',
          'labos_verification_cleanup'))
  THEN
    RAISE EXCEPTION 'A1-I1 role postcondition failed';
  END IF;
END;
$verify$;
COMMIT;
