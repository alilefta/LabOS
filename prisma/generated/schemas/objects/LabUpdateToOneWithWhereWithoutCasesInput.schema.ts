import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutCasesInputObjectSchema as LabUpdateWithoutCasesInputObjectSchema } from './LabUpdateWithoutCasesInput.schema';
import { LabUncheckedUpdateWithoutCasesInputObjectSchema as LabUncheckedUpdateWithoutCasesInputObjectSchema } from './LabUncheckedUpdateWithoutCasesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutCasesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutCasesInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutCasesInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCasesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutCasesInput>;
export const LabUpdateToOneWithWhereWithoutCasesInputObjectZodSchema = makeSchema();
