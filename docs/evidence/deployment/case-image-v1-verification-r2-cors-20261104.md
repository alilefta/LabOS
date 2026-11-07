# Case Image V1 verification R2 CORS — 2026-11-04

Scope: one Product Owner-authorized Cloudflare R2 CORS policy change and readback. No R2 object operation, public-access change, Vercel or Supabase mutation, deployment, or upload activation occurred.

## Preflight

- Cloudflare account ID: `81491884397e7a318bb3fd334fd51496`, matching the pinned Case upload verification account.
- Bucket `labos-r2-verification` exists in that account. The `r2.dev` managed domain reported `enabled: false`; custom domains list was empty.
- `GET /accounts/{account_id}/r2/buckets/labos-r2-verification/cors` returned HTTP 404, Cloudflare code `10059`, “The CORS configuration does not exist.” No existing rules were overwritten.
- The application pins origin `https://lab-os-verification-deployment.vercel.app`. Its Case image UI requires the intent response to specify `PUT` with `If-None-Match: *`, then sends the original File directly using the returned headers.

## Change and readback

One `PUT` to the verification bucket CORS control-plane endpoint succeeded. Independent `GET` readback returned exactly:

```json
{
  "rules": [
    {
      "allowed": {
        "origins": ["https://lab-os-verification-deployment.vercel.app"],
        "methods": ["PUT"],
        "headers": ["If-None-Match", "Content-Type"]
      },
      "maxAgeSeconds": 300
    }
  ]
}
```

There is no wildcard, extra origin, method, header, or exposed response header. Post-change bucket readback still identified `labos-r2-verification`; `r2.dev` remained disabled and custom domains remained empty.

## No-object preflight

An unsigned `OPTIONS` request to a synthetic, nonexistent key path on the account's R2 S3 endpoint, with the verification Origin and requested `PUT`/`if-none-match,content-type`, returned HTTP 204. Response headers were `Access-Control-Allow-Origin: https://lab-os-verification-deployment.vercel.app`, `Access-Control-Allow-Methods: PUT`, `Access-Control-Allow-Headers: if-none-match, content-type`, and `Access-Control-Max-Age: 300`.

This is CORS preflight evidence only. No signed PUT, object upload, exact-object read, application route, or browser lifecycle was tested. The upload flag remains outside this task.

## Independent review

Independent V3 returned `PASS | RUNTIME_EVIDENCE`. The reviewer separately confirmed the exact account, bucket, single CORS rule, disabled `r2.dev`, absence of custom domains, application PUT contract, and a 204 no-object OPTIONS preflight with the expected headers. No material finding was reported.
