import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabUpdateWithoutOrganizationInputObjectSchema as LabUpdateWithoutOrganizationInputObjectSchema } from './LabUpdateWithoutOrganizationInput.schema';
import { LabUncheckedUpdateWithoutOrganizationInputObjectSchema as LabUncheckedUpdateWithoutOrganizationInputObjectSchema } from './LabUncheckedUpdateWithoutOrganizationInput.schema';
import { LabCreateWithoutOrganizationInputObjectSchema as LabCreateWithoutOrganizationInputObjectSchema } from './LabCreateWithoutOrganizationInput.schema';
import { LabUncheckedCreateWithoutOrganizationInputObjectSchema as LabUncheckedCreateWithoutOrganizationInputObjectSchema } from './LabUncheckedCreateWithoutOrganizationInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => LabUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutOrganizationInputObjectSchema)]),
  create: z.union([z.lazy(() => LabCreateWithoutOrganizationInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutOrganizationInputObjectSchema)]),
  where: z.lazy(() => LabWhereInputObjectSchema).optional()
}).strict();
export const LabUpsertWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.LabUpsertWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUpsertWithoutOrganizationInput>;
export const LabUpsertWithoutOrganizationInputObjectZodSchema = makeSchema();
