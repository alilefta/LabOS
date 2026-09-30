# C2 Case read-contract correction: decision blocker

Date: 2026-09-25
Status: `BLOCKED_DECISION`; no read-contract code change or new acceptance claim.

The approved correction requires legacy assets with real `documentUrl` and
`fileExtension` to keep the existing string-only DTO, while future managed
assets must not enter that DTO. Inspection of the actual consumers shows that
simply filtering managed assets would silently hide clinically significant
attachments and can make the existing edit flow attempt to delete them:

- `lib/mappers/composers.ts` maps every Case asset into the detail and draft DTO.
- `components/cases/case-details/sections/digital-asset-vault.tsx` displays the
  DTO array as the complete file count and says no assets exist when empty.
- `lib/case-helpers.ts` maps the same DTO array into edit-form `isNew:false`
  keep entries.
- `actions/cases/update-case-form.ts` computes deletions from every persisted
  asset ID omitted from that form and calls `caseAssetFile.deleteMany`.
- `app/(main)/cases/[caseId]/page.tsx` and its edit page convert a failed
  `getDentalCaseById` result to `notFound`; failing the entire read would make
  an otherwise authorized Case unavailable, including its non-file detail.

No managed rows are authorized or created by C2. The risk is a future mixed
legacy/managed Case after a later activation, not evidence of current managed
data. C1 still authorizes before the Case DTO load and retains generic
missing/foreign/denied semantics. This correction made no alternate auth path.

The Product Owner must choose a mixed-asset interim contract before code can
be written:

1. Block full Case detail/edit/metadata for a Case containing any managed
   asset until the signed-read contract exists. This fails closed but hides
   the entire authorized Case in the current pages unless a new explicit
   unavailable response/UI is separately approved.
2. Continue Case detail with legacy assets plus an explicit managed-unavailable
   indicator (not a URL) and prevent edit omission from deleting managed IDs.
   This preserves Case visibility but requires a narrow DTO/UI contract and
   an asset-safe write guard beyond the currently authorized read-only scope.
3. Defer nullable-schema compatibility and migration readiness until the
   separately designed signed-read and asset-safe persistence boundaries can
   land together. This keeps the current read contract but postpones C2 code
   acceptance.

Do not silently filter managed assets into an incomplete vault, fabricate a
URL, widen the legacy DTO to nullable fields, or change Case writes under the
present authorization. C2 remains `BLOCKED_DECISION`, code acceptance
`PENDING`; the prior independent `CODE` verdict remains `CORRECTION_REQUIRED`.
The authored schema and review-only SQL are unchanged; no migration or
database operation occurred.
