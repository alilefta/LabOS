import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutStoredFilesInputObjectSchema as LabUpdateWithoutStoredFilesInputObjectSchema } from './LabUpdateWithoutStoredFilesInput.schema';
import { LabUncheckedUpdateWithoutStoredFilesInputObjectSchema as LabUncheckedUpdateWithoutStoredFilesInputObjectSchema } from './LabUncheckedUpdateWithoutStoredFilesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutStoredFilesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStoredFilesInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutStoredFilesInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutStoredFilesInput>;
export const LabUpdateToOneWithWhereWithoutStoredFilesInputObjectZodSchema = makeSchema();
