# Local emitted-server probe

Run root: `experiments/s001-identity-code-20261003` (temporary, isolated Next 16.3.3 Turbopack project). It copied the exact post-correction `identity.ts`, unchanged `core.ts`, `manifest.ts`, and `inspect.ts` into the same relative module layout and used the synthetic 333-byte baseline JPEG. [Final isolated build](isolated-next-build-final.txt) exited 0.

The compiled function was started locally with `next start` on port 38317. A bounded `mode=verify` call invoked the **compiled production `verifyS001CodecIdentity` function** with test-only dependency adapters: simulated Linux runtime and `/proc/self/maps` paths, exact installed package metadata and reviewed native bytes, and actual Julusian JavaScript load. It returned:

```json
{"outcome":"verified","digest":"6facda09ef3e2308608f2b0214c040791e276305a48a27036362402f95fffcf5"}
```

This verifies the compiled mapping-derived filesystem logic, including the `dirname` and package-metadata path, without passing a numeric module ID as a path. It **does not attest a real Linux mapping or Vercel runtime** because the adapter supplied the mapping/path facts on Windows.

An unmodified compiled `validateClinicalJpegS001Bytes` invocation with the synthetic baseline returned generic `{"outcome":"rejected"}` on Windows. That is expected from the Linux-only production platform gate; no Windows S001 success is claimed. Both responses contained only bounded results. The exact local listener was stopped and its absence checked.

The [compiled-bundle inspection](compiled-bundle-inspection.json) retains the emitted chunk SHA and relevant code excerpt. The package `load()` remains a bundled/external module load. The verified artifact path now derives from the sole native mapping after load; the old `packageEntry:()=>1930`/`dirname(packageEntry())` shape is absent.
