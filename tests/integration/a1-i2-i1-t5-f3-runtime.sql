-- Disposable PostgreSQL 17.11 only. Enabled-trigger T5-F3 short regressions; every fixture transaction rolls back.
-- Run as the non-superuser postgres rehearsal runner after migrations 1-57 and the A1-I1 role preparation.

-- Scenario: short
\set ON_ERROR_STOP on
BEGIN;
GRANT labos_verification_app,labos_verification_cleanup,labos_case_expiry_executor TO postgres WITH ADMIN FALSE,INHERIT FALSE,SET TRUE GRANTED BY postgres;
INSERT INTO public.organization(id,name,slug,"createdAt") VALUES ('f3-org','Synthetic','f3-org',clock_timestamp());
INSERT INTO public."Lab"(id,title,"organizationId","updatedAt") VALUES ('f3-lab','L','f3-org',clock_timestamp());
INSERT INTO public."AuthUser"(id,name,email,"updatedAt") VALUES ('f3-user','U','f3@example.invalid',clock_timestamp());
INSERT INTO public.member(id,"organizationId","userId","createdAt") VALUES ('f3-member','f3-org','f3-user',clock_timestamp());
INSERT INTO public."Patient"(id,name,"labId","updatedAt") VALUES ('f3-patient','P','f3-lab',clock_timestamp());
INSERT INTO public."Case"(id,"patientId","labId","updatedAt","caseNumber") VALUES ('f3-case','f3-patient','f3-lab',clock_timestamp(),'F3-1');
INSERT INTO public."FileUploadGrant"(id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix","correlationId","expiresAt","updatedAt")
SELECT 'f3-exp-'||i,'f3-org','f3-lab','f3-member','N-FILE-110','case.asset.add.stage','case','f3-case','OBJECT_STORAGE','objects/11111111-1111-4111-8111-'||lpad(i::text,12,'0'),'JPG','f3-exp-cor-'||i,clock_timestamp() AT TIME ZONE 'UTC' + interval '5 seconds',clock_timestamp() FROM generate_series(1,7) i;
UPDATE public."ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"=clock_timestamp()+interval '2 seconds' WHERE "sourceUploadGrantId" LIKE 'f3-exp-%';
INSERT INTO public."FileUploadGrant"(id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix","correlationId","expiresAt","updatedAt") VALUES ('f3-q','f3-org','f3-lab','f3-member','N-FILE-110','case.asset.add.stage','case','f3-case','OBJECT_STORAGE','objects/22222222-2222-4222-8222-222222222222','JPG','f3-q-cor',clock_timestamp() AT TIME ZONE 'UTC' + interval '5 seconds',clock_timestamp());
SET CONSTRAINTS ALL IMMEDIATE;
SET CONSTRAINTS ALL DEFERRED;
SELECT pg_sleep(6);
SET LOCAL ROLE labos_case_expiry_executor;
SELECT count(*) FROM labos_cleanup_private.expire_case_object_storage_and_enroll(20);
SET CONSTRAINTS ALL IMMEDIATE;
RESET ROLE;
SELECT status,count(*) FROM public."FileUploadGrant" WHERE id LIKE 'f3-exp-%' GROUP BY status;
SELECT status,"cleanupFailureCode" FROM public."FileUploadGrant" WHERE id='f3-q';
DO $$ BEGIN
  IF (SELECT count(*) FROM public."FileUploadGrant" WHERE id LIKE 'f3-exp-%'
        AND status='EXPIRED' AND "cleanupReconcileStage"=0
        AND "cleanupNextCheckAt">clock_timestamp()) <> 7
    OR NOT EXISTS (SELECT 1 FROM public."FileUploadGrant" WHERE id='f3-q'
        AND status='PENDING' AND "cleanupFailureCode"='QUARANTINE_ALLOCATION')
  THEN RAISE EXCEPTION 'expiry or quarantine regression'; END IF;
END $$;
GRANT SELECT ON public."FileUploadGrant", public."ObjectStorageKeyAllocation",
  public."StoredFile", public."Case", public."Lab", public.member TO labos_verification_app;
GRANT UPDATE (status) ON public."FileUploadGrant" TO labos_verification_app;
SET LOCAL ROLE labos_verification_app;
DO $$ BEGIN
  BEGIN
    PERFORM labos_cleanup_private.expire_case_object_storage_and_enroll(1);
    RAISE EXCEPTION 'wrong caller could expire';
  EXCEPTION WHEN insufficient_privilege THEN NULL; END;
  BEGIN
    UPDATE public."FileUploadGrant" SET status='CLEANED' WHERE id='f3-q';
    RAISE EXCEPTION 'app could terminalize directly';
  EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
RESET ROLE;
SET LOCAL ROLE labos_verification_cleanup;
DO $$ BEGIN
  BEGIN
    PERFORM labos_cleanup_private.claim_object_storage_cleanup('f3-exp-1');
    RAISE EXCEPTION 'premature claim succeeded';
  EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
RESET ROLE;
DO $$ BEGIN
  BEGIN
    INSERT INTO public."FileUploadGrant"
      (id,"organizationId","labId","createdByMemberId","boundaryId",purpose,
       "targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix",
       "correlationId","expiresAt","updatedAt")
    VALUES ('f3-invalid-member','f3-org','f3-lab','missing-member','N-FILE-110',
      'case.asset.add.stage','case','f3-case','OBJECT_STORAGE',
      'objects/44444444-4444-4444-8444-444444444444','JPG','f3-invalid-cor',
      clock_timestamp() AT TIME ZONE 'UTC'+interval '1 hour',clock_timestamp());
    RAISE EXCEPTION 'invalid member accepted';
  EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
ROLLBACK;



-- Scenario: reject
\set ON_ERROR_STOP on
BEGIN;
GRANT labos_verification_app,labos_verification_cleanup,labos_case_expiry_executor TO postgres WITH ADMIN FALSE,INHERIT FALSE,SET TRUE GRANTED BY postgres;
GRANT SELECT ON public."FileUploadGrant", public."ObjectStorageKeyAllocation" TO labos_verification_app;
INSERT INTO public.organization(id,name,slug,"createdAt") VALUES ('f3-org','Synthetic','f3-org',clock_timestamp());
INSERT INTO public."Lab"(id,title,"organizationId","updatedAt") VALUES ('f3-lab','L','f3-org',clock_timestamp());
INSERT INTO public."AuthUser"(id,name,email,"updatedAt") VALUES ('f3-user','U','f3@example.invalid',clock_timestamp());
INSERT INTO public.member(id,"organizationId","userId","createdAt") VALUES ('f3-member','f3-org','f3-user',clock_timestamp());
INSERT INTO public."Patient"(id,name,"labId","updatedAt") VALUES ('f3-patient','P','f3-lab',clock_timestamp());
INSERT INTO public."Case"(id,"patientId","labId","updatedAt","caseNumber") VALUES ('f3-case','f3-patient','f3-lab',clock_timestamp(),'F3-1');
INSERT INTO public."FileUploadGrant"(id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix","correlationId","expiresAt","updatedAt") SELECT 'f3-rej-'||i,'f3-org','f3-lab','f3-member','N-FILE-110','case.asset.add.stage','case','f3-case','OBJECT_STORAGE','objects/11111111-1111-4111-8111-'||lpad(i::text,12,'0'),'JPG','f3-rej-cor-'||i,clock_timestamp() AT TIME ZONE 'UTC'+interval '1 hour',clock_timestamp() FROM generate_series(1,7) i;
UPDATE public."ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"=clock_timestamp()+interval '2 minutes' WHERE "sourceUploadGrantId" LIKE 'f3-rej-%';
SET CONSTRAINTS ALL IMMEDIATE;
SET CONSTRAINTS ALL DEFERRED;
SET LOCAL ROLE labos_verification_app;
SELECT labos_cleanup_private.reject_case_s001('f3-rej-'||i) FROM generate_series(1,7) i;
SET CONSTRAINTS ALL IMMEDIATE;
RESET ROLE;
SELECT status,count(*) FROM public."FileUploadGrant" WHERE id LIKE 'f3-rej-%' GROUP BY status;
DO $$ BEGIN
  IF (SELECT count(*) FROM public."FileUploadGrant" WHERE id LIKE 'f3-rej-%'
       AND status='FAILED' AND "cleanupReconcileStage"=0
       AND "cleanupNextCheckAt">clock_timestamp()) <> 7
  THEN RAISE EXCEPTION 'S001 enrollment regression'; END IF;
END $$;
ROLLBACK;



-- Scenario: shadow
\set ON_ERROR_STOP on
BEGIN;
GRANT labos_verification_app,labos_verification_cleanup,labos_case_expiry_executor TO postgres WITH ADMIN FALSE,INHERIT FALSE,SET TRUE GRANTED BY postgres;
GRANT SELECT ON public."FileUploadGrant",public."ObjectStorageKeyAllocation",public."Lab",public."Case",public.member,public."StoredFile" TO labos_verification_app;
GRANT INSERT ON public."FileUploadGrant",public."ObjectStorageKeyAllocation" TO labos_verification_app;
GRANT UPDATE ON public."FileUploadGrant" TO labos_verification_app;
GRANT UPDATE ("latestWriteCapabilityExpiresAt") ON public."ObjectStorageKeyAllocation" TO labos_verification_app;
INSERT INTO public.organization(id,name,slug,"createdAt") VALUES ('f3-org','Synthetic','f3-org',clock_timestamp());
INSERT INTO public."Lab"(id,title,"organizationId","updatedAt") VALUES ('f3-lab','L','f3-org',clock_timestamp());
INSERT INTO public."AuthUser"(id,name,email,"updatedAt") VALUES ('f3-user','U','f3@example.invalid',clock_timestamp());
INSERT INTO public.member(id,"organizationId","userId","createdAt") VALUES ('f3-member','f3-org','f3-user',clock_timestamp());
INSERT INTO public."Patient"(id,name,"labId","updatedAt") VALUES ('f3-patient','P','f3-lab',clock_timestamp());
INSERT INTO public."Case"(id,"patientId","labId","updatedAt","caseNumber") VALUES ('f3-case','f3-patient','f3-lab',clock_timestamp(),'F3-1');
SET LOCAL ROLE labos_verification_app;
CREATE TEMP TABLE "ObjectStorageKeyAllocation" (LIKE public."ObjectStorageKeyAllocation" INCLUDING DEFAULTS);
INSERT INTO public."FileUploadGrant"(id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix","correlationId","expiresAt","updatedAt") VALUES ('f3-shadow','f3-org','f3-lab','f3-member','N-FILE-110','case.asset.add.stage','case','f3-case','OBJECT_STORAGE','objects/33333333-3333-4333-8333-333333333333','JPG','f3-shadow-cor',clock_timestamp() AT TIME ZONE 'UTC'+interval '1 hour',clock_timestamp());
SELECT (SELECT count(*) FROM public."ObjectStorageKeyAllocation" WHERE "sourceUploadGrantId"='f3-shadow') durable, (SELECT count(*) FROM pg_temp."ObjectStorageKeyAllocation" WHERE "sourceUploadGrantId"='f3-shadow') temporary;
DO $$ BEGIN
  IF (SELECT count(*) FROM public."ObjectStorageKeyAllocation" WHERE "sourceUploadGrantId"='f3-shadow') <> 1
    OR (SELECT count(*) FROM pg_temp."ObjectStorageKeyAllocation" WHERE "sourceUploadGrantId"='f3-shadow') <> 0
  THEN RAISE EXCEPTION 'allocation insert diverted to temporary table'; END IF;
END $$;
SET CONSTRAINTS ALL IMMEDIATE;
RESET ROLE;
ROLLBACK;



-- Scenario: fence
\set ON_ERROR_STOP on
BEGIN;
GRANT labos_verification_app,labos_verification_cleanup,labos_case_expiry_executor TO postgres WITH ADMIN FALSE,INHERIT FALSE,SET TRUE GRANTED BY postgres;
GRANT SELECT ON public."FileUploadGrant",public."ObjectStorageKeyAllocation",public."Lab",public."Case",public.member,public."StoredFile" TO labos_verification_app;
GRANT INSERT ON public."FileUploadGrant",public."ObjectStorageKeyAllocation" TO labos_verification_app;
GRANT UPDATE ON public."FileUploadGrant" TO labos_verification_app;
GRANT UPDATE ("latestWriteCapabilityExpiresAt") ON public."ObjectStorageKeyAllocation" TO labos_verification_app;
INSERT INTO public.organization(id,name,slug,"createdAt") VALUES ('f3-org','Synthetic','f3-org',clock_timestamp());
INSERT INTO public."Lab"(id,title,"organizationId","updatedAt") VALUES ('f3-lab','L','f3-org',clock_timestamp());
INSERT INTO public."AuthUser"(id,name,email,"updatedAt") VALUES ('f3-user','U','f3@example.invalid',clock_timestamp());
INSERT INTO public.member(id,"organizationId","userId","createdAt") VALUES ('f3-member','f3-org','f3-user',clock_timestamp());
INSERT INTO public."Patient"(id,name,"labId","updatedAt") VALUES ('f3-patient','P','f3-lab',clock_timestamp());
INSERT INTO public."Case"(id,"patientId","labId","updatedAt","caseNumber") VALUES ('f3-case','f3-patient','f3-lab',clock_timestamp(),'F3-1');
SET LOCAL ROLE labos_verification_app;

INSERT INTO public."FileUploadGrant"(id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix","correlationId","expiresAt","updatedAt") VALUES ('f3-shadow','f3-org','f3-lab','f3-member','N-FILE-110','case.asset.add.stage','case','f3-case','OBJECT_STORAGE','objects/33333333-3333-4333-8333-333333333333','JPG','f3-shadow-cor',clock_timestamp() AT TIME ZONE 'UTC'+interval '1 hour',clock_timestamp());
UPDATE public."ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"=clock_timestamp()+interval '2 minutes' WHERE "sourceUploadGrantId"='f3-shadow';
SELECT labos_cleanup_private.reject_case_s001('f3-shadow');
CREATE TEMP TABLE "FileUploadGrant" (LIKE public."FileUploadGrant" INCLUDING DEFAULTS);
INSERT INTO pg_temp."FileUploadGrant" SELECT * FROM public."FileUploadGrant" WHERE id='f3-shadow';
UPDATE pg_temp."FileUploadGrant" SET status='PENDING' WHERE id='f3-shadow';
DO $$ BEGIN
  BEGIN
    UPDATE public."ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"=clock_timestamp()+interval '3 minutes' WHERE "sourceUploadGrantId"='f3-shadow';
    RAISE EXCEPTION 'shadow accepted';
  EXCEPTION WHEN check_violation THEN NULL;
  END;
END $$;
SELECT status FROM public."FileUploadGrant" WHERE id='f3-shadow';
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM public."FileUploadGrant" WHERE id='f3-shadow' AND status='FAILED')
    OR NOT EXISTS (SELECT 1 FROM public."ObjectStorageKeyAllocation"
      WHERE "sourceUploadGrantId"='f3-shadow'
        AND "latestWriteCapabilityExpiresAt"<clock_timestamp()+interval '2 minutes 30 seconds')
  THEN RAISE EXCEPTION 'allocation fence advanced through shadow'; END IF;
END $$;
SET CONSTRAINTS ALL IMMEDIATE;
RESET ROLE;
ROLLBACK;




