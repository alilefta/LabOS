const { Client } = require('pg');
(async () => {
  const db = new Client({ connectionString: process.env.DIRECT_URL });
  await db.connect();
  try {
    await db.query('BEGIN');
    await db.query(`INSERT INTO "AuthUser" (id,name,email,"updatedAt") VALUES ('s001-user-1','Synthetic User','s001-run-1@example.invalid',now())`);
    await db.query(`INSERT INTO organization (id,name,slug,"createdAt") VALUES ('s001-org-1','Synthetic Lab','s001-run-org-1',now())`);
    await db.query(`INSERT INTO "Lab" (id,title,"organizationId","updatedAt") VALUES ('s001-lab-1','Synthetic Lab','s001-org-1',now())`);
    await db.query(`INSERT INTO member (id,"organizationId","userId",role,"createdAt") VALUES ('s001-member-1','s001-org-1','s001-user-1','owner',now())`);
    await db.query(`INSERT INTO "Patient" (id,name,"labId","updatedAt") VALUES ('s001-patient-1','Synthetic Patient','s001-lab-1',now())`);
    await db.query(`INSERT INTO "Case" (id,"patientId","labId","caseNumber","updatedAt") VALUES ('s001-case-1','s001-patient-1','s001-lab-1','S001-1',now())`);
    await db.query(`INSERT INTO "FileUploadGrant" (id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","correlationId","createdAt","updatedAt","expiresAt") VALUES ('s001-grant-r001','s001-org-1','s001-lab-1','s001-member-1','N-FILE-110','case.asset.add.stage','case','s001-case-1','UPLOADTHING','s001-object-r001','s001-corr-r001',(now() at time zone 'UTC')-interval '1 minute',(now() at time zone 'UTC'),(now() at time zone 'UTC')+interval '1 hour')`);
    await db.query(`INSERT INTO "CaseClinicalUploadEvidence" ("uploadGrantId","organizationId","labId","caseId",provider,"providerObjectKey","clinicalPurpose","verifiedFormat","validatedSuffix","measuredSizeBytes",width,height,"contentSha256","validationProfile","validatedAt") VALUES ('s001-grant-r001','s001-org-1','s001-lab-1','s001-case-1','UPLOADTHING','s001-object-r001','CLINICAL_REFERENCE_PHOTOGRAPH','JPEG','JPG',1234,16,16,repeat('a',64),'JPEG_CLINICAL_V1_R001',now())`);
    await db.query(`UPDATE "FileUploadGrant" SET status='UPLOADED', "uploadedAt"=(now() at time zone 'UTC'), "updatedAt"=(now() at time zone 'UTC') WHERE id='s001-grant-r001'`);
    await db.query('COMMIT');
    console.log(JSON.stringify({baseline:'PASS',row:'s001-grant-r001'}));
  } catch(e) { await db.query('ROLLBACK'); console.log(JSON.stringify({baseline:'FAIL',code:e.code,constraint:e.constraint,message:e.message})); process.exitCode=1; }
  finally { await db.end(); }
})().catch(e => { console.log(JSON.stringify({fatal:e.message})); process.exitCode=1; });
