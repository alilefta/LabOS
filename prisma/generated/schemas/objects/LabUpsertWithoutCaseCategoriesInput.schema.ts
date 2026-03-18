import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutCaseCategoriesInputObjectSchema as LabUpdateWithoutCaseCategoriesInputObjectSchema } from './LabUpdateWithoutCaseCategoriesInput.schema';
import { LabUncheckedUpdateWithoutCaseCategoriesInputObjectSchema as LabUncheckedUpdateWithoutCaseCategoriesInputObjectSchema } from './LabUncheckedUpdateWithoutCaseCategoriesInput.schema';
import { LabCreateWithoutCaseCategoriesInputObjectSchema as LabCreateWithoutCaseCategoriesInputObjectSchema } from './LabCreateWithoutCaseCategoriesInput.schema';
import { LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema as LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema } from './LabUncheckedCreateWithoutCaseCategoriesInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutCaseCategoriesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseCategoriesInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutCaseCategoriesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCaseCategoriesInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutCaseCategoriesInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutCaseCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutCaseCategoriesInput>;
export const LabUpsertWithoutCaseCategoriesInputObjectZodSchema = makeSchema();
