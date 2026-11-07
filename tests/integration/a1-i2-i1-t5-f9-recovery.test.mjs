import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import test from "node:test";
import { assessRegistryProtocol, parseRegistry } from "./a1-i2-i1-t5-f9-registry.mjs";

const groups = ["expiry", "s001", "quarantine", "shadow_insert", "denials"];
const grantCounts = [7, 7, 1, 1, 2];
const denialAssertions = [
  ["invalid_member_insert", "23514"],
  ["direct_terminal_mutation", "23514"],
  ["wrong_caller_expiry", "42501"],
  ["wrong_caller_s001", "42501"],
  ["premature_claim", "23514"],
];
function completeRecords() {
  const records = [{ event: "execution", executionId: randomUUID(),
    target: { mode: "hosted", projectId: "rvtubjrczuxdxfuazjmr" } }];
  for (let i = 0; i < groups.length; i++) {
    const scenario = groups[i], runId = `t5f8-${randomUUID()}`;
    records.push({ event: "scenario_planned", scenario, runId, parents: {
      organizationId: `${runId}-org`, labId: `${runId}-lab`, authUserId: `${runId}-user`,
      memberId: `${runId}-member`, patientId: `${runId}-patient`, caseId: `${runId}-case`,
      organizationSlug: `${runId}-org`, email: `${runId}@example.invalid`, caseNumber: runId,
    } });
    records.push({ event: "scenario_start", scenario, runId });
    for (let j = 0; j < grantCounts[i]; j++) {
      records.push({ event: "grant_planned", scenario, runId, grantId: `${runId}-${j}`,
        objectKey: `objects/${randomUUID()}`,
        kind: scenario === "denials" && j === 0 ? "invalid_member_attempt" : "grant" });
      if (scenario === "denials" && j === 0) {
        const [operationId, expected] = denialAssertions[0];
        records.push({ event: "sqlstate_assertion", scenario, runId, operationId,
          expected, observed: expected, result: "PASS" });
      }
    }
    if (scenario === "denials") {
      for (const [operationId, expected] of denialAssertions.slice(1)) {
        records.push({ event: "sqlstate_assertion", scenario, runId, operationId,
          expected, observed: expected, result: "PASS" });
      }
    }
    records.push({ event: "rollback_attempt", scenario, runId },
      { event: "rollback_outcome", scenario, runId, result: "ACKNOWLEDGED" },
      { event: "postflight", scenario, runId,
        exactFixtureAbsence: "CONFIRMED", temporaryMembership: "ABSENT" },
      { event: "scenario_outcome", scenario, runId, result: "PASS" });
  }
  records.push({ event: "execution_outcome", result: "PASS" });
  return records;
}
function completeDisposableRecords() {
  const records = completeRecords();
  records[0].target.mode = "disposable";
  records.pop();
  for (const [scenario, operationId, sqlstate] of [
    ["fence_disposable_only", "terminal_fence_shadow", "23514"],
    ["sql_error_and_connection_loss_disposable_only", "sql_error_disconnect", "22012"],
  ]) {
    const runId = `t5f8-${randomUUID()}`;
    records.push({ event: "scenario_planned", scenario, runId, parents: {
      organizationId: `${runId}-org`, labId: `${runId}-lab`, authUserId: `${runId}-user`,
      memberId: `${runId}-member`, patientId: `${runId}-patient`, caseId: `${runId}-case`,
      organizationSlug: `${runId}-org`, email: `${runId}@example.invalid`, caseNumber: runId,
    } });
    records.push({ event: "scenario_start", scenario, runId },
      { event: "grant_planned", scenario, runId, grantId: `${runId}-grant`,
        objectKey: `objects/${randomUUID()}`, kind: "grant" },
      { event: "sqlstate_assertion", scenario, runId, operationId,
        expected: sqlstate, observed: sqlstate, result: "PASS" });
    if (scenario === "fence_disposable_only") {
      records.push({ event: "rollback_attempt", scenario, runId },
        { event: "rollback_outcome", scenario, runId, result: "ACKNOWLEDGED" });
    }
    records.push({ event: "postflight", scenario, runId,
      exactFixtureAbsence: "CONFIRMED", temporaryMembership: "ABSENT" },
      { event: "scenario_outcome", scenario, runId, result: "PASS" });
  }
  records.push({ event: "execution_outcome", result: "PASS" });
  return records;
}
const inspect = (records, incomplete = false) => assessRegistryProtocol({ records, incomplete });
function chainRecords(records) {
  let previousHash = "0".repeat(64);
  const lines = records.map((payload, index) => {
    const body = { version: 1, sequence: index + 1, previousHash, payload };
    const hash = createHash("sha256").update(JSON.stringify(body)).digest("hex");
    previousHash = hash;
    return JSON.stringify({ ...body, hash });
  });
  return `${lines.join("\n")}\n`;
}

test("complete five-group execution is structurally eligible", () => {
  assert.deepEqual(inspect(completeRecords()).completion, "COMPLETE");
  assert.equal(inspect(completeRecords()).allPassed, true);
});
test("missing execution or scenario terminal is incomplete", () => {
  const records = completeRecords();
  assert.equal(inspect(records.slice(0, -1)).completion, "INCOMPLETE");
  assert.equal(inspect(records.slice(0, -2)).completion, "INCOMPLETE");
  assert.equal(inspect(records.slice(0, -1)).allPassed, false);
});
test("failed scenario with confirmed postflight is not a PASS", () => {
  const records = completeRecords().slice(0, -1);
  const last = records.at(-1);
  last.result = "FAIL";
  const result = inspect(records);
  assert.equal(result.completion, "INCOMPLETE");
  assert.equal(result.knownFailure, true);
});
test("duplicate, contradictory and out-of-order terminals are indeterminate", () => {
  const duplicate = completeRecords();
  duplicate.push({ event: "execution_outcome", result: "PASS" });
  assert.equal(inspect(duplicate).completion, "INDETERMINATE");
  const contradictory = completeRecords();
  contradictory.at(-1).result = "FAIL";
  assert.equal(inspect(contradictory).completion, "INDETERMINATE");
  const early = completeRecords();
  early.splice(-2, 0, { event: "execution_outcome", result: "PASS" });
  assert.equal(inspect(early).completion, "INDETERMINATE");
});
test("missing identity plan or inconsistent PASS is indeterminate", () => {
  const missingGrant = completeRecords();
  missingGrant.splice(missingGrant.findIndex(x => x.event === "grant_planned"), 1);
  assert.equal(inspect(missingGrant).completion, "INDETERMINATE");
  const malformedParent = completeRecords();
  delete malformedParent[1].parents.email;
  assert.equal(inspect(malformedParent).completion, "INDETERMINATE");
  const failedAssertion = completeRecords();
  const a = failedAssertion.find(x => x.event === "sqlstate_assertion");
  a.observed = "42501";
  a.result = "FAIL";
  assert.equal(inspect(failedAssertion).completion, "INDETERMINATE");
  const missingPostflight = completeRecords();
  missingPostflight.splice(missingPostflight.findIndex(x => x.event === "postflight"), 1);
  assert.equal(inspect(missingPostflight).completion, "INDETERMINATE");
  const contradictoryOutcome = completeRecords();
  contradictoryOutcome.find(x => x.event === "scenario_outcome").sqlstate = "P0001";
  assert.equal(inspect(contradictoryOutcome).completion, "INDETERMINATE");
});
test("truncated or broken chain remains indeterminate", () => {
  const payloads = completeRecords();
  const lines = chainRecords(payloads).trimEnd().split("\n");
  const complete = parseRegistry(`${lines.join("\n")}\n`);
  assert.equal(complete.incomplete, false);
  assert.equal(inspect(complete.records).completion, "COMPLETE");
  const truncated = parseRegistry(`${lines.join("\n")}\n{"version":1`);
  assert.equal(truncated.incomplete, true);
  assert.equal(inspect(truncated.records, truncated.incomplete).completion, "INDETERMINATE");
  const broken = [...lines];
  broken[4] = broken[4].replace('"sequence":5', '"sequence":50');
  const corrupt = parseRegistry(`${broken.join("\n")}\n`);
  assert.equal(corrupt.incomplete, true);
  assert.equal(inspect(corrupt.records, corrupt.incomplete).completion, "INDETERMINATE");
});

test("approved denial operation and SQLSTATE sequence is accepted", () => {
  const parsed = parseRegistry(chainRecords(completeRecords()));
  assert.equal(parsed.incomplete, false);
  assert.deepEqual(inspect(parsed.records), {
    completion: "COMPLETE", reason: null, allPassed: true,
    plannedScenarios: 5, knownFailure: false,
  });
});

test("valid chained 00000 denial assertions cannot establish a PASS", () => {
  const forged = completeRecords();
  for (const assertion of forged.filter(x => x.event === "sqlstate_assertion")) {
    assertion.expected = "00000";
    assertion.observed = "00000";
  }
  const parsed = parseRegistry(chainRecords(forged));
  assert.equal(parsed.incomplete, false);
  assert.equal(inspect(parsed.records).completion, "INDETERMINATE");
  assert.equal(inspect(parsed.records).allPassed, false);
});

test("assertion identity, operation, order and SQLSTATE mutations are rejected", () => {
  const cases = [
    records => { records.find(x => x.event === "sqlstate_assertion").runId = "wrong-run"; },
    records => { records.find(x => x.event === "sqlstate_assertion").operationId = "wrong_operation"; },
    records => {
      const assertions = records.filter(x => x.event === "sqlstate_assertion");
      [assertions[0].operationId, assertions[1].operationId] =
        [assertions[1].operationId, assertions[0].operationId];
    },
    records => {
      const first = records.find(x => x.event === "sqlstate_assertion");
      records.splice(records.indexOf(first), 0, { ...first });
    },
    records => {
      const first = records.find(x => x.event === "sqlstate_assertion");
      first.expected = "42501";
      first.observed = "42501";
    },
    records => { records.find(x => x.event === "sqlstate_assertion").scenario = "expiry"; },
  ];
  for (const mutate of cases) {
    const records = completeRecords();
    mutate(records);
    assert.equal(inspect(records).completion, "INDETERMINATE");
  }
});

test("missing or additional assertion prevents completion", () => {
  const missing = completeRecords();
  missing.splice(missing.findIndex(x => x.event === "sqlstate_assertion"), 1);
  assert.equal(inspect(missing).completion, "INDETERMINATE");
  const additional = completeRecords();
  const last = additional.findLastIndex(x => x.event === "sqlstate_assertion");
  additional.splice(last + 1, 0, { ...additional[last] });
  assert.equal(inspect(additional).completion, "INDETERMINATE");
});

test("valid interrupted prefix remains incomplete without runtime PASS", () => {
  const records = completeRecords();
  records.splice(records.findIndex(x => x.event === "scenario_outcome"));
  const result = inspect(records);
  assert.equal(result.completion, "INCOMPLETE");
  assert.equal(result.allPassed, false);
});

test("disposable-only assertions require their exact operation and code", () => {
  const valid = completeDisposableRecords();
  assert.equal(inspect(valid).completion, "COMPLETE");
  assert.equal(inspect(valid).allPassed, true);
  for (const mutate of [
    record => { record.operationId = "wrong_operation"; },
    record => { record.expected = "00000"; record.observed = "00000"; },
  ]) {
    const altered = completeDisposableRecords();
    const assertion = altered.find(x => x.event === "sqlstate_assertion" &&
      x.scenario === "sql_error_and_connection_loss_disposable_only");
    mutate(assertion);
    assert.equal(inspect(altered).completion, "INDETERMINATE");
  }
});
