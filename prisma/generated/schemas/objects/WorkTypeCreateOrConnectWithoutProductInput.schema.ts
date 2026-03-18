import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeCreateWithoutProductInputObjectSchema as WorkTypeCreateWithoutProductInputObjectSchema } from './WorkTypeCreateWithoutProductInput.schema';
import { WorkTypeUncheckedCreateWithoutProductInputObjectSchema as WorkTypeUncheckedCreateWithoutProductInputObjectSchema } from './WorkTypeUncheckedCreateWithoutProductInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => WorkTypeCreateWithoutProductInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutProductInputObjectSchema)])
}).strict();
export const WorkTypeCreateOrConnectWithoutProductInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateOrConnectWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateOrConnectWithoutProductInput>;
export const WorkTypeCreateOrConnectWithoutProductInputObjectZodSchema = makeSchema();
