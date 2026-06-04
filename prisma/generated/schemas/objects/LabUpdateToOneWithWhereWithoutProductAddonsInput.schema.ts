import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutProductAddonsInputObjectSchema as LabUpdateWithoutProductAddonsInputObjectSchema } from './LabUpdateWithoutProductAddonsInput.schema';
import { LabUncheckedUpdateWithoutProductAddonsInputObjectSchema as LabUncheckedUpdateWithoutProductAddonsInputObjectSchema } from './LabUncheckedUpdateWithoutProductAddonsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutProductAddonsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutProductAddonsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutProductAddonsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutProductAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutProductAddonsInput>;
export const LabUpdateToOneWithWhereWithoutProductAddonsInputObjectZodSchema = makeSchema();
