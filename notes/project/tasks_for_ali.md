# Tasks for Ali

This file tracks manual product/security tasks that require Ali's accounts,
judgment, or runtime access. Do not store passwords, session cookies, API
tokens, invitation URLs, Member IDs, or personal email addresses here.

## Current handoff — generic membership administration

Status: **In progress — Owner and Staff evidence complete; awaiting authenticated Admin/Manager fixture**

Runtime note (2026-08-25): Codex started the local application and reached the
real `/settings/team` route, but the isolated test browser correctly redirected
to `/sign-in`. No credentials were requested or inferred, and M-002/M-003 remain
intentionally disconnected from the UI. Complete A-001 before asking Codex to
resume the real-session matrix.

Ali runtime evidence (2026-08-25): one invited Staff account that already owned
another Lab successfully accepted Organization A membership. `/settings/team`
showed the Organization A Owner plus the invited Staff Member and its linked
operational `LabStaff` profile. This verifies the important multi-Organization
identity shape and Staff linkage, but not yet the complete four-role matrix.

The secure selection page and application-shell workspace switcher use the
authoritative Better Auth Organization list. To test selection directly, use:

`/select-organization?callbackUrl=/settings/team`

This uses Better Auth's authoritative Organization list and `setActive`. The
shell menu now also includes `Create a new workspace`, which opens the
authenticated `/organizations/new` provisioning page; do not create
additional accounts merely to work around tenant navigation.

### Ali task A-001 — prepare a disposable two-Organization test fixture

- [x] In a non-production environment, create or select Organization A and Organization B.
- [x] Ensure the test fixture collectively provides Owner, Admin, Manager, and Staff sessions.
- [x] Ensure Organization A contains:
  - one disposable Member-only non-Owner with no linked `LabStaff`, for
    M-002/M-003 tests;
  - one Member linked to `LabStaff`, to verify generic removal is denied and A-125 is required;
  - no irreplaceable account as the target of a removal test.
- [x] Open `/select-organization?callbackUrl=/settings/team` as the invited
  multi-Organization Staff account and verify switching changes the visible Lab.
- [x] Confirm every test account can sign in and select its intended active Organization.
- [ ] Sign in to the browser session that Codex should use, or be ready to run
  the documented matrix manually while Codex reviews server/Axiom evidence.

Evidence to record here (no identifiers or personal data):

- Date/environment: 2026-08-25 / development
- Organization A roles available: Owner / Admin / Staff (authenticated Admin
  session and Manager fixture pending)
- Organization B roles available: Owner / Admin / Staff (authenticated Admin
  session and Manager fixture pending)
- Disposable Member-only removal target available: Yes
- Linked Staff protection target available: Yes

Observed sanitized Axiom evidence:

- N-001 Owner: `MATCH_ALLOW` / `ROLE_PERMISSION` — pass.
- A-123 Owner: `MATCH_ALLOW` / `ROLE_PERMISSION` — pass.
- A-124 Owner: `MATCH_ALLOW` / `POLICY_ALLOWED` — pass.
- N-001 Staff: `LEGACY_ALLOW_V1_DENY` /
  `AUTHZ_PERMISSION_NOT_GRANTED` — expected restriction; V1 would hide Team &
  Roles from Staff while the current legacy page still permits it.
- No privilege-expansion event was observed in the supplied sample.
- No evaluation/configuration failure was observed in the supplied sample.
- No M-002/M-003 command telemetry is expected until those actions have an
  approved test surface; the current settings page is read-only.

Additional real-session evidence (2026-08-26): the same disposable Staff
account switched between Organizations A and B. Each `/settings/team` directory
contained only the selected Organization's rows, and the Staff actor received
no role-update, invitation, or removal controls in either Organization. This
closes Staff UI-denial and two-Organization presentation isolation. Direct
command-denial/provider evidence remains covered automatically and awaits the
authenticated role fixture for live confirmation.

Admin-session read-only evidence (2026-08-26): an authenticated Admin switched
between Organizations A and B and received the same tenant-scoped controls in
both. The Admin could see the Member-only Staff target and the generic invite
surface; self and Owner rows exposed no mutation controls. Both invitation and
role-assignment UI offered only the Staff role, matching the approved Admin
ceiling. No mutation was submitted during this inspection.

Admin M-004 provider evidence (2026-08-26): the Admin created one development
Staff invitation in Organization B. Better Auth returned the development
copy-link state. Axiom received sanitized `started` and `completed` records with
one correlation ID; provider duration was approximately 1.09 seconds. The
reviewed payload contained no recipient, invitation token, requested role,
Member/user ID, input, or provider error.

Admin M-003 provider evidence (2026-08-26): after explicit confirmation, the
Admin removed the disposable Member-only Staff membership from Organization B.
The row disappeared immediately while Owner and Admin remained. Axiom received
sanitized `started` and `completed` records with one correlation ID; provider
duration was approximately 1.49 seconds. The removed AuthUser account and its
membership in Organization A were intentionally preserved.

### Ali task A-008 — prepare the meaningful Admin M-002 fixture

The approved Admin ceiling permits assigning only the `Staff` role. A target
already holding `Staff` would make M-002 a no-op, so the live allow test needs a
disposable Member-only `Manager` target in the same Organization. The target
must not be linked to `LabStaff`, must not be the Admin's own account, and must
not be an Owner.

- [x] As Owner, invite the disposable account to Organization B with the
  `Manager` Organization role through M-004.
- [x] Accept that invitation with the disposable account and select
  Organization B.
- [x] Sign in as the prepared Admin in Organization B and open `/settings/team`.
- [x] Change the Member-only Manager target to `Staff` and save.
- [x] Confirm the row refreshes and now displays `Staff`.
- [x] In Axiom, confirm M-002 has a sanitized `started`/`completed` pair with
  one correlation ID and no identity, role-intent, or provider-error fields.

This fixture exercises a real Better Auth role transition while preserving the
approved Admin restriction: Admin assigns Staff, never Owner/Admin/Manager.

Real-session evidence received 2026-08-26: Owner created the disposable
Member-only Manager invitation in Organization B, the recipient accepted it,
and the prepared Admin changed that Member to Staff. The directory refreshed
successfully. Axiom recorded sanitized M-002 `started`/`completed` events with
one correlation ID and an approximately 1.34-second provider duration. No
identity, role intent, input, or provider error was retained.

Manager-session denial evidence (2026-08-26): in DentaFusion, a real Manager
session showed no invitation control, no role-update control, and no removal
control. A Staff target displayed `No administration permission`. No mutation
was attempted.

### Ali task A-001B — validate active Organization switching

- [x] Confirm a single-Organization account sees exactly its one Organization
  on `/select-organization`.
- [x] Confirm a multi-Organization account sees both the Organization it owns
  and the Organization where it is Staff.
- [x] While signed in as the multi-Organization account, open
  `/select-organization?callbackUrl=/settings/team`.
- [x] Select Organization B and confirm `/settings/team` shows only B's members.
- [x] Return to the selection page, select Organization A, and confirm the Owner
  plus linked Staff record reappear.
- [x] Confirm the active Lab's tenant-scoped application changes consistently.

### What Codex does after A-001B

Codex records real tenant-switch isolation evidence and implements a persistent
desktop/mobile application-shell workspace switcher as a separate usability
change, reusing the already-tested selector gateway rather than adding another
tenant mutation path.

Runtime evidence received (2026-08-25): Organization-list cardinality is
membership-aware in real Better Auth sessions. A one-membership account saw one
Organization; an account with Owner membership in one Organization and Staff
membership in another saw exactly those two Organizations.

Completion evidence (2026-08-25): selecting each Organization changed the
active Lab and `/settings/team` contents to that Organization only. Switching
back restored Organization A's Owner plus linked Staff row. No cross-tenant Team
row was observed. Codex then replaced the hard-coded desktop/mobile shell menu
with the authoritative Better Auth Organization list and active selector.

### Ali task A-001C — verify the application-shell switcher

- [x] Refresh the application and confirm the desktop sidebar shows the active
  Organization name instead of the old placeholder `DentaFusion`.
- [x] Open the sidebar workspace menu and confirm a one-Organization account
  sees one option and the multi-Organization account sees two.
- [x] Switch from the sidebar and confirm LabOS reloads at `/dashboard` under
  the selected Lab.
- [x] At a mobile viewport, repeat the switch from the navigation drawer.
- [x] Confirm a failed/offline list or switch shows a safe retry message and no
  provider details.

Completed 2026-08-25. Desktop and mobile menus, one/two-Organization listing,
active switch, dashboard reload, and safe failure behavior were manually
verified.

### What Codex does after A-001C

Codex records the shell usability check, then returns to the Authorization V1
membership gate: Admin/Manager real-session fixtures, M-002/M-003 controlled
test exposure, command telemetry evidence, and the explicit product decisions
in A-002/A-003. Additional Organization creation is tracked separately in
A-009 so provisioning verification does not get mixed with authorization
evidence.

### What Codex does after A-001

Codex runs the real-session matrix through the application boundary, verifies
the corresponding sanitized Axiom events, records pass/fail evidence in the
authorization rollout gate, and fixes implementation defects found during the
test. Destructive M-003 tests will target only the disposable Member Ali marks
safe to remove.

The planned runtime matrix is:

- Owner: M-002 to Admin/Manager/Staff allowed; Owner target denied.
- Admin: M-002 to Staff allowed; Admin/Manager/Owner targets denied.
- Manager and Staff: M-002 denied.
- Owner/Admin: M-003 allowed only for a disposable non-self, non-Owner,
  Member-only target.
- Manager/Staff: M-003 denied.
- Every actor: cross-Organization, self, Owner, and linked-Staff targets denied.
- Better Auth denial after a V1 allow is surfaced as a provider-phase failure.
- Axiom contains `started` plus `completed` or sanitized `failed` records for
  each attempted command, with one shared correlation ID per command.

### Ali task A-002 — approve the Member-only removal product rule

- [x] Approve or reject this rule: Owner and Admin may remove any non-Owner,
  non-self Organization Member who is not linked to `LabStaff`; Manager and
  Staff may not remove Members.

Decision:

- Approved / Rejected / Needs change: **Approved 2026-08-25**
- Notes: Ownership mutations and `membership.leave` remain separate and unavailable.

### What Codex does after A-002

If approved, Codex records the decision and can proceed toward UI integration.
If changed, Codex updates the policy matrix, integration tests, and architecture
documents before any controls are exposed.

### Ali task A-003 — approve destructive UI behavior

- [x] Confirm that removal requires an explicit confirmation dialog.
- [x] Confirm that linked Staff displays: "Use Staff access revocation instead."
- [x] Confirm V1 initially exposes one role per Member in the UI while the
  server contract retains fixed multi-role support.

Approved 2026-08-25. Controlled M-002/M-003 UI, pending/error states, server
path revalidation, and client refresh have been implemented. Owner/self/
malformed targets remain protected, Manager/Staff receive no controls, and
linked Staff removal is routed to A-125 guidance.

### What Codex does after A-003

Codex connects the approved M-002/M-003 controls to `/settings/team`, adds
pending/error states and N-001 cache revalidation, and keeps ownership and
`membership.leave` unavailable.

### Ali task A-004 — collect real M-002/M-003 command evidence

First-attempt note (2026-08-25): the initial M-002 submission was rejected
before authorization evaluation because the action schema incorrectly required
a UUID-shaped Better Auth Member ID. Better Auth Member IDs are provider-owned
opaque strings. The schema now accepts bounded, non-whitespace opaque IDs, the
full regression suite passes, and no provider mutation occurred during the
rejected attempt. Retry the same Owner role-update scenario below.

- [x] As Owner, use `/settings/team` to change the linked Staff Member to an
  allowed role and confirm the row refreshes without reloading manually.
- [x] In Axiom, confirm the M-002 command produces `started` and `completed`
  `labos.membership_administration` records with one correlation ID.
- [x] Confirm the Axiom payload contains no Member/user IDs, email, requested
  role, input, headers, Staff details, or provider error.
- [x] As the changed Manager or Staff account, confirm no administration
  controls are shown.
- [x] As Owner, confirm the Owner row says ownership is protected and the
  signed-in row cannot target itself.
- [x] Confirm a linked Staff row displays "Use Staff access revocation instead."
- [x] Prepare a disposable Member-only, non-Owner target without editing
  production data or unlinking a real Staff profile manually.
- [x] Remove only that disposable Member through the confirmation dialog and
  confirm the row disappears after success.
- [x] In Axiom, confirm the M-003 command produces `started` and `completed`
  records with the same redaction guarantees.

### What Codex does after A-004

Codex reviews the supplied command events, records real Better Auth allow/deny
evidence, fixes any UI/provider mismatch, and decides whether M-002/M-003 have
passed their rollout gate. If a safe Member-only fixture cannot yet be created,
M-003 remains automated-only until the generic Organization invitation slice
provides one; no manual database unlink is required or approved.

M-002 runtime evidence (2026-08-25): an Owner changed another linked Staff
Member to an allowed role and the row refreshed successfully. Axiom received a
`started` and `completed` pair with the same correlation ID. The completed
provider phase took approximately 1.38 seconds. The reviewed payload contained
no Member/user ID, email, requested role, input, headers, Staff details, or
provider error. M-002's real Owner allow path and telemetry-redaction check pass.
The linked Staff row also displayed the required A-125 access-revocation
guidance. The first Owner-row inspection exposed only `Current account`; the UI
was corrected to display self-target and ownership protection independently.
Ali confirmed after refresh that the current Owner displays both `Current
account` and `Ownership is protected`, with no mutation controls. The Owner,
self-target, and linked-Staff UI protection checks pass.

M-003 fixture status (superseded 2026-08-26): the earlier fixture block is
resolved through the controlled Member-only invitation path. A real Admin
removed the disposable non-Owner, non-self Member from Organization B through
the confirmation dialog; the row disappeared, the other Organization
membership remained intact, and sanitized Axiom telemetry was verified. No
manual database unlink or Staff mutation was used.

M-004 implementation checkpoint (2026-08-25): the controlled Member-only
invitation path is now available from `/settings/team`. It creates a Better Auth
Organization invitation without a `LabStaff` identifier or Staff-link intent.
Owner may invite Admin/Manager/Staff; Admin may invite Staff only; Manager and
Staff see no invitation control. Authorization V1 and Better Auth both must
allow. Because local email delivery is not configured, development only shows
the resulting invitation link for copying; production action responses return
no invitation token. Telemetry excludes recipient email, requested role,
invitation ID, input, headers, and provider errors.

### Ali task A-005 — create and remove a disposable Member-only fixture

- [x] As Owner, open `/settings/team`, choose **Invite Member**, and invite a
  disposable email as Staff. Do not use the Staff creation/access screen.
- [x] Confirm the development invitation link appears, copy it, and accept it
  in the disposable recipient session.
- [x] Return as Owner and confirm the new row says `No operational Staff
  profile` and exposes `Remove access`.
- [x] In Axiom, confirm M-004 emitted sanitized `started` and `completed`
  records with one correlation ID and no email, role, invitation ID, or input.
- [x] Use `Remove access`, review the confirmation dialog, and remove only the
  disposable Member.
- [x] Confirm the row disappears after success.
- [x] In Axiom, confirm M-003 emitted sanitized `started` and `completed`
  records with one correlation ID.

### What Codex does after A-005

Codex records the real M-004/M-003 provider evidence, closes the disposable
fixture gate, reviews any provider/UI mismatch, and then returns to the broader
Owner/Admin/Manager/Staff runtime authorization matrix. Do not paste the email,
invitation URL/token, Member ID, or user ID into this file.

Completed 2026-08-26 in development. The accepted M-004 recipient appeared as
a Staff-role Organization Member with `No operational Staff profile`. The
recipient saw no administration controls; the Owner saw `Remove access`. M-004
completed in approximately 1.05 seconds and M-003 in approximately 1.55
seconds. Both emitted matching `started`/`completed` correlation pairs, and the
reviewed records contained no recipient/Member identity, role intent,
invitation ID, input, or provider error.

### Ali task A-006 — verify post-revocation session recovery

Implementation note (2026-08-26): stale membership failures now enter
`/auth/continue`; zero remaining memberships clear the stale Better Auth active
Organization before onboarding. The M-004 dialog also shows inline email
validation and the normalized trimmed/lower-case recipient before submission.
Automated verification passes with 58 files / 391 tests.

- [x] Refresh the removed recipient's existing browser session.
- [x] Confirm it no longer loops between `/dashboard` and `/onboarding`.
- [x] With no remaining Organization memberships, confirm LabOS clears the
  stale active Organization and displays onboarding once.
- [x] If testing an account that still belongs to another Organization,
  confirm LabOS restores that sole Organization or opens the selector for
  multiple remaining Organizations.

### What Codex does after A-006

Codex records the post-revocation recovery evidence and closes the redirect-loop
defect. The recovery intentionally preserves the AuthUser account: zero
memberships leads to onboarding, while remaining memberships are restored or
explicitly selected through Better Auth's authoritative Organization list.

Multi-Organization recovery confirmed 2026-08-26: an account belonging to
Organizations A and B was removed from its active Organization A. Refreshing
the existing session restored Organization B without onboarding, a redirect
loop, or exposure of Organization A data.

### Ali task A-007 — verify invitation callback across auth-form switching

Implementation note (2026-08-26): the sign-up and sign-in links already retain
the safe relative invitation callback. Authentication completion and the
invitation continuation now use a fresh document navigation so the invitation
lookup observes the newly issued Better Auth session and cannot reuse a cached
anonymous render.

- [x] Open a fresh pending invitation while signed out.
- [x] Choose `Create account`, then use `Sign in` from the sign-up page.
- [x] Sign in using the exact invited email.
- [x] Confirm the same invitation opens in acceptance mode without copying or
  regenerating its link.
- [x] Accept it and confirm the expected Organization becomes active.

### What Codex does after A-007

Codex records the real-session result and closes the authentication-handoff
regression. If it still fails, capture the URL after sign-in and the sanitized
server failure category; do not regenerate the invitation because that would
hide whether the original token survived the route chain.

Real-session confirmation received 2026-08-26: the original invitation callback
survived the invitation → sign-up → sign-in route chain, the existing account
accepted the original invitation without copying or regenerating the link, and
the session reached the dashboard. The resulting multi-Organization account
could switch between Organizations A and B, and `/settings/team` remained
isolated to the active Organization. No email, credential, or invitation token
is retained in this evidence record.

Zero-membership recovery confirmed 2026-08-26: after the same recipient was
invited again, accepted, and then removed by the Owner, refreshing the
recipient's existing browser session preserved authentication, cleared the
revoked active Organization, and redirected once to `/onboarding`. No redirect
loop occurred. The alternative recovery path where other memberships remain is
still tracked separately in the final multi-Organization runtime matrix.

Partial runtime evidence (2026-08-25): Codex inspected `/settings/team` through
a real active Manager session. The two Organization members rendered, while
both rows showed "No administration permission" and exposed no role-update or
removal controls. No mutation or active-Organization change was performed.

### Follow-up UI tasks — separate from Authorization V1 kernel

- [ ] Hide or disable Staff-only Staff-creation/access controls before submit;
  the server correctly denies `staff.create`, but the current UI still lets a
  Staff user open the form.
- [ ] Decide how Admins should reach A-124/A-125 from the Staff detail surface.
  The current `/team/:staffId?tab=settings` page gate allows only Owner and
  Manager, so an Admin receives "Unauthorized access" despite the approved
  server policy allowing Staff-access operations for Admin → Staff targets.
- [ ] Keep operational compensation/schedule editing separately classified;
  opening the A-124/A-125 security controls for Admin must not grant those
  unrelated operational permissions.

### Ali task A-009 — verify additional Organization creation

The authenticated workspace-creation flow is now available without creating
another account. The selector and the desktop/mobile workspace switcher link
to `/organizations/new`. The page uses the existing server-owned,
idempotent Organization + Lab onboarding service; it does not expose a direct
Better Auth Organization-creation endpoint or accept a caller-supplied user
ID.

- [ ] Sign in as an account that already owns one Organization.
- [ ] Open the workspace switcher and choose `Create a new workspace`.
- [ ] Confirm `/organizations/new` shows the additional-workspace copy.
- [ ] Submit a distinct Organization/Lab name and slug.
- [ ] Confirm the new Organization and Lab are created once and become active.
- [ ] Confirm `/dashboard` and `/settings/team` show only the new active
  Organization's data.
- [ ] Return to the switcher and confirm both Organizations are listed.
- [ ] Open `/select-organization` directly and confirm it offers the same
  creation option for one- and multi-Organization accounts.
- [ ] While signed out, open `/organizations/new` and confirm it redirects to
  sign-in without revealing the form or provisioning anything.

If the submit fails, record only the safe user-facing error and whether the
Organization list changed. Do not record credentials, invitation links,
provider responses, or identifiers in this file.

### What Codex does after A-009

Codex reviews the manual result, checks for duplicate provisioning or active-
Organization isolation issues, runs the automated suite/lint, and updates the
Organizations architecture definition-of-done and rollout notes.
# Authorization V1 enforcement cutover — operator tasks

These tasks are intentionally manual. Do not enable production enforcement
until the rollout gate has explicit product/security approval.

- [ ] Confirm the A-124/A-125 runtime evidence and rollout-gate approvals are
  complete.
- [ ] In a controlled deployment, set `LABOS_AUTHORIZATION_MODE=v1` and restart
  all application instances so the process-startup profile is consistent.
- [ ] Exercise Owner/Admin/Manager/Staff and two-Organization scenarios.
- [ ] Watch Axiom for V1 enforcement-source events, provider denials, and any
  high-priority divergence or infrastructure failure.
- [ ] If an incident occurs, set
  `LABOS_AUTHORIZATION_MODE=legacy-rollback`, restart all instances, and record
  that this restores legacy Manager access.

After the manual verification is complete, the implementation task is to
review the Axiom evidence, update the rollout gate, and decide whether to keep
V1 enabled or return to shadow mode.
