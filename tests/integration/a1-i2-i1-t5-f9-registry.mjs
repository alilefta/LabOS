import { createHash, randomUUID } from "node:crypto";
import { closeSync, constants, fstatSync, fsyncSync, lstatSync, openSync, readFileSync, writeSync } from "node:fs";
import { isAbsolute, parse, resolve, sep } from "node:path";
import { execFileSync } from "node:child_process";

const digest = (value) => createHash("sha256").update(value).digest("hex");
const allowed = new Set(["execution", "scenario_planned", "scenario_start", "grant_planned",
  "sqlstate_assertion", "rollback_attempt", "rollback_outcome", "postflight",
  "scenario_outcome", "execution_outcome"]);
// This verification packet is pinned to the approved Windows operator host. Never search PATH.
const trustedPwsh = "C:\\Users\\alnaseem\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\native\\powershell\\pwsh.exe";

function verifyWindowsAcl(path) {
  let cursor = parse(trustedPwsh).root;
  for (const part of trustedPwsh.slice(cursor.length).split(sep).filter(Boolean)) {
    cursor = resolve(cursor, part);
    if (lstatSync(cursor).isSymbolicLink()) throw new Error("Trusted PowerShell path is redirected");
  }
  const executable = lstatSync(trustedPwsh);
  if (!executable.isFile() || executable.isSymbolicLink()) {
    throw new Error("Trusted PowerShell executable is unavailable");
  }
  const check = `$ErrorActionPreference='Stop';` +
    `$a=Get-Acl -LiteralPath $env:LABOS_T5F9_ACL_PATH;` +
    `$me=[Security.Principal.WindowsIdentity]::GetCurrent().User.Value;` +
    `$owner=([Security.Principal.NTAccount]$a.Owner).Translate([Security.Principal.SecurityIdentifier]).Value;` +
    `if($owner -ne $me){throw 'owner'};` +
    `$allow=@($me,'S-1-5-18','S-1-5-32-544');` +
    `foreach($ace in $a.Access){if($ace.AccessControlType -eq 'Allow'){` +
    `$sid=$ace.IdentityReference.Translate([Security.Principal.SecurityIdentifier]).Value;` +
    `if($sid -notin $allow){throw 'access'}}};'OK'`;
  try {
    const result = execFileSync(trustedPwsh, ["-NoProfile", "-NonInteractive", "-Command", check],
      { env: { SystemRoot: process.env.SystemRoot,
          LABOS_T5F9_ACL_PATH: path }, encoding: "utf8", timeout: 5000,
        windowsHide: true, stdio: ["ignore", "pipe", "ignore"] });
    if (result.trim() !== "OK") throw new Error("Unexpected ACL check result");
  } catch { throw new Error("Evidence ACL is not operator-private"); }
}

export function safeDirectory(directory) {
  if (!directory || !isAbsolute(directory) || directory.split(/[\\/]/).includes("..") || resolve(directory) !== directory) {
    throw new Error("Evidence directory must be an absolute, normalized path without traversal");
  }
  const root = parse(directory).root;
  let cursor = root;
  for (const part of directory.slice(root.length).split(sep).filter(Boolean)) {
    cursor = resolve(cursor, part);
    const stat = lstatSync(cursor);
    if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error("Evidence path is not a real directory");
  }
  const stat = lstatSync(directory);
  if (process.platform === "win32") {
    verifyWindowsAcl(directory);
  } else if ((stat.mode & 0o077) !== 0) {
    throw new Error("Evidence directory is accessible to other users");
  }
  return directory;
}

export function openRegistry(directory, target) {
  safeDirectory(directory);
  const executionId = randomUUID();
  const path = resolve(directory, `t5f9-${executionId}.jsonl`);
  const flags = constants.O_WRONLY | constants.O_CREAT | constants.O_EXCL | constants.O_APPEND |
    (constants.O_NOFOLLOW ?? 0);
  const fd = openSync(path, flags, 0o600);
  try { if (process.platform === "win32") verifyWindowsAcl(path); }
  catch (error) { closeSync(fd); throw error; }
  if (process.platform !== "win32") {
    const directoryFd = openSync(directory, constants.O_RDONLY);
    try { fsyncSync(directoryFd); } finally { closeSync(directoryFd); }
  }
  const original = fstatSync(fd);
  let sequence = 0;
  let previousHash = "0".repeat(64);
  const append = (payload) => {
    if (!allowed.has(payload.event)) throw new Error("Unrecognized registry event");
    const current = lstatSync(path);
    if (!current.isFile() || current.isSymbolicLink() || current.dev !== original.dev || current.ino !== original.ino ||
        current.size !== fstatSync(fd).size) throw new Error("Registry file integrity changed");
    const body = { version: 1, sequence: sequence + 1, previousHash, payload };
    const hash = digest(JSON.stringify(body));
    const buffer = Buffer.from(`${JSON.stringify({ ...body, hash })}\n`, "utf8");
    if (buffer.length > 16384 || writeSync(fd, buffer) !== buffer.length) throw new Error("Registry append failed");
    fsyncSync(fd);
    sequence++;
    previousHash = hash;
  };
  try { append({ event: "execution", executionId, target }); }
  catch (error) { closeSync(fd); throw error; }
  return { path, executionId, append, close: () => closeSync(fd) };
}

export function readRegistry(path) {
  if (!isAbsolute(path) || path.split(/[\\/]/).includes("..") || resolve(path) !== path) {
    throw new Error("Registry path must be absolute and normalized");
  }
  safeDirectory(parse(path).dir);
  const stat = lstatSync(path);
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error("Registry is not a regular file");
  if (process.platform === "win32") verifyWindowsAcl(path);
  else if ((stat.mode & 0o077) !== 0) throw new Error("Registry file is accessible to other users");
  return parseRegistry(readFileSync(path, "utf8"));
}

export function parseRegistry(input) {
  const lines = input.split("\n");
  const records = [];
  let previousHash = "0".repeat(64);
  let incomplete = !input.endsWith("\n");
  for (let i = 0; i < lines.length - 1; i++) {
    try {
      const record = JSON.parse(lines[i]);
      const { hash, ...body } = record;
      if (record.version !== 1 || record.sequence !== i + 1 || record.previousHash !== previousHash ||
          !allowed.has(record.payload?.event) || digest(JSON.stringify(body)) !== hash) {
        throw new Error("Invalid registry chain");
      }
      records.push(record.payload);
      previousHash = hash;
    } catch {
      incomplete = true;
      break;
    }
  }
  return { records, incomplete, invalidAt: incomplete ? records.length + 1 : null };
}

const scenarioOrder = {
  hosted: ["expiry", "s001", "quarantine", "shadow_insert", "denials"],
  disposable: ["expiry", "s001", "quarantine", "shadow_insert", "denials",
    "fence_disposable_only", "sql_error_and_connection_loss_disposable_only"],
};
const expectedGrantCount = { expiry: 7, s001: 7, quarantine: 1, shadow_insert: 1,
  denials: 2, fence_disposable_only: 1, sql_error_and_connection_loss_disposable_only: 1 };
const expectedAssertionCount = { expiry: 0, s001: 0, quarantine: 0, shadow_insert: 0,
  denials: 5, fence_disposable_only: 1, sql_error_and_connection_loss_disposable_only: 1 };
const assertionContract = Object.freeze({
  denials: Object.freeze([
    Object.freeze({ operationId: "invalid_member_insert", sqlstate: "23514" }),
    Object.freeze({ operationId: "direct_terminal_mutation", sqlstate: "23514" }),
    Object.freeze({ operationId: "wrong_caller_expiry", sqlstate: "42501" }),
    Object.freeze({ operationId: "wrong_caller_s001", sqlstate: "42501" }),
    Object.freeze({ operationId: "premature_claim", sqlstate: "23514" }),
  ]),
  fence_disposable_only: Object.freeze([
    Object.freeze({ operationId: "terminal_fence_shadow", sqlstate: "23514" }),
  ]),
  sql_error_and_connection_loss_disposable_only: Object.freeze([
    Object.freeze({ operationId: "sql_error_disconnect", sqlstate: "22012" }),
  ]),
});
const uuid4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function validPlan(p) {
  if (typeof p?.runId !== "string" || !p.runId.startsWith("t5f8-") ||
      !uuid4.test(p.runId.slice(5)) || !p.parents) return false;
  const x = p.parents;
  return x.organizationId === `${p.runId}-org` && x.labId === `${p.runId}-lab` &&
    x.authUserId === `${p.runId}-user` && x.memberId === `${p.runId}-member` &&
    x.patientId === `${p.runId}-patient` && x.caseId === `${p.runId}-case` &&
    x.organizationSlug === x.organizationId && x.email === `${p.runId}@example.invalid` &&
    x.caseNumber === p.runId;
}

// Validate the event protocol independently of database observations. A clean prefix is INCOMPLETE,
// while malformed records, contradictions, or an invalid chain are INDETERMINATE.
export function assessRegistryProtocol(parsed) {
  const records = parsed.records;
  const execution = records[0];
  const expected = scenarioOrder[execution?.target?.mode];
  const invalid = (reason) => ({ completion: "INDETERMINATE", reason,
    allPassed: false, plannedScenarios: records.filter(r => r.event === "scenario_planned").length });
  if (parsed.incomplete) return invalid("REGISTRY_CHAIN_INCOMPLETE");
  if (execution?.event !== "execution" || !expected || !uuid4.test(execution.executionId ?? "")) {
    return invalid("INVALID_EXECUTION_HEADER");
  }
  let scenarioIndex = 0;
  let current = null;
  let terminal = null;
  const runIds = new Set(), grantIds = new Set(), objectKeys = new Set();
  for (const p of records.slice(1)) {
    if (terminal) return invalid("RECORD_AFTER_EXECUTION_TERMINAL");
    if (p.event === "execution") return invalid("DUPLICATE_EXECUTION_HEADER");
    if (p.event === "scenario_planned") {
      if ((current && current.phase !== "done") || p.scenario !== expected[scenarioIndex] ||
          !validPlan(p) || runIds.has(p.runId)) return invalid("INVALID_SCENARIO_PLAN");
      runIds.add(p.runId);
      scenarioIndex++;
      current = { name: p.scenario, runId: p.runId, phase: "planned", grants: 0,
        invalidMemberPlans: 0, assertions: 0, rollbackPending: false,
        rollbackSeen: false, rollbackUnknown: false, outcome: null };
      continue;
    }
    if (p.event === "execution_outcome") {
      if (scenarioIndex !== expected.length || current?.phase !== "done" ||
          !["PASS", "FAIL"].includes(p.result)) return invalid("INVALID_EXECUTION_TERMINAL");
      const outcomes = records.filter(r => r.event === "scenario_outcome");
      if (p.result === "PASS" && outcomes.some(r => r.result !== "PASS")) {
        return invalid("CONTRADICTORY_EXECUTION_TERMINAL");
      }
      if (p.result === "FAIL" && outcomes.every(r => r.result === "PASS")) {
        return invalid("CONTRADICTORY_EXECUTION_TERMINAL");
      }
      terminal = p.result;
      continue;
    }
    if (!current || p.scenario !== current.name || p.runId !== current.runId) {
      return invalid("EVENT_IDENTITY_MISMATCH");
    }
    if (p.event === "scenario_start") {
      if (current.phase !== "planned") return invalid("INVALID_SCENARIO_START");
      current.phase = "running";
    } else if (p.event === "grant_planned") {
      if (current.phase !== "running" || typeof p.grantId !== "string" ||
          !p.grantId.startsWith(`${current.runId}-`) || grantIds.has(p.grantId) ||
          typeof p.objectKey !== "string" || !p.objectKey.startsWith("objects/") ||
          !uuid4.test(p.objectKey.slice(8)) || objectKeys.has(p.objectKey) ||
          !["grant", "invalid_member_attempt"].includes(p.kind)) return invalid("INVALID_GRANT_PLAN");
      grantIds.add(p.grantId); objectKeys.add(p.objectKey);
      current.grants++;
      if (p.kind === "invalid_member_attempt") current.invalidMemberPlans++;
    } else if (p.event === "sqlstate_assertion") {
      const required = assertionContract[current.name]?.[current.assertions];
      if (current.phase !== "running" || !required ||
          p.operationId !== required.operationId || p.expected !== required.sqlstate ||
          p.observed !== required.sqlstate || p.result !== "PASS") {
        return invalid("INVALID_SQLSTATE_ASSERTION");
      }
      current.assertions++;
    } else if (p.event === "rollback_attempt") {
      if (current.phase !== "running" || current.rollbackPending) return invalid("INVALID_ROLLBACK_ATTEMPT");
      current.rollbackPending = true;
      current.rollbackSeen = true;
    } else if (p.event === "rollback_outcome") {
      if (current.phase !== "running" || !current.rollbackPending ||
          !["ACKNOWLEDGED", "UNKNOWN"].includes(p.result)) return invalid("INVALID_ROLLBACK_OUTCOME");
      current.rollbackPending = false;
      if (p.result === "UNKNOWN") current.rollbackUnknown = true;
      current.phase = "rolled_back";
    } else if (p.event === "postflight") {
      if (!(["running", "rolled_back"].includes(current.phase)) || current.rollbackPending ||
          (current.phase === "running" && current.name !== "sql_error_and_connection_loss_disposable_only") ||
          p.exactFixtureAbsence !== "CONFIRMED" || p.temporaryMembership !== "ABSENT") {
        return invalid("INVALID_POSTFLIGHT");
      }
      current.phase = "postflight";
    } else if (p.event === "scenario_outcome") {
      if (current.phase !== "postflight" || !["PASS", "FAIL"].includes(p.result)) {
        return invalid("INVALID_SCENARIO_TERMINAL");
      }
      if (p.result === "PASS" && (p.sqlstate != null || p.classification != null)) {
        return invalid("CONTRADICTORY_SCENARIO_TERMINAL");
      }
      if (p.result === "PASS" && (current.grants !== expectedGrantCount[current.name] ||
          current.assertions !== expectedAssertionCount[current.name] ||
          current.rollbackUnknown ||
          (current.name === "denials" ? current.invalidMemberPlans !== 1 : current.invalidMemberPlans !== 0) ||
          (current.name !== "sql_error_and_connection_loss_disposable_only" && !current.rollbackSeen))) {
        return invalid("CONTRADICTORY_SCENARIO_TERMINAL");
      }
      current.outcome = p.result;
      current.phase = "done";
    } else {
      return invalid("UNEXPECTED_EVENT");
    }
  }
  if (!terminal) return { completion: "INCOMPLETE", reason: "MISSING_TERMINAL_OUTCOME",
    allPassed: false, plannedScenarios: scenarioIndex,
    knownFailure: records.some(r => r.event === "scenario_outcome" && r.result === "FAIL") };
  return { completion: "COMPLETE", reason: null, allPassed: terminal === "PASS",
    plannedScenarios: scenarioIndex, knownFailure: terminal === "FAIL" };
}
