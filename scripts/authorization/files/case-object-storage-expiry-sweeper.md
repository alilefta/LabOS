# Case OBJECT_STORAGE expiry/enrollment sweeper

Status: **implemented and accepted for code, disposable transition and hosted zero-work scope; disabled by default; automation not authorized**.

This one-batch Node entrypoint calls only
`labos_cleanup_private.expire_case_object_storage_and_enroll(integer)`. The
database function owns eligible-grant selection, grant-first locking, expiry,
first-check enrollment and quarantine. The script imports no object-storage or
UploadThing client, does not claim cleanup work and has no scheduler.

## Invocation boundary

Run with `node scripts/authorization/files/case-object-storage-expiry-sweeper.mjs --run-once`
only after separate operational approval. With `LABOS_CASE_EXPIRY_SWEEPER_ENABLED`
absent or different from `true`, it exits `DISABLED` before reading a database
binding or opening a connection. An enabled invocation also requires
`LABOS_CASE_EXPIRY_OPERATIONAL_APPROVAL=APPROVED` and a batch limit of 1–500
(`LABOS_CASE_EXPIRY_BATCH_LIMIT`, default 100). It performs one batch, with no
loop or automatic retry. These environment gates record an operational decision;
they are not a substitute for separately approving the service identity,
credential custody, target and schedule.

The future operator must supply a dedicated, restricted login role through
`LABOS_CASE_EXPIRY_LOGIN_ROLE` and its connection via the separate
`LABOS_CASE_EXPIRY_DATABASE_URL` secret. The login must have no elevated role
attributes, no inherited access and no other direct role membership; it needs
only SET membership in the NOLOGIN `labos_case_expiry_executor`. The code rejects
the application, cleanup and administrator identities. The connection must use
a certificate-verified session-compatible Supabase pooler URL whose username
is `<login-role>.<project-id>`. Exact host, database and project ID are supplied
through `LABOS_CASE_EXPIRY_EXPECTED_HOST`,
`LABOS_CASE_EXPIRY_EXPECTED_DATABASE` and `LABOS_CASE_EXPIRY_PROJECT_ID`;
`LABOS_CASE_EXPIRY_CA_FILE` supplies the trusted CA. The URL may not contain
query options. No generic `DATABASE_URL` or `DIRECT_URL` fallback exists.

The connection starts a bounded transaction, verifies its login role and SET
authority, then uses `SET LOCAL ROLE labos_case_expiry_executor` before any
grant read or private function call. A failed identity, query, function or
commit never produces a success result. The function is called once with the
validated limit. The result event contains an invocation ID, duration, limit,
processed-row count and bounded overdue sample before/after. SQL counts rows
examined **including quarantined rows**. It does not return separate expired or
quarantine counts, so neither is fabricated. The executor has no
`cleanupFailureCode` SELECT privilege: `quarantineCount=null` and
`quarantineVisibility=NOT_AUTHORIZED` are explicit. Operational monitoring of
quarantine counts and oldest age remains a separate privilege/design gate;
this implementation does not add one. Events contain no IDs, keys, tenant
facts, clinical content, connection values or raw SQL errors.

## Verification and deferred operations

Unit tests live beside the entrypoint. The accepted T5 hosted checkpoint
exercised the installed expiry and quarantine SQL under the restricted executor.
The [manual sweeper checkpoint](../../../docs/evidence/files/authorization-v1/n-file-110-a1-i2-sweeper-manual-20261020.md)
records accepted disposable PostgreSQL 17 expiry/quarantine transitions, a
restricted verification-only login and one successful operator-controlled
hosted invocation with zero processed grants. Hosted expiry/quarantine
transition through this Node entrypoint remains `NOT_RUN` and is not required
for that checkpoint. Its local launcher does not independently enforce
operational authorization. Automated scheduling, unattended activation,
monitoring/alert configuration, provider cleanup and N-FILE-110 activation
remain unauthorized.
