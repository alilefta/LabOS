# S001 clinical-evidence finalization handoff blocker

Status: **BLOCKED_DECISION**. Scope: the Product Owner-authorized S001 successful-evidence plus atomic `PENDING → UPLOADED` CODE/runtime gate. No finalizer code, schema, migration, grant, evidence row, provider operation, or disposable database fixture was created in this gate. CODE tests, disposable PostgreSQL matrix, and independent finalization review are `NOT_RUN`.

## Installed contract and exact gap

- `CaseClinicalUploadEvidence.validatedSuffix` is required and typed `JPG | JPEG` in `prisma/schema.prisma`. The installed clinical-evidence migration requires it; neither the S001 additive migration nor the current authorization permits changing that contract.
- The accepted evidence design defines this value as the checked filename suffix after trusted JPEG inspection. JPEG bytes establish the format but cannot establish whether the upload filename ended in `.jpg` or `.jpeg`.
- `app/api/uploadthing/case-clinical-route.ts` checks that the initial upload filename ends in `.jpg` or `.jpeg` and then calls the saved-Case staging command, which persists no suffix. The verified callback passes only the grant ID and opaque provider key to `case-clinical-callback.ts`/its repository. The reservation retains only the exact key on the PENDING grant.
- `resolveReservedClinicalGrant()` returns canonical grant, tenant, Case, Member and reserved key facts, but no checked suffix. `validateReservedClinicalJpegS001()` retains `{ grant, original }` privately with the validated result; the S001 byte core proves JPEG structure and decode but carries no filename fact.
- Thus the separately authorized finalizer cannot populate `validatedSuffix` truthfully from its permitted authoritative inputs. Defaulting to `JPG`, deriving a suffix from JPEG magic bytes or MIME, reconstructing a filename, or accepting a caller-provided suffix would change the approved evidence meaning or authority.

The Product Owner expressly confirmed **pause for a separate handoff/persistence decision** and prohibited those substitutes. The required provenance is: a checked upload filename suffix must survive the authoritative server-side staging/callback/grant → validation → finalization handoff. The exact mechanism and lifecycle require a bounded architecture decision before implementation resumes.

## Other clarified boundary

The Product Owner confirmed that the installed immutable `CaseClinicalUploadEvidence.providerObjectKey` remains required for its grant foreign key and object identity. The earlier phrase “no provider URL/key persisted in evidence” means no *additional* provider key, derived locator or URL beyond that canonical required key. It must come from retained/fresh authoritative grant state, never caller input. No schema or migration change is authorized or proposed here.

`validatedAt` has an accepted meaning of server clock after complete inspection. The current validated result lacks it, but a future implementation could retain a server completion timestamp with the private outer-validator context, subject to the successor design/review. This is not the present blocking decision.

## Preserved state and next gate

Corrected S001 production byte-core CODE acceptance and protected Preview runtime `PASS_WITH_LIMITATIONS` remain unchanged. Codec-only structural-pass/Julusian-fail runtime fixture stays `NOT_RUN`. S001 evidence migration remains installed in normal development. N-FILE-110 runtime is inactive. There is no successful clinical evidence, grant transition, StoredFile, Case asset/version, or attachment from this gate.

**Single next gate:** a bounded architecture decision for preserving the already-checked `.jpg`/`.jpeg` suffix through the authoritative Case upload handoff into S001 finalization, with exact persistence/immutability/authority and backward-compatibility semantics. Finalization CODE and disposable PostgreSQL verification resume only after that decision and separate authorization.
