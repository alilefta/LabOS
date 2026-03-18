import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutCaseCategoriesInputObjectSchema as LabUpdateWithoutCaseCategoriesInputObjectSchema } from './LabUpdateWithoutCaseCategoriesInput.schema';
import { LabUncheckedUpdateWithoutCaseCategoriesInputObjectSchema as LabUncheckedUpdateWithoutCaseCategoriesInputObjectSchema } from './LabUncheckedUpdateWithoutCaseCategoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutCaseCategoriesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCaseCategoriesInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutCaseCategoriesInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCaseCategoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCaseCategoriesInput>;
export const LabUpdateToOneWithWhereWithoutCaseCategoriesInputObjectZodSchema = makeSchema();
