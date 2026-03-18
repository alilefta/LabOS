import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutSelectedTeethInputObjectSchema as LabUpdateWithoutSelectedTeethInputObjectSchema } from './LabUpdateWithoutSelectedTeethInput.schema';
import { LabUncheckedUpdateWithoutSelectedTeethInputObjectSchema as LabUncheckedUpdateWithoutSelectedTeethInputObjectSchema } from './LabUncheckedUpdateWithoutSelectedTeethInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutSelectedTeethInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutSelectedTeethInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutSelectedTeethInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutSelectedTeethInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutSelectedTeethInput>;
export const LabUpdateToOneWithWhereWithoutSelectedTeethInputObjectZodSchema = makeSchema();
