# Protected Vercel Preview S001 retry: stopped at placeholder alias

Run `vercel-s001-preview-retry-20261002-1504-7c2f`; 2026-10-02; V3 runtime feasibility. **STOPPED — VERIFICATION_ENVIRONMENT_BLOCKER.** No S001 probe deployment or function invocation occurred. The Product Owner authorized an inert first Production-classified deployment only inside a new isolated synthetic project, followed by a second Preview deployment only if the placeholder had no unexpected alias/domain exposure.

## Isolation and pre-upload checks

- Vercel CLI 62.1.0 / Node 24.21.0 authenticated as `alilefta`; only available team `ali-leftas-projects` (Hobby). Exact new project name `labos-s001-probe-20261002-1504-7c2f` returned `project_not_found` before creation.
- The run created that project alone, ID `prj_cTfFohQ26Lzv34zFPvDbwwBDwEzJ`. CLI inspection reported Node 24.x, framework `Other` for the static placeholder, and root `.`. Project deployment listing reported zero deployments. A fresh project API read showed `envCount=0`, `aliasCount=0`, no Git link; CLI environment listing found no variables, and integration-resource listing found no resources. No LabOS project was linked or selected.
- The project initially reported `ssoProtection.deploymentType=all_except_custom_domains`. A PATCH of only that exact project set `ssoProtection.deploymentType=all`; a separate GET confirmed `all`, zero environment variables and aliases, and no Git link before upload. No other project or team protection setting was changed.
- A new isolated local run root held only a one-file `placeholder/` and empty `probe/`; no decoder, API route, LabOS code, credentials, database/provider code, or clinical data were copied there. [Placeholder source](placeholder-index.html) is 117 bytes, SHA-256 `d19bbd3bfcc1029324453c0f60f72144ec0a81812dad96c0a9b430a79e3fdd22`. The `deploy --dry --json` result listed exactly that one `index.html`, 117 bytes, framework `Other`, zero ignored files. The first deployment command used the exact run-owned project ID/team with `--prod --skip-domain --yes --json`.

## Observed stop condition

The [raw deploy output](placeholder-deploy-raw.txt) reports deployment `dpl_6Gt32K4eBNUCAsK2EVG9dpyDAhpa`, `target=production`, `readyState=READY`, and `deploymentProtection=["vercel_authentication"]`. It **also reports `▲ Aliased`** for a generated run-owned project Production `.vercel.app` alias despite `--skip-domain`. The separate [read-only deployment inspection](placeholder-inspect-raw.txt) confirms the same deployment ID, `target production`, `status Ready`, and that generated Production alias. A project API reread still reported protection `all`. An unauthenticated HEAD request to the alias returned `HTTP/1.1 302 Found`, with redirect host `vercel.com` and path `/sso-api`; query parameters and cookies were not retained. These checks support effective Vercel Authentication on the observed alias but do not erase the unexpected alias.

The accepted routing packet expected `--skip-domain` to prevent automatic Production aliasing and explicitly required a stop on any unapproved alias/domain exposure. This run therefore stopped immediately after retaining placeholder evidence. It did **not** copy, build, repair, upload, or call the existing S001 harness. No second deployment exists. The observation does not by itself establish whether Vercel CLI 62.1.0 ignored `--skip-domain` or whether that flag excludes generated project aliases; no such platform cause is claimed here.

| Claim | Julusian | Sharp |
| --- | --- | --- |
| Local prior synthetic package/matrix/oracle findings | Preserved in the [original packet](../vercel-s001-preview-20261001/packet.md); not rerun | Preserved; not rerun |
| Retry dependency/source/fixture preflight | NOT_RUN after placeholder stop | NOT_RUN |
| Preview deployment and exact target attestation | NOT_RUN | NOT_RUN |
| Deployed native artifacts and module loading | NOT_RUN | NOT_RUN |
| Preview function OS/Node/N-API/libc | NOT_RUN | NOT_RUN |
| Cold/warm decode, malformed inputs, timing/RSS | NOT_RUN | NOT_RUN |
| Vercel Preview feasibility | **BLOCKED** | **BLOCKED** |
| Proposed S001 semantic suitability | Unapproved; no new Preview evidence | Unapproved; no new Preview evidence |

## Cleanup and limits

After retaining the raw deploy/inspect output and exact static source, the CLI removed only project `labos-s001-probe-20261002-1504-7c2f`, explicitly stating that its deployments would also be deleted. A fresh `project inspect` returned `project_not_found`; a fresh inspection of `dpl_6Gt32K4eBNUCAsK2EVG9dpyDAhpa` returned deployment not found under the team. The exact local run root was removed after checking its resolved absolute path remained within the workspace; absence was verified. The earlier stopped experiment's own cleanup and `VERIFICATION_ENVIRONMENT_BLOCKER` record remain untouched.

No clinical bytes, LabOS environment variables, provider objects, Case routes/grants, database writes, clinical evidence, grant transitions, StoredFile/version/asset rows, or LabOS production deployment were involved. Windows x64 R001 remains `PASS | CODE`; R001 semantics unchanged; S001 proposed/unapproved; clinical-evidence finalization and atomic `PENDING → UPLOADED` remain `PO HOLD / DEFERRED`; N-FILE-110 runtime inactive.

**Independent V3 review: PASS | RUNTIME_EVIDENCE** for the truthfully stopped, cleaned run. The Reviewer inspected the actual static source and hashes, raw deploy/inspect outputs, prior routing context, stop before any second deployment or function, and the separate BLOCKED/NOT_RUN classifications. The Reviewer's optional live cleanup recheck was `NOT_RUN` because its sandbox could not initialize the npm cache; retained executor post-delete `project_not_found` and deployment-not-found results remain the cleanup evidence. Reviewer PASS does not imply either backend passed Vercel feasibility.

**Recommended single next gate:** bounded Product Owner disposition of the protected generated Production alias observed under `--prod --skip-domain`, including whether this exact alias behavior is acceptable for a new isolated inert placeholder or whether another initialization route must be chosen. Do not retry the synthetic backend deployment until that disposition is recorded.
