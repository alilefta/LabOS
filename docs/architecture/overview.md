# LabOS architecture overview

Status: Current
Authority: Canonical
Owner: Project owner
Last reviewed: 2026-09-05

LabOS is a modular monolith. Reusable platform capabilities are identity, Organizations/tenancy, authorization, events, audit, workflow, notifications, files, jobs, webhooks, and API keys. Dental concepts—Lab, Case, Clinic, Patient, LabStaff, catalog, pricing, invoices, and payouts—remain domain modules.

## Boundaries and tenancy

Organization is the membership and security boundary; Lab is the dental-business tenant. A LabOS request resolves only through authenticated session → active Organization → verified Member → Organization-linked Lab → `labId`. Domain ownership remains `labId`; clients never choose Organization, Lab, membership, role, ownership, or trusted resource facts.

Platform modules expose stable contracts to domain modules and never import dental-domain vocabulary. Cross-module writes use application services or explicit transactions. Platform extraction is considered only after a second application proves reuse; do not build generic entity stores, dynamic RBAC, BPMN/DSL workflow engines, a separate platform service, or a generic Lab replacement prematurely.

## Dependency and safety rules

Domain modules may depend on stable platform interfaces, not provider internals. Authorization remains server-authoritative before loaders, repositories, providers, logging, or mutations; UI checks are usability only. Tenant isolation requires server-scoped queries and transaction-time validation for mutable invariants. Events, audit, workflow, notifications, files, jobs, webhooks, and API keys follow their module contracts.

See [decisions](decisions.md) for governing ADRs, [modules](modules/) for detailed contracts, and [platform migration](../plans/platform-migration.md) for remaining work.
