---
decision_id: D2-V1
title: Exact LabOS repository access for Vercel Hobby verification
status: OPEN | VERCEL_IMPORT_VISIBLE | GITHUB_GRANT_DETAIL_NOT_ATTESTED
evidence_date: 2026-10-10
authority: PRODUCT_OWNER_AUTHORIZED | EXACT REPOSITORY GRANT ONLY
---

# D2-V1 — Exact GitHub repository grant for Vercel

## Authority and boundary

The Product Owner authorized inspection of the existing Vercel GitHub App repository grant and, only if needed, adding `alilefta/LabOS` to that installation's selected repositories. This does not authorize all-repository access, a new installation, repository visibility or branch changes, Vercel project creation, deployment, secrets, or a build. The [D2-R1 feasibility baseline](../../plans/deployment-d2-r1-hobby-free-feasibility-20261008.md) and [D2-A1 account inventory](d2-a1-authenticated-account-attestation-20261009.md) retain the protected verification and migration gates.

## Read-only preflight and change ledger

| Order | Action or observation | Result | Scope/rollback |
| --- | --- | --- | --- |
| 1 | Authenticated Vercel Git namespace read. | Personal GitHub namespace `alilefta`, owner type `user`, `isAccessRestricted: true`, viewer role `admin`, and one reported installation ID. No secret value was returned. | This identifies the candidate existing installation; it does not show its GitHub repository selection or prove why LabOS is absent. |
| 2 | Authenticated Vercel exact repository search in the Hobby team. | `LabOS` returned zero repositories; an authenticated Vercel project search returned zero LabOS projects. Repeating the search with the reported installation ID also returned zero repositories. Explicit namespace-ID searches failed connector schema validation. | No integration permission or project was changed. Search absence is an access gap, not proof that Vercel cannot import the public repository. |
| 3 | Local GitHub CLI authentication check. | `gh auth status` reported no authenticated GitHub host. No login was attempted. | No GitHub App installation details or repository grant can be read or changed through this CLI session. |
| 4 | Product Owner chose to perform the exact GitHub App repository-selection change directly. | The change is pending; no saved grant or post-change Vercel repository result has been observed yet. | Retain **Only select repositories** and all existing selections, add only `alilefta/LabOS`, then verify through Vercel search. Do not switch to all repositories. |
| 5 | Product Owner subsequently asked whether LabOS appears in Vercel's GitHub import search. Agent repeated authenticated read-only checks. | The Vercel `search_repo` result now returns exactly `https://github.com/alilefta/LabOS` (repository name `LabOS`, owner `alilefta`, public, default branch `main`). The Git namespace still reports `isAccessRestricted: true`; a previously visible `portfolio-v2` repository remains searchable. `list_projects(search: "labos")` returns zero projects. | This establishes that Vercel can now see the exact LabOS repository for import. The connector does not expose the GitHub installation's complete selected-repository list or saved-change actor, so preservation of every other selection remains `NOT_ATTESTED`. No Vercel project, build, or deployment was created. |

[GitHub's installed-app instructions](https://docs.github.com/en/apps/using-github-apps/reviewing-and-modifying-installed-github-apps) document inspecting an installed app under account Settings → Applications → Installed GitHub Apps → Configure, then using **Only select repositories** and the repository selector. [Vercel's Git documentation](https://vercel.com/docs/git) describes importing from the repositories available to the connected Git account. These are provider instructions, not current installation evidence.

Before any change, verify on the authenticated GitHub installation screen that the app is Vercel, the owner is the personal `alilefta` account, the current selection is **Only select repositories**, and the proposed delta adds only `alilefta/LabOS` while retaining the other existing selections. If any of those facts differs, stop. After the narrow grant, repeat Vercel's exact repository search and record whether LabOS appears. Revocation is to remove only LabOS from the selected repositories; do not change other grants.

## Current limitation and next action

The connected Vercel tools are read-only for this GitHub installation, the GitHub CLI is unauthenticated, and the previously attempted browser-control path was stopped by automatic approval review's usage limit. The Product Owner appears to have performed the repository-selection change: the exact LabOS repository is now visible to Vercel under a still access-restricted namespace. The complete GitHub installation selection and change actor are not independently attested. Do not infer that a Vercel project exists or that a protected deployment is ready. Project creation requires separate authority.

Independent V3 `PASS | CHECKPOINT` pre-change review (2026-10-10) found the action bounded to adding only `alilefta/LabOS` to the existing selected-repositories Vercel App grant after confirming app, owner and retained selection. The reviewer found no implied authority for all-repository access, a new installation, project, build, secrets or deployment. Search absence remains an access gap, not an ineligibility conclusion. The review did not perform provider operations.

Independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT` post-change review (2026-10-10) confirmed that exact LabOS import visibility, restricted namespace and the retained known repository are accurately attributed to authenticated Vercel responses; the complete GitHub grant list and actor remain `NOT_ATTESTED`. No project, build, secrets or deployment authority is inferred. This supports Product Owner disposition and does not itself close D2-V1.
