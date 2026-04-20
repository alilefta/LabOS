import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithoutLabInputObjectSchema as CaseActivityLogUpdateWithoutLabInputObjectSchema } from './CaseActivityLogUpdateWithoutLabInput.schema';
import { CaseActivityLogUncheckedUpdateWithoutLabInputObjectSchema as CaseActivityLogUncheckedUpdateWithoutLabInputObjectSchema } from './CaseActivityLogUncheckedUpdateWithoutLabInput.schema';
import { CaseActivityLogCreateWithoutLabInputObjectSchema as CaseActivityLogCreateWithoutLabInputObjectSchema } from './CaseActivityLogCreateWithoutLabInput.schema';
import { CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema as CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CaseActivityLogUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseActivityLogUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpsertWithWhereUniqueWithoutLabInput>;
export const CaseActivityLogUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
