import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeCreateWithoutProductsInputObjectSchema as WorkTypeCreateWithoutProductsInputObjectSchema } from './WorkTypeCreateWithoutProductsInput.schema';
import { WorkTypeUncheckedCreateWithoutProductsInputObjectSchema as WorkTypeUncheckedCreateWithoutProductsInputObjectSchema } from './WorkTypeUncheckedCreateWithoutProductsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => WorkTypeCreateWithoutProductsInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutProductsInputObjectSchema)])
}).strict();
export const WorkTypeCreateOrConnectWithoutProductsInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateOrConnectWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateOrConnectWithoutProductsInput>;
export const WorkTypeCreateOrConnectWithoutProductsInputObjectZodSchema = makeSchema();
