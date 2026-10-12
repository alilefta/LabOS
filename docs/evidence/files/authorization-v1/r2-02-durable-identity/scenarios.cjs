// Disposable PostgreSQL R2-02 matrix. Caller supplies only an isolated local
// PGHOST/PGPORT/PGUSER/PGPASSWORD/PGDATABASE and a collision-resistant RUN_ID.
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { Client } = require('pg');

const run = process.env.RUN_ID;
if (!/^r2[a-f0-9]{12}$/.test(run) || process.env.PGHOST !== '127.0.0.1') {
  throw new Error('Disposable run identity and loopback host required');
}
const db = new Client();
const id = (suffix) => `${run}-${suffix}`;
const key = () => `objects/${randomUUID()}`;
const passed = [];
async function ok(name, test) { await test(); passed.push(name); console.log(`PASS ${name}`); }
async function rejects(name, sql, params = []) {
  await ok(name, async () => {
    try { await db.query(sql, params); }
    catch (error) {
      assert.ok(['23514', '23505'].includes(error.code), `unexpected SQLSTATE ${error.code}`);
      return;
    }
    throw new Error(`${name}: unexpectedly accepted`);
  });
}
async function grant(grantId, backend, objectKey, url = null, boundary = 'N-FILE-110', client = db) {
  return client.query(`INSERT INTO "FileUploadGrant"
    (id,"organizationId","labId","createdByMemberId","boundaryId",purpose,
     "targetType","targetId",provider,"providerFileKey","providerFileUrl",
     "correlationId","createdAt","updatedAt","expiresAt","caseClinicalValidatedSuffix")
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,
      (now() at time zone 'UTC')-interval '1 minute',
      (now() at time zone 'UTC'),(now() at time zone 'UTC')+interval '1 hour',$13)`,
    [grantId,id('org'),id('lab'),id('member'),boundary,
     boundary === 'N-FILE-110' ? 'case.asset.add.stage' : 'catalog.image.create.stage',
     boundary === 'N-FILE-110' ? 'case' : 'catalog',
     boundary === 'N-FILE-110' ? id('case') : 'synthetic',backend,objectKey,url,
     grantId,boundary === 'N-FILE-110' ? 'JPG' : null]);
}
async function main() {
  await db.connect();
  try {
    await db.query(`INSERT INTO "AuthUser" (id,name,email,"updatedAt") VALUES ($1,'Synthetic',$2,now())`, [id('user'),`${run}@example.invalid`]);
    await db.query(`INSERT INTO organization (id,name,slug,"createdAt") VALUES ($1,'Synthetic',$2,now())`, [id('org'),id('org')]);
    await db.query(`INSERT INTO "Lab" (id,title,"organizationId","updatedAt") VALUES ($1,'Synthetic',$2,now())`, [id('lab'),id('org')]);
    await db.query(`INSERT INTO member (id,"organizationId","userId",role,"createdAt") VALUES ($1,$2,$3,'owner',now())`, [id('member'),id('org'),id('user')]);
    await db.query(`INSERT INTO "Patient" (id,name,"labId","updatedAt") VALUES ($1,'Synthetic',$2,now())`, [id('patient'),id('lab')]);
    await db.query(`INSERT INTO "Case" (id,"patientId","labId","caseNumber","updatedAt") VALUES ($1,$2,$3,$4,now())`, [id('case'),id('patient'),id('lab'),id('case')]);
    const objectKey = key();
    await ok('exact Case OBJECT_STORAGE grant allocates key', async () => {
      await grant(id('grant'), 'OBJECT_STORAGE', objectKey);
      const { rows } = await db.query(`SELECT "sourceUploadGrantId","latestWriteCapabilityExpiresAt" FROM "ObjectStorageKeyAllocation" WHERE "objectKey"=$1`, [objectKey]);
      assert.equal(rows.length, 1); assert.equal(rows[0].sourceUploadGrantId, id('grant'));
      assert.equal(rows[0].latestWriteCapabilityExpiresAt, null);
    });
    await rejects('OBJECT_STORAGE URL insert rejected', `INSERT INTO "FileUploadGrant" (id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","providerFileUrl","correlationId","expiresAt","caseClinicalValidatedSuffix") VALUES ($1,$2,$3,$4,'N-FILE-110','case.asset.add.stage','case',$5,'OBJECT_STORAGE',$6,'https://example.invalid/secret','bad-url',(now() at time zone 'UTC')+interval '1 hour','JPG')`, [id('badurl'),id('org'),id('lab'),id('member'),id('case'),key()]);
    await rejects('OBJECT_STORAGE URL mutation rejected', `UPDATE "FileUploadGrant" SET "providerFileUrl"='https://example.invalid/secret' WHERE id=$1`, [id('grant')]);
    await rejects('key reassignment rejected', `UPDATE "FileUploadGrant" SET "providerFileKey"=$2 WHERE id=$1`, [id('grant'),key()]);
    await rejects('invalid object key rejected', `INSERT INTO "FileUploadGrant" (id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","correlationId","expiresAt","caseClinicalValidatedSuffix") VALUES ($1,$2,$3,$4,'N-FILE-110','case.asset.add.stage','case',$5,'OBJECT_STORAGE','tenant/case','invalid-key',(now() at time zone 'UTC')+interval '1 hour','JPG')`, [id('badkey'),id('org'),id('lab'),id('member'),id('case')]);
    await ok('non-Case OBJECT_STORAGE grant rejected', async () => {
      try { await grant(id('noncase'), 'OBJECT_STORAGE', key(), null, 'N-FILE-102'); }
      catch (error) { assert.equal(error.code,'23514'); return; }
      throw new Error('non-Case OBJECT_STORAGE grant accepted');
    });
    await ok('expiry fence initially advances', async () => {
      await db.query(`UPDATE "ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"=now()+interval '5 minutes' WHERE "objectKey"=$1`, [objectKey]);
      const { rows } = await db.query(`SELECT "latestWriteCapabilityExpiresAt" FROM "ObjectStorageKeyAllocation" WHERE "objectKey"=$1`, [objectKey]);
      assert.ok(rows[0].latestWriteCapabilityExpiresAt > new Date());
    });
    await rejects('expiry fence cannot decrease', `UPDATE "ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"=now()+interval '1 minute' WHERE "objectKey"=$1`, [objectKey]);
    await rejects('expiry fence cannot clear', `UPDATE "ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"=NULL WHERE "objectKey"=$1`, [objectKey]);
    await rejects('expiry fence cannot become infinite', `UPDATE "ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"='infinity' WHERE "objectKey"=$1`, [objectKey]);
    await rejects('allocation cannot be deleted', `DELETE FROM "ObjectStorageKeyAllocation" WHERE "objectKey"=$1`, [objectKey]);
    await rejects('allocation cannot be truncated', `TRUNCATE "ObjectStorageKeyAllocation"`);
    await rejects('allocation identity cannot be reassigned', `UPDATE "ObjectStorageKeyAllocation" SET "sourceUploadGrantId"='other' WHERE "objectKey"=$1`, [objectKey]);
    await ok('terminal grant freezes expiry', async () => {
      await db.query(`UPDATE "FileUploadGrant" SET status='FAILED',"failedAt"=(now() at time zone 'UTC') WHERE id=$1`, [id('grant')]);
    });
    await rejects('expiry after terminalization rejected', `UPDATE "ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"=now()+interval '10 minutes' WHERE "objectKey"=$1`, [objectKey]);
    await ok('grant deletion retains key and expiry fence', async () => {
      await db.query(`DELETE FROM "FileUploadGrant" WHERE id=$1`, [id('grant')]);
      const { rows } = await db.query(`SELECT "sourceUploadGrantId","latestWriteCapabilityExpiresAt" FROM "ObjectStorageKeyAllocation" WHERE "objectKey"=$1`, [objectKey]);
      assert.equal(rows.length, 1); assert.equal(rows[0].sourceUploadGrantId,id('grant'));
      assert.ok(rows[0].latestWriteCapabilityExpiresAt);
    });
    await rejects('permanent key nonreuse after grant deletion', `INSERT INTO "FileUploadGrant" (id,"organizationId","labId","createdByMemberId","boundaryId",purpose,"targetType","targetId",provider,"providerFileKey","correlationId","updatedAt","expiresAt","caseClinicalValidatedSuffix") VALUES ($1,$2,$3,$4,'N-FILE-110','case.asset.add.stage','case',$5,'OBJECT_STORAGE',$6,'reuse',(now() at time zone 'UTC'),(now() at time zone 'UTC')+interval '1 hour','JPG')`, [id('reuse'),id('org'),id('lab'),id('member'),id('case'),objectKey]);
    await ok('historical UploadThing URL and nullable key remain accepted', async () => {
      await grant(id('legacy'), 'UPLOADTHING', null, 'https://example.invalid/historical');
      await db.query(`UPDATE "FileUploadGrant" SET "providerFileKey"=$2 WHERE id=$1`, [id('legacy'),id('historical-key')]);
      const { rows } = await db.query(`SELECT provider,"providerFileUrl" FROM "FileUploadGrant" WHERE id=$1`, [id('legacy')]);
      assert.equal(rows[0].provider,'UPLOADTHING'); assert.ok(rows[0].providerFileUrl);
    });
    await ok('concurrent exact-key allocation permits one winner', async () => {
      const shared = key();
      const peer = new Client(); await peer.connect();
      try {
        const results = await Promise.allSettled([
          grant(id('race-a'),'OBJECT_STORAGE',shared),
          grant(id('race-b'),'OBJECT_STORAGE',shared,null,'N-FILE-110',peer)
        ]);
        assert.equal(results.filter(r=>r.status==='fulfilled').length,1);
        assert.equal(results.filter(r=>r.status==='rejected').length,1);
        assert.equal(results.find(r=>r.status==='rejected').reason.code,'23505');
        const { rows } = await db.query(`SELECT count(*)::int AS n FROM "ObjectStorageKeyAllocation" WHERE "objectKey"=$1`,[shared]);
        assert.equal(rows[0].n,1);
      } finally { await peer.end(); }
    });
    await ok('concurrent expiry extensions retain the maximum', async () => {
      const raceKey = key(); await grant(id('expiry-race'),'OBJECT_STORAGE',raceKey);
      const short = new Date(Date.now()+600_000);
      const long = new Date(Date.now()+900_000);
      const peer = new Client(); await peer.connect();
      try {
        const results = await Promise.allSettled([
          db.query(`UPDATE "ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"=$2 WHERE "objectKey"=$1`,[raceKey,short]),
          peer.query(`UPDATE "ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"=$2 WHERE "objectKey"=$1`,[raceKey,long])
        ]);
        assert.equal(results[1].status,'fulfilled');
        if (results[0].status==='rejected') assert.equal(results[0].reason.code,'23514');
        const { rows } = await db.query(`SELECT "latestWriteCapabilityExpiresAt" FROM "ObjectStorageKeyAllocation" WHERE "objectKey"=$1`,[raceKey]);
        assert.equal(rows[0].latestWriteCapabilityExpiresAt.getTime(),long.getTime());
      } finally { await peer.end(); }
    });
    await ok('OBJECT_STORAGE UPLOADED requires non-null durable fence', async () => {
      const bareKey = key(); await grant(id('bare-upload'),'OBJECT_STORAGE',bareKey);
      await db.query('BEGIN');
      try {
        await db.query(`INSERT INTO "CaseClinicalUploadEvidence" ("uploadGrantId","organizationId","labId","caseId",provider,"providerObjectKey","clinicalPurpose","verifiedFormat","validatedSuffix","measuredSizeBytes",width,height,"contentSha256","validationProfile","validatorVersion","codecBackend","codecPackageVersion","codecLibraryVersion","codecRuntimeSha256","sourceComponents","isProgressive","validatedAt") VALUES ($1,$2,$3,$4,'OBJECT_STORAGE',$5,'CLINICAL_REFERENCE_PHOTOGRAPH','JPEG','JPG',1234,16,16,repeat('a',64),'JPEG_CLINICAL_V1_S001','LABOS_S001_JULUSIAN_V1','JULUSIAN_TURBOJPEG','3.0.1','3.1.3',repeat('b',64),3,false,now())`,[id('bare-upload'),id('org'),id('lab'),id('case'),bareKey]);
        await db.query(`UPDATE "FileUploadGrant" SET status='UPLOADED',"uploadedAt"=(now() at time zone 'UTC') WHERE id=$1`,[id('bare-upload')]);
        await db.query('COMMIT');
        throw new Error('final state accepted without fence');
      } catch (error) {
        await db.query('ROLLBACK');
        assert.equal(error.code,'23514');
        assert.match(error.message,/write-capability fence/);
      }
    });
    await ok('OBJECT_STORAGE grant, evidence and StoredFile bind one exact key', async () => {
      const { rows: allocations } = await db.query(`SELECT "objectKey" FROM "ObjectStorageKeyAllocation" WHERE "sourceUploadGrantId"=$1`,[id('bare-upload')]);
      const exactKey = allocations[0].objectKey;
      await db.query(`UPDATE "ObjectStorageKeyAllocation" SET "latestWriteCapabilityExpiresAt"=now()+interval '5 minutes' WHERE "objectKey"=$1`,[exactKey]);
      await db.query('BEGIN');
      try {
        await db.query(`INSERT INTO "CaseClinicalUploadEvidence" ("uploadGrantId","organizationId","labId","caseId",provider,"providerObjectKey","clinicalPurpose","verifiedFormat","validatedSuffix","measuredSizeBytes",width,height,"contentSha256","validationProfile","validatorVersion","codecBackend","codecPackageVersion","codecLibraryVersion","codecRuntimeSha256","sourceComponents","isProgressive","validatedAt") VALUES ($1,$2,$3,$4,'OBJECT_STORAGE',$5,'CLINICAL_REFERENCE_PHOTOGRAPH','JPEG','JPG',1234,16,16,repeat('a',64),'JPEG_CLINICAL_V1_S001','LABOS_S001_JULUSIAN_V1','JULUSIAN_TURBOJPEG','3.0.1','3.1.3',repeat('b',64),3,false,now())`,[id('bare-upload'),id('org'),id('lab'),id('case'),exactKey]);
        await db.query(`UPDATE "FileUploadGrant" SET status='UPLOADED',"uploadedAt"=(now() at time zone 'UTC') WHERE id=$1`,[id('bare-upload')]);
        await db.query('COMMIT');
      } catch (error) { await db.query('ROLLBACK'); throw error; }
      await db.query(`INSERT INTO "StoredFile" (id,"organizationId","labId","sourceUploadGrantId",provider,"providerObjectKey","providerAccess",purpose,"detectedMimeType","sizeBytes","checksumAlgorithm","checksumValue","uploaderMemberId","uploaderMemberIdSnapshot") VALUES ($1,$2,$3,$4,'OBJECT_STORAGE',$5,'PRIVATE','CASE_CLINICAL_ASSET','image/jpeg',1234,'SHA-256',repeat('a',64),$6,$6)`,[id('file'),id('org'),id('lab'),id('bare-upload'),exactKey,id('member')]);
      const { rows } = await db.query(`SELECT g.provider AS grant_backend,e.provider AS evidence_backend,sf.provider AS file_backend FROM "FileUploadGrant" g JOIN "CaseClinicalUploadEvidence" e ON e."uploadGrantId"=g.id JOIN "StoredFile" sf ON sf."sourceUploadGrantId"=g.id WHERE g.id=$1 AND g."providerFileKey"=e."providerObjectKey" AND e."providerObjectKey"=sf."providerObjectKey"`,[id('bare-upload')]);
      assert.equal(rows.length,1);
      assert.deepEqual(Object.values(rows[0]),['OBJECT_STORAGE','OBJECT_STORAGE','OBJECT_STORAGE']);
    });
    await ok('final catalog contains stable backend and no R2 vendor field', async () => {
      const { rows } = await db.query(`SELECT enumlabel FROM pg_enum e JOIN pg_type t ON t.oid=e.enumtypid WHERE t.typname='StoredFileProvider' ORDER BY enumsortorder`);
      assert.deepEqual(rows.map(r=>r.enumlabel),['UPLOADTHING','OBJECT_STORAGE']);
    });
    console.log(`RESULT ${passed.length}/${passed.length} PASS`);
  } finally { await db.end(); }
}
main().catch(error => { console.error(`FAIL ${error.message}`); process.exitCode = 1; });
