import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabCreateWithoutOrganizationInputObjectSchema as LabCreateWithoutOrganizationInputObjectSchema } from './LabCreateWithoutOrganizationInput.schema';
import { LabUncheckedCreateWithoutOrganizationInputObjectSchema as LabUncheckedCreateWithoutOrganizationInputObjectSchema } from './LabUncheckedCreateWithoutOrganizationInput.schema';
import { LabCreateOrConnectWithoutOrganizationInputObjectSchema as LabCreateOrConnectWithoutOrganizationInputObjectSchema } from './LabCreateOrConnectWithoutOrganizationInput.schema';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => LabCreateWithoutOrganizationInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutOrganizationInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => LabCreateOrConnectWithoutOrganizationInputObjectSchema).optional(),
  connect: z.lazy(() => LabWhereUniqueInputObjectSchema).optional()
}).strict();
export const LabCreateNestedOneWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.LabCreateNestedOneWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateNestedOneWithoutOrganizationInput>;
export const LabCreateNestedOneWithoutOrganizationInputObjectZodSchema = makeSchema();
