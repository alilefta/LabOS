// A1-I2-I1-T5-F8: run only with separate Product Owner authority on a hosted target.
// Every scenario owns one transaction and rolls it back. No R2 calls.
import { createHash, randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import pg from "pg";
import { openRegistry } from "./a1-i2-i1-t5-f9-registry.mjs";

const mode = process.argv[2];
if (!["--disposable", "--hosted"].includes(mode) || process.argv.length !== 3) {
  throw new Error("Specify exactly --disposable or --hosted");
}
if (mode === "--hosted" && process.env.LABOS_T5F8_HOSTED_AUTHORIZATION !== "APPROVED") {
  throw new Error("Hosted mutation is disabled without separate authorization");
}
const rawUrl = process.env.LABOS_T5F8_DATABASE_URL;
if (!rawUrl) throw new Error("Missing operator-supplied database URL");
const url = new URL(rawUrl);
const migrationHashes = [
  ["../../prisma/migrations/20261016120000_case_object_storage_reconciliation/migration.sql",
    "7b16411775c16120e231b251162b82f9641caa6442880c80a39a57491d30dafe"],
  ["../../prisma/migrations/20261018120000_case_object_storage_trigger_runtime_hardening/migration.sql",
    "d997ba13b675a640616d58cec1b3b3b882e7b5f6ec6832ea3c7316463e780dd6"],
  ["../../prisma/migrations/20261019120000_case_evidence_expiry_executor_select/migration.sql",
    "64659d6cb2aa4f300957cc076f30085c86e2589a3b558562fb462098b4447ff4"],
];
for (const [path, expected] of migrationHashes) {
  const actual = createHash("sha256").update(readFileSync(new URL(path, import.meta.url))).digest("hex");
  if (actual !== expected) throw new Error("Reviewed migration artifact mismatch");
}
if (mode === "--hosted") {
  if (url.hostname !== "aws-1-eu-central-1.pooler.supabase.com" ||
      url.port !== "5432" || url.pathname !== "/postgres" ||
      url.username !== "postgres.rvtubjrczuxdxfuazjmr") {
    throw new Error("Unexpected hosted target or non-session connection");
  }
  if (url.search) throw new Error("Hosted URL query options could override TLS settings");
} else if (!["127.0.0.1", "localhost"].includes(url.hostname)) {
  throw new Error("Disposable mode requires loopback");
}
const config = {
  host: url.hostname, port: Number(url.port), database: url.pathname.slice(1),
  user: decodeURIComponent(url.username), password: decodeURIComponent(url.password),
  application_name: "labos-t5-f8-rollback-only", connectionTimeoutMillis: 5000,
};
if (mode === "--hosted") {
  const caFile = process.env.LABOS_T5F8_CA_FILE;
  if (!caFile) throw new Error("Missing CA file");
  config.ssl = { ca: readFileSync(caFile), servername: url.hostname, rejectUnauthorized: true };
}
const { Client } = pg;
const connect = async () => {
  const c = new Client(config);
  await c.connect();
  if (mode === "--hosted" && (!c.connection.stream.encrypted || !c.connection.stream.authorized)) {
    await c.end();
    throw new Error("Hosted TLS certificate or hostname not verified");
  }
  return c;
};
const fail = (message) => { throw new Error(message); };
const one = async (c, sql, params = []) => (await c.query(sql, params)).rows[0];
const assert = (ok, message) => { if (!ok) fail(message); };
const expectedError = async (c, sql, params, code, operationId, runId) => {
  await c.query("SAVEPOINT expected_denial");
  let observed = null;
  try { await c.query(sql, params); } catch (error) { observed = error.code; }
  await c.query("ROLLBACK TO SAVEPOINT expected_denial");
  await c.query("RELEASE SAVEPOINT expected_denial");
  record({ event: "sqlstate_assertion", scenario: activeScenario, runId, operationId,
    expected: code, observed, result: observed === code ? "PASS" : "FAIL" });
  assert(observed === code, `Expected SQLSTATE ${code}, observed ${observed ?? "success"}`);
};
const setRole = (c, role) => c.query(`SET LOCAL ROLE ${role}`);
const resetRole = (c) => c.query("SET LOCAL ROLE postgres");
const eligibleSql = `SELECT id FROM public."FileUploadGrant"
 WHERE "boundaryId"='N-FILE-110' AND purpose='case.asset.add.stage'
 AND provider='OBJECT_STORAGE' AND status IN ('PENDING','UPLOADED')
 AND "expiresAt" <= clock_timestamp() AT TIME ZONE 'UTC'`;
const roles = [
  "labos_verification_app", "labos_verification_cleanup",
  "labos_case_expiry_executor",
];
const evidenceDirectory = process.env.LABOS_T5F9_EVIDENCE_DIR;
if (!evidenceDirectory) throw new Error("Missing private evidence directory");
const fault = process.env.LABOS_T5F9_DISPOSABLE_FAULT;
if (fault && (mode !== "--disposable" || ![
  "registry_write", "after_scenario_plan", "after_grant_plan", "after_grant_insert",
].includes(fault))) throw new Error("Invalid disposable fault injection");
let registry;
const record = (payload) => {
  if (fault === "registry_write" && payload.event === "scenario_planned") {
    throw new Error("Injected registry write failure");
  }
  registry.append(payload);
};
const terminateAt = (point) => {
  if (fault === point) process.exit(77); // Disposable-only abrupt process exit.
};
const roleGrant = `GRANT ${roles.join(",")} TO postgres
 WITH ADMIN FALSE, INHERIT FALSE, SET TRUE GRANTED BY postgres`;

async function baseline(c) {
  const b = await one(c, `SELECT current_database() db, current_user, session_user,
    current_setting('server_version') version`);
  assert(b.db === "postgres" && b.current_user === "postgres" && b.session_user === "postgres" &&
    b.version === "17.11", "Database or PostgreSQL version mismatch");
  if (mode === "--hosted") {
    const h = await one(c, `SELECT (SELECT count(*)::int FROM public._prisma_migrations) total,
      (SELECT count(*)::int FROM public._prisma_migrations
      WHERE finished_at IS NOT NULL AND rolled_back_at IS NULL) finished,
      (SELECT count(*)::int FROM public._prisma_migrations
       WHERE finished_at IS NULL OR rolled_back_at IS NOT NULL) incomplete,
      (SELECT checksum FROM public._prisma_migrations
       WHERE migration_name='20261016120000_case_object_storage_reconciliation') predecessor_checksum,
      (SELECT checksum FROM public._prisma_migrations
       WHERE migration_name='20261018120000_case_object_storage_trigger_runtime_hardening') checksum,
       (SELECT checksum FROM public._prisma_migrations
       WHERE migration_name='20261019120000_case_evidence_expiry_executor_select') checksum58`);
    assert(h.total === 58 && h.finished === 58 && h.incomplete === 0 &&
      h.predecessor_checksum?.toLowerCase() ===
        "7b16411775c16120e231b251162b82f9641caa6442880c80a39a57491d30dafe" &&
      h.checksum?.toLowerCase() === "d997ba13b675a640616d58cec1b3b3b882e7b5f6ec6832ea3c7316463e780dd6" &&
      h.checksum58?.toLowerCase() === "64659d6cb2aa4f300957cc076f30085c86e2589a3b558562fb462098b4447ff4",
      "Hosted migration baseline mismatch");
  }
  const functionState = await one(c, `SELECT count(*)::int n FROM pg_proc p
    JOIN pg_namespace ns ON ns.oid=p.pronamespace
    WHERE ns.nspname='public' AND
      (p.proname='FileUploadGrant_case_identity_guard' AND md5(pg_get_functiondef(p.oid))='150bb48ffd9a338a2e5c965640042043'
       OR p.proname='ObjectStorageKeyAllocation_guard' AND md5(pg_get_functiondef(p.oid))='32d46ebfbec21006e53643cd01bc2412'
       OR p.proname='FileUploadGrant_allocate_object_storage_key' AND md5(pg_get_functiondef(p.oid))='7c97a198fbd6b7a9bb5a735915ca01eb')`);
  assert(functionState.n === 3, "Migration-57 function baseline mismatch");
  const m = await one(c, `SELECT count(*)::int n FROM pg_auth_members am
    JOIN pg_roles role ON role.oid=am.roleid JOIN pg_roles member ON member.oid=am.member
    JOIN pg_roles grantor ON grantor.oid=am.grantor
    WHERE member.rolname='postgres' AND role.rolname=ANY($1::text[])
      AND grantor.rolname='supabase_admin' AND am.admin_option AND NOT am.inherit_option
      AND NOT am.set_option`, [roles]);
  assert(m.n === roles.length, "Managed ADMIN baseline mismatch");
  const p = await one(c, `SELECT count(*)::int n FROM pg_auth_members am
    JOIN pg_roles role ON role.oid=am.roleid JOIN pg_roles member ON member.oid=am.member
    WHERE member.rolname='postgres' AND role.rolname=ANY($1::text[]) AND am.set_option`, [roles]);
  assert(p.n === 0, "Unexpected pre-existing SET membership");
}

function fixture() {
  const token = randomUUID();
  const id = `t5f8-${token}`;
  const f = { id, org: `${id}-org`, lab: `${id}-lab`, user: `${id}-user`,
    member: `${id}-member`, patient: `${id}-patient`, caseId: `${id}-case`,
    grants: [], keys: [] };
  record({ event: "scenario_planned", scenario: activeScenario, runId: f.id,
    parents: { organizationId: f.org, labId: f.lab, authUserId: f.user,
      memberId: f.member, patientId: f.patient, caseId: f.caseId,
      organizationSlug: f.org, email: `${f.id}@example.invalid`, caseNumber: f.id } });
  terminateAt("after_scenario_plan");
  return f;
}
let activeScenario = null;
async function absent(c, f) {
  const x = await one(c, `SELECT
    (SELECT count(*) FROM public.organization WHERE id=$1 OR slug=$1) +
    (SELECT count(*) FROM public."Lab" WHERE id=$2) +
    (SELECT count(*) FROM public."AuthUser" WHERE id=$3 OR email=$9) +
    (SELECT count(*) FROM public.member WHERE id=$4) +
    (SELECT count(*) FROM public."Patient" WHERE id=$5) +
    (SELECT count(*) FROM public."Case" WHERE id=$6 OR "caseNumber"=$10) +
    (SELECT count(*) FROM public."FileUploadGrant"
      WHERE id=ANY($7::text[]) OR "providerFileKey"=ANY($8::text[])) +
    (SELECT count(*) FROM public."ObjectStorageKeyAllocation"
      WHERE "sourceUploadGrantId"=ANY($7::text[]) OR "objectKey"=ANY($8::text[])) +
    (SELECT count(*) FROM public."StoredFile"
      WHERE "sourceUploadGrantId"=ANY($7::text[]) OR "providerObjectKey"=ANY($8::text[])) AS n`,
    [f.org, f.lab, f.user, f.member, f.patient, f.caseId, f.grants, f.keys,
      `${f.id}@example.invalid`, f.id]);
  assert(Number(x.n) === 0, "Run-owned namespace not absent");
}
async function parents(c, f) {
  await c.query(`INSERT INTO public.organization(id,name,slug,"createdAt")
    VALUES ($1,'T5-F8 synthetic',$1,clock_timestamp())`, [f.org]);
  await c.query(`INSERT INTO public."Lab"(id,title,"organizationId","updatedAt")
    VALUES ($1,'T5-F8 synthetic',$2,clock_timestamp())`, [f.lab, f.org]);
  await c.query(`INSERT INTO public."AuthUser"(id,name,email,"updatedAt")
    VALUES ($1,'T5-F8 synthetic',$2,clock_timestamp())`, [f.user, `${f.id}@example.invalid`]);
  await c.query(`INSERT INTO public.member(id,"organizationId","userId","createdAt")
    VALUES ($1,$2,$3,clock_timestamp())`, [f.member, f.org, f.user]);
  await c.query(`INSERT INTO public."Patient"(id,name,"labId","updatedAt")
    VALUES ($1,'T5-F8 synthetic',$2,clock_timestamp())`, [f.patient, f.lab]);
  await c.query(`INSERT INTO public."Case"(id,"patientId","labId","updatedAt","caseNumber")
    VALUES ($1,$2,$3,clock_timestamp(),$4)`, [f.caseId, f.patient, f.lab, f.id]);
}
async function grant(c, f, suffix, expires, member = f.member) {
  const id = `${f.id}-${suffix}`, key = `objects/${randomUUID()}`;
  const collision = await one(c, `SELECT
    (SELECT count(*) FROM public."FileUploadGrant" WHERE id=$1) +
    (SELECT count(*) FROM public."ObjectStorageKeyAllocation" WHERE "objectKey"=$2) +
    (SELECT count(*) FROM public."StoredFile" WHERE "providerObjectKey"=$2) AS n`, [id, key]);
  assert(Number(collision.n) === 0, "Grant ID or object key already allocated");
  record({ event: "grant_planned", scenario: activeScenario, runId: f.id,
    grantId: id, objectKey: key, kind: "grant" });
  terminateAt("after_grant_plan");
  f.grants.push(id); f.keys.push(key);
  await c.query(`INSERT INTO public."FileUploadGrant"
    (id,"organizationId","labId","createdByMemberId","boundaryId",purpose,
     "targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix",
     "correlationId","expiresAt","updatedAt")
    VALUES ($1,$2,$3,$4,'N-FILE-110','case.asset.add.stage','case',$5,
      'OBJECT_STORAGE',$6,'JPG',$7,clock_timestamp() AT TIME ZONE 'UTC' + $8::interval,
      clock_timestamp())`,
    [id, f.org, f.lab, member, f.caseId, key, id, expires]);
  terminateAt("after_grant_insert");
  return { id, key };
}
async function lockAndCheckNoExisting(c) {
  await c.query('LOCK TABLE public."FileUploadGrant" IN SHARE ROW EXCLUSIVE MODE NOWAIT');
  const r = await c.query(eligibleSql);
  assert(r.rowCount === 0, "Pre-existing eligible grant would enter batch");
}
async function scenarioExpiry(c, f) {
  await lockAndCheckNoExisting(c);
  await parents(c, f);
  for (let i = 0; i < 7; i++) {
    const g = await grant(c, f, `expiry-${i}`, "3 seconds");
    await c.query(`UPDATE public."ObjectStorageKeyAllocation"
      SET "latestWriteCapabilityExpiresAt"=clock_timestamp()+interval '2 seconds'
      WHERE "sourceUploadGrantId"=$1`, [g.id]);
  }
  await c.query("SET CONSTRAINTS ALL IMMEDIATE");
  await c.query("SET CONSTRAINTS ALL DEFERRED");
  await new Promise(resolve => setTimeout(resolve, 3600));
  const due = await c.query(eligibleSql);
  assert(due.rowCount === 7 && due.rows.every(r => f.grants.includes(r.id)),
    "Expiry batch not exclusively run-owned");
  await setRole(c, "labos_case_expiry_executor");
  const r = await one(c, "SELECT labos_cleanup_private.expire_case_object_storage_and_enroll(7) n");
  assert(r.n === 7, "Expiry count mismatch");
  await c.query("SET CONSTRAINTS ALL IMMEDIATE");
  await resetRole(c);
  const v = await one(c, `SELECT count(*)::int n FROM public."FileUploadGrant"
    WHERE id=ANY($1::text[]) AND status='EXPIRED' AND "cleanupReconcileStage"=0
    AND "cleanupNextCheckAt">clock_timestamp()`, [f.grants]);
  assert(v.n === 7, "Expiry enrollment or deferred validation failed");
}
async function scenarioReject(c, f) {
  await parents(c, f);
  for (let i = 0; i < 7; i++) {
    const g = await grant(c, f, `reject-${i}`, "1 hour");
    await c.query(`UPDATE public."ObjectStorageKeyAllocation"
      SET "latestWriteCapabilityExpiresAt"=clock_timestamp()+interval '2 minutes'
      WHERE "sourceUploadGrantId"=$1`, [g.id]);
  }
  await c.query("SET CONSTRAINTS ALL IMMEDIATE");
  await c.query("SET CONSTRAINTS ALL DEFERRED");
  await setRole(c, "labos_verification_app");
  for (const id of f.grants) {
    const r = await c.query("SELECT * FROM labos_cleanup_private.reject_case_s001($1)", [id]);
    assert(r.rowCount === 1 && r.rows[0].id === id, "S001 rejection returned wrong row");
  }
  await c.query("SET CONSTRAINTS ALL IMMEDIATE");
  await resetRole(c);
  const v = await one(c, `SELECT count(*)::int n FROM public."FileUploadGrant"
    WHERE id=ANY($1::text[]) AND status='FAILED' AND "cleanupReconcileStage"=0
    AND "cleanupNextCheckAt">clock_timestamp()`, [f.grants]);
  assert(v.n === 7, "S001 enrollment failed");
}
async function scenarioQuarantine(c, f) {
  await lockAndCheckNoExisting(c);
  await parents(c, f);
  const g = await grant(c, f, "quarantine", "2 seconds");
  await c.query("SET CONSTRAINTS ALL IMMEDIATE");
  await c.query("SET CONSTRAINTS ALL DEFERRED");
  await new Promise(resolve => setTimeout(resolve, 2600));
  const due = await c.query(eligibleSql);
  assert(due.rowCount === 1 && due.rows[0].id === g.id, "Quarantine batch not exclusively run-owned");
  await setRole(c, "labos_case_expiry_executor");
  const r = await one(c, "SELECT labos_cleanup_private.expire_case_object_storage_and_enroll(1) n");
  assert(r.n === 1, "Quarantine count mismatch");
  await c.query("SET CONSTRAINTS ALL IMMEDIATE");
  await resetRole(c);
  const v = await one(c, `SELECT status,"cleanupFailureCode" code,
    "cleanupReconcileStage" stage,"cleanupNextCheckAt" due
    FROM public."FileUploadGrant" WHERE id=$1`, [g.id]);
  assert(v.status === "PENDING" && v.code === "QUARANTINE_ALLOCATION" &&
    v.stage === null && v.due === null, "Missing-fence quarantine failed");
}
async function scenarioShadow(c, f) {
  await parents(c, f);
  await setRole(c, "labos_verification_app");
  await c.query('CREATE TEMP TABLE "ObjectStorageKeyAllocation" (LIKE public."ObjectStorageKeyAllocation" INCLUDING DEFAULTS)');
  const g = await grant(c, f, "shadow-insert", "1 hour");
  const r = await one(c, `SELECT
    (SELECT count(*)::int FROM public."ObjectStorageKeyAllocation" WHERE "sourceUploadGrantId"=$1) durable,
    (SELECT count(*)::int FROM pg_temp."ObjectStorageKeyAllocation" WHERE "sourceUploadGrantId"=$1) temporary`, [g.id]);
  assert(r.durable === 1 && r.temporary === 0, "Allocation diverted to temporary table");
  await c.query("SET CONSTRAINTS ALL IMMEDIATE");
  await resetRole(c);
}
async function scenarioDenials(c, f) {
  await parents(c, f);
  const invalidId = `${f.id}-invalid`, invalidKey = `objects/${randomUUID()}`;
  record({ event: "grant_planned", scenario: activeScenario, runId: f.id,
    grantId: invalidId, objectKey: invalidKey, kind: "invalid_member_attempt" });
  f.grants.push(invalidId); f.keys.push(invalidKey);
  await expectedError(c, `INSERT INTO public."FileUploadGrant"
    (id,"organizationId","labId","createdByMemberId","boundaryId",purpose,
     "targetType","targetId",provider,"providerFileKey","caseClinicalValidatedSuffix",
     "correlationId","expiresAt","updatedAt")
    VALUES ($1,$2,$3,$4,'N-FILE-110','case.asset.add.stage','case',$5,
      'OBJECT_STORAGE',$6,'JPG',$1,clock_timestamp() AT TIME ZONE 'UTC'+interval '1 hour',
      clock_timestamp())`,
    [invalidId, f.org, f.lab, `${f.id}-missing-member`, f.caseId,
      invalidKey], "23514", "invalid_member_insert", f.id);
  const g = await grant(c, f, "denials", "1 hour");
  await c.query(`UPDATE public."ObjectStorageKeyAllocation"
    SET "latestWriteCapabilityExpiresAt"=clock_timestamp()+interval '2 minutes'
    WHERE "sourceUploadGrantId"=$1`, [g.id]);
  await c.query("SET CONSTRAINTS ALL IMMEDIATE");
  await c.query("SET CONSTRAINTS ALL DEFERRED");
  await setRole(c, "labos_verification_app");
  await expectedError(c, `UPDATE public."FileUploadGrant" SET status='CLEANED'
    WHERE id=$1`, [g.id], "23514", "direct_terminal_mutation", f.id);
  await expectedError(c, "SELECT labos_cleanup_private.expire_case_object_storage_and_enroll(1)", [], "42501",
    "wrong_caller_expiry", f.id);
  await resetRole(c);
  await setRole(c, "labos_verification_cleanup");
  await expectedError(c, "SELECT labos_cleanup_private.reject_case_s001($1)", [g.id], "42501",
    "wrong_caller_s001", f.id);
  await expectedError(c, "SELECT labos_cleanup_private.claim_object_storage_cleanup($1)", [g.id], "23514",
    "premature_claim", f.id);
  await resetRole(c);
}
async function scenarioFenceDisposableOnly(c, f) {
  await parents(c, f);
  const g = await grant(c, f, "shadow-fence", "1 hour");
  await c.query(`UPDATE public."ObjectStorageKeyAllocation"
    SET "latestWriteCapabilityExpiresAt"=clock_timestamp()+interval '2 minutes'
    WHERE "sourceUploadGrantId"=$1`, [g.id]);
  await c.query("SET CONSTRAINTS ALL IMMEDIATE");
  await c.query("SET CONSTRAINTS ALL DEFERRED");
  // This grant is deliberately NOT part of the hosted packet: it is absent on target.
  await c.query(`GRANT UPDATE ("latestWriteCapabilityExpiresAt")
    ON public."ObjectStorageKeyAllocation" TO labos_verification_app`);
  await setRole(c, "labos_verification_app");
  await c.query("SELECT * FROM labos_cleanup_private.reject_case_s001($1)", [g.id]);
  await c.query('CREATE TEMP TABLE "FileUploadGrant" (LIKE public."FileUploadGrant" INCLUDING DEFAULTS)');
  await c.query('INSERT INTO pg_temp."FileUploadGrant" SELECT * FROM public."FileUploadGrant" WHERE id=$1', [g.id]);
  await c.query('UPDATE pg_temp."FileUploadGrant" SET status=\'PENDING\' WHERE id=$1', [g.id]);
  await expectedError(c, `UPDATE public."ObjectStorageKeyAllocation"
    SET "latestWriteCapabilityExpiresAt"=clock_timestamp()+interval '3 minutes'
    WHERE "sourceUploadGrantId"=$1`, [g.id], "23514", "terminal_fence_shadow", f.id);
  await resetRole(c);
  const r = await one(c, `SELECT f.status,a."latestWriteCapabilityExpiresAt" fence
    FROM public."FileUploadGrant" f JOIN public."ObjectStorageKeyAllocation" a
    ON a."sourceUploadGrantId"=f.id WHERE f.id=$1`, [g.id]);
  assert(r.status === "FAILED" && new Date(r.fence).getTime() < Date.now() + 150000,
    "Terminal fence changed through temporary shadow");
}
const scenarios = [
  ["expiry", scenarioExpiry], ["s001", scenarioReject], ["quarantine", scenarioQuarantine],
  ["shadow_insert", scenarioShadow], ["denials", scenarioDenials],
];
if (mode === "--disposable") scenarios.push(["fence_disposable_only", scenarioFenceDisposableOnly]);

async function main() {
let pre = await connect();
try {
  await pre.query("BEGIN READ ONLY");
  await baseline(pre);
  if (mode === "--hosted") {
    const existing = await pre.query(eligibleSql);
    assert(existing.rowCount === 0, "Pre-existing eligible grants block hosted expiry tests");
  }
  await pre.query("ROLLBACK");
} finally { await pre.end(); }

registry = openRegistry(evidenceDirectory, {
  mode: mode.slice(2), projectId: mode === "--hosted" ? "rvtubjrczuxdxfuazjmr" : null,
  database: config.database, serverVersion: "17.11", host: config.host, port: config.port,
});
console.log(JSON.stringify({ event: "registry_ready", registryPath: registry.path,
  executionId: registry.executionId }));

for (const [name, body] of scenarios) {
  activeScenario = name;
  const f = fixture();
  record({ event: "scenario_start", scenario: name, runId: f.id });
  const c = await connect();
  let transactionOpen = false;
  let scenarioFailure = null;
  try {
    await c.query("BEGIN"); transactionOpen = true;
    await c.query("SET LOCAL lock_timeout='2s'");
    await c.query("SET LOCAL statement_timeout='20s'");
    await c.query("SET LOCAL idle_in_transaction_session_timeout='30s'");
    await c.query(roleGrant);
    await absent(c, f);
    await body(c, f);
    record({ event: "rollback_attempt", scenario: name, runId: f.id });
    await c.query("ROLLBACK"); transactionOpen = false;
    record({ event: "rollback_outcome", scenario: name, runId: f.id, result: "ACKNOWLEDGED" });
  } catch (error) {
    if (transactionOpen) {
      let registryAvailable = true;
      try { record({ event: "rollback_attempt", scenario: name, runId: f.id }); }
      catch { registryAvailable = false; }
      try {
        await c.query("ROLLBACK");
        transactionOpen = false;
        if (registryAvailable) record({ event: "rollback_outcome", scenario: name, runId: f.id, result: "ACKNOWLEDGED" });
      } catch {
        try { if (registryAvailable) record({ event: "rollback_outcome", scenario: name, runId: f.id, result: "UNKNOWN" }); }
        catch { /* Registry failure is reported by the original error. */ }
      }
    }
    scenarioFailure = { sqlstate: /^[0-9A-Z]{5}$/.test(error.code ?? "") ? error.code : null,
      classification: error.code ? "SQL_ERROR" : "ASSERTION_OR_IO_ERROR" };
  } finally { await c.end().catch(() => {}); }
  const check = await connect();
  try {
    await check.query("BEGIN READ ONLY");
    await absent(check, f);
    const temporary = await one(check, `SELECT count(*)::int n FROM pg_auth_members am
      JOIN pg_roles role ON role.oid=am.roleid JOIN pg_roles member ON member.oid=am.member
      JOIN pg_roles grantor ON grantor.oid=am.grantor
      WHERE member.rolname='postgres' AND role.rolname=ANY($1::text[])
        AND grantor.rolname='postgres' AND am.set_option`, [roles]);
    assert(temporary.n === 0, "Temporary SET membership survived rollback");
    await check.query("ROLLBACK");
    record({ event: "postflight", scenario: name, runId: f.id,
      exactFixtureAbsence: "CONFIRMED", temporaryMembership: "ABSENT" });
    record({ event: "scenario_outcome", scenario: name, runId: f.id,
      result: scenarioFailure ? "FAIL" : "PASS", sqlstate: scenarioFailure?.sqlstate ?? null,
      classification: scenarioFailure?.classification ?? null });
    console.log(JSON.stringify({ scenario: name, status: scenarioFailure ? "FAIL" : "PASS",
      sqlstate: scenarioFailure?.sqlstate ?? null, classification: scenarioFailure?.classification ?? null, runId: f.id,
      keys: f.keys, rollback: "EXACT_ABSENT", temporaryMembership: "ABSENT" }));
  } finally { await check.end(); }
  if (scenarioFailure) throw new Error(`Scenario ${name} stopped after verified rollback`);
}
if (mode === "--disposable") {
  activeScenario = "sql_error_and_connection_loss_disposable_only";
  const f = fixture(), broken = await connect();
  record({ event: "scenario_start", scenario: activeScenario, runId: f.id });
  await broken.query("BEGIN");
  await broken.query(roleGrant);
  await parents(broken, f);
  await grant(broken, f, "disconnect", "1 hour");
  let sqlstate = null;
  try { await broken.query("SELECT 1/0"); } catch (error) { sqlstate = error.code; }
  record({ event: "sqlstate_assertion", scenario: activeScenario, runId: f.id,
    operationId: "sql_error_disconnect",
    expected: "22012", observed: sqlstate, result: sqlstate === "22012" ? "PASS" : "FAIL" });
  assert(sqlstate === "22012", "Disposable SQL-exception rehearsal did not fail as expected");
  broken.on("error", () => {}); // Expected only in this disposable disconnect rehearsal.
  broken.connection.stream.destroy();
  const check = await connect();
  try {
    await check.query("BEGIN READ ONLY");
    await absent(check, f);
    const memberships = await one(check, `SELECT count(*)::int n FROM pg_auth_members am
      JOIN pg_roles role ON role.oid=am.roleid JOIN pg_roles member ON member.oid=am.member
      JOIN pg_roles grantor ON grantor.oid=am.grantor
      WHERE member.rolname='postgres' AND role.rolname=ANY($1::text[])
        AND grantor.rolname='postgres' AND am.set_option`, [roles]);
    assert(memberships.n === 0, "Connection-loss membership survived");
    await check.query("ROLLBACK");
    record({ event: "postflight", scenario: activeScenario, runId: f.id,
      exactFixtureAbsence: "CONFIRMED", temporaryMembership: "ABSENT" });
    record({ event: "scenario_outcome", scenario: activeScenario, runId: f.id, result: "PASS" });
    console.log(JSON.stringify({ scenario: "sql_error_and_connection_loss_disposable_only",
      status: "PASS", sqlstate, runId: f.id, keys: f.keys,
      rollback: "EXACT_ABSENT", temporaryMembership: "ABSENT" }));
  } finally { await check.end(); }
}
record({ event: "execution_outcome", result: "PASS" });
registry.close();
}
await main().catch((error) => {
  console.error(JSON.stringify({ status: "STOPPED", sqlstate: /^[0-9A-Z]{5}$/.test(error.code ?? "") ? error.code : null,
    classification: error.code ? "SQL_ERROR" : "ASSERTION_OR_IO_ERROR",
    registryPath: registry?.path ?? null }));
  try { registry?.close(); } catch { /* Preserve the original stopped result. */ }
  process.exitCode = 1;
});
