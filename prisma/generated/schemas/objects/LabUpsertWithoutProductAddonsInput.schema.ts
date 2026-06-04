import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutProductAddonsInputObjectSchema as LabUpdateWithoutProductAddonsInputObjectSchema } from './LabUpdateWithoutProductAddonsInput.schema';
import { LabUncheckedUpdateWithoutProductAddonsInputObjectSchema as LabUncheckedUpdateWithoutProductAddonsInputObjectSchema } from './LabUncheckedUpdateWithoutProductAddonsInput.schema';
import { LabCreateWithoutProductAddonsInputObjectSchema as LabCreateWithoutProductAddonsInputObjectSchema } from './LabCreateWithoutProductAddonsInput.schema';
import { LabUncheckedCreateWithoutProductAddonsInputObjectSchema as LabUncheckedCreateWithoutProductAddonsInputObjectSchema } from './LabUncheckedCreateWithoutProductAddonsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutProductAddonsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutProductAddonsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutProductAddonsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutProductAddonsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutProductAddonsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutProductAddonsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutProductAddonsInput>;
export const LabUpsertWithoutProductAddonsInputObjectZodSchema = makeSchema();
