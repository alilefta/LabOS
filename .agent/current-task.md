# Current task

The Product Owner approved the public-backed Case compatibility decision and
authorized only additive schema/SQL and DTO/open-contract authoring. The
[candidate](../docs/plans/authorization-v1/case-file-public-access-contract.md)
and review-only migration SQL are now authored. The immediate next task is
independent V3 CODE/SQL review plus focused static verification of this exact
candidate; disposable PostgreSQL verification and normal-development
migration application require later separate gates. No Case upload is active.
Initial independent review returned corrections for enum ordering, exact
evidence binding, and managed-to-legacy URL fallback; all three are corrected
in the current candidate. Final rereview was interrupted by reviewer usage
limits. CODE acceptance remains PENDING, and no database runtime claim exists.
UploadThing Free `public-read` is the accepted V1 limitation. Direct URL
possession bypasses LabOS authorization for retrieval; private ACL is deferred
and not a V1 blocker. `MANAGED_PUBLIC` is the new current-asset state,
`StoredFile.providerAccess` is nullable immutable per physical object, and
null means historical/unclassified, never private. Installed
`MANAGED_PRIVATE` retains its C2 meaning. A separate freshly authorized
public-open operation will expose the URL only on request, not in ordinary
managed Case DTOs; C3 `ISSUED` remains reserved for genuine signed access.
The N-FILE-110 saved-DRAFT staging intent is
`CLOSED | CODE PASS` after independent V3 `CODE` rereview. It creates only an
inactive Case-targeted PENDING grant; the provider route remains disabled.
See its [code packet](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/saved-draft-stage-code-20260928.md).
The provider-independent `case.asset.add`
Authorization V1 slice is `CLOSED | CODE PASS` after independent V3 `CODE`
rereview. See its [code packet](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/asset-add-authz-code-verification.md).
C1, C2 development persistence, C3 code, and N-FILE-110A remain closed.

The read-only [N-FILE-110 readiness checkpoint](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/readiness-20260927.md)
is complete. N-FILE-110A remains closed. `case.asset.add` is now explicitly
registered, but no Case upload/attachment route is active. N-FILE-110
provider activation remains inactive pending the V1 public-backed contract,
validator, callback, cleanup and runtime gates.
The [staging/domain design proposal](../docs/plans/authorization-v1/case-file-n-file-110-staging-domain.md)
records the approved fixed 15-minute clinical grant TTL. The
[clinical asset research packet](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/clinical-asset-research-20260927.md)
led to approved purpose-first clinical/reference photography with JPEG only;
the [Case evidence architecture](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-evidence-design-20260927.md)
is approved as a baseline. The
[V1 validation-profile checkpoint](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-profile-design-20260927.md)
is approved. Additive [Case evidence schema/SQL authoring](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/additive-evidence-schema-authoring-20260928.md)
has independent V3 `CODE` review `PASS`; its candidate has passed combined
disposable PostgreSQL verification and is now installed in normal development
at exact SHA-256 `e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b`.
The five Product Owner R001 numerical ceilings are approved; the
[R001 reconciliation](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-policy-reconciliation-20260928.md)
is superseded for segment/scan/work and decoder choices by the
[current R001 validator contract](../docs/plans/authorization-v1/case-file-jpeg-r001-validator.md).
The Product Owner approved 512 length-bearing segments, 128 progressive SOS
scans, no deterministic work score, grayscale and direct strict libjpeg-turbo
full decompression. Local native toolchain feasibility is closed; production
helper packaging and deployment containment remain unresolved. Private
provider access is deferred from V1.
No provider staging, production validator, attachment or provider activation
authority exists.
The [offline R001 harness](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-harness-20260928.md)
completed this bounded CODE/benchmark task with independent V3 `CODE` `PASS`.
Its Sharp/libvips probe remains historical research, not the approved
libjpeg-turbo mechanism. Executable R001 remains inactive; native integration,
containment and public-backed provider validation remain separate gates. No
successor implementation is active.

The separately authorized offline direct-libjpeg [native-helper feasibility](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-native-helper-feasibility-20260929.md)
is `CLOSED | FEASIBLE | V3 CODE PASS` after independent rereview. VS 2022 x64/SDK
19041 verification passed, the official pinned 3.2.0 library was statically
linked into a run-only helper, and focused native/inspector suites passed.
The exact acquisition/build tree was removed after review. This does not
approve production helper packaging, resource containment, provider-object
binding, Case-route activation or a successor implementation task.
The read-only private-provider checkpoint is superseded for V1 by the accepted
public-read limitation. Its account attestation remains historical evidence.
No provider setting retry, object operation, or production helper integration
is authorized by this documentation reconciliation.

The earlier [disposable stop](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/disposable-runtime-stop-20260928.md)
remains recorded. The [fresh rerun plus narrow supplemental non-UTC run](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/disposable-runtime-rerun-20260928.md)
jointly cover the complete mandatory matrix with exact cleanup and independent
V3 `RUNTIME_EVIDENCE` `PASS`. N-FILE-110 schema `CODE: PASS`; combined disposable
PostgreSQL verification `PASS`. The [normal-development migration](../docs/evidence/files/authorization-v1/n-file-110-case-asset-create/normal-development-migration-20260928.md)
also passed fresh gates and independent V3 `RUNTIME_EVIDENCE` review. It
installs persistence only, not managed Case clinical uploads.

C2 remains `CLOSED` at the development persistence level. Migration
`20260927120000_c2_case_file_persistence` is installed in development at
SHA-256 `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
C3 has no provider issuance, signed-read endpoint, or runtime acceptance.
Managed Case-file writes, N-FILE-110/111, provider-private ACL, and signed
reads remain inactive and require separate authority. Product PRV-08 remains
separate. Do not start the next Files boundary without authorization.
