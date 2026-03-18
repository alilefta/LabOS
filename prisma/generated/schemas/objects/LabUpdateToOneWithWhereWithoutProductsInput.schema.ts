import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutProductsInputObjectSchema as LabUpdateWithoutProductsInputObjectSchema } from './LabUpdateWithoutProductsInput.schema';
import { LabUncheckedUpdateWithoutProductsInputObjectSchema as LabUncheckedUpdateWithoutProductsInputObjectSchema } from './LabUncheckedUpdateWithoutProductsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutProductsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutProductsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutProductsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutProductsInput>;
export const LabUpdateToOneWithWhereWithoutProductsInputObjectZodSchema = makeSchema();
