import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutFileUploadGrantsInputObjectSchema as LabUpdateWithoutFileUploadGrantsInputObjectSchema } from './LabUpdateWithoutFileUploadGrantsInput.schema';
import { LabUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema as LabUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema } from './LabUncheckedUpdateWithoutFileUploadGrantsInput.schema';
import { LabCreateWithoutFileUploadGrantsInputObjectSchema as LabCreateWithoutFileUploadGrantsInputObjectSchema } from './LabCreateWithoutFileUploadGrantsInput.schema';
import { LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema as LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema } from './LabUncheckedCreateWithoutFileUploadGrantsInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutFileUploadGrantsInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutFileUploadGrantsInput>;
export const LabUpsertWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
