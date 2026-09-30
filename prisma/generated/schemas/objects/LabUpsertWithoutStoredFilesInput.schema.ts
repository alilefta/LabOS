import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutStoredFilesInputObjectSchema as LabUpdateWithoutStoredFilesInputObjectSchema } from './LabUpdateWithoutStoredFilesInput.schema';
import { LabUncheckedUpdateWithoutStoredFilesInputObjectSchema as LabUncheckedUpdateWithoutStoredFilesInputObjectSchema } from './LabUncheckedUpdateWithoutStoredFilesInput.schema';
import { LabCreateWithoutStoredFilesInputObjectSchema as LabCreateWithoutStoredFilesInputObjectSchema } from './LabCreateWithoutStoredFilesInput.schema';
import { LabUncheckedCreateWithoutStoredFilesInputObjectSchema as LabUncheckedCreateWithoutStoredFilesInputObjectSchema } from './LabUncheckedCreateWithoutStoredFilesInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutStoredFilesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutStoredFilesInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutStoredFilesInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutStoredFilesInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutStoredFilesInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutStoredFilesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutStoredFilesInput>;
export const LabUpsertWithoutStoredFilesInputObjectZodSchema = makeSchema();
