import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutSelectedTeethInputObjectSchema as LabUpdateWithoutSelectedTeethInputObjectSchema } from './LabUpdateWithoutSelectedTeethInput.schema';
import { LabUncheckedUpdateWithoutSelectedTeethInputObjectSchema as LabUncheckedUpdateWithoutSelectedTeethInputObjectSchema } from './LabUncheckedUpdateWithoutSelectedTeethInput.schema';
import { LabCreateWithoutSelectedTeethInputObjectSchema as LabCreateWithoutSelectedTeethInputObjectSchema } from './LabCreateWithoutSelectedTeethInput.schema';
import { LabUncheckedCreateWithoutSelectedTeethInputObjectSchema as LabUncheckedCreateWithoutSelectedTeethInputObjectSchema } from './LabUncheckedCreateWithoutSelectedTeethInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutSelectedTeethInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutSelectedTeethInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutSelectedTeethInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutSelectedTeethInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutSelectedTeethInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutSelectedTeethInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutSelectedTeethInput>;
export const LabUpsertWithoutSelectedTeethInputObjectZodSchema = makeSchema();
