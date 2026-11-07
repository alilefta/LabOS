-- Disposable local PostgreSQL only. Model A1-I1 roles after 55 migrations.
BEGIN;
CREATE ROLE labos_verification_ack_owner NOLOGIN NOINHERIT NOCREATEROLE NOCREATEDB NOBYPASSRLS;
CREATE ROLE labos_verification_cleanup NOLOGIN NOINHERIT NOCREATEROLE NOCREATEDB NOBYPASSRLS;
CREATE ROLE labos_verification_app NOLOGIN NOINHERIT NOCREATEROLE NOCREATEDB NOBYPASSRLS;
GRANT USAGE ON SCHEMA public, labos_cleanup_private TO labos_verification_ack_owner;
GRANT SELECT ON public."FileUploadGrant", public."ObjectStorageKeyAllocation",
  public."StoredFile", public."Case", public."Lab", public.member
  TO labos_verification_ack_owner;
GRANT UPDATE ("status","cleanupAttemptCount","lastCleanupAttemptAt",
  "providerCleanupConfirmedAt","cleanupLeaseExpiresAt","cleanupFailureCode",
  "failureCode","failedAt","updatedAt") ON public."FileUploadGrant"
  TO labos_verification_ack_owner;
GRANT UPDATE ("status","expiredAt","updatedAt") ON public."FileUploadGrant"
  TO labos_verification_cleanup;
ALTER FUNCTION labos_cleanup_private.reject_case_s001(text)
  OWNER TO labos_verification_ack_owner;
ALTER FUNCTION labos_cleanup_private.claim_object_storage_cleanup(text)
  OWNER TO labos_verification_ack_owner;
ALTER FUNCTION labos_cleanup_private.renew_object_storage_cleanup(text,integer)
  OWNER TO labos_verification_ack_owner;
ALTER FUNCTION labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text)
  OWNER TO labos_verification_ack_owner;
ALTER FUNCTION labos_cleanup_private.ack_object_storage_cleanup(text,integer)
  OWNER TO labos_verification_ack_owner;
GRANT USAGE ON SCHEMA labos_cleanup_private TO labos_verification_cleanup, labos_verification_app;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.reject_case_s001(text)
  TO labos_verification_app;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.claim_object_storage_cleanup(text),
  labos_cleanup_private.renew_object_storage_cleanup(text,integer),
  labos_cleanup_private.record_object_storage_cleanup_failure(text,integer,text),
  labos_cleanup_private.ack_object_storage_cleanup(text,integer)
  TO labos_verification_cleanup;
COMMIT;
