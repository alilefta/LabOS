// Default-off, one-batch entrypoint. Operational credential binding and scheduling
// require separate Product Owner approval. No provider client is imported here.
import { randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import pg from 'pg'

const executorRole = 'labos_case_expiry_executor'
const forbiddenLoginRoles = new Set([
  'postgres', 'supabase_admin', 'labos_verification_app',
  'labos_verification_cleanup', 'anon', 'authenticated', 'service_role',
])
const functionSql =
  'SELECT labos_cleanup_private.expire_case_object_storage_and_enroll($1::integer) AS processed'
const overdueSql = `SELECT count(*)::integer AS sampled,
  min("expiresAt") AS oldest
  FROM (SELECT "expiresAt" FROM public."FileUploadGrant"
    WHERE "boundaryId" = 'N-FILE-110' AND purpose = 'case.asset.add.stage'
      AND provider = 'OBJECT_STORAGE' AND status IN ('PENDING', 'UPLOADED')
      AND "expiresAt" <= pg_catalog.clock_timestamp() AT TIME ZONE 'UTC'
    ORDER BY "expiresAt" LIMIT $1::integer) AS due_sample`
const identitySql = `SELECT current_user, session_user, r.rolcanlogin, r.rolsuper,
  r.rolcreaterole, r.rolcreatedb, r.rolbypassrls, r.rolreplication,
  r.rolinherit,
  (SELECT count(*)::integer FROM pg_catalog.pg_auth_members am
    JOIN pg_catalog.pg_roles parent ON parent.oid = am.roleid
    WHERE am.member = r.oid AND parent.rolname = 'labos_case_expiry_executor'
      AND NOT am.admin_option AND NOT am.inherit_option AND am.set_option)
    AS approved_memberships,
  (SELECT count(*)::integer FROM pg_catalog.pg_auth_members am
    WHERE am.member = r.oid) AS total_memberships
  FROM pg_catalog.pg_roles r WHERE r.rolname = session_user`

export const SWEEPER_RUNTIME_BINDING = 'PENDING_OPERATIONAL_APPROVAL'

class ClosedFailure extends Error {
  constructor(classification) {
    super(classification)
    this.classification = classification
  }
}

export function parseBatchLimit(value) {
  if (typeof value === 'number') {
    if (Number.isInteger(value) && value >= 1 && value <= 500) return value
  } else if (typeof value === 'string' && /^(?:[1-9]\d{0,2})$/.test(value)) {
    const parsed = Number(value)
    if (parsed <= 500) return parsed
  }
  throw new ClosedFailure('INVALID_BATCH_LIMIT')
}

function countRow(rows, field) {
  if (rows.length !== 1 || !Number.isInteger(rows[0]?.[field])) {
    throw new ClosedFailure('DATABASE_CONTRACT_MISMATCH')
  }
  return rows[0][field]
}

function overdueObservation(rows) {
  const sampled = countRow(rows, 'sampled')
  if (sampled < 0 || sampled > 501) throw new ClosedFailure('DATABASE_CONTRACT_MISMATCH')
  return Object.freeze({
    sampled,
    capped: sampled === 501,
    oldestOverdueAt: rows[0].oldest instanceof Date
      ? rows[0].oldest.toISOString() : null,
  })
}

function restrictedLogin(row, expectedLoginRole) {
  return row?.session_user === expectedLoginRole &&
    row.current_user === expectedLoginRole &&
    row.rolcanlogin === true && row.rolsuper === false &&
    row.rolcreaterole === false && row.rolcreatedb === false &&
    row.rolbypassrls === false && row.rolreplication === false &&
    row.rolinherit === false && row.approved_memberships === 1 &&
    row.total_memberships === 1
}

function allowedLoginName(role) {
  return typeof role === 'string' && /^labos_[a-z0-9_]+$/.test(role) &&
    role !== executorRole && !role.endsWith('_owner') &&
    !forbiddenLoginRoles.has(role)
}

// The client must use a dedicated login role with only SET membership in the
// NOLOGIN executor. The role does not yet have an approved hosted binding.
export async function runCaseExpirySweep({
  enabled = false,
  operationalApproval = false,
  batchLimit = 100,
  expectedLoginRole,
  connect,
  emit = () => {},
  clock = () => new Date(),
  invocationId = randomUUID(),
} = {}) {
  const startedAt = clock()
  if (!enabled) {
    const disabled = Object.freeze({ invocationId, status: 'DISABLED' })
    emit(disabled)
    return disabled
  }

  let client
  let transactionOpen = false
  let committed = false
  try {
    if (!operationalApproval || !allowedLoginName(expectedLoginRole) ||
        typeof connect !== 'function') {
      throw new ClosedFailure('OPERATIONAL_BINDING_NOT_APPROVED')
    }
    const limit = parseBatchLimit(batchLimit)
    client = await connect()
    await client.query('BEGIN')
    transactionOpen = true
    await client.query("SET LOCAL lock_timeout = '2s'")
    await client.query("SET LOCAL statement_timeout = '20s'")
    await client.query("SET LOCAL idle_in_transaction_session_timeout = '30s'")

    const identity = await client.query(identitySql)
    if (identity.rows.length !== 1 ||
        !restrictedLogin(identity.rows[0], expectedLoginRole)) {
      throw new ClosedFailure('UNAUTHORIZED_DATABASE_IDENTITY')
    }
    await client.query(`SET LOCAL ROLE ${executorRole}`)
    const assumed = await client.query('SELECT current_user, session_user')
    if (assumed.rows.length !== 1 ||
        assumed.rows[0].current_user !== executorRole ||
        assumed.rows[0].session_user !== expectedLoginRole) {
      throw new ClosedFailure('UNAUTHORIZED_DATABASE_IDENTITY')
    }

    const before = overdueObservation((await client.query(overdueSql, [501])).rows)
    const processed = countRow((await client.query(functionSql, [limit])).rows, 'processed')
    if (processed < 0 || processed > limit) {
      throw new ClosedFailure('DATABASE_CONTRACT_MISMATCH')
    }
    const after = overdueObservation((await client.query(overdueSql, [501])).rows)
    await client.query('COMMIT')
    transactionOpen = false
    committed = true
    const result = Object.freeze({
      invocationId, status: 'SUCCESS', startedAt: startedAt.toISOString(),
      durationMs: Math.max(0, clock().getTime() - startedAt.getTime()),
      requestedBatchLimit: limit, processedCount: processed,
      // SQL counts examined rows, including quarantine. It does not return
      // separate enrolled or quarantined counts; never mislabel it as expiry.
      enrolledCount: null, quarantineCount: null,
      quarantineVisibility: 'NOT_AUTHORIZED',
      overdueBefore: before, overdueAfter: after,
    })
    emit(result)
    return result
  } catch (error) {
    if (transactionOpen) {
      try { await client.query('ROLLBACK') } catch { /* Failure remains closed. */ }
    }
    const classification = committed ? 'COMMITTED_TELEMETRY_FAILURE'
      : error instanceof ClosedFailure ? error.classification
        : 'DATABASE_OR_CONNECTION_FAILURE'
    const failed = Object.freeze({
      invocationId, status: 'FAILED', classification,
      startedAt: startedAt.toISOString(),
      durationMs: Math.max(0, clock().getTime() - startedAt.getTime()),
    })
    emit(failed)
    const closed = new ClosedFailure(classification)
    closed.reported = true
    throw closed
  } finally {
    if (client) await client.end().catch(() => {})
  }
}

function hostedConnection(environment, expectedLoginRole) {
  const raw = environment.LABOS_CASE_EXPIRY_DATABASE_URL
  const caFile = environment.LABOS_CASE_EXPIRY_CA_FILE
  const expectedHost = environment.LABOS_CASE_EXPIRY_EXPECTED_HOST
  const expectedDatabase = environment.LABOS_CASE_EXPIRY_EXPECTED_DATABASE
  const projectId = environment.LABOS_CASE_EXPIRY_PROJECT_ID
  if (!raw || !caFile || !expectedHost || !expectedDatabase ||
      !/^[a-z0-9]{20}$/.test(projectId ?? '')) {
    throw new ClosedFailure('OPERATIONAL_BINDING_NOT_APPROVED')
  }
  let url
  try { url = new URL(raw) } catch { throw new ClosedFailure('INVALID_CONNECTION_BINDING') }
  if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname ||
      !url.username || !url.password || url.search || url.hash) {
    throw new ClosedFailure('INVALID_CONNECTION_BINDING')
  }
  const username = decodeURIComponent(url.username)
  const database = decodeURIComponent(url.pathname.slice(1))
  if (url.hostname !== expectedHost || database !== expectedDatabase ||
      username !== `${expectedLoginRole}.${projectId}`) {
    throw new ClosedFailure('UNAUTHORIZED_DATABASE_IDENTITY')
  }
  let ca
  try { ca = readFileSync(caFile) } catch { throw new ClosedFailure('INVALID_CONNECTION_BINDING') }
  return async () => {
    const client = new pg.Client({
      host: url.hostname, port: Number(url.port || 5432),
      database,
      user: username, password: decodeURIComponent(url.password),
      ssl: { ca, servername: url.hostname, rejectUnauthorized: true },
      connectionTimeoutMillis: 5000, query_timeout: 25000,
      application_name: 'labos-case-expiry-sweeper',
    })
    await client.connect()
    if (!client.connection.stream.encrypted || !client.connection.stream.authorized) {
      await client.end().catch(() => {})
      throw new ClosedFailure('TLS_VERIFICATION_FAILED')
    }
    return client
  }
}

export async function main(environment = process.env, args = process.argv.slice(2)) {
  const emit = (record) => console.log(JSON.stringify(record))
  if (environment.LABOS_CASE_EXPIRY_SWEEPER_ENABLED !== 'true') {
    return runCaseExpirySweep({ emit })
  }
  if (args.length !== 1 || args[0] !== '--run-once') {
    throw new ClosedFailure('EXPLICIT_ONE_BATCH_INVOCATION_REQUIRED')
  }
  return runCaseExpirySweep({
    enabled: true,
    operationalApproval: environment.LABOS_CASE_EXPIRY_OPERATIONAL_APPROVAL === 'APPROVED',
    batchLimit: environment.LABOS_CASE_EXPIRY_BATCH_LIMIT ?? 100,
    expectedLoginRole: environment.LABOS_CASE_EXPIRY_LOGIN_ROLE,
    connect: () => hostedConnection(
      environment, environment.LABOS_CASE_EXPIRY_LOGIN_ROLE)(), emit,
  })
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  main().catch((error) => {
    if (!error?.reported) {
      console.error(JSON.stringify({
        status: 'FAILED',
        classification: error instanceof ClosedFailure
          ? error.classification : 'CONFIGURATION_OR_DATABASE_FAILURE',
      }))
    }
    process.exitCode = 1
  })
}
