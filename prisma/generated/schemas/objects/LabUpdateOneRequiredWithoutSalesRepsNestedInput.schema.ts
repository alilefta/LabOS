import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutSalesRepsInputObjectSchema as LabCreateWithoutSalesRepsInputObjectSchema } from './LabCreateWithoutSalesRepsInput.schema';
import { LabUncheckedCreateWithoutSalesRepsInputObjectSchema as LabUncheckedCreateWithoutSalesRepsInputObjectSchema } from './LabUncheckedCreateWithoutSalesRepsInput.schema';
import { LabCreateOrConnectWithoutSalesRepsInputObjectSchema as LabCreateOrConnectWithoutSalesRepsInputObjectSchema } from './LabCreateOrConnectWithoutSalesRepsInput.schema';
import { LabUpsertWithoutSalesRepsInputObjectSchema as LabUpsertWithoutSalesRepsInputObjectSchema } from './LabUpsertWithoutSalesRepsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutSalesRepsInputObjectSchema as LabUpdateToOneWithWhereWithoutSalesRepsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutSalesRepsInput.schema';
import { LabUpdateWithoutSalesRepsInputObjectSchema as LabUpdateWithoutSalesRepsInputObjectSchema } from './LabUpdateWithoutSalesRepsInput.schema';
import { LabUncheckedUpdateWithoutSalesRepsInputObjectSchema as LabUncheckedUpdateWithoutSalesRepsInputObjectSchema } from './LabUncheckedUpdateWithoutSalesRepsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutSalesRepsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSalesRepsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutSalesRepsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutSalesRepsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutSalesRepsInputObjectSchema), z.lazy(() => LabUpdateWithoutSalesRepsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutSalesRepsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutSalesRepsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutSalesRepsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutSalesRepsNestedInput>;
export const LabUpdateOneRequiredWithoutSalesRepsNestedInputObjectZodSchema = makeSchema();
