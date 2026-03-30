import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateWithoutProductsInputObjectSchema as WorkTypeCreateWithoutProductsInputObjectSchema } from './WorkTypeCreateWithoutProductsInput.schema';
import { WorkTypeUncheckedCreateWithoutProductsInputObjectSchema as WorkTypeUncheckedCreateWithoutProductsInputObjectSchema } from './WorkTypeUncheckedCreateWithoutProductsInput.schema';
import { WorkTypeCreateOrConnectWithoutProductsInputObjectSchema as WorkTypeCreateOrConnectWithoutProductsInputObjectSchema } from './WorkTypeCreateOrConnectWithoutProductsInput.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WorkTypeCreateWithoutProductsInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutProductsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => WorkTypeCreateOrConnectWithoutProductsInputObjectSchema).optional(),
  connect: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).optional()
}).strict();
export const WorkTypeCreateNestedOneWithoutProductsInputObjectSchema: z.ZodType<Prisma.WorkTypeCreateNestedOneWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeCreateNestedOneWithoutProductsInput>;
export const WorkTypeCreateNestedOneWithoutProductsInputObjectZodSchema = makeSchema();
