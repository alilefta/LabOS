import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutSalesRepsInputObjectSchema as LabUpdateWithoutSalesRepsInputObjectSchema } from './LabUpdateWithoutSalesRepsInput.schema';
import { LabUncheckedUpdateWithoutSalesRepsInputObjectSchema as LabUncheckedUpdateWithoutSalesRepsInputObjectSchema } from './LabUncheckedUpdateWithoutSalesRepsInput.schema';
import { LabCreateWithoutSalesRepsInputObjectSchema as LabCreateWithoutSalesRepsInputObjectSchema } from './LabCreateWithoutSalesRepsInput.schema';
import { LabUncheckedCreateWithoutSalesRepsInputObjectSchema as LabUncheckedCreateWithoutSalesRepsInputObjectSchema } from './LabUncheckedCreateWithoutSalesRepsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutSalesRepsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutSalesRepsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutSalesRepsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSalesRepsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutSalesRepsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutSalesRepsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutSalesRepsInput>;
export const LabUpsertWithoutSalesRepsInputObjectZodSchema = makeSchema();
