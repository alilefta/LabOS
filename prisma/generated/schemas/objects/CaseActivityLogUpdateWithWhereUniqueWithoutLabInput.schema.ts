import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogUpdateWithoutLabInputObjectSchema as CaseActivityLogUpdateWithoutLabInputObjectSchema } from './CaseActivityLogUpdateWithoutLabInput.schema';
import { CaseActivityLogUncheckedUpdateWithoutLabInputObjectSchema as CaseActivityLogUncheckedUpdateWithoutLabInputObjectSchema } from './CaseActivityLogUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CaseActivityLogUpdateWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const CaseActivityLogUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUpdateWithWhereUniqueWithoutLabInput>;
export const CaseActivityLogUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
