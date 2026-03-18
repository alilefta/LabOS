import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeCreateWithoutLabInputObjectSchema as WorkTypeCreateWithoutLabInputObjectSchema } from './WorkTypeCreateWithoutLabInput.schema';
import { WorkTypeUncheckedCreateWithoutLabInputObjectSchema as WorkTypeUncheckedCreateWithoutLabInputObjectSchema } from './WorkTypeUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => WorkTypeCreateWithoutLabInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const WorkTypeCreateOrConnectWithoutLabInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateOrConnectWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateOrConnectWithoutLabInput>;
export const WorkTypeCreateOrConnectWithoutLabInputObjectZodSchema = makeSchema();
