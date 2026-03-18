import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutProductsInputObjectSchema as LabUpdateWithoutProductsInputObjectSchema } from './LabUpdateWithoutProductsInput.schema';
import { LabUncheckedUpdateWithoutProductsInputObjectSchema as LabUncheckedUpdateWithoutProductsInputObjectSchema } from './LabUncheckedUpdateWithoutProductsInput.schema';
import { LabCreateWithoutProductsInputObjectSchema as LabCreateWithoutProductsInputObjectSchema } from './LabCreateWithoutProductsInput.schema';
import { LabUncheckedCreateWithoutProductsInputObjectSchema as LabUncheckedCreateWithoutProductsInputObjectSchema } from './LabUncheckedCreateWithoutProductsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutProductsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutProductsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutProductsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutProductsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutProductsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutProductsInput>;
export const LabUpsertWithoutProductsInputObjectZodSchema = makeSchema();
