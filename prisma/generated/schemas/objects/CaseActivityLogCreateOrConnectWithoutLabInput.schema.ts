import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema';
import { CaseActivityLogCreateWithoutLabInputObjectSchema as CaseActivityLogCreateWithoutLabInputObjectSchema } from './CaseActivityLogCreateWithoutLabInput.schema';
import { CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema as CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const CaseActivityLogCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseActivityLogCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogCreateOrConnectWithoutLabInput>;
export const CaseActivityLogCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
