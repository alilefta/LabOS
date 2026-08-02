# P0: V1 authorization and route-access hardening

## Goal

Before deployment, enforce the existing boolean permission matrix consistently for every signed-in LabOS user. This protects patient, clinic, financial, staff, and case data while keeping V1 authorization deliberately simple.

## V1 scope: two access categories only

V1 does **not** include database-managed RBAC, custom roles, role assignment screens, permission checkboxes, or per-user overrides. Those belong to the separate [V2 RBAC architecture](../architecture/authorization-v2-rbac.md).

| Category | Included app roles | V1 meaning |
| --- | --- | --- |
| **Category 1 — Management** | Owner, Admin, Manager | May use management workflows and view financial information. |
| **Category 2 — Staff** | Staff | May perform only staff-safe, assigned-work operations. Financial information is never visible. |

`StaffRoleCategory` (Technician, Receptionist, Accountant, and so on) remains operational metadata in V1. It does not grant additional application permissions.

## V1 boolean permission matrix

The existing `getPermissions()`/`authorize()` helpers remain the V1 source of truth. Update their returned booleans to match this agreed policy; do not introduce a permission database for P0.

| Boolean | Category 1 | Category 2 | V1 use |
| --- | --- | --- | --- |
| `canViewManagementDashboard` | Yes | No | Management KPIs and all financial dashboard data. |
| `canViewAssignedWork` | Yes | Yes | Category 1 sees all operational work; Staff sees assigned work only. |
| `canCreateCases` | Yes | No | Create submitted cases and drafts. |
| `canEditCaseOrder` | Yes | No | Patient, clinic, dentist, prescription, products, deadline, and pricing changes. |
| `canUpdateAssignedCaseStatus` | Yes | Yes, assigned cases only | Production status and permitted production notes/assets. |
| `canAssignCaseStaff` | Yes | No | Initial assignment and reassignment. |
| `canManageClinics` | Yes | No | Clinic/dentist create and edit. |
| `canManageCatalog` | Yes | No | Categories, work types, products, add-ons, and pricing. |
| `canViewFinancials` | Yes | No | Prices, margins, invoices, payments, AR, commissions, and payroll. |
| `canManageFinancials` | Yes | No | Invoices, payments, adjustments, voids, and payouts. |
| `canManageTeam` | Yes | No | Staff registration, access, schedules, and compensation. |
| `canManageLabSettings` | Yes | No | Lab, team, security, and notification settings. |
| `canManageBilling` | Owner only | No | Subscription/billing ownership. |
| `canArchiveCase` | Yes | No | Archive/cancel a case through an audited soft-delete flow. |
| `canArchivePatient` | Yes | No | Archive a patient through an audited soft-delete flow. |

## Record retention and deletion policy

V1 never hard-deletes cases or patients. Both use an `isArchived` boolean so clinical and financial history remains available for audit, invoices, statements, and reporting.

- Archived records are excluded from ordinary lists and selectors by default.
- Category 1 can access an explicit archived view and restore a record when business rules permit.
- Archiving/restoring records creates an activity/audit entry with actor, timestamp, and reason.
- A case with financial history must remain referentially intact; archive/cancel changes operational visibility, not financial history.
- Category 2 cannot archive, restore, or view unrelated archived records.

## Enforcement rules

1. **Server actions and API routes are the security boundary.** Every read/write checks the relevant V1 boolean and scopes queries to the active `labId`.
2. **Pages/layouts enforce view access before fetching sensitive data.** A pasted URL must not reveal protected content.
3. **Navigation and controls reflect permissions.** Hide unavailable modules and actions, but never rely on hiding as security.
4. **Staff access is record-scoped.** Where Staff can update a case, verify a current assignment to that staff member in addition to the category boolean.
5. **Public links are explicit.** Tokenized statements and other intended public pages expose the minimum data necessary; all other routes remain protected.

## Milestones

### 1. Complete and approve the V1 boolean matrix

- [ ] Add the missing V1 booleans above to `lib/permissions/access-control.ts`.
- [ ] Remove `StaffRoleCategory` as a source of financial authorization. `canViewFinancials` is Category 1 only.
- [ ] Decide whether Category 1 actions are identical or whether the existing Owner-only billing exception remains; recommended: keep `canManageBilling` Owner-only.
- [ ] Document every route and sensitive action against one boolean.
- [ ] Expand unit tests to cover Owner/Admin/Manager as Category 1 and Staff as Category 2.

**Done when:** the matrix is product-approved, named consistently, and testable without a database.

### 2. Guard routes and page boundaries

- [ ] Classify each route as public, authenticated, Category 1, or Staff-safe.
- [ ] Keep `proxy.ts` responsible for signed-out/onboarding redirects; use route/page guards for permission checks.
- [ ] Add a shared server-side guard pattern for management pages and Staff-safe pages.
- [ ] Return a safe redirect or shared 403 state for forbidden pages.
- [ ] Remove discarded routes from navigation and route policy; protect testing-only routes before deployment.

**Done when:** direct navigation cannot render unauthorized page data.

### 3. Enforce boolean checks in actions and APIs

- [ ] Audit cases, clinics, catalog, invoices, team, files, and public-link handlers.
- [ ] Apply the appropriate V1 boolean before querying or mutating sensitive data.
- [ ] Verify every query, nested write, update, archive, and restore operation is scoped to `labId`.
- [ ] Add Staff assignment checks for production changes.
- [ ] Audit financial/destructive operations and create activity logs for archive, restore, payment, adjustment, void, payout, and access changes.

**Done when:** forged requests from Staff, non-members, and another lab are denied server-side.

### 4. Make desktop and mobile UI category-aware

- [ ] Filter `lib/dashboard-navigation.ts` using the V1 booleans.
- [ ] Hide financial modules, catalog management, team administration, management settings, create-case controls, archive controls, and pricing/commission information from Staff.
- [ ] Keep Staff views focused on assigned production work, allowed status updates, permitted notes, and permitted asset uploads.
- [ ] Make forbidden UI states clear without leaking sensitive figures or record existence.

**Done when:** a Staff session has a coherent production-only experience on both desktop and mobile.

### 5. Prove the policy with tests

- [ ] Unit: test every V1 boolean for Category 1 and Category 2.
- [ ] Integration: test sensitive server actions and APIs with a Category 1 user, Category 2 user, non-member, and second-lab user.
- [ ] Security: test cross-lab ID tampering, public tokens, forged request bodies, and unauthorized file upload/attachment flows.
- [ ] E2E: test permitted and forbidden navigation for both categories.
- [ ] Regression: add a focused test whenever an authorization defect is fixed.

**Done when:** the permission suite passes in CI with isolated data.

## Case creation: V1 plan

`/cases/new-case` is Category 1 only. It includes patient/clinic creation, clinical prescription, pricing, deadlines, staff assignment, and drafts; it is not a Staff workflow in V1.

### Current gaps

| Area | Current behavior | Required V1 change |
| --- | --- | --- |
| Route | Client page/layout has no Category 1 guard. | Guard it at a server page/layout boundary using `canCreateCases`. |
| Main submission | `createDentalCaseAction` uses `requiredLabRole: null`. | Check `canCreateCases` before reading/writing. |
| Drafts | Save, list, search, and load draft actions use `requiredLabRole: null`. | Require `canCreateCases` for all draft actions. Decide whether management drafts are shared; recommended V1 behavior is shared within the lab with audit history. |
| Financial/assignment payload | Form resolves pricing and submits staff commission values. | Category 2 cannot reach the route or actions. Keep price recomputation server-side; allow initial assignments only when `canAssignCaseStaff` is true. |
| Quick-create dialogs | Patient/clinic/staff actions currently have mixed `STAFF` thresholds. | Require Category 1 booleans: create case/patient, manage clinics, manage catalog, or manage team as appropriate. |
| Asset upload | Case upload requires sign-in and lab membership. | Also require case-creation authorization for new-case uploads and verify final attachment ownership/scoping. |

### Acceptance tests

- [ ] Category 1 can create, save, list, search, and resume a valid draft.
- [ ] Category 2 receives Forbidden for every new-case and draft action, including forged requests.
- [ ] Category 2 direct navigation to `/cases/new-case` shows no form, drafts, prices, staff data, or quick-create dialogs.
- [ ] A Category 1 user cannot use IDs from another lab for any referenced entity.
- [ ] Prices are recomputed on the server, never trusted from the browser.
- [ ] Archive/restore behavior never removes case or patient financial history.

## P0 estimate

**5–8 developer days** across the entire V1 hardening effort, including automated verification and UAT. Case-creation hardening is **1.5–3 days** of that total.
