# Exact run-owned cleanup attestation

After independent `PASS | RUNTIME_EVIDENCE`, Vercel CLI 62.1.0 inspected `ali-leftas-projects/labos-s001-probe-20261002-1526-a84e` and returned the expected project ID `prj_dfN21ReGgGOucQ8uWFQEkNd5sMYM`. Only then was `vercel project rm labos-s001-probe-20261002-1526-a84e --scope ali-leftas-projects` confirmed. CLI returned `Success! Project labos-s001-probe-20261002-1526-a84e removed`.

Fresh post-delete `vercel project inspect` of the exact name exited 1 with reason `project_not_found`. Separate `vercel inspect` calls of the exact run-owned deployments each exited 1 with `Can't find the deployment`:

| Deployment | Prior role | Post-delete result |
| --- | --- | --- |
| `dpl_8u6UC4LgH4mBtRT6QBq6w9KTHr1v` | inert first Production placeholder | absent |
| `dpl_CMry6ihBH1y31gTfPnFqjmTMzM2C` | failed first Preview build | absent |
| `dpl_FJp2ad7QQmFNqt5rAreTvNcb1qpL` | READY synthetic Preview probe | absent |

For local cleanup, PowerShell resolved the workspace and `experiments/vercel-s001-preview-retry-20261002-1526-a84e` to absolute paths, required the target to begin with the workspace directory prefix, and required its basename to equal the exact run ID before `Remove-Item -LiteralPath ... -Recurse -Force`. The post-delete check returned `run-root-absent=True`. The previous stopped runs and their retained evidence were not touched. No Vercel public URL, credential, bypass token, or synthetic JPEG bytes are retained here.
