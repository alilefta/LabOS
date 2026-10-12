// Disposable synthetic PostgreSQL verification only. DIRECT_URL must target
// the run-owned loopback s001_success_1cc93c10 database.
const { Client } = require('pg')
const fs = require('node:fs')
const dbName = 's001_success_1cc93c10'
const out = process.argv[2]
let sequence = 0
const rows = []
function record(id, expected, observed, detail = {}) {
  const row = { id, expected, observed, ...detail }
  rows.push(row)
  console.log(JSON.stringify(row))
}
const identity = {
  validatorVersion: 'LABOS_S001_JULUSIAN_V1',
  codecBackend: 'JULUSIAN_TURBOJPEG',
  codecPackageVersion: '3.0.1',
  codecLibraryVersion: '3.1.3',
  codecRuntimeSha256: 'b'.repeat(64),
  sourceComponents: 3,
  isProgressive: false,
}
const identityFields = Object.keys(identity)
const base = (grant, key, profile = 'JPEG_CLINICAL_V1_S001', extra = identity) => ({
  uploadGrantId: grant, organizationId: 's001-org-1', labId: 's001-lab-1',
  caseId: 's001-case-1', provider: 'UPLOADTHING', providerObjectKey: key,
  clinicalPurpose: 'CLINICAL_REFERENCE_PHOTOGRAPH', verifiedFormat: 'JPEG',
  validatedSuffix: 'JPG', measuredSizeBytes: '1234', width: 16, height: 16,
  contentSha256: 'a'.repeat(64), validationProfile: profile,
  validatedAt: new Date(), ...extra,
})
async function grant(client, id, key) {
  await client.query(`INSERT INTO "FileUploadGrant"
    (id,"organizationId","labId","createdByMemberId","boundaryId",purpose,
    "targetType","targetId",provider,"providerFileKey","correlationId",
    "createdAt","updatedAt","expiresAt")
    VALUES ($1,'s001-org-1','s001-lab-1','s001-member-1','N-FILE-110',
    'case.asset.add.stage','case','s001-case-1','UPLOADTHING',$2,$3,
    (now() at time zone 'UTC')-interval '1 minute',
    (now() at time zone 'UTC'),(now() at time zone 'UTC')+interval '1 hour')`,
    [id,key,'corr-'+id])
}
async function evidence(client, data) {
  const fields = Object.keys(data)
  const quote = s => '"' + s + '"'
  return client.query(
    `INSERT INTO "CaseClinicalUploadEvidence" (${fields.map(quote).join(',')})
    VALUES (${fields.map((_,i)=>'$'+(i+1)).join(',')})`,
    fields.map(f=>data[f]))
}
async function attempt(client, id, expectedCode, patch, profile = 'JPEG_CLINICAL_V1_S001', options = {}) {
  sequence++
  const gid = 's001-test-'+sequence
  const key = 's001-key-'+sequence
  let stage = 'none', error = null, unexpectedlyAccepted = false
  await client.query('BEGIN')
  try {
    await grant(client,gid,key)
    stage = 'insert'
    await evidence(client,base(gid,key,profile,patch))
    if (!options.leavePending) {
      stage = 'update'
      await client.query(`UPDATE "FileUploadGrant" SET status='UPLOADED',
        "uploadedAt"=(now() at time zone 'UTC'),
        "updatedAt"=(now() at time zone 'UTC') WHERE id=$1`,[gid])
    }
    stage = 'commit'
    if (options.expectSuccess) {
      await client.query('COMMIT')
    } else {
      // Exercise deferred constraints at commit; unexpected success is retained
      // only inside this isolated run-owned database.
      await client.query('COMMIT')
      unexpectedlyAccepted = true
    }
  } catch(e) {
    error = { code:e.code ?? null, constraint:e.constraint ?? null, message:e.message }
    await client.query('ROLLBACK')
  }
  const pass = options.expectSuccess ? !error : !unexpectedlyAccepted && error?.code === expectedCode
  record(id, options.expectSuccess ? 'commit' : expectedCode,
    pass ? 'PASS' : 'FAIL', { stage, error, unexpectedlyAccepted })
}
async function main() {
  const client = new Client({ connectionString:process.env.DIRECT_URL })
  await client.connect()
  try {
    const target = await client.query(`SELECT current_database() db,
      inet_server_addr()::text addr, inet_server_port() port`)
    if (target.rows[0].db !== dbName || target.rows[0].addr !== '127.0.0.1/32' ||
        target.rows[0].port !== 55437) throw new Error('Wrong disposable target')
    record('target','run-owned loopback', 'PASS', target.rows[0])
    const installed = await client.query(`SELECT
      (SELECT count(*)::int FROM "_prisma_migrations" WHERE finished_at IS NOT NULL) migrations,
      (SELECT count(*)::int FROM "_prisma_migrations"
        WHERE migration_name='20261002120000_case_s001_evidence_identity'
        AND finished_at IS NOT NULL) candidate_count,
      (SELECT count(*)::int FROM "CaseClinicalUploadEvidence"
        WHERE "validationProfile"='JPEG_CLINICAL_V1_S001') pretest_s001`)
    record('migration_history','51/1/0',installed.rows[0].migrations===51 &&
      installed.rows[0].candidate_count===1 && installed.rows[0].pretest_s001===0 ?
      'PASS':'FAIL',installed.rows[0])
    const shape = await client.query(`SELECT
      (SELECT array_agg(enumlabel ORDER BY enumsortorder) FROM pg_enum e
       JOIN pg_type t ON t.oid=e.enumtypid
       WHERE t.typname='CaseClinicalCodecBackend') enum_values,
      (SELECT count(*)::int FROM information_schema.columns
       WHERE table_name='CaseClinicalUploadEvidence'
       AND column_name = ANY(ARRAY['validatorVersion','codecBackend',
       'codecPackageVersion','codecLibraryVersion','codecRuntimeSha256',
       'sourceComponents','isProgressive'])
       AND is_nullable='YES' AND column_default IS NULL) nullable_columns,
      (SELECT count(*)::int FROM pg_constraint
       WHERE conname='CaseClinicalUploadEvidence_s001_identity' AND convalidated) identity_check,
      (SELECT count(*)::int FROM pg_trigger
       WHERE tgrelid='"CaseClinicalUploadEvidence"'::regclass
       AND tgname IN ('CaseClinicalUploadEvidence_immutable',
       'CaseClinicalUploadEvidence_grant_binding',
       'CaseClinicalUploadEvidence_uploaded') AND NOT tgisinternal) evidence_triggers`)
    const s=shape.rows[0]
    record('schema_shape','exact enum/seven nullable/check/three triggers',
      JSON.stringify(s.enum_values)==='["JULUSIAN_TURBOJPEG"]' &&
      s.nullable_columns===7 && s.identity_check===1 && s.evidence_triggers===3 ?
      'PASS':'FAIL',s)
    const old = await client.query(`SELECT "validationProfile","contentSha256",
      width,height,"measuredSizeBytes", "validatorVersion","codecBackend",
      "codecPackageVersion","codecLibraryVersion","codecRuntimeSha256",
      "sourceComponents","isProgressive"
      FROM "CaseClinicalUploadEvidence" WHERE "uploadGrantId"='s001-grant-r001'`)
    const h=old.rows[0]
    record('historical_r001','preserved/null',
      h && h.validationProfile==='JPEG_CLINICAL_V1_R001' &&
      h.contentSha256==='a'.repeat(64) && h.width===16 && h.height===16 &&
      h.measuredSizeBytes==='1234' &&
      identityFields.every(f=>h[f]===null) ? 'PASS':'FAIL',h)
    await attempt(client,'valid_s001','',identity,undefined,{expectSuccess:true})
    for (const field of identityFields) {
      await attempt(client,'missing_'+field,'23514',{...identity,[field]:null})
    }
    const wrong = {
      validatorVersion:'LABOS_S001_JULUSIAN_V2', codecBackend:'OTHER_BACKEND',
      codecPackageVersion:'3.0.2', codecLibraryVersion:'3.1.4',
      codecRuntimeSha256:'z'.repeat(64), sourceComponents:2,
    }
    for (const [field,value] of Object.entries(wrong)) {
      await attempt(client,'wrong_'+field,field==='codecBackend'?'22P02':'23514',
        {...identity,[field]:value})
    }
    await attempt(client,'uppercase_sha','23514',
      {...identity,codecRuntimeSha256:'A'.repeat(64)})
    for (const field of identityFields) {
      await attempt(client,'r001_stray_'+field,'23514',
        {[field]:identity[field]},'JPEG_CLINICAL_V1_R001')
    }
    const nullExpr=await client.query(`SELECT
      (NULL::varchar IS NOT DISTINCT FROM 'LABOS_S001_JULUSIAN_V1') AS version_null_rejects,
      COALESCE(NULL::text ~ '^[0-9a-f]{64}$',false) AS digest_null_rejects,
      COALESCE(NULL::integer IN (1,3),false) AS components_null_rejects`)
    record('null_semantics','all false',
      Object.values(nullExpr.rows[0]).every(x=>x===false)?'PASS':'FAIL',
      nullExpr.rows[0])
    const successful = await client.query(`SELECT "uploadGrantId" FROM
      "CaseClinicalUploadEvidence" WHERE "validationProfile"='JPEG_CLINICAL_V1_S001'
      ORDER BY "uploadGrantId" LIMIT 1`)
    const successfulId=successful.rows[0]?.uploadGrantId
    if (!successfulId) throw new Error('Missing positive S001 row')
    const changes = {
      width:'width=17',validatorVersion:'"validatorVersion"=\'X\'',
      codecBackend:'"codecBackend"=NULL',codecPackageVersion:'"codecPackageVersion"=\'X\'',
      codecLibraryVersion:'"codecLibraryVersion"=\'X\'',
      codecRuntimeSha256:'"codecRuntimeSha256"=NULL',
      sourceComponents:'"sourceComponents"=1',isProgressive:'"isProgressive"=true',
    }
    for (const [field,assignment] of Object.entries(changes)) {
      await client.query('BEGIN')
      let err=null
      try { await client.query(`UPDATE "CaseClinicalUploadEvidence" SET ${assignment} WHERE "uploadGrantId"=$1`,[successfulId]); await client.query('COMMIT') }
      catch(e){err={code:e.code,constraint:e.constraint,message:e.message};await client.query('ROLLBACK')}
      record('immutable_update_'+field,'23514',err?.code==='23514'?'PASS':'FAIL',{error:err})
    }
    await client.query('BEGIN')
    let delerr=null
    try{await client.query('DELETE FROM "CaseClinicalUploadEvidence" WHERE "uploadGrantId"=$1',[successfulId]);await client.query('COMMIT')}
    catch(e){delerr={code:e.code,constraint:e.constraint,message:e.message};await client.query('ROLLBACK')}
    record('immutable_delete','23514',delerr?.code==='23514'?'PASS':'FAIL',{error:delerr})
    await attempt(client,'evidence_without_uploaded','23514',identity,undefined,{leavePending:true})
    sequence++
    await client.query('BEGIN')
    let missingEvidenceError=null
    try {
      const id='s001-no-evidence-'+sequence
      await grant(client,id,'s001-no-evidence-key-'+sequence)
      await client.query(`UPDATE "FileUploadGrant" SET status='UPLOADED',
        "uploadedAt"=(now() at time zone 'UTC') WHERE id=$1`,[id])
      await client.query('COMMIT')
    } catch(e){missingEvidenceError={code:e.code,constraint:e.constraint,message:e.message};await client.query('ROLLBACK')}
    record('uploaded_without_evidence','23514',
      missingEvidenceError?.code==='23514'?'PASS':'FAIL',{error:missingEvidenceError})
    const final=await client.query(`SELECT count(*)::int AS n FROM "CaseClinicalUploadEvidence"
      WHERE "uploadGrantId"=$1 AND width=16 AND "validatorVersion"='LABOS_S001_JULUSIAN_V1'`,[successfulId])
    record('immutable_after_attempts','one original',final.rows[0].n===1?'PASS':'FAIL',final.rows[0])
  } finally { await client.end(); fs.writeFileSync(out,rows.map(x=>JSON.stringify(x)).join('\n')+'\n') }
}
main().catch(e=>{console.error(JSON.stringify({fatal:e.message,code:e.code}));process.exitCode=1})
