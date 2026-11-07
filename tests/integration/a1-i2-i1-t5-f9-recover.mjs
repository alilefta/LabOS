// Read-only exact-identity recovery for a T5-F9 registry. No fixture deletion or privilege repair.
import { readFileSync } from "node:fs";
import pg from "pg";
import { assessRegistryProtocol, readRegistry } from "./a1-i2-i1-t5-f9-registry.mjs";

async function main() {
const [,, mode, registryPath] = process.argv;
if (!["--disposable", "--hosted"].includes(mode) || !registryPath || process.argv.length !== 4) {
  throw new Error("Usage: recover --disposable|--hosted ABSOLUTE_REGISTRY_PATH");
}
const parsed = readRegistry(registryPath);
const protocol = assessRegistryProtocol(parsed);
const execution = parsed.records[0];
if (execution?.event !== "execution" || execution.target.mode !== mode.slice(2)) {
  throw new Error("Registry target identity does not match recovery mode");
}
const rawUrl = process.env.LABOS_T5F8_DATABASE_URL;
if (!rawUrl) throw new Error("Missing operator-supplied database URL");
const url = new URL(rawUrl);
if (mode === "--hosted" && (url.hostname !== "aws-1-eu-central-1.pooler.supabase.com" ||
    url.port !== "5432" || url.pathname !== "/postgres" ||
    url.username !== "postgres.rvtubjrczuxdxfuazjmr" || url.search ||
    execution.target.projectId !== "rvtubjrczuxdxfuazjmr")) {
  throw new Error("Hosted target mismatch");
}
if (mode === "--disposable" && !["127.0.0.1", "localhost"].includes(url.hostname)) {
  throw new Error("Disposable recovery requires loopback");
}
if (execution.target.host !== url.hostname || execution.target.port !== Number(url.port) ||
    execution.target.database !== url.pathname.slice(1)) {
  throw new Error("Registry and connection target mismatch");
}
const config = { host: url.hostname, port: Number(url.port), database: url.pathname.slice(1),
  user: decodeURIComponent(url.username), password: decodeURIComponent(url.password),
  application_name: "labos-t5-f9-readonly-recovery", connectionTimeoutMillis: 5000 };
if (mode === "--hosted") {
  const caFile = process.env.LABOS_T5F8_CA_FILE;
  if (!caFile) throw new Error("Missing CA file");
  config.ssl = { ca: readFileSync(caFile), servername: url.hostname, rejectUnauthorized: true };
}
const c = new pg.Client(config);
try {
  await c.connect();
  if (mode === "--hosted" && (!c.connection.stream.encrypted || !c.connection.stream.authorized)) {
    throw new Error("Hosted TLS verification failed");
  }
  await c.query("BEGIN READ ONLY");
  const identity = (await c.query(`SELECT current_database() db, current_user, session_user,
    current_setting('server_version') version`)).rows[0];
  if (identity.db !== "postgres" || identity.version !== "17.11" ||
      identity.current_user !== "postgres" || identity.session_user !== "postgres") {
    throw new Error("Database identity mismatch");
  }
  const results = [];
  for (const plan of parsed.records.filter(r => r.event === "scenario_planned")) {
    const grants = parsed.records.filter(r => r.event === "grant_planned" && r.runId === plan.runId);
    const ids = grants.map(g => g.grantId);
    const keys = grants.map(g => g.objectKey);
    const p = plan.parents;
    const x = (await c.query(`SELECT
      (SELECT count(*) FROM public.organization WHERE id=$1 OR slug=$7) +
      (SELECT count(*) FROM public."Lab" WHERE id=$2) +
      (SELECT count(*) FROM public."AuthUser" WHERE id=$3 OR email=$8) +
      (SELECT count(*) FROM public.member WHERE id=$4) +
      (SELECT count(*) FROM public."Patient" WHERE id=$5) +
      (SELECT count(*) FROM public."Case" WHERE id=$6 OR "caseNumber"=$9) +
      (SELECT count(*) FROM public."FileUploadGrant"
       WHERE id=ANY($10::text[]) OR "providerFileKey"=ANY($11::text[])) +
      (SELECT count(*) FROM public."ObjectStorageKeyAllocation"
       WHERE "sourceUploadGrantId"=ANY($10::text[]) OR "objectKey"=ANY($11::text[])) +
      (SELECT count(*) FROM public."StoredFile"
       WHERE "sourceUploadGrantId"=ANY($10::text[]) OR "providerObjectKey"=ANY($11::text[])) n`,
      [p.organizationId, p.labId, p.authUserId, p.memberId, p.patientId, p.caseId,
        p.organizationSlug, p.email, p.caseNumber, ids, keys])).rows[0];
    results.push({ scenario: plan.scenario, runId: plan.runId,
      recordedGrantCount: grants.length, status: Number(x.n) === 0 ? "CONFIRMED_ABSENT" : "SURVIVING_RECORDS",
      exactMatchCount: Number(x.n) });
  }
  const temporary = (await c.query(`SELECT count(*)::int n FROM pg_auth_members am
    JOIN pg_roles role ON role.oid=am.roleid JOIN pg_roles member ON member.oid=am.member
    JOIN pg_roles grantor ON grantor.oid=am.grantor
    WHERE member.rolname='postgres' AND role.rolname=ANY($1::text[])
      AND grantor.rolname='postgres' AND am.set_option`, [[
        "labos_verification_app", "labos_verification_cleanup", "labos_case_expiry_executor",
      ]])).rows[0];
  await c.query("ROLLBACK");
  const surviving = results.some(r => r.status === "SURVIVING_RECORDS");
  const databaseCleanup = surviving ? "SURVIVING_RECORDS" :
    parsed.incomplete || protocol.completion === "INDETERMINATE" || results.length === 0 ||
      Number(temporary.n) !== 0 ? "INDETERMINATE" : "CONFIRMED_ABSENT";
  const overallVerification = protocol.completion === "INDETERMINATE" ? "INDETERMINATE" :
    protocol.completion === "COMPLETE" && protocol.allPassed &&
      databaseCleanup === "CONFIRMED_ABSENT" && Number(temporary.n) === 0
      ? "PASS" : "NOT_ACCEPTED";
  console.log(JSON.stringify({ executionId: execution.executionId,
    databaseCleanup, executionCompletion: protocol.completion, overallVerification,
    protocolReason: protocol.reason,
    registryIncomplete: parsed.incomplete, invalidAt: parsed.invalidAt,
    scenarios: results, temporaryMembership: Number(temporary.n) === 0 ? "ABSENT" : "PRESENT" }));
} catch (error) {
  console.error(JSON.stringify({ databaseCleanup: "INDETERMINATE",
    executionCompletion: protocol.completion, overallVerification: "INDETERMINATE",
    sqlstate: /^[0-9A-Z]{5}$/.test(error.code ?? "") ? error.code : null }));
  process.exitCode = 1;
} finally {
  await c.end().catch(() => {});
}
}
await main().catch(() => {
  console.error(JSON.stringify({ databaseCleanup: "INDETERMINATE",
    executionCompletion: "INDETERMINATE", overallVerification: "INDETERMINATE" }));
  process.exitCode = 1;
});
