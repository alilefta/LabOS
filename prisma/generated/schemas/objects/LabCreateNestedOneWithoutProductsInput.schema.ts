import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutProductsInputObjectSchema as LabCreateWithoutProductsInputObjectSchema } from './LabCreateWithoutProductsInput.schema';
import { LabUncheckedCreateWithoutProductsInputObjectSchema as LabUncheckedCreateWithoutProductsInputObjectSchema } from './LabUncheckedCreateWithoutProductsInput.schema';
import { LabCreateOrConnectWithoutProductsInputObjectSchema as LabCreateOrConnectWithoutProductsInputObjectSchema } from './LabCreateOrConnectWithoutProductsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutProductsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutProductsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutProductsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutProductsInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutProductsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutProductsInput>;
export const LabCreateNestedOneWithoutProductsInputObjectZodSchema = makeSchema();
