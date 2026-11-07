import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import {
  main, parseBatchLimit, runCaseExpirySweep, SWEEPER_RUNTIME_BINDING,
} from './case-object-storage-expiry-sweeper.mjs'

const login = 'labos_case_expiry_runner_test'

function fakeClient({ processed = 2, failAt, identity = {}, due = [2, 0] } = {}) {
  const calls = []
  let observation = 0
  const client = {
    calls,
    async query(sql, params = []) {
      calls.push({ sql, params })
      if (failAt && sql.includes(failAt)) throw Object.assign(new Error('secret error'), { code: '42501' })
      if (sql.includes('FROM pg_catalog.pg_roles r')) return { rows: [{
        current_user: login, session_user: login, rolcanlogin: true,
        rolsuper: false, rolcreaterole: false, rolcreatedb: false,
        rolbypassrls: false, rolreplication: false, rolinherit: false,
        approved_memberships: 1,
        total_memberships: 1, ...identity,
      }] }
      if (sql === 'SELECT current_user, session_user') {
        return { rows: [{ current_user: 'labos_case_expiry_executor', session_user: login }] }
      }
      if (sql.includes('FROM (SELECT "expiresAt"')) {
        return { rows: [{ sampled: due[observation++], oldest: new Date('2026-10-20T00:00:00Z') }] }
      }
      if (sql.includes('expire_case_object_storage_and_enroll')) {
        return { rows: [{ processed }] }
      }
      return { rows: [] }
    },
    async end() { calls.push({ sql: 'END_CONNECTION' }) },
  }
  return client
}

function input(client, extra = {}) {
  return {
    enabled: true, operationalApproval: true, batchLimit: 7,
    expectedLoginRole: login, connect: async () => client,
    clock: () => new Date('2026-10-20T00:00:00Z'), ...extra,
  }
}

test('default-off cannot open a connection, even with a connection factory', async () => {
  let connected = false
  const result = await runCaseExpirySweep({ connect: async () => { connected = true } })
  assert.equal(result.status, 'DISABLED')
  assert.equal(connected, false)
  assert.equal(SWEEPER_RUNTIME_BINDING, 'PENDING_OPERATIONAL_APPROVAL')
  assert.equal((await main({}, [])).status, 'DISABLED')
})

test('missing operational approval, bad limits and missing binding stop before connection', async () => {
  for (const extra of [
    { operationalApproval: false }, { expectedLoginRole: '' },
    { expectedLoginRole: 'postgres' },
    { expectedLoginRole: 'labos_case_expiry_owner' },
    { batchLimit: 0 }, { batchLimit: 501 }, { batchLimit: '1.5' },
    { batchLimit: Infinity },
  ]) {
    let connected = false
    await assert.rejects(runCaseExpirySweep(input(null, {
      connect: async () => { connected = true }, ...extra,
    })))
    assert.equal(connected, false)
  }
  assert.equal(parseBatchLimit('500'), 500)
  assert.throws(() => parseBatchLimit('050'))
})

test('one bounded restricted call reports processed, not falsely expired, and commits', async () => {
  const client = fakeClient({ processed: 2, due: [3, 1] })
  const events = []
  const result = await runCaseExpirySweep(input(client, { emit: (x) => events.push(x) }))
  assert.equal(result.status, 'SUCCESS')
  assert.equal(result.requestedBatchLimit, 7)
  assert.equal(result.processedCount, 2)
  assert.equal(result.enrolledCount, null)
  assert.equal(result.quarantineCount, null)
  assert.equal(result.quarantineVisibility, 'NOT_AUTHORIZED')
  assert.equal(result.overdueBefore.sampled, 3)
  assert.equal(result.overdueAfter.sampled, 1)
  assert.deepEqual(events, [result])
  assert.equal(client.calls.filter((x) => x.sql.includes('expire_case_object_storage_and_enroll')).length, 1)
  assert.equal(client.calls.find((x) => x.sql.includes('expire_case_object_storage_and_enroll')).params[0], 7)
  assert(client.calls.some((x) => x.sql === 'SET LOCAL ROLE labos_case_expiry_executor'))
  assert(client.calls.some((x) => x.sql === 'COMMIT'))
  assert(!client.calls.some((x) => x.sql === 'ROLLBACK'))
})

test('privileged, inherited or extra-role caller is rejected before SQL function', async () => {
  for (const identity of [
    { session_user: 'postgres', current_user: 'postgres' },
    { rolsuper: true }, { rolcreaterole: true }, { rolinherit: true },
    { rolreplication: true }, { approved_memberships: 0 },
    { total_memberships: 2 },
    { approved_memberships: 0, total_memberships: 1 },
  ]) {
    const client = fakeClient({ identity })
    await assert.rejects(runCaseExpirySweep(input(client)), /UNAUTHORIZED_DATABASE_IDENTITY/)
    assert(!client.calls.some((x) => x.sql.includes('expire_case_object_storage_and_enroll')))
    assert(client.calls.some((x) => x.sql === 'ROLLBACK'))
  }
})

test('SQL failure rolls back and exposes only closed telemetry, never SQL details', async () => {
  const client = fakeClient({ failAt: 'expire_case_object_storage_and_enroll' })
  const events = []
  await assert.rejects(runCaseExpirySweep(input(client, { emit: (x) => events.push(x) })),
    /DATABASE_OR_CONNECTION_FAILURE/)
  assert(client.calls.some((x) => x.sql === 'ROLLBACK'))
  assert.equal(events.length, 1)
  assert.equal(events[0].status, 'FAILED')
  assert.equal(events[0].classification, 'DATABASE_OR_CONNECTION_FAILURE')
  assert(!JSON.stringify(events).includes('secret error'))
})

test('missing monitoring SELECT permission stops before any expiry mutation', async () => {
  const client = fakeClient({ failAt: 'FROM (SELECT "expiresAt"' })
  const events = []
  await assert.rejects(runCaseExpirySweep(input(client, { emit: (x) => events.push(x) })),
    /DATABASE_OR_CONNECTION_FAILURE/)
  assert(!client.calls.some((x) => x.sql.includes('expire_case_object_storage_and_enroll')))
  assert(client.calls.some((x) => x.sql === 'ROLLBACK'))
  assert.equal(events[0].status, 'FAILED')
})

test('invalid SQL count rolls back rather than reporting successful completion', async () => {
  const client = fakeClient({ processed: 8 })
  await assert.rejects(runCaseExpirySweep(input(client)), /DATABASE_CONTRACT_MISMATCH/)
  assert(client.calls.some((x) => x.sql === 'ROLLBACK'))
})

test('the entrypoint has no provider import or cleanup claim/ACK call', () => {
  const source = readFileSync(new URL('./case-object-storage-expiry-sweeper.mjs', import.meta.url), 'utf8')
  for (const forbidden of ['@aws-sdk', '@uploadthing', 'claim_object_storage_cleanup(',
    'ack_object_storage_cleanup(', 'deleteExact(', 'classifyPresence(']) {
    assert(!source.includes(forbidden), forbidden)
  }
})
