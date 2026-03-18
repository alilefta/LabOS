import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutSalesRepsInputObjectSchema as LabCreateWithoutSalesRepsInputObjectSchema } from './LabCreateWithoutSalesRepsInput.schema';
import { LabUncheckedCreateWithoutSalesRepsInputObjectSchema as LabUncheckedCreateWithoutSalesRepsInputObjectSchema } from './LabUncheckedCreateWithoutSalesRepsInput.schema';
import { LabCreateOrConnectWithoutSalesRepsInputObjectSchema as LabCreateOrConnectWithoutSalesRepsInputObjectSchema } from './LabCreateOrConnectWithoutSalesRepsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutSalesRepsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSalesRepsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutSalesRepsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutSalesRepsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutSalesRepsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutSalesRepsInput>;
export const LabCreateNestedOneWithoutSalesRepsInputObjectZodSchema = makeSchema();
