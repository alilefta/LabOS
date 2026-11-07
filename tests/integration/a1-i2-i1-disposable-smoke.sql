-- A1-I2-I1 disposable PostgreSQL behavioral smoke test; transaction rolls back.
\set ON_ERROR_STOP on
BEGIN;
SET LOCAL session_replication_role = replica;
INSERT INTO public.organization(id,name,slug,"createdAt") VALUES ('a1i2-org','Synthetic org','a1i2-org',clock_timestamp());
INSERT INTO public."Lab"(id,title,"organizationId","updatedAt") VALUES ('a1i2-lab','Synthetic lab','a1i2-org',clock_timestamp());
INSERT INTO public."AuthUser"(id,name,email,"updatedAt") VALUES ('a1i2-user','Synthetic user','a1i2@example.invalid',clock_timestamp());
INSERT INTO public.member(id,"organizationId","userId","createdAt") VALUES ('a1i2-member','a1i2-org','a1i2-user',clock_timestamp());
INSERT INTO public."Patient"(id,name,"labId","updatedAt") VALUES ('a1i2-patient','Synthetic patient','a1i2-lab',clock_timestamp());
INSERT INTO public."Case"(id,"patientId","labId","updatedAt","caseNumber") VALUES ('a1i2-case','a1i2-patient','a1i2-lab',clock_timestamp(),'A1I2-1');
INSERT INTO public."FileUploadGrant"(id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix","correlationId","expiresAt","updatedAt") VALUES ('a1i2-grant','a1i2-org','a1i2-lab','a1i2-member','N-FILE-110','case.asset.add.stage','case','a1i2-case','OBJECT_STORAGE','objects/11111111-1111-4111-8111-111111111111','JPG','a1i2-correlation',clock_timestamp() AT TIME ZONE 'UTC' - interval '3 hours',clock_timestamp());
INSERT INTO public."ObjectStorageKeyAllocation"("objectKey","sourceUploadGrantId","latestWriteCapabilityExpiresAt") VALUES ('objects/11111111-1111-4111-8111-111111111111','a1i2-grant',clock_timestamp() - interval '2 hours');
SET LOCAL session_replication_role = origin;
SET ROLE labos_case_expiry_executor;
SELECT labos_cleanup_private.expire_case_object_storage_and_enroll(10);
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM public."FileUploadGrant" WHERE id='a1i2-grant' AND status='EXPIRED' AND "cleanupReconcileStage"=0 AND "cleanupNextCheckAt" <= clock_timestamp()) THEN RAISE EXCEPTION 'expiry enrollment failed'; END IF; END $$;
SET ROLE labos_verification_cleanup;
SELECT labos_cleanup_private.claim_object_storage_cleanup('a1i2-grant');
SELECT labos_cleanup_private.ack_object_storage_cleanup('a1i2-grant',1);
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM public."FileUploadGrant" WHERE id='a1i2-grant' AND status='CLEANED' AND "cleanupReconcileStage"=1 AND "cleanupLastCheckOutcome"='ABSENT' AND "cleanupNextCheckAt">clock_timestamp()) THEN RAISE EXCEPTION 'absence ACK failed'; END IF; END $$;
ROLLBACK;

