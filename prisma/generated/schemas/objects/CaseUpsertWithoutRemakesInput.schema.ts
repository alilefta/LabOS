import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseUpdateWithoutRemakesInputObjectSchema as CaseUpdateWithoutRemakesInputObjectSchema } from './CaseUpdateWithoutRemakesInput.schema';
import { CaseUncheckedUpdateWithoutRemakesInputObjectSchema as CaseUncheckedUpdateWithoutRemakesInputObjectSchema } from './CaseUncheckedUpdateWithoutRemakesInput.schema';
import { CaseCreateWithoutRemakesInputObjectSchema as CaseCreateWithoutRemakesInputObjectSchema } from './CaseCreateWithoutRemakesInput.schema';
import { CaseUncheckedCreateWithoutRemakesInputObjectSchema as CaseUncheckedCreateWithoutRemakesInputObjectSchema } from './CaseUncheckedCreateWithoutRemakesInput.schema';
import { CaseWhereInputObjectSchema as CaseWhereInputObjectSchema } from './CaseWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => CaseUpdateWithoutRemakesInputObjectSchema), z.lazy(() => CaseUncheckedUpdateWithoutRemakesInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseCreateWithoutRemakesInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutRemakesInputObjectSchema)]),
  where: z.lazy(() => CaseWhereInputObjectSchema).optional()
}).strict();
export const CaseUpsertWithoutRemakesInputObjectSchema: z.ZodType<Prisma.CaseUpsertWithoutRemakesInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUpsertWithoutRemakesInput>;
export const CaseUpsertWithoutRemakesInputObjectZodSchema = makeSchema();
