-- A1-I1 verification target only. Run as postgres after the exact target/ACL
-- fingerprint and independent SQL review. No credential is included here.
BEGIN;
DO $guard$
BEGIN
  IF current_database() <> 'postgres' OR current_user <> 'postgres'
    OR NOT EXISTS (
      SELECT 1 FROM pg_catalog.pg_namespace
      WHERE nspname = 'public')
    OR EXISTS (
      SELECT 1 FROM pg_catalog.pg_roles
      WHERE rolname IN ('labos_verification_cleanup',
        'labos_verification_ack_owner'))
    OR (SELECT count(*) FROM public."_prisma_migrations"
      WHERE finished_at IS NOT NULL AND rolled_back_at IS NULL) <> 53
    OR (SELECT count(*) FROM public."_prisma_migrations"
      WHERE finished_at IS NULL AND rolled_back_at IS NULL) <> 0
  THEN
    RAISE EXCEPTION 'A1-I1 verification bootstrap target mismatch';
  END IF;
END;
$guard$;
CREATE ROLE labos_verification_cleanup NOLOGIN NOINHERIT
  NOCREATEROLE NOCREATEDB NOBYPASSRLS NOREPLICATION;
CREATE ROLE labos_verification_ack_owner NOLOGIN NOINHERIT
  NOCREATEROLE NOCREATEDB NOBYPASSRLS NOREPLICATION;
COMMIT;
