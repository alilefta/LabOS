# General Notes

## Lessons

### 1. Using numbers in Zod without getting recieved string, expected number

to resolve this issue:

**for required numbers:**

`ts z.coerce.number<number>()` instead of transforming or z.number() only

**for optional numbers:**
`ts z.coerce.number<number>().min(0, "").optional(),`

## Prisma Client usage

To use {Prisma} from "@prisma/client", I have to use "@/generated/prisma/client" because I have custom output
