import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutProductsInputObjectSchema as LabCreateWithoutProductsInputObjectSchema } from './LabCreateWithoutProductsInput.schema';
import { LabUncheckedCreateWithoutProductsInputObjectSchema as LabUncheckedCreateWithoutProductsInputObjectSchema } from './LabUncheckedCreateWithoutProductsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutProductsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutProductsInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutProductsInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutProductsInput>;
export const LabCreateOrConnectWithoutProductsInputObjectZodSchema = makeSchema();
