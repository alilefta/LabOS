# Exact isolated resource cleanup

Independent V3 `PASS | CODE/ARCHITECTURE + RUNTIME_EVIDENCE` was obtained while the project remained available for read-only review. Immediately before deletion, Vercel CLI 62.1.0 inspected exact project `labos-s001-conformance-20261002-1612-7b82c717` under `ali-leftas-projects` and returned expected ID `prj_gA2rdICyXucVuw9r97ARo1zZqSb3`. Only this run-owned project was removed with `vercel project rm ... --scope ali-leftas-projects`; CLI returned `Success! Project ... removed` and stated deployments were included.

Fresh post-delete CLI inspection returned `project_not_found` for that exact project name. Separate fresh inspection of each exact run-owned deployment returned `Can't find the deployment`:

| ID | Role | Post-delete |
| --- | --- | --- |
| `dpl_BVJSufRAeaGiANot8YZd67yryF8N` | inert protected first Production placeholder | absent |
| `dpl_93J58Z1QYMyKBUGzU8wmMWh5rrqe` | exploratory protected Preview | absent |
| `dpl_GrTK61nwA6i2KX6cQJA9yrA6uVAV` | corrected protected Preview | absent |

For local cleanup, PowerShell resolved the workspace and exact run root to absolute paths, required the target to be a workspace child with basename `vercel-s001-conformance-20261002-1612-7b82c717`, and required the run pointer content to match before deleting either. Post-delete checks returned `runRootAbsent: true` and `pointerAbsent: true`. Retained evidence under this directory was not deleted. The earlier stopped and accepted Preview evidence packets and their unrelated resources were not modified by this cleanup.
