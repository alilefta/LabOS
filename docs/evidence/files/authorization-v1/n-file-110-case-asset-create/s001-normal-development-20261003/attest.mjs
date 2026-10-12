import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import pg from 'pg';

const phase = process.argv[2];
if (!['pre', 'post'].includes(phase)) throw new Error('expected pre or post');
dotenv.config({ path: '.env', quiet: true });
const root = process.cwd();
const evidence = path.join(root, 'docs/evidence/files/authorization-v1/n-file-110-case-asset-create/s001-normal-development-20261003');
const candidateName = '20261002120000_case_s001_evidence_identity';
const candidateHash = 'c322412de3c40f697407ce74a062afb797b2554a98fa5e8393e1c4bfe8c8bb88';
const hostHash = 'eb0d823953fe';
const sha = data => crypto.createHash('sha256').update(data).digest('hex');
const url = process.env.DIRECT_URL ? new URL(process.env.DIRECT_URL) : null;
const report = { phase, at: new Date().toISOString(), status: 'BLOCKED', target: {}, source: {}, ledger: {}, schema: {}, data: {}, issues: [] };
let client;
try {
  if (!url) throw new Error('DIRECT_URL_ABSENT');
  const port = Number(url.port || 5432);
  const database = decodeURIComponent(url.pathname.slice(1));
  const schema = url.searchParams.get('schema') || 'public';
  report.target = { hostSha256Prefix: sha(url.hostname).slice(0, 12), port, database, schema };
  if (report.target.hostSha256Prefix !== hostHash || port !== 5432 || database !== 'postgres' || schema !== 'public') throw new Error('TARGET_NOT_ESTABLISHED_DEVELOPMENT');

  const migrationRoot = path.join(root, 'prisma/migrations');
  const names = fs.readdirSync(migrationRoot, { withFileTypes: true }).filter(x => x.isDirectory() && /^\d{14}_/.test(x.name)).map(x => x.name).sort();
  const manifest = names.map(name => {
    const raw = fs.readFileSync(path.join(migrationRoot, name, 'migration.sql'));
    const lf = Buffer.from(raw.toString('utf8').replace(/\r\n/g, '\n'));
    return { name, rawSha256: sha(raw), canonicalLfSha256: sha(lf), crlf: raw.includes(Buffer.from('\r\n')) };
  });
  report.source = { count: manifest.length, candidate: manifest.at(-1), manifest };
  if (manifest.length !== 51 || manifest.at(-1)?.name !== candidateName || manifest.at(-1)?.rawSha256 !== candidateHash || manifest.at(-1)?.canonicalLfSha256 !== candidateHash) throw new Error('CANDIDATE_OR_CHAIN_MISMATCH');
  for (const [name, hash] of [
    ['20260927120000_c2_case_file_persistence', '92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80'],
    ['20260927130000_case_clinical_upload_evidence', 'e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b'],
    ['20260929120000_case_public_provider_access_contract', 'a4d3cf3aa49a8ac910cb173d3c6a1050b128a2cd5aad3c51718fa04fed81b668'],
  ]) if (manifest.find(x => x.name === name)?.canonicalLfSha256 !== hash) throw new Error('PINNED_PREDECESSOR_SOURCE_MISMATCH');

  client = new pg.Client({ host: url.hostname, port, user: decodeURIComponent(url.username), password: decodeURIComponent(url.password), database, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 15000 });
  await client.connect();
  await client.query('BEGIN ISOLATION LEVEL REPEATABLE READ READ ONLY');
  await client.query("SET LOCAL statement_timeout = '15000ms'");
  const id = (await client.query("SELECT current_database() AS database,current_schema() AS schema,current_setting('server_version_num') AS version,pg_is_in_recovery() AS recovery,current_setting('transaction_read_only') AS read_only")).rows[0];
  report.target = { ...report.target, ...id };
  if (id.database !== database || id.schema !== 'public' || id.recovery !== false || id.read_only !== 'on' || !id.version.startsWith('17')) throw new Error('LIVE_TARGET_MISMATCH');

  const ledger = (await client.query('SELECT migration_name,checksum,finished_at,rolled_back_at FROM _prisma_migrations ORDER BY started_at,migration_name')).rows;
  const expected = phase === 'pre' ? 50 : 51;
  report.ledger = { count: ledger.length, successful: ledger.filter(x => x.finished_at && !x.rolled_back_at).length, failed: ledger.filter(x => !x.finished_at || x.rolled_back_at).map(x => x.migration_name), candidateRows: ledger.filter(x => x.migration_name === candidateName).length, candidateChecksum: ledger.find(x => x.migration_name === candidateName)?.checksum ?? null, mismatches: ledger.filter((x, i) => x.migration_name !== manifest[i]?.name || x.checksum !== manifest[i]?.canonicalLfSha256).map(x => x.migration_name), entries: ledger.map(x => ({ name: x.migration_name, checksum: x.checksum, successful: !!x.finished_at && !x.rolled_back_at })) };
  if (report.ledger.count !== expected || report.ledger.successful !== expected || report.ledger.failed.length || report.ledger.mismatches.length || report.ledger.candidateRows !== (phase === 'pre' ? 0 : 1)) throw new Error('MIGRATION_HISTORY_MISMATCH');

  const columns = (await client.query("SELECT column_name,data_type,udt_name,character_maximum_length,is_nullable,column_default FROM information_schema.columns WHERE table_schema='public' AND table_name='CaseClinicalUploadEvidence' ORDER BY ordinal_position")).rows;
  const newFields = ['validatorVersion','codecBackend','codecPackageVersion','codecLibraryVersion','codecRuntimeSha256','sourceComponents','isProgressive'];
  const newColumns = columns.filter(x => newFields.includes(x.column_name));
  const backend = (await client.query("SELECT e.enumlabel::text AS label FROM pg_enum e JOIN pg_type t ON t.oid=e.enumtypid WHERE t.typname='CaseClinicalCodecBackend' ORDER BY e.enumsortorder")).rows.map(x => x.label);
  const checks = (await client.query("SELECT conname,convalidated,pg_get_constraintdef(oid) AS definition FROM pg_constraint WHERE conrelid='\"CaseClinicalUploadEvidence\"'::regclass AND contype='c' ORDER BY conname")).rows;
  const triggers = (await client.query("SELECT tgname,tgenabled,tgdeferrable,tginitdeferred,pg_get_triggerdef(oid) AS definition FROM pg_trigger WHERE tgrelid='\"CaseClinicalUploadEvidence\"'::regclass AND NOT tgisinternal ORDER BY tgname")).rows;
  report.schema = { evidenceColumnCount: columns.length, newColumns, backend, checks, triggers };
  const requiredTriggers = ['CaseClinicalUploadEvidence_grant_binding', 'CaseClinicalUploadEvidence_immutable', 'CaseClinicalUploadEvidence_uploaded'];
  if (newColumns.length !== (phase === 'pre' ? 0 : 7) || backend.length !== (phase === 'pre' ? 0 : 1)) throw new Error('EVIDENCE_SCHEMA_PHASE_MISMATCH');
  if (phase === 'post') {
    const expectedColumns = {
      validatorVersion: ['varchar', 48], codecBackend: ['CaseClinicalCodecBackend', null],
      codecPackageVersion: ['varchar', 24], codecLibraryVersion: ['varchar', 24],
      codecRuntimeSha256: ['varchar', 64], sourceComponents: ['int4', null], isProgressive: ['bool', null],
    };
    if (backend[0] !== 'JULUSIAN_TURBOJPEG' || newColumns.some(x => x.is_nullable !== 'YES' || x.column_default !== null || x.udt_name !== expectedColumns[x.column_name]?.[0] || x.character_maximum_length !== expectedColumns[x.column_name]?.[1]) || !checks.some(x => x.conname === 'CaseClinicalUploadEvidence_s001_identity' && x.convalidated)) throw new Error('INSTALLED_S001_SHAPE_MISMATCH');
  } else if (checks.some(x => x.conname === 'CaseClinicalUploadEvidence_s001_identity')) throw new Error('PARTIAL_S001_SCHEMA');
  if (triggers.length !== 3 || triggers.some(x => x.tgenabled !== 'O') || requiredTriggers.some(name => !triggers.some(x => x.tgname === name))) throw new Error('EVIDENCE_TRIGGERS_MISMATCH');

  const tableNames = ['organization','Lab','Case','CaseAssetFile','FileUploadGrant','StoredFile','CaseAssetFileVersion','CaseClinicalUploadEvidence','CaseFileAccessAudit','WorkType','Product','Dentist'];
  const counts = {}, fingerprints = {};
  for (const name of tableNames) {
    const expression = phase === 'post' && name === 'CaseClinicalUploadEvidence' ? "to_jsonb(t)-'validatorVersion'-'codecBackend'-'codecPackageVersion'-'codecLibraryVersion'-'codecRuntimeSha256'-'sourceComponents'-'isProgressive'" : 'to_jsonb(t)';
    const order = name === 'CaseClinicalUploadEvidence' ? '"uploadGrantId"' : 'id';
    const row = (await client.query(`SELECT count(*)::int AS n, md5(coalesce(string_agg((${expression})::text,'|' ORDER BY ${order}),'') ) AS digest FROM "${name}" t`)).rows[0];
    counts[name] = row.n; fingerprints[name] = row.digest;
  }
  const profiles = (await client.query('SELECT "validationProfile",count(*)::int AS n FROM "CaseClinicalUploadEvidence" GROUP BY "validationProfile" ORDER BY 1')).rows;
  report.data = { counts, fingerprints, profiles, s001Count: profiles.find(x => x.validationProfile === 'JPEG_CLINICAL_V1_S001')?.n || 0 };
  if (report.data.s001Count !== 0) throw new Error('PREEXISTING_S001_EVIDENCE');

  await client.query('ROLLBACK');
  report.status = 'PASS';
} catch (error) {
  if (client) await client.query('ROLLBACK').catch(() => {});
  report.issues.push(error.message.startsWith('SELECT ') ? 'QUERY_FAILURE' : (error.code ? `SQL_${error.code}` : error.message));
} finally {
  if (client) await client.end().catch(() => {});
  fs.writeFileSync(path.join(evidence, `${phase}flight.json`), JSON.stringify(report, null, 2) + '\n');
  process.stdout.write(JSON.stringify({ phase, status: report.status, target: report.target, ledger: { count: report.ledger.count, candidateRows: report.ledger.candidateRows, mismatches: report.ledger.mismatches }, schema: { evidenceColumnCount: report.schema.evidenceColumnCount, newColumns: report.schema.newColumns?.length, triggers: report.schema.triggers?.map(x => x.tgname) }, data: { counts: report.data.counts, s001Count: report.data.s001Count }, issues: report.issues }) + '\n');
  if (report.status !== 'PASS') process.exitCode = 1;
}
