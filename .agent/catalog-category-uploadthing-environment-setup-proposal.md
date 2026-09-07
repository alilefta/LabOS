# Proposed concrete environment setup — Catalog Category UploadThing runtime verification

Status: Proposed only; environment-sensitive operations are not authorized  
Scope: Catalog Category runtime-verification packet, N-FILE-001  
Prepared: 2026-09-07  
Supersedes: nothing; FILE-05 remains `ACCEPTED` and this proposal creates no successor task

## 1. Proposed resources and isolation

These are proposed names, not assertions that any resource already exists.
They must be created only after Product Owner approval.

| Resource | Exact proposed name | Isolation rule |
| --- | --- | --- |
| PostgreSQL container | `labos-rv-pg-20260907` | Local container bound only to `127.0.0.1:55432`; never reuse an existing database or server. |
| PostgreSQL volume | `labos-rv-pgdata-20260907` | Dedicated disposable volume; destroy only after evidence retention is complete. |
| Database | `labos_rv_catalog_category_20260907` | Created by the dedicated container only. |
| Database role | `labos_rv_runner` | Limited to the dedicated database; password is a local secret, never committed or printed. |
| UploadThing application/configuration | `labos-rv-catalog-category-20260907` | New isolated non-production UploadThing application/token; never use a development, staging, or production token. |
| Public callback tunnel | `labos-rv-catalog-category-20260907` | A Product Owner-controlled named HTTPS tunnel forwarding only to local `127.0.0.1:3000`. The final public hostname is unknown until the PO selects a controlled DNS/tunnel account. |
| Local runtime | `labos-rv-catalog-category-20260907` | `next dev` on `127.0.0.1:3000`, using only the named local database and isolated UploadThing token. |
| Browser profiles | `labos-rv-20260907-a`, `labos-rv-20260907-b`, `labos-rv-20260907-c` | New clean profiles, one per synthetic actor; no existing browser profile or real-user session. |
| Redacted Git evidence | `docs/evidence/authorization-v1/catalog-category-uploadthing-runtime-20260907.md` | Created only after the run; contains no credentials, raw IDs, provider URLs/keys, emails, request bodies, or headers. |
| Restricted evidence directory | `C:\LabOS-Runtime-Verification\catalog-category-uploadthing-20260907\` | Proposed local directory outside Git, access limited to the Product Owner and executor; holds the run manifest, opaque IDs, provider object/callback IDs, scoped DB projections, and unredacted captures. |

The simplest safe topology is one laptop-local PostgreSQL container and Next
runtime, exposed to the provider only through the named HTTPS tunnel. Browser
profiles use the tunnel hostname, not `localhost`, so Better Auth's base URL
and the provider-visible request origin agree. This is not a deployment.

## 2. Required environment values and proposed commands

No command below has been run. Replace every angle-bracket value through the
Product Owner-approved local secret mechanism. The repository ignores `.env*`,
so the proposed local file is `.env.runtime-verification.local`; it must never
be staged, copied into evidence, or displayed in terminal output.

```dotenv
# .env.runtime-verification.local — proposed, untracked, local only
DATABASE_URL=postgresql://labos_rv_runner:<local-db-password>@127.0.0.1:55432/labos_rv_catalog_category_20260907
DIRECT_URL=postgresql://labos_rv_runner:<local-db-password>@127.0.0.1:55432/labos_rv_catalog_category_20260907
BETTER_AUTH_URL=https://<approved-public-tunnel-hostname>
BETTER_AUTH_SECRET=<new-runtime-only-secret>
UPLOADTHING_TOKEN=<token-for-labos-rv-catalog-category-20260907>
NODE_ENV=development

# Optional: set all three only if the PO approves an isolated telemetry sink.
AXIOM_TOKEN=<isolated-telemetry-token>
AXIOM_DATASET=<isolated-runtime-verification-dataset>
AXIOM_EDGE=<us-east-1.aws.edge.axiom.co-or-eu-central-1.aws.edge.axiom.co>
```

`DIRECT_URL` is required by `prisma.config.ts` for migration commands;
`DATABASE_URL` is required by `lib/prisma.ts` at application runtime. The
installed UploadThing runtime defaults to `UPLOADTHING_TOKEN`. Better Auth
uses `BETTER_AUTH_URL` and `BETTER_AUTH_SECRET`. The repository does not define
an UploadThing app ID, callback URL, or secret name beyond the token; those are
provider-console facts to be selected by the Product Owner, not inferred here.

### Proposed commands, in execution order after approval

```powershell
# 0. Confirm the selected environment is local/disposable before doing anything.
#    Do not run against an existing Postgres service or a non-loopback address.
docker volume create labos-rv-pgdata-20260907
docker run --name labos-rv-pg-20260907 --detach --rm `
  --publish 127.0.0.1:55432:5432 `
  --env POSTGRES_DB=labos_rv_catalog_category_20260907 `
  --env POSTGRES_USER=labos_rv_runner `
  --env POSTGRES_PASSWORD=<local-db-password> `
  --volume labos-rv-pgdata-20260907:/var/lib/postgresql/data `
  postgres:16

# 1. In an approved terminal, load the untracked runtime-only values without
#    echoing them. The executor supplies the organization's approved secret-load
#    mechanism; no repository command currently exists for this.

# 2. Verify generated FileUploadGrant client artifacts already exist. This is
#    read-only and avoids running `prisma generate` in the dirty workspace.
Test-Path prisma/generated/prisma/client

# 3. Apply the complete repository migration history, then inspect status.
pnpm exec prisma migrate deploy
pnpm exec prisma migrate status

# 4. Start the named HTTPS tunnel using the PO-selected tunnel credential/config.
#    Example command shape only; it requires the selected tunnel provider's CLI:
cloudflared tunnel run --token <labos-rv-catalog-category-20260907-tunnel-token>

# 5. Set BETTER_AUTH_URL to the selected tunnel hostname, then start the local app.
pnpm dev -- --hostname 127.0.0.1 --port 3000
```

The `cloudflared` line is deliberately a command shape, not an assertion that
Cloudflare tooling/account access exists. A different PO-approved named HTTPS
tunnel is acceptable only if it preserves the same topology and gets recorded
in restricted evidence. Do not use a quick/publicly unmanaged tunnel because
its transient hostname cannot be reliably attested or retained.

Do not run `pnpm prisma migrate dev`: the approved operation is deployment of
the checked-in history to the disposable database. Do not run `prisma generate`
as part of this setup because it would alter generated output in the already
dirty workspace; stop if the existing generated client cannot start the app.

## 3. Complete migration plan

Inspection found 46 checked-in PostgreSQL migrations, in this exact order. An
empty database receives all 46 through `pnpm exec prisma migrate deploy`; it is
incorrect to apply `20260904003000_add_file_upload_grants` alone.

```text
20260318195023_init
20260319200208_added_auth_models
20260319201730_added_missing_fields_to_lab
20260321134628_made_email_as_optional_for_super_and_lab_user
20260322145850_updated_auth_user_to_have_lab_id_instead_of_session
20260323164729_changed_category_and_case_from_many_to_many_into_one_to_many
20260325185403_added_draft_status_for_case_to_allow_storing_it_like_a_draft
20260326141508_made_grand_total_and_patient_fields_nullable
20260326192935_changed_case_into_dental_case_for_some_columns
20260327162001_major_change_by_adding_dentist_and_made_optional_fields_and_added_enums
20260327162249_added_owner_for_labuser
20260328190521_added_require_teeth_and_link_between_case_work_item_and_worktype
20260330172233_added_toothprice_and_changed_the_name_of_bulk_price_threshold
20260330172801_modified_the_name_of_teeth_count_to_apply_bulk_price
20260331185254_changed_teeth_count_to_apply_bulk_price_to_be_lower_case
20260403152809_added_file_extension_for_case_assets
20260405143136_removed_technicans_and_sales_rep_and_replaced_with_lab_staff
20260405172144_created_role_categories_for_lab_staff_in_addition_to_job_title_for_easier_fetching_and_filtering
20260411130306_added_notes_for_case_and_case_items_and_added_shading_info_for_case_work_items
20260412144146_added_next_case_number_for_lab_and_made_deadline_and_grand_total_as_optional_for_case
20260419112010_add_operational_indexes
20260420125303_added_case_activity_log
20260420210355_added_case_updated_to_case_activity_type
20260423155240_connected_lab_staff_and_lab_user_to_distinct_physical_from_auth_users
20260424192453_added_case_pricing_recalculated_to_case_activity_type
20260429144526_added_is_paid_to_case
20260429183720_added_invoicing_models
20260506134904_added_tracking_fields_to_case_like_remake_and_fault_reason
20260509151346_added_is_active_field_to_the_dentist_model
20260509151959_added_speciality_and_license_number_fields_to_dentist
20260522152323_added_discount_reason_to_invoice
20260527150254_added_lab_id_to_invoice_case
20260528145742_created_lab_invitation_model
20260601125308_added_working_days_to_lab_staff
20260601161520_added_staff_payout
20260601161730_added_next_payout_number_to_lab
20260604124431_added_is_active_to_work_models
20260604131516_added_is_archived_to_work_models_and_new_addon_model
20260605150101_added_lab_settings_model_remake_related_columns_to_case
20260611150027_added_set_null_instead_of_cascade_on_case_pricing_plans
20260617164353_removed_is_active_col_from_case_category
20260821181621_added_better_auth_orgnizations_support
20260821185304_link_lab_to_organization
20260821200152_link_labstaff_to_member
20260821213743_add_labstaff_invitation_intent
20260904003000_add_file_upload_grants
```

Expected effects:

- The first 41 migrations establish the historical LabOS domain, Catalog
  Category, cases, staff, invoice, asset, enum, and index baseline expected by
  the current schema.
- The four August 2026 migrations establish Better Auth Organization/Member
  tables, the one-to-one Organization-to-Lab relationship, optional
  LabStaff-to-Member linkage, and invitation intent needed for canonical tenant
  resolution.
- The final grant migration adds `FileUploadGrantStatus`, `FileUploadGrant`,
  the provider-key unique index, lifecycle/tenant/target indexes, and foreign
  keys to `organization`, `Lab`, and `member`.
- Prisma records every applied migration in `_prisma_migrations`. On a newly
  created disposable database, all 46 must show applied and there must be no
  failed/pending migration before fixtures or browser work begin.

At inspection, `20260904003000_add_file_upload_grants` is the last migration.
If repository state changes before execution, stop and rerun this inspection;
the complete list must be recalculated before migration approval is exercised.

## 4. Runtime and callback connectivity proposal

1. Create the isolated UploadThing configuration named
   `labos-rv-catalog-category-20260907` and supply only its token as
   `UPLOADTHING_TOKEN` to the local process. Do not copy a token from any
   existing environment.
2. Bring up the named HTTPS tunnel first. The PO supplies a stable public
   hostname and tunnel credential. Bind the local Next server only to loopback;
   the tunnel is the sole inbound path from the provider/browser.
3. Set `BETTER_AUTH_URL` to that same public HTTPS hostname before application
   startup. Open the browser profiles at the tunnel URL, not at localhost.
4. The browser invokes the existing `categoryIconAvatar` route at
   `/api/uploadthing`; `app/api/uploadthing/route.ts` delegates to the existing
   route handler, and the provider completion reaches the local runtime through
   the same public hostname. `app/api/uploadthing/core.ts` calls
   `completeVerifiedProviderCallback` and returns only `uploadGrantId`.
5. Before fixture work, prove only connectivity (runtime health/page load,
   browser session, route availability) without creating an upload or changing
   a provider setting. Stop if a callback cannot reach the local runtime or if
   the provider requires an unapproved shared configuration change.

The repository contains no provider callback allowlist/configuration source.
Whether the isolated provider application needs a static callback-origin
registration is therefore a Product Owner/provider-console question, not a
repository-derived assumption.

## 5. Synthetic fixture and cleanup approach

Use the existing browser sign-up and Organization/Lab onboarding paths rather
than direct SQL for Organization/Lab creation. `createLabWorkspace` uses the
server-owned onboarding service, Better Auth creates the owner Member, and the
service creates the linked Lab and default LabSettings.

| Profile / actor | Proposed synthetic identity | Required fixture state |
| --- | --- | --- |
| A | `rv-cat-a@labos.invalid` | Sign up in profile A; create `RV Catalog A 20260907` with slug `rv-catalog-a-20260907`. This yields Organization A, its linked Lab A, owner Member A, and active Organization A. A is the positive create/update actor. |
| B | `rv-cat-b@labos.invalid` | Sign up in profile B; create `RV Catalog B 20260907` with slug `rv-catalog-b-20260907`. This yields the isolated Organization B/Lab B and owner Member B. B owns Category B and is used for cross-tenant attempts. |
| C | `rv-cat-c@labos.invalid` | Sign up only in profile C; do not create or join an Organization. C exercises missing canonical membership/active-tenant denial without a fixture write beyond the account. |
| Category A | Run-marked Category owned by Lab A | Create through the approved Category UI; record its actual generated ID only in restricted evidence. It is the authoritative update target. |
| Category B | Run-marked Category owned by Lab B | Create through the same UI; record its ID only in restricted evidence. It is never exposed to profile A. |

Use a generated, runtime-only password for each synthetic account; store it
only in the approved local secret mechanism and delete it at cleanup. No real
email, patient, clinical, financial, or production identifiers are permitted.

The permitted fixture mutations are exactly: synthetic account/Organization/
Member/Lab/LabSettings creation through onboarding; Category A/B create/update;
the grants created by the normal stage flow; and provider objects created by
the normal stage flow. No Case assets, Staff-avatar/genericAvatar flows,
provider configuration changes, persisted-image deletion, or file-read/access
tests are permitted.

Cleanup order after evidence capture and the PO-selected retention period:

1. Export the redacted report and restricted run manifest; verify their checksums
   and retention owner.
2. Delete known run-created provider objects from the isolated provider
   configuration, or record the provider's approved expiry/retention disposition
   when per-object deletion is unavailable. Do not alter provider cleanup
   configuration.
3. Stop the local runtime and named tunnel; sign out and delete the three clean
   browser profiles/site data.
4. Destroy the dedicated database container and, only when the Product Owner
   authorizes final fixture disposal, remove `labos-rv-pgdata-20260907`. This
   atomically removes all run fixtures/grants without targeting any other
   database. Record the container/volume removal confirmation in restricted
   evidence.

Do not use row-by-row deletion unless the dedicated-volume reset cannot be
used; cascade behavior and incomplete fixture inventory make a targeted reset
less reliable.

## 6. Evidence and retention proposal

After execution, create the redacted report at the named `docs/evidence/` path.
It should contain: revision/build identity; approved resource *names* (not
hosts/tokens); migration status; scenario outcomes; redacted ordered traces;
sanitized telemetry excerpts; aggregate/scoped before-after assertions; cleanup
disposition; and explicit `NOT RUN` for RV-10.

Keep restricted evidence outside Git at the named local directory for **30
calendar days after TERRA's runtime review**, then delete it after Product
Owner confirmation. Restricted material includes opaque grant IDs, real
Organization/Lab/Member/Category IDs, correlation IDs, provider object/callback
IDs, unredacted screenshots, and scoped database output. Credentials, session
cookies, passwords, raw provider URLs/keys, request bodies, and headers must
not be retained in either location; redact them at capture time.

## 7. Operations needing Product Owner approval

The following have not been authorized and each changes an environment or
external state:

1. Create and later destroy the named Docker volume/container/database and
   local database role; apply all 46 migrations.
2. Create/use the named isolated UploadThing application, inject its token, let
   it create test objects/callbacks, and delete or retain those objects.
3. Create/use the named controlled HTTPS tunnel and public hostname, including
   its credential and any provider-console callback-origin registration.
4. Start the local runtime with runtime-only secrets and create three synthetic
   Better Auth accounts, two Organizations/Labs, Members, Categories, grants,
   and provider objects.
5. Create/delete clean browser profiles and test sessions.
6. Create the redacted `docs/evidence/` report; create, access, retain, and
   delete the proposed restricted local evidence directory.
7. Configure or inspect an isolated telemetry destination, if telemetry is not
   captured from redacted local runtime output.

RV-10 remains deferred. It is excluded from setup and runtime execution until
a separate Product Owner-approved reversible fault method exists.

## 8. Unresolved technical blockers

1. **Tunnel hostname and tool/account:** the repository contains no controlled
   public tunnel/DNS resource or tunnel CLI configuration. A PO-owned hostname,
   credential, and tool are required before provider callback verification.
2. **UploadThing console contract:** source establishes `UPLOADTHING_TOKEN` but
   not whether the isolated configuration requires static callback-origin
   registration. The PO/provider owner must resolve this without changing a
   shared configuration.
3. **Local container availability:** this proposal assumes an approved Docker
   engine and ability to bind port 55432. If unavailable, the PO must approve a
   different newly provisioned disposable PostgreSQL target; do not repurpose a
   development database.
4. **Generated client compatibility:** the current dirty workspace contains
   generated FileUploadGrant artifacts, but setup intentionally does not run
   `prisma generate`. If the local runtime cannot use the existing client after
   migration, stop for an explicit generated-output authorization.
5. **Synthetic sign-up behavior:** source enables Better Auth email/password
   but repository evidence does not prove whether the selected local runtime
   requires external email delivery/verification. If browser sign-up cannot
   create the synthetic accounts without external delivery, stop and obtain an
   approved fixture-creation method that preserves the canonical
   Organization/Lab/Member relationships.

This proposal is ready for Product Owner review. It does not authorize setup,
migration, provider access, configuration change, runtime verification,
deployment, staging, or commit.
