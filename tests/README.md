# LabOS test suite

This folder is organized by test level first, then by business domain. Keep test data, factories, and shared helpers outside the individual test suites so they can be reused safely.

| Folder | Purpose | Runs against |
| --- | --- | --- |
| `unit/` | Pure functions and isolated components. Mock dependencies. | No database, no browser. |
| `integration/` | Server actions, API handlers, and database behavior. | Isolated test database. |
| `e2e/` | Critical user workflows through a real browser. | Local/staging app plus seeded test data. |
| `security/` | Authorization, tenant isolation, public-link, and validation abuse cases. | Unit, integration, and E2E layers as appropriate. |
| `regression/` | A focused test added whenever a bug is fixed. | The lowest layer that reproduces the bug. |
| `fixtures/` | Small, stable test data shared across suites. | Not a test suite. |
| `factories/` | Builders for valid and customizable test records. | Not a test suite. |
| `helpers/` | Shared setup, authentication, database, and assertion helpers. | Not a test suite. |

## Naming

Use behavior-based names and the standard `.test.ts` or `.spec.ts` suffix:

```text
tests/unit/lib/permissions/access-control.test.ts
tests/integration/actions/invoices/record-payment.test.ts
tests/e2e/critical-flows/create-case-to-paid-invoice.spec.ts
tests/security/tenant-isolation/cannot-read-another-labs-case.test.ts
tests/regression/invoices/cannot-pay-a-cancelled-invoice.test.ts
```

## Test-selection rule

- Start with a **unit test** when the rule is pure logic, such as `getPermissions`.
- Add an **integration test** when the action must check the authenticated user, database records, or tenant filtering.
- Add an **E2E test** for a business workflow that users complete in the browser.
- Add a **security test** whenever a role, lab boundary, upload, token, or public link could expose sensitive data.

Do not depend on development data. Integration and E2E suites must create and clean up their own isolated data.
