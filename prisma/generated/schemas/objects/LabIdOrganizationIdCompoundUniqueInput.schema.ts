import * as z from 'zod';
import type { Prisma } from '../../../../generated/prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  organizationId: z.string()
}).strict();
export const LabIdOrganizationIdCompoundUniqueInputObjectSchema: z.ZodType<Prisma.LabIdOrganizationIdCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.LabIdOrganizationIdCompoundUniqueInput>;
export const LabIdOrganizationIdCompoundUniqueInputObjectZodSchema = makeSchema();
