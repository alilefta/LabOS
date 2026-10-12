# Exact run-owned cleanup attestation

- Run: `s001-core-preview-20261003-157cb99a8d`.
- Scope: `ali-leftas-projects`.
- Before deletion, `vercel project inspect` matched project name `labos-s001-core-20261003-157cb99a8d` and ID `prj_B2W292QNHmC4Lk4xeZIO4oHHksKr`.
- `vercel project rm` reported successful removal of that exact project, including its deployments.
- Subsequent project inspect returned exit 1 with `project_not_found`.
- Subsequent inspect of inert placeholder `dpl_GNX2ABvCrZ4nWwtN3dmYjSBtocuj` returned exit 1, deployment not found.
- Subsequent inspect of Preview `dpl_DEGWD32tgZdu4tTaAdjKRjZNMRZn` returned exit 1, deployment not found.
- The exact local run root was resolved and checked under the workspace before recursive removal: `experiments/s001-core-preview-20261003-157cb99a8d`.
- `Test-Path` of that exact root after removal returned `False`.
- Durable sanitized evidence under this directory was retained. No other project, deployment, or local directory was deleted.
