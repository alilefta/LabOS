# Exact run-owned cleanup

- Before deletion, Vercel CLI 62.1.0 identified project `ali-leftas-projects/labos-s001-core-20261003-78ef5a0514` as `prj_s3CaBxyNhMANuY3lJuTViZWw8jtF`.
- The exact-name `vercel project rm` command reported successful removal, including project deployments.
- Subsequent exact-name project inspection returned `project_not_found` (exit 1).
- Subsequent inspection of Preview deployment `dpl_tKLcm2bfuQVtAN2HDXkoJdjhGMhM` returned not found (exit 1).
- Subsequent inspection of placeholder deployment `dpl_EX5MMjDZMARZte5HRL9bDzk6hnkZ` returned not found (exit 1).
- Local run root `experiments/s001-core-preview-20261003-78ef5a0514` was resolved to the exact expected absolute path under the workspace before recursive deletion. Run root absent: `True`. Temporary run-root pointer absent: `True`.
- No other Vercel project, deployment, or local run root was deleted.

The project/deployment verification occurred through the authenticated team-scoped Vercel CLI after deletion. This attests absence at the time checked, not any future platform retention behavior.
