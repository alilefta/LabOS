import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutSalesRepsInputObjectSchema as LabCreateWithoutSalesRepsInputObjectSchema } from './LabCreateWithoutSalesRepsInput.schema';
import { LabUncheckedCreateWithoutSalesRepsInputObjectSchema as LabUncheckedCreateWithoutSalesRepsInputObjectSchema } from './LabUncheckedCreateWithoutSalesRepsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutSalesRepsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSalesRepsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutSalesRepsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutSalesRepsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutSalesRepsInput>;
export const LabCreateOrConnectWithoutSalesRepsInputObjectZodSchema = makeSchema();
