\set ON_ERROR_STOP on
BEGIN;
SET LOCAL session_replication_role=replica;
INSERT INTO public.organization(id,name,slug,"createdAt") VALUES ('m-org','O','m-org',clock_timestamp());
INSERT INTO public."Lab"(id,title,"organizationId","updatedAt") VALUES ('m-lab','L','m-org',clock_timestamp());
INSERT INTO public."AuthUser"(id,name,email,"updatedAt") VALUES ('m-user','U','m@example.invalid',clock_timestamp());
INSERT INTO public.member(id,"organizationId","userId","createdAt") VALUES ('m-member','m-org','m-user',clock_timestamp());
INSERT INTO public."Patient"(id,name,"labId","updatedAt") VALUES ('m-patient','P','m-lab',clock_timestamp());
INSERT INTO public."Case"(id,"patientId","labId","updatedAt","caseNumber") VALUES ('m-case','m-patient','m-lab',clock_timestamp(),'M-1');
INSERT INTO public."FileUploadGrant"(id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix","correlationId","expiresAt","updatedAt") VALUES
 ('m-grant','m-org','m-lab','m-member','N-FILE-110','case.asset.add.stage','case','m-case','OBJECT_STORAGE','objects/22222222-2222-4222-8222-222222222222','JPG','m-cor',clock_timestamp()-interval '3 hours',clock_timestamp()),
 ('m-q','m-org','m-lab','m-member','N-FILE-110','case.asset.add.stage','case','m-case','OBJECT_STORAGE','objects/33333333-3333-4333-8333-333333333333','JPG','m-q-cor',clock_timestamp()-interval '3 hours',clock_timestamp());
INSERT INTO public."ObjectStorageKeyAllocation"("objectKey","sourceUploadGrantId","latestWriteCapabilityExpiresAt") VALUES ('objects/22222222-2222-4222-8222-222222222222','m-grant',clock_timestamp()-interval '2 hours');
INSERT INTO public."FileUploadGrant"(id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix","correlationId","expiresAt","updatedAt") VALUES
 ('m-reject','m-org','m-lab','m-member','N-FILE-110','case.asset.add.stage','case','m-case','OBJECT_STORAGE','objects/44444444-4444-4444-8444-444444444444','JPG','m-r-cor',clock_timestamp()+interval '1 hour',clock_timestamp());
INSERT INTO public."ObjectStorageKeyAllocation"("objectKey","sourceUploadGrantId","latestWriteCapabilityExpiresAt") VALUES ('objects/44444444-4444-4444-8444-444444444444','m-reject',clock_timestamp()-interval '2 hours');
SET LOCAL session_replication_role=origin;
SET ROLE labos_verification_app;
SELECT * FROM labos_cleanup_private.reject_case_s001('m-reject');
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-reject' AND status='FAILED' AND "cleanupReconcileStage"=0 AND "cleanupNextCheckAt"<=clock_timestamp()) THEN RAISE EXCEPTION 'S001 enrollment missing'; END IF; END $$;

DO $$ BEGIN
  BEGIN UPDATE public."FileUploadGrant" SET status='EXPIRED' WHERE id='m-grant'; RAISE EXCEPTION 'direct expiry accepted'; EXCEPTION WHEN check_violation THEN NULL; END;
  BEGIN UPDATE public."FileUploadGrant" SET status='FAILED' WHERE id='m-grant'; RAISE EXCEPTION 'direct rejection accepted'; EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
SET ROLE labos_case_expiry_executor;
SELECT labos_cleanup_private.expire_case_object_storage_and_enroll(10);
RESET ROLE;
DO $$ BEGIN
 IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-grant' AND status='EXPIRED' AND "cleanupReconcileStage"=0) THEN RAISE EXCEPTION 'expiry missing'; END IF;
 IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-q' AND status='PENDING' AND "cleanupFailureCode"='QUARANTINE_ALLOCATION') THEN RAISE EXCEPTION 'quarantine missing'; END IF;
END $$;
SET LOCAL session_replication_role=replica;
INSERT INTO public."StoredFile"(id,"organizationId","labId","sourceUploadGrantId",provider,"providerObjectKey",purpose,"detectedMimeType","sizeBytes","uploaderMemberIdSnapshot")
VALUES ('m-file','m-org','m-lab','m-grant','OBJECT_STORAGE','objects/22222222-2222-4222-8222-222222222222','CASE_CLINICAL_ASSET','image/jpeg',1,'m-member');
SET LOCAL session_replication_role=origin;
SET ROLE labos_verification_cleanup;
DO $$ BEGIN BEGIN PERFORM labos_cleanup_private.claim_object_storage_cleanup('m-grant'); RAISE EXCEPTION 'canonical claim accepted'; EXCEPTION WHEN check_violation THEN NULL; END; END $$;
RESET ROLE;
SET LOCAL session_replication_role=replica;
DELETE FROM public."StoredFile" WHERE id='m-file';
SET LOCAL session_replication_role=origin;
SET ROLE labos_verification_cleanup;
SELECT labos_cleanup_private.claim_object_storage_cleanup('m-grant');
DO $$ BEGIN
 BEGIN PERFORM labos_cleanup_private.ack_object_storage_cleanup('m-grant',2); RAISE EXCEPTION 'stale ACK accepted'; EXCEPTION WHEN check_violation THEN NULL; END;
 BEGIN PERFORM labos_cleanup_private.claim_object_storage_cleanup('m-grant'); RAISE EXCEPTION 'concurrent claim accepted'; EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
SELECT labos_cleanup_private.ack_object_storage_cleanup('m-grant',1);
RESET ROLE;
SET LOCAL session_replication_role=replica;
UPDATE public."FileUploadGrant" SET "cleanupNextCheckAt"=clock_timestamp()-interval '1 minute',"lastCleanupAttemptAt"=clock_timestamp()-interval '1 day' WHERE id='m-grant';
SET LOCAL session_replication_role=origin;
SET ROLE labos_verification_cleanup;
SELECT labos_cleanup_private.claim_object_storage_cleanup('m-grant');
SELECT labos_cleanup_private.note_present('m-grant',2);
SELECT labos_cleanup_private.record_object_storage_cleanup_failure('m-grant',2,'PROVIDER_AMBIGUOUS','PRESENT');
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-grant' AND status='CLEANED' AND "cleanupReconcileStage"=0 AND "cleanupLastCheckOutcome"='PRESENT' AND "cleanupFailureCode"='PROVIDER_AMBIGUOUS') THEN RAISE EXCEPTION 'presence/failure missing'; END IF; END $$;
SET LOCAL session_replication_role=replica;
UPDATE public."FileUploadGrant" SET "cleanupNextCheckAt"=clock_timestamp()-interval '1 minute',"lastCleanupAttemptAt"=clock_timestamp()-interval '1 day' WHERE id='m-grant';
SET LOCAL session_replication_role=origin;
SET ROLE labos_verification_cleanup;
SELECT labos_cleanup_private.claim_object_storage_cleanup('m-grant');
SELECT labos_cleanup_private.ack_object_storage_cleanup('m-grant',3);
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-grant' AND "cleanupReconcileStage"=1 AND "cleanupLastCheckOutcome"='ABSENT') THEN RAISE EXCEPTION 'recheck S1 missing'; END IF; END $$;
SET LOCAL session_replication_role=replica;
UPDATE public."FileUploadGrant" SET "cleanupNextCheckAt"=clock_timestamp()-interval '1 minute',"lastCleanupAttemptAt"=clock_timestamp()-interval '1 day' WHERE id='m-grant';
SET LOCAL session_replication_role=origin;
SET ROLE labos_verification_cleanup;
SELECT labos_cleanup_private.claim_object_storage_cleanup('m-grant');
SELECT labos_cleanup_private.ack_object_storage_cleanup('m-grant',4);
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-grant' AND "cleanupReconcileStage"=2 AND "cleanupLastCheckOutcome"='ABSENT') THEN RAISE EXCEPTION 'stage 2 missing'; END IF; END $$;
SET LOCAL session_replication_role=replica;
UPDATE public."FileUploadGrant" SET "cleanupNextCheckAt"=clock_timestamp()-interval '1 minute',"lastCleanupAttemptAt"=clock_timestamp()-interval '1 day' WHERE id='m-grant';
SET LOCAL session_replication_role=origin;
SET ROLE labos_verification_cleanup;
SELECT labos_cleanup_private.claim_object_storage_cleanup('m-grant');
SELECT labos_cleanup_private.ack_object_storage_cleanup('m-grant',5);
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-grant' AND "cleanupReconcileStage"=3 AND "cleanupLastCheckOutcome"='ABSENT') THEN RAISE EXCEPTION 'stage 3 missing'; END IF; END $$;
SET LOCAL session_replication_role=replica;
UPDATE public."FileUploadGrant" SET "cleanupNextCheckAt"=clock_timestamp()-interval '1 minute',"lastCleanupAttemptAt"=clock_timestamp()-interval '1 day' WHERE id='m-grant';
SET LOCAL session_replication_role=origin;
SET ROLE labos_verification_cleanup;
SELECT labos_cleanup_private.claim_object_storage_cleanup('m-grant');
SELECT labos_cleanup_private.ack_object_storage_cleanup('m-grant',6);
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-grant' AND "cleanupReconcileStage"=4 AND "cleanupLastCheckOutcome"='ABSENT') THEN RAISE EXCEPTION 'stage 4 missing'; END IF; END $$;
SET ROLE labos_verification_cleanup;
DO $$ BEGIN BEGIN PERFORM labos_cleanup_private.claim_object_storage_cleanup('m-grant'); RAISE EXCEPTION 'S4 claim accepted'; EXCEPTION WHEN check_violation THEN NULL; END; END $$;
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-grant' AND "cleanupReconcileStage"=4 AND "cleanupNextCheckAt" IS NULL) THEN RAISE EXCEPTION 'retirement missing'; END IF; END $$;
SET ROLE labos_case_reopen_executor;
SELECT labos_cleanup_private.reopen_retired_object_storage_cleanup('m-grant');
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-grant' AND "cleanupReconcileStage"=0 AND "cleanupLastCheckOutcome"='PRESENT' AND "cleanupNextCheckAt"<=clock_timestamp()) THEN RAISE EXCEPTION 'reopen missing'; END IF; END $$;
SET LOCAL session_replication_role=replica;
INSERT INTO public."FileUploadGrant"(id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix","correlationId","expiresAt","updatedAt",status,"providerCleanupConfirmedAt","cleanupReconcileStage","cleanupNextCheckAt","cleanupLastCheckOutcome")
VALUES ('m-exploit','m-org','m-lab','m-member','N-FILE-110','case.asset.add.stage','case','m-case','OBJECT_STORAGE','objects/55555555-5555-4555-8555-555555555555','JPG','m-exploit-cor',clock_timestamp()-interval '3 hours',clock_timestamp(),'CLEANED',clock_timestamp()-interval '30 days',3,clock_timestamp()-interval '1 minute','ABSENT');
INSERT INTO public."ObjectStorageKeyAllocation"("objectKey","sourceUploadGrantId","latestWriteCapabilityExpiresAt") VALUES ('objects/55555555-5555-4555-8555-555555555555','m-exploit',clock_timestamp()-interval '2 hours');
SET LOCAL session_replication_role=origin;
SET ROLE labos_verification_cleanup;
SELECT labos_cleanup_private.claim_object_storage_cleanup('m-exploit');
DO $$ BEGIN
 BEGIN
  PERFORM labos_cleanup_private.record_object_storage_cleanup_failure('m-exploit',1,'PROVIDER_AMBIGUOUS','PRESENT');
  RAISE EXCEPTION 'S3 PRESENT bypass accepted';
 EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-exploit' AND "cleanupReconcileStage"=3 AND "cleanupLastCheckOutcome"='ABSENT' AND "cleanupLeaseExpiresAt">clock_timestamp()) THEN RAISE EXCEPTION 'denied S3 PRESENT changed state'; END IF; END $$;
SET ROLE labos_verification_cleanup;
SELECT labos_cleanup_private.note_present('m-exploit',1);
SELECT labos_cleanup_private.record_object_storage_cleanup_failure('m-exploit',1,'PROVIDER_AMBIGUOUS','PRESENT');
DO $$ BEGIN
 BEGIN PERFORM labos_cleanup_private.ack_object_storage_cleanup('m-exploit',1); RAISE EXCEPTION 'failed generation ACK accepted';
 EXCEPTION WHEN check_violation THEN NULL; END;
END $$;
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-exploit' AND "cleanupReconcileStage"=0 AND "cleanupLastCheckOutcome"='PRESENT' AND "cleanupNextCheckAt">clock_timestamp()) THEN RAISE EXCEPTION 'durable late-PRESENT reset missing'; END IF; END $$;
SET LOCAL session_replication_role=replica;
UPDATE public."FileUploadGrant" SET "cleanupNextCheckAt"=clock_timestamp()-interval '1 minute',"lastCleanupAttemptAt"=clock_timestamp()-interval '1 day' WHERE id='m-exploit';
SET LOCAL session_replication_role=origin;
SET ROLE labos_verification_cleanup;
SELECT labos_cleanup_private.claim_object_storage_cleanup('m-exploit');
SELECT labos_cleanup_private.ack_object_storage_cleanup('m-exploit',2);
RESET ROLE;
DO $$ BEGIN IF NOT EXISTS(SELECT 1 FROM public."FileUploadGrant" WHERE id='m-exploit' AND "cleanupReconcileStage"=1 AND "cleanupNextCheckAt">clock_timestamp()) THEN RAISE EXCEPTION 'late-PRESENT incorrectly retired at S4'; END IF; END $$;
ROLLBACK;






