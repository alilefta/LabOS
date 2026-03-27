import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutDentistsInputObjectSchema as LabUpdateWithoutDentistsInputObjectSchema } from './LabUpdateWithoutDentistsInput.schema';
import { LabUncheckedUpdateWithoutDentistsInputObjectSchema as LabUncheckedUpdateWithoutDentistsInputObjectSchema } from './LabUncheckedUpdateWithoutDentistsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutDentistsInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutDentistsInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutDentistsInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutDentistsInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutDentistsInput>;
export const LabUpdateToOneWithWhereWithoutDentistsInputObjectZodSchema = makeSchema();
