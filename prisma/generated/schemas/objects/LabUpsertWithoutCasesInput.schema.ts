import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutCasesInputObjectSchema as LabUpdateWithoutCasesInputObjectSchema } from './LabUpdateWithoutCasesInput.schema';
import { LabUncheckedUpdateWithoutCasesInputObjectSchema as LabUncheckedUpdateWithoutCasesInputObjectSchema } from './LabUncheckedUpdateWithoutCasesInput.schema';
import { LabCreateWithoutCasesInputObjectSchema as LabCreateWithoutCasesInputObjectSchema } from './LabCreateWithoutCasesInput.schema';
import { LabUncheckedCreateWithoutCasesInputObjectSchema as LabUncheckedCreateWithoutCasesInputObjectSchema } from './LabUncheckedCreateWithoutCasesInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutCasesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCasesInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutCasesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutCasesInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutCasesInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutCasesInput>;
export const LabUpsertWithoutCasesInputObjectZodSchema = makeSchema();
