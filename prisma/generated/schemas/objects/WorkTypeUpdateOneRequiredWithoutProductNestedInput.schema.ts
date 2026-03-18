import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeCreateWithoutProductInputObjectSchema as WorkTypeCreateWithoutProductInputObjectSchema } from './WorkTypeCreateWithoutProductInput.schema';
import { WorkTypeUncheckedCreateWithoutProductInputObjectSchema as WorkTypeUncheckedCreateWithoutProductInputObjectSchema } from './WorkTypeUncheckedCreateWithoutProductInput.schema';
import { WorkTypeCreateOrConnectWithoutProductInputObjectSchema as WorkTypeCreateOrConnectWithoutProductInputObjectSchema } from './WorkTypeCreateOrConnectWithoutProductInput.schema';
import { WorkTypeUpsertWithoutProductInputObjectSchema as WorkTypeUpsertWithoutProductInputObjectSchema } from './WorkTypeUpsertWithoutProductInput.schema';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeUpdateToOneWithWhereWithoutProductInputObjectSchema as WorkTypeUpdateToOneWithWhereWithoutProductInputObjectSchema } from './WorkTypeUpdateToOneWithWhereWithoutProductInput.schema';
import { WorkTypeUpdateWithoutProductInputObjectSchema as WorkTypeUpdateWithoutProductInputObjectSchema } from './WorkTypeUpdateWithoutProductInput.schema';
import { WorkTypeUncheckedUpdateWithoutProductInputObjectSchema as WorkTypeUncheckedUpdateWithoutProductInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutProductInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WorkTypeCreateWithoutProductInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutProductInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => WorkTypeCreateOrConnectWithoutProductInputObjectSchema).optional(),
  upsert: z.lazy(() => WorkTypeUpsertWithoutProductInputObjectSchema).optional(),
  connect: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => WorkTypeUpdateToOneWithWhereWithoutProductInputObjectSchema), z.lazy(() => WorkTypeUpdateWithoutProductInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutProductInputObjectSchema)]).optional()
}).strict();
export const WorkTypeUpdateOneRequiredWithoutProductNestedInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateOneRequiredWithoutProductNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateOneRequiredWithoutProductNestedInput>;
export const WorkTypeUpdateOneRequiredWithoutProductNestedInputObjectZodSchema = makeSchema();
