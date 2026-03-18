import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeScalarWhereInputObjectSchema as WorkTypeScalarWhereInputObjectSchema } from './WorkTypeScalarWhereInput.schema';
import { WorkTypeUpdateManyMutationInputObjectSchema as WorkTypeUpdateManyMutationInputObjectSchema } from './WorkTypeUpdateManyMutationInput.schema';
import { WorkTypeUncheckedUpdateManyWithoutLabInputObjectSchema as WorkTypeUncheckedUpdateManyWithoutLabInputObjectSchema } from './WorkTypeUncheckedUpdateManyWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => WorkTypeUpdateManyMutationInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateManyWithoutLabInputObjectSchema)])
}).strict();
export const WorkTypeUpdateManyWithWhereWithoutLabInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateManyWithWhereWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateManyWithWhereWithoutLabInput>;
export const WorkTypeUpdateManyWithWhereWithoutLabInputObjectZodSchema = makeSchema();
