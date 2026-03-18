import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutCaseCategoriesInputObjectSchema as LabCreateWithoutCaseCategoriesInputObjectSchema } from './LabCreateWithoutCaseCategoriesInput.schema';
import { LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema as LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema } from './LabUncheckedCreateWithoutCaseCategoriesInput.schema';
import { LabCreateOrConnectWithoutCaseCategoriesInputObjectSchema as LabCreateOrConnectWithoutCaseCategoriesInputObjectSchema } from './LabCreateOrConnectWithoutCaseCategoriesInput.schema';
import { LabUpsertWithoutCaseCategoriesInputObjectSchema as LabUpsertWithoutCaseCategoriesInputObjectSchema } from './LabUpsertWithoutCaseCategoriesInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutCaseCategoriesInputObjectSchema as LabUpdateToOneWithWhereWithoutCaseCategoriesInputObjectSchema } from './LabUpdateToOneWithWhereWithoutCaseCategoriesInput.schema';
import { LabUpdateWithoutCaseCategoriesInputObjectSchema as LabUpdateWithoutCaseCategoriesInputObjectSchema } from './LabUpdateWithoutCaseCategoriesInput.schema';
import { LabUncheckedUpdateWithoutCaseCategoriesInputObjectSchema as LabUncheckedUpdateWithoutCaseCategoriesInputObjectSchema } from './LabUncheckedUpdateWithoutCaseCategoriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutCaseCategoriesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutCaseCategoriesInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutCaseCategoriesInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutCaseCategoriesInputObjectSchema), z.lazy(() => LabUpdateWithoutCaseCategoriesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseCategoriesInputObjectSchema)]).optional()
}).strict();
export const LabUpdateOneRequiredWithoutCaseCategoriesNestedInputObjectSchema: z.ZodType<Prisma.LabUpdateOneRequiredWithoutCaseCategoriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateOneRequiredWithoutCaseCategoriesNestedInput>;
export const LabUpdateOneRequiredWithoutCaseCategoriesNestedInputObjectZodSchema = makeSchema();
