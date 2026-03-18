import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { CaseCreateWithoutLabInputObjectSchema as CaseCreateWithoutLabInputObjectSchema } from './CaseCreateWithoutLabInput.schema';
import { CaseUncheckedCreateWithoutLabInputObjectSchema as CaseUncheckedCreateWithoutLabInputObjectSchema } from './CaseUncheckedCreateWithoutLabInput.schema';
import { CaseCreateOrConnectWithoutLabInputObjectSchema as CaseCreateOrConnectWithoutLabInputObjectSchema } from './CaseCreateOrConnectWithoutLabInput.schema';
import { CaseCreateManyLabInputEnvelopeObjectSchema as CaseCreateManyLabInputEnvelopeObjectSchema } from './CaseCreateManyLabInputEnvelope.schema';
import { CaseWhereUniqueInputObjectSchema as CaseWhereUniqueInputObjectSchema } from './CaseWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CaseCreateWithoutLabInputObjectSchema), z.lazy(() => CaseCreateWithoutLabInputObjectSchema).array(), z.lazy(() => CaseUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => CaseUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CaseCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => CaseCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CaseCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CaseWhereUniqueInputObjectSchema), z.lazy(() => CaseWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CaseUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.CaseUncheckedCreateNestedManyWithoutLabInput>;
export const CaseUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
