import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { WorkTypeWhereUniqueInputObjectSchema as WorkTypeWhereUniqueInputObjectSchema } from './WorkTypeWhereUniqueInput.schema';
import { WorkTypeUpdateWithoutLabInputObjectSchema as WorkTypeUpdateWithoutLabInputObjectSchema } from './WorkTypeUpdateWithoutLabInput.schema';
import { WorkTypeUncheckedUpdateWithoutLabInputObjectSchema as WorkTypeUncheckedUpdateWithoutLabInputObjectSchema } from './WorkTypeUncheckedUpdateWithoutLabInput.schema';
import { WorkTypeCreateWithoutLabInputObjectSchema as WorkTypeCreateWithoutLabInputObjectSchema } from './WorkTypeCreateWithoutLabInput.schema';
import { WorkTypeUncheckedCreateWithoutLabInputObjectSchema as WorkTypeUncheckedCreateWithoutLabInputObjectSchema } from './WorkTypeUncheckedCreateWithoutLabInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WorkTypeWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => WorkTypeUpdateWithoutLabInputObjectSchema), z.lazy(() => WorkTypeUncheckedUpdateWithoutLabInputObjectSchema)]),
  create: z.union([z.lazy(() => WorkTypeCreateWithoutLabInputObjectSchema), z.lazy(() => WorkTypeUncheckedCreateWithoutLabInputObjectSchema)])
}).strict();
export const WorkTypeUpsertWithWhereUniqueWithoutLabInputObjectSchema: z.ZodType<Prisma.WorkTypeUpsertWithWhereUniqueWithoutLabInput> = makeSchema() as unknown as z.ZodType<Prisma.WorkTypeUpsertWithWhereUniqueWithoutLabInput>;
export const WorkTypeUpsertWithWhereUniqueWithoutLabInputObjectZodSchema = makeSchema();
