'use client'

/**
 * Client-side Axiom ingestion is intentionally disabled. Authorization shadow
 * telemetry is produced only on the trusted server boundary, and its ingest
 * token must never be included in a browser bundle. Add a server proxy before
 * introducing Web Vitals or other browser telemetry here.
 */
export {}
