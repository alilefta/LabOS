import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';
import { LabIdOrganizationIdCompoundUniqueInputObjectSchema as LabIdOrganizationIdCompoundUniqueInputObjectSchema } from './LabIdOrganizationIdCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  organizationId: z.string().optional(),
  id_organizationId: z.lazy(() => LabIdOrganizationIdCompoundUniqueInputObjectSchema).optional()
}).strict();
export const LabWhereUniqueInputObjectSchema: z.ZodType<Prisma.LabWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabWhereUniqueInput>;
export const LabWhereUniqueInputObjectZodSchema = makeSchema();
