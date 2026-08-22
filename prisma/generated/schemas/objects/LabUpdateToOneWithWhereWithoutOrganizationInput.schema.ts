import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabUpdateWithoutOrganizationInputObjectSchema as LabUpdateWithoutOrganizationInputObjectSchema } from './LabUpdateWithoutOrganizationInput.schema';
import { LabUncheckedUpdateWithoutOrganizationInputObjectSchema as LabUncheckedUpdateWithoutOrganizationInputObjectSchema } from './LabUncheckedUpdateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => LabUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutOrganizationInputObjectSchema)])
}).strict();
export const LabUpdateToOneWithWhereWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpdateToOneWithWhereWithoutOrganizationInput>;
export const LabUpdateToOneWithWhereWithoutOrganizationInputObjectZodSchema = makeSchema();
