import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateWithoutProductInputObjectSchema as WorkTypeCreateWithoutProductInputObjectSchema } from './WorkTypeCreateWithoutProductInput.schema';
import { WorkTypeUncheckedCreateWithoutProductInputObjectSchema as WorkTypeUncheckedCreateWithoutProductInputObjectSchema } from './WorkTypeUncheckedCreateWithoutProductInput.schema';
import { WorkTypeCreateOrConnectWithoutProductInputObjectSchema as WorkTypeCreateOrConnectWithoutProductInputObjectSchema } from './WorkTypeCreateOrConnectWithoutProductInput.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WorkTypeCreateWithoutProductInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutProductInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => WorkTypeCreateOrConnectWithoutProductInputObjectSchema).optional(),
  connect: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).optional()
}).strict();
export const WorkTypeCreateNestedOneWithoutProductInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateNestedOneWithoutProductInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateNestedOneWithoutProductInput>;
export const WorkTypeCreateNestedOneWithoutProductInputObjectZodSchema = makeSchema();
