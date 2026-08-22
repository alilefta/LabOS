import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabWhereUniqueInputObjectSchema as LabWhereUniqueInputObjectSchema } from './LabWhereUniqueInput.schema';
import { LabCreateWithoutOrganizationInputObjectSchema as LabCreateWithoutOrganizationInputObjectSchema } from './LabCreateWithoutOrganizationInput.schema';
import { LabUncheckedCreateWithoutOrganizationInputObjectSchema as LabUncheckedCreateWithoutOrganizationInputObjectSchema } from './LabUncheckedCreateWithoutOrganizationInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => LabWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => LabCreateWithoutOrganizationInputObjectSchema), z.lazy(() => LabUncheckedCreateWithoutOrganizationInputObjectSchema)])
}).strict();
export const LabCreateOrConnectWithoutOrganizationInputObjectSchema: z.ZodType<Prisma.LabCreateOrConnectWithoutOrganizationInput> = makeSchema() as unknown as z.ZodType<Prisma.LabCreateOrConnectWithoutOrganizationInput>;
export const LabCreateOrConnectWithoutOrganizationInputObjectZodSchema = makeSchema();
