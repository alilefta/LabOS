# D-FILE-04 read-only target and capability attestation

Status: BLOCKED_DECISION - effective provider ACL prevents Case-only private
uploads without a separately approved configuration change
Date: 2026-09-24

## Development database inventory

- Runtime `DATABASE_URL` host fingerprint `eb0d823953fe`, port `6543`,
  database/schema `postgres`/`public`, PostgreSQL `17.6`, matches the prior
  accepted Supabase development attestation. The Prisma-only `pgbouncer`
  query flag was removed from the in-memory `psql` connection string.
- Aggregate SELECTs ran with `default_transaction_read_only=on` inside
  `BEGIN READ ONLY`; no rows or URLs were returned or changed.
- `CaseAssetFile`: 3 rows, 1 Lab, 2 Cases. All 3 are `IMAGE`/`png` with
  HTTPS `*.ufs.sh` URL shape. There are 3 distinct URLs, 0 empty URLs,
  0 missing Cases, and 0 Case/Lab mismatches. All 3 have titles; 2 have
  null descriptions. The schema has no durable platform file ID or provider
  key for these rows. They remain URL-only legacy assets; URL shape does not
  establish object provenance, ACL, or authority for backfill.

## UploadThing development project

- The effective route uses `UPLOADTHING_DEVELOPMENT_TOKEN` from `.env.local`,
  not the distinct default token. Credential fingerprint `979e35aca2f2` and
  application-ID fingerprint `2e77ac21b101` match prior accepted development
  attestation. Credentials and raw application ID were not recorded.
- Read-only `POST /v7/getAppInfo` returned the same app-ID fingerprint,
  `defaultACL=public-read`, and `allowACLOverride=false`.
- The current `caseAssetsRoute` declares no private ACL. The installed SDK
  and UploadThing documentation support private ACLs and signed URLs, but
  per-route `private` cannot be used in this effective project while ACL
  overrides are disabled. Changing the global default to private could
  disturb accepted Catalog/Dentist display behavior and is not authorized.
  No provider setting, file, object, or ACL was changed. Signed URL delivery
  and direct unsigned denial were not exercised.

## Stop condition and exact external action

The approved D-FILE-04 Case-only private design cannot proceed on the current
project settings without a provider-configuration decision. Product Owner
approval is required to enable per-request ACL overrides on this existing
development project while keeping `defaultACL=public-read`, followed by
read-only re-attestation before any implementation. If that controlled change
is unavailable, return to Product Owner for a different provider/project
design; do not silently change the accepted upload projects or display
contracts. N-FILE-110/111 remain unavailable. The read-only persistence and
migration design is incomplete at this stop gate.

## Authorized configuration attempt (2026-09-24)

The Product Owner subsequently authorized exactly `allowACLOverride: false`
to `true` on this attested development project, preserving
`defaultACL=public-read`. Primary independently re-attested the existing
development token fingerprint `979e35aca2f2`, effective app fingerprint
`2e77ac21b101`, and baseline settings `public-read`/`false` before opening
the provider UI.

The documented UploadThing dashboard path required GitHub sign-in. The
available Codex in-app browser had no authenticated dashboard session and
showed the GitHub credential form. No credentials were entered, no consent
was granted, and no setting control was reached. Primary did not invoke an
undocumented/unsupported mutation endpoint or use a different project. The
temporary browser tab was closed. A second read-only `getAppInfo` call
confirmed the same app fingerprint and unchanged `public-read`/`false` state.
No provider mutation occurred; therefore there is no changed-state method or
after-change acceptance to claim.

Exact manual action: an authorized account holder must sign in to the
UploadThing dashboard, verify the development application identity against
the approved fingerprint, and use the dashboard's **Regions and ACL** setting
to enable **Allow Overriding ACL** while leaving the default **Public Read**.
Alternatively, establish an authenticated dashboard session for Primary to
perform only that already-approved toggle. Then request independent read-only
`getAppInfo` re-attestation before resuming the bounded design work. Do not
change any other project, credential, ACL default, or existing object.

## Authenticated dashboard retry (2026-09-24)

The Product Owner reported an open authenticated dashboard tab and requested
one retry. Primary again confirmed the same development token/app fingerprints
and baseline `public-read`/`false` using read-only `getAppInfo`. The dashboard
listed multiple apps; the visible `labos_test_environment` app ID alone
matched fingerprint `2e77ac21b101`. Its Settings > Access Controls showed
Public as the default, the per-request override unchecked, and the separate
presigned-GET expiration at 300 seconds.

Primary checked only **Allow overriding this value on a per-request basis?**
and selected that section's **Save Changes**. The dashboard returned
**Failed to update access controls**. Primary reset the unsaved form change;
the checkbox returned to unchecked. A final read-only `getAppInfo` confirmed
the same app fingerprint, `defaultACL=public-read`, and
`allowACLOverride=false`. No configuration change succeeded. The dashboard
shows an **Upgrade to a paid plan** link within Access Controls, but the
generic failure did not establish plan eligibility as the cause. No billing,
plan, credential, default ACL, other app, or provider object was changed.

Provider/account owner action now required: determine why this existing
development app rejects the documented ACL-override setting (including
whether its current plan permits it), and make the approved single toggle
available through the supported dashboard. A paid-plan change, if required,
is a separate Product Owner decision; it is not authorized by the ACL toggle
approval. Re-attest `appId` fingerprint, `defaultACL`, and
`allowACLOverride` after any supported correction before resuming the Case
design. Do not substitute an undocumented API mutation or a different app.

## Subsequent Product Owner disposition

The Product Owner classified the unchanged ACL setting as an unresolved
`CAPABILITY_BLOCKER`. The account is on a free plan, but the dashboard error
has not been attributed to the plan by provider confirmation. Paid upgrade is
deferred. Do not retry the toggle, alter the public default, switch projects,
or use public Case uploads. The earlier manual-action paragraph above is
historical, not current authority to retry. The
[provider-independent design](persistence-migration-design.md) can proceed to
decision while all real private-storage and signed-access gates remain
`NOT_RUN`. N-FILE-110/111 implementation and activation remain blocked.
