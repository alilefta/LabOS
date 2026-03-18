import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutWorkTypesInputObjectSchema as LabUpdateWithoutWorkTypesInputObjectSchema } from './LabUpdateWithoutWorkTypesInput.schema';
import { LabUncheckedUpdateWithoutWorkTypesInputObjectSchema as LabUncheckedUpdateWithoutWorkTypesInputObjectSchema } from './LabUncheckedUpdateWithoutWorkTypesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutWorkTypesInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutWorkTypesInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutWorkTypesInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutWorkTypesInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutWorkTypesInput>;
export const LabUpdateToOneWithWhereWithoutWorkTypesInputObjectZodSchema = makeSchema();
