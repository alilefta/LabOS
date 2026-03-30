import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateWithoutProductsInputObjectSchema as WorkTypeCreateWithoutProductsInputObjectSchema } from './WorkTypeCreateWithoutProductsInput.schema';
import { WorkTypeUncheckedCreateWithoutProductsInputObjectSchema as WorkTypeUncheckedCreateWithoutProductsInputObjectSchema } from './WorkTypeUncheckedCreateWithoutProductsInput.schema';
import { WorkTypeCreateOrConnectWithoutProductsInputObjectSchema as WorkTypeCreateOrConnectWithoutProductsInputObjectSchema } from './WorkTypeCreateOrConnectWithoutProductsInput.schema';
import { WorkTypeUpsertWithoutProductsInputObjectSchema as WorkTypeUpsertWithoutProductsInputObjectSchema } from './WorkTypeUpsertWithoutProductsInput.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeUpdateToOneWithWhereWithoutProductsInputObjectSchema as WorkTypeUpdateToOneWithWhereWithoutProductsInputObjectSchema } from './WorkTypeUpdateToOneWithWhereWithoutProductsInput.schema';
import { WorkTypeUpdateWithoutProductsInputObjectSchema as WorkTypeUpdateWithoutProductsInputObjectSchema } from './WorkTypeUpdateWithoutProductsInput.schema';
import { WorkTypeUncheckedUpdateWithoutProductsInputObjectSchema as WorkTypeUncheckedUpdateWithoutProductsInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutProductsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WorkTypeCreateWithoutProductsInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutProductsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => WorkTypeCreateOrConnectWithoutProductsInputObjectSchema).optional(),
  upsert: z.lazy(() => WorkTypeUpsertWithoutProductsInputObjectSchema).optional(),
  connect: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => WorkTypeUpdateToOneWithWhereWithoutProductsInputObjectSchema), z.lazy(() => WorkTypeUpdateWithoutProductsInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutProductsInputObjectSchema)]).optional()
}).strict();
export const WorkTypeUpdateOneRequiredWithoutProductsNestedInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateOneRequiredWithoutProductsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateOneRequiredWithoutProductsNestedInput>;
export const WorkTypeUpdateOneRequiredWithoutProductsNestedInputObjectZodSchema = makeSchema();
