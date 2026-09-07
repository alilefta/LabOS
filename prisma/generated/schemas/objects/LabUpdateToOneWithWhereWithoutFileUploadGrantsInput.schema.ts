import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutFileUploadGrantsInputObjectSchema as LabUpdateWithoutFileUploadGrantsInputObjectSchema } from './LabUpdateWithoutFileUploadGrantsInput.schema';
import { LabUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema as LabUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema } from './LabUncheckedUpdateWithoutFileUploadGrantsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutFileUploadGrantsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutFileUploadGrantsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutFileUploadGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutFileUploadGrantsInput>;
export const LabUpdateToOneWithWhereWithoutFileUploadGrantsInputObjectZodSchema = makeSchema();
