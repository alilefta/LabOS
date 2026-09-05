# General Notes

Status: Archived
Authority: Historical
Owner: Project owner
Last reviewed: 2026-09-05

> This document is non-authoritative and does not define current LabOS architecture or security policy. Consult [current documentation](../../README.md), architecture, and decisions before using it.

## Lessons

### 1. Using numbers in Zod without getting recieved string, expected number

to resolve this issue:

**for required numbers:**

`ts z.coerce.number<number>()` instead of transforming or z.number() only

**for optional numbers:**
`ts z.coerce.number<number>().min(0, "").optional(),`

## Prisma Client usage

To use {Prisma} from "@prisma/client", I have to use "@/generated/prisma/client" because I have custom output
# Historical notes.
#
