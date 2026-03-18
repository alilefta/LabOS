import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutSalesRepsInputObjectSchema as LabUpdateWithoutSalesRepsInputObjectSchema } from './LabUpdateWithoutSalesRepsInput.schema';
import { LabUncheckedUpdateWithoutSalesRepsInputObjectSchema as LabUncheckedUpdateWithoutSalesRepsInputObjectSchema } from './LabUncheckedUpdateWithoutSalesRepsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutSalesRepsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutSalesRepsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutSalesRepsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutSalesRepsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutSalesRepsInput>;
export const LabUpdateToOneWithWhereWithoutSalesRepsInputObjectZodSchema = makeSchema();
