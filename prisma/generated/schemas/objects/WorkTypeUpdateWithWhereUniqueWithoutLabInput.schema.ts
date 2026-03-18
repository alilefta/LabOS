import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeUpdateWithoutLabInputObjectSchema as WorkTypeUpdateWithoutLabInputObjectSchema } from './WorkTypeUpdateWithoutLabInput.schema';
import { WorkTypeUncheckedUpdateWithoutLabInputObjectSchema as WorkTypeUncheckedUpdateWithoutLabInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => WorkTypeUpdateWithoutLabInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutLabInputObjectSchema)])
}).strict();
export const WorkTypeUpdateWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.WorkTypeUpdateWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpdateWithWhereUniqueWithoutLabInput>;
export const WorkTypeUpdateWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
