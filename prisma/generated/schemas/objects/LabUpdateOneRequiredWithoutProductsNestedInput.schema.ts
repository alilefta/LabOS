import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutProductsInputObjectSchema as LabCreateWithoutProductsInputObjectSchema } from './LabCreateWithoutProductsInput.schema';
import { LabUncheckedCreateWithoutProductsInputObjectSchema as LabUncheckedCreateWithoutProductsInputObjectSchema } from './LabUncheckedCreateWithoutProductsInput.schema';
import { LabCreateOrConnectWithoutProductsInputObjectSchema as LabCreateOrConnectWithoutProductsInputObjectSchema } from './LabCreateOrConnectWithoutProductsInput.schema';
import { LabUpsertWithoutProductsInputObjectSchema as LabUpsertWithoutProductsInputObjectSchema } from './LabUpsertWithoutProductsInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutProductsInputObjectSchema as LabUpdateToOneWithWhereWithoutProductsInputObjectSchema } from './LabUpdateToOneWithWhereWithoutProductsInput.schema';
import { LabUpdateWithoutProductsInputObjectSchema as LabUpdateWithoutProductsInputObjectSchema } from './LabUpdateWithoutProductsInput.schema';
import { LabUncheckedUpdateWithoutProductsInputObjectSchema as LabUncheckedUpdateWithoutProductsInputObjectSchema } from './LabUncheckedUpdateWithoutProductsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutProductsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutProductsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutProductsInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutProductsInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutProductsInputObjectSchema), z.lazy(() => LabUpdateWithoutProductsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutProductsInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutProductsNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutProductsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutProductsNestedInput>;
export const LabUpdateOneRequiredWithoutProductsNestedInputObjectZodSchema = makeSchema();
