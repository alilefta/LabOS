import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutOrganizationInputObjectSchema as LabCreateWithoutOrganizationInputObjectSchema } from './LabCreateWithoutOrganizationInput.schema';
import { LabUncheckedCreateWithoutOrganizationInputObjectSchema as LabUncheckedCreateWithoutOrganizationInputObjectSchema } from './LabUncheckedCreateWithoutOrganizationInput.schema';
import { LabCreateOrConnectWithoutOrganizationInputObjectSchema as LabCreateOrConnectWithoutOrganizationInputObjectSchema } from './LabCreateOrConnectWithoutOrganizationInput.schema';
import { LabUpsertWithoutOrganizationInputObjectSchema as LabUpsertWithoutOrganizationInputObjectSchema } from './LabUpsertWithoutOrganizationInput.schema';
import { LabWhereInputObjectSchema as LabWhereInputObjectSchema } from './LabWhereInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabUpdateToOneWithWhereWithoutOrganizationInputObjectSchema as LabUpdateToOneWithWhereWithoutOrganizationInputObjectSchema } from './LabUpdateToOneWithWhereWithoutOrganizationInput.schema';
import { LabUpdateWithoutOrganizationInputObjectSchema as LabUpdateWithoutOrganizationInputObjectSchema } from './LabUpdateWithoutOrganizationInput.schema';
import { LabUncheckedUpdateWithoutOrganizationInputObjectSchema as LabUncheckedUpdateWithoutOrganizationInputObjectSchema } from './LabUncheckedUpdateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutOrganizationInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutOrganizationInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutOrganizationInputObjectSchema).optional(),
  upsert: z.lazy(() => LabUpsertWithoutOrganizationInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => LabWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => LabUpdateToOneWithWhereWithoutOrganizationInputObjectSchema), z.lazy(() => LabUpdateWithoutOrganizationInputObjectSchema), z.lazy(() => LabUncheckedUpdateWithoutOrganizationInputObjectSchema)]).optional()
}).strict();
export const LabUncheckedUpdateOneWithoutOrganizationNestedInputObjectSchema: z.ZodType<Prisma.LabUncheckedUpdateOneWithoutOrganizationNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.LabUncheckedUpdateOneWithoutOrganizationNestedInput>;
export const LabUncheckedUpdateOneWithoutOrganizationNestedInputObjectZodSchema = makeSchema();
