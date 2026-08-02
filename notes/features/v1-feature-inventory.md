# LabOS V1 Feature Inventory

**Purpose:** a factual snapshot of what is currently represented in the application. Use this document to decide which capabilities to complete, improve, or add in V1.1.

**Status key**

- **Implemented:** a route and supporting UI/actions exist.
- **Partial:** the route or UI exists, but the implementation is incomplete, static, or needs product validation.
- **Planned:** referenced in existing notes but not available as an app feature.

## Product foundations

| Area | Status | Current capability |
| --- | --- | --- |
| Authentication | Implemented | Sign-up and sign-in flows are present through Better Auth. |
| Workspace onboarding | Implemented | A new lab workspace can be created and configured through `/onboarding`. |
| Lab-scoped data | Implemented | Server actions are scoped to the active lab, providing tenant isolation for operational data. |
| Responsive navigation | Implemented | Desktop and mobile sidebars share a single navigation source in `lib/dashboard-navigation.ts`. |
| File uploads | Implemented | UploadThing is configured and case assets can be added and deleted. |

## Operations and case management

| Capability | Status | What exists today |
| --- | --- | --- |
| Case list and pipeline | Implemented | `/cases` provides list, Kanban, pulse/revenue metrics, filtering, and urgent-remake filtering. |
| Case creation | Implemented | `/cases/new-case` supports clinic, dentist, patient, tooth/odontogram, work-item, product, add-on, deadline, routing, notes, and asset selection. |
| Draft case recovery | Implemented | Drafts can be saved, recovered, and loaded by patient or draft ID. |
| Case dossier | Implemented | `/cases/[caseId]` includes production status, deadlines, assigned staff, financials, work items, clinical notes, files, and audit activity. |
| Case changes | Implemented | Users can edit cases, advance status, change deadlines, assign/remove staff, update notes, and manage case files. |
| Case financials | Implemented | Case financials can be recalculated from the configured work items and pricing. |
| Bulk case actions | Partial | Case-table multi-select and quick assignment are identified in `notes/Todos.md`, but are not documented as complete. |

## Clinic and practitioner management

| Capability | Status | What exists today |
| --- | --- | --- |
| Clinic directory | Implemented | `/clinics` has a searchable/filterable clinic list, quick views, health/pulse data, and revenue-oriented displays. |
| Create and edit clinics | Implemented | New and existing clinics support identity, address/location, financial configuration, and practitioner roster information. |
| Clinic dossier | Implemented | `/clinics/[clinicId]` provides overview, active/historical case pipeline, financial ledger/invoices, and practitioner views. |
| Clinic pricing | Implemented | Clinic-specific pricing plans are available from clinic and catalog flows. |
| Dentist management | Implemented | Dentists can be created, edited, activated/deactivated, and assigned as a clinic default. |
| Start a case from a clinic | Partial | Redirected case creation with a preselected clinic is listed as a known TODO. |

## Catalog, products, and pricing

| Capability | Status | What exists today |
| --- | --- | --- |
| Product catalog | Implemented | `/catalog` organizes categories, work types, products, and their operational vitals. |
| Catalog administration | Implemented | Categories, work types, products, product add-ons, and pricing plans can be created, renamed/updated, archived, and—in applicable places—deleted or moved. |
| Pricing plans | Implemented | Plans support product and clinic targeting and can be created, updated, archived, or deleted. |
| Product configuration | Implemented | Products expose identity/vitals, add-ons, and a pricing-plan ledger. |

## Invoicing and accounts receivable

| Capability | Status | What exists today |
| --- | --- | --- |
| Invoice list | Implemented | `/invoices` includes an invoice table, AR vitals, risk indicators, overdue sync, and unbilled-case/clinic cues. |
| Invoice creation | Implemented | `/invoices/new-invoice` creates invoices from eligible, unbilled cases with a reconciliation flow. |
| Invoice dossier | Implemented | `/invoices/[invoiceId]` shows bill line items, clinic status, payment history, and statement sharing. |
| Invoice editing and administration | Implemented | Drafts can be edited or deleted; live invoices can be adjusted, voided, cancelled, and reviewed. |
| Payment reconciliation | Implemented | Payments can be recorded and invoice risk/overdue state can be updated. |
| Public statements | Implemented | A tokenized, public statement route exists at `/statement/[token]`. |

## Team, production, and payroll

| Capability | Status | What exists today |
| --- | --- | --- |
| Team roster | Implemented | `/team` includes roster views, staff vitals, registration/onboarding, and role/search filtering. |
| Staff dossier | Implemented | `/team/[staffId]` includes overview, active and historical cases, payroll, identity, schedule, compensation, and access controls. |
| Workload assignment | Implemented | Case assignments can be managed from cases and reassigned from team workflows. |
| Commission and payouts | Implemented | Pending commissions, payout history, payroll vitals, payout issuance, and printable paystubs are present. |
| Technician operations | Partial | `/technicians` and individual technician pages provide production and personnel UI, but this area should be validated for data completeness before being treated as a separate product module. |

## Dashboard, settings, and supporting UX

| Capability | Status | What exists today |
| --- | --- | --- |
| Dashboard | Partial | `/dashboard` renders KPI cards, production chart, recent cases, and an AI-insight card. Confirm which elements are live data versus presentation/demo data. |
| Application settings | Partial | Routes exist for profile, team, lab, preferences, notifications, security, and billing. Validate each page's persistence and business rules before calling it complete. |
| Print output | Implemented | Printable payout statements exist at `/paystub/[staffId]/[payoutId]`. |
| AI assistant surfaces | Partial | AI-branded auditor/copilot components exist in dashboard, cases, clinics, and staff screens. Their underlying decision logic and data sources should be reviewed separately. |

## Features not currently available as complete routes

These are useful V1.1 candidates because they are already anticipated in the architecture or UI, but are not currently complete product areas.

| Candidate | Evidence / reason |
| --- | --- |
| Dedicated payroll workspace | `notes/architecture/routes.md` specifies `/payroll`; payroll functionality currently lives in staff dossiers and printable paystubs. |
| AI Insights workspace | The former sidebar linked to `/insights`, but no route exists. |
| Inventory management | Existing route architecture notes identify this as a future business function; no inventory route exists. |
| Clinic self-service portal | `notes/features/next-features.md` proposes a clinic portal for self-service case submission, live tracking, and bill payment. |
| Global analytics command center | Dashboard UI exists, but the full AR-aging and capacity-heatmap vision in `next-features.md` still needs validation and implementation. |

## V1.1 prioritization worksheet

Use the following table when selecting the V1.1 scope. Add one row per candidate rather than treating every idea as committed.

| Candidate | User problem | Target user | Evidence / requested by | Value | Effort | Decision | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Example: bulk case assignment | Managers need to route multiple unassigned cases quickly. | Lab manager | Existing TODO | High | Medium | Consider | Builds on existing assignment actions. |

## Deployment-critical gaps and estimates

These are the items to complete before treating LabOS as production-ready. They are not all customer-facing features, but each protects a core business workflow, sensitive data, or the ability to operate the product safely after launch.

**Estimate assumptions:** one experienced full-stack developer, existing database and hosting in place, and one review cycle. Estimates include implementation and developer verification, but exclude external approvals, professional translation review, and extended user-acceptance testing.

| Priority | Feature / safeguard | Why it is critical | Scope for release | Estimate |
| --- | --- | --- | --- | --- |
| P0 | Authorization and route-access hardening | LabOS handles patient, clinic, payroll, and invoice data. Access must be consistently enforced by role and route. | Define a permission matrix; protect every application route; make the sidebar role-aware; verify every server action and public link; correct the proxy rules so intended protected routes—including `/technicians`—are reachable only by authorized users. Review public `/catalog`, `/statement`, and `/paystub` exposure and require secure, unguessable sharing tokens where public access is intentional. | 4–6 days |
| P0 | Arabic language and RTL support | Arabic is a core accessibility and market-readiness requirement, not just text translation. | Add locale selection and persistence; translate the shared navigation, auth, onboarding, operational screens, states, validation messages, and emails; support RTL layouts; localize dates, numbers, currency, tables, charts, and print views; obtain native-speaker QA. The schema already includes `AR` in `SupportedLanguage`. | 7–12 days + translation review |
| P0 | End-to-end workflow testing | The core business path must work reliably before real cases and money are handled. | Automated and manual acceptance coverage for: create a lab, create clinic/dentist/patient, create and assign a case, update production status, create an invoice, record payment, issue payout, and access a public statement. Include owner, manager/admin, and staff permission scenarios. | 5–8 days |
| P0 | Production operations, monitoring, and recovery | A live financial/clinical operations product needs failures detected and data recoverable. | Production environment configuration and secrets checklist; database migration process; scheduled backups and restore test; error tracking; structured logs with sensitive-data redaction; health checks; incident/runbook documentation. | 3–5 days |
| P0 | Secure user lifecycle | Lab administrators need a safe way to grant, revoke, and recover access. | Validate invitation delivery and expiry, password reset, email verification policy, session expiry/revocation, deactivated-user behavior, and owner-account recovery. Ensure all flows are user-facing and tested. | 3–5 days |
| P1 | Notifications that do real work | Notification settings alone are not useful unless important operational events are delivered. | Define in-app/email notifications for case assignment, deadline risk, status changes, invoice overdue status, invitation delivery, and payout events. Include user preferences and delivery failure handling. | 5–8 days |
| P1 | Live dashboard data validation | Dashboard values need to be trusted by managers making operational decisions. | Replace or clearly label any static/demo values; verify KPI definitions, date windows, AR calculations, production chart data, and urgent-case rules; add empty and error states. | 3–5 days |
| P1 | Financial document controls | Invoices and payouts require traceability once real money is involved. | Confirm immutable numbering, timezone/currency rules, adjustment/void audit trail, payment reconciliation rules, duplicate-payment protection, and statement/download retention. | 4–6 days |

### Suggested release sequence

1. **Security baseline (P0 authorization + user lifecycle):** 7–11 days.
2. **Reliability baseline (P0 tests + operations):** 8–13 days.
3. **Arabic localization and RTL:** 7–12 development days, then native-language review.
4. **Business confidence work (P1 dashboard + financial controls):** 7–11 days.
5. **Notifications:** 5–8 days; can follow the first controlled launch if the launch team already has an operational fallback.

For one developer, this is approximately **34–55 developer days** before a broad production launch, plus translation/UAT time. A narrowly scoped pilot can launch earlier after the P0 items are complete, provided only a trusted internal lab uses it and there is a manual support process.

## Recommended next documentation steps

1. Walk each row with a real user and mark it **validated**, **uncertain**, or **not needed**.
2. For every Partial feature, write a short definition of done: user role, happy path, permissions, error cases, and success metric.
3. Convert the top V1.1 candidates into one-page feature briefs before implementation.
4. Keep product aspirations in `notes/features/next-features.md` and update this file only when the shipped feature set changes.
