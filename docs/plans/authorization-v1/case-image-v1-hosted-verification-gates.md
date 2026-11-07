# Case Image V1 hosted verification gates

Status: Historical verification checklist. The protected hosted test was accepted on 2026-11-06; see the [hosted closeout](../../evidence/files/authorization-v1/case-image-v1-hosted-verification/closure-20261106.md) and [current state](../../current.md). This document does not authorize another activation or customer production uploads.

## Browser to R2 contract

The browser sends a direct `PUT` to the short-lived, exact-object R2 URL returned by upload intent. The signed request requires `If-None-Match: *` to preserve create-only semantics. `fetch` sends the original `File` body and may also send its `Content-Type`. The verification bucket CORS rule must allow only `https://lab-os-verification-deployment.vercel.app` as origin, `PUT` as method, and `If-None-Match` and `Content-Type` as request headers. The browser does not read response headers, so no exposed response header is required. The browser's preflight is an `OPTIONS` request handled by R2 CORS; do not replace the signed `PUT` with an application upload proxy. Authorized viewing redirects to a temporary signed `GET`; ordinary image navigation does not require cross-origin JavaScript reads.

## Activation boundary

The server selects R2 only for the pinned Vercel project, production target, canonical verification URL, Supabase verification database identity, R2 account and bucket, Linux x64 Node 24/N-API 10, and complete credentials. Uploads additionally require `LABOS_CASE_IMAGE_HOSTED_VERIFICATION_ENABLED=1`. Local storage is selected only by explicit local development mode outside Vercel. Missing or mismatched identity disables the provider; switching off the hosted upload flag preserves authorized private reads of already attached files.

Before setting the upload flag, an operator must independently attest from Vercel project settings that deployment protection is enabled for the verification deployment, the verification domain is bound to the expected project and target, system environment variables are platform-populated, and existing application authentication remains required. Request headers and self-declared environment values cannot prove those control-plane facts by themselves. Keep the flag off if any attestation is missing.

The verification migration, bucket CORS, protected deployment, and controlled JPEG/PNG/WebP upload-and-view run were completed under separate authorizations. The closeout records their evidence and limitations. Do not apply this historical checklist to the customer-facing production project.
