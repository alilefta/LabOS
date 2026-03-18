import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateWithoutLabInputObjectSchema as WorkTypeCreateWithoutLabInputObjectSchema } from './WorkTypeCreateWithoutLabInput.schema';
import { WorkTypeUncheckedCreateWithoutLabInputObjectSchema as WorkTypeUncheckedCreateWithoutLabInputObjectSchema } from './WorkTypeUncheckedCreateWithoutLabInput.schema';
import { WorkTypeCreateOrConnectWithoutLabInputObjectSchema as WorkTypeCreateOrConnectWithoutLabInputObjectSchema } from './WorkTypeCreateOrConnectWithoutLabInput.schema';
import { WorkTypeCreateManyLabInputEnvelopeObjectSchema as WorkTypeCreateManyLabInputEnvelopeObjectSchema } from './WorkTypeCreateManyLabInputEnvelope.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WorkTypeCreateWithoutLabInputObjectSchema), z.lazy(() => WorkTypeCreateWithoutLabInputObjectSchema).array(), z.lazy(() => WorkTypeUncheckedCreateWithoutLabInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutLabInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WorkTypeCreateOrConnectWithoutLabInputObjectSchema), z.lazy(() => WorkTypeCreateOrConnectWithoutLabInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WorkTypeCreateManyLabInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => WorkTypeWhereUniqueInputObjectSchema), z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const WorkTypeUncheckedCreateNestedManyWithoutLabInputObjectSchema: z.ZodType<Prisma.WorkTypeUncheckedCreateNestedManyWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUncheckedCreateNestedManyWithoutLabInput>;
export const WorkTypeUncheckedCreateNestedManyWithoutLabInputObjectZodSchema = makeSchema();
