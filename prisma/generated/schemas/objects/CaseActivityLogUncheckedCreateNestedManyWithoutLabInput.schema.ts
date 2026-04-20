import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseActivityLogCreateWithoutLabInputObjectSchema as CaseActivityLogCreateWithoutLabInputObjectSchema } from './CaseActivityLogCreateWithoutLabInput.schema';
import { CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema as CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema } from './CaseActivityLogUncheckedCreateWithoutLabInput.schema';
import { CaseActivityLogCreateOrConnectWithoutLabInputObjectSchema as CaseActivityLogCreateOrConnectWithoutLabInputObjectSchema } from './CaseActivityLogCreateOrConnectWithoutLabInput.schema';
import { CaseActivityLogCreateManyLabInputEnvelopeObjectSchema as CaseActivityLogCreateManyLabInputEnvelopeObjectSchema } from './CaseActivityLogCreateManyLabInputEnvelope.schema';
import { CaseActivityLogWhereUniqueInputObjectSchema as CaseActivityLogWhereUniqueInputObjectSchema } from './CaseActivityLogWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseActivityLogCreateWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseActivityLogCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseActivityLogCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseActivityLogCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema), z.lazy(() => CaseActivityLogWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseActivityLogUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseActivityLogUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseActivityLogUncheckedCreateNestedManyWithoutLabInput>;
export const CaseActivityLogUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
