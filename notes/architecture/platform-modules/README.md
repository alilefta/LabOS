# Platform module documentation

These documents decompose the authoritative [platform architecture plan](../platform-architecture-plan.md) into implementable module contracts.

## Source-of-truth rule

The platform architecture plan and the documents in this folder are the only architecture sources for the migration. Existing architecture notes, feature plans, RBAC proposals, and access-control code are legacy artifacts. They may be inspected only to understand current behavior that must be migrated; they must not supply target design decisions. Do not delete legacy artifacts until replacement behavior is complete, verified, and explicitly approved for cleanup.

## Module index

| Module | Document | Initial LabOS consumer |
|---|---|---|
| Auth / Identity | [auth_module/architecture.md](auth_module/architecture.md) | Login and request identity |
| Organizations / Tenancy | [organizations_module/architecture.md](organizations_module/architecture.md) | Lab tenancy and switching |
| Authorization | [authorization_module/architecture.md](authorization_module/architecture.md) | Case, staff, invoice operations |
| Events | [events_module/architecture.md](events_module/architecture.md) | Case lifecycle fan-out |
| Audit | [audit_module/architecture.md](audit_module/architecture.md) | Case Activity and security history |
| Workflow | [workflow_module/architecture.md](workflow_module/architecture.md) | Case production lifecycle |
| Notifications | [notifications_module/architecture.md](notifications_module/architecture.md) | Case completion and invoices |
| Files | [files_module/architecture.md](files_module/architecture.md) | Case assets |
| Jobs / Scheduling | [jobs_module/architecture.md](jobs_module/architecture.md) | Outbox and retries |
| Webhooks | [webhooks_module/architecture.md](webhooks_module/architecture.md) | Future integrations |
| API Keys | [api_keys_module/architecture.md](api_keys_module/architecture.md) | Future tenant API access |

## Common document status

Each module document records scope, ownership, dependencies, contracts, data, security, observability, rollout, risks, and definition of done. Decisions that change the parent architecture require a numbered ADR in the parent plan before implementation.
